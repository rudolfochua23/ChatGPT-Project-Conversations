# Multi-stage build for AI Chats App
# Stage 1: Builder
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json ./

# Install dependencies
RUN npm install --omit=dev

# Copy entire project
COPY . .

# Run build script
RUN npm run build

# Stage 2: Development
FROM node:18-alpine AS development

WORKDIR /app

# Copy package files
COPY package.json ./

# Install all dependencies (including dev)
RUN npm install

# Copy entire project including source
COPY . .

# Build the data
RUN npm run build

# Expose port
EXPOSE 4173

# Set development environment
ENV NODE_ENV=development
ENV PORT=4173

# Start the development server
CMD ["node", "server.js"]

# Stage 3: Production
FROM node:18-alpine AS production

WORKDIR /app

# Copy only necessary files from builder stage
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/server.js ./
COPY --from=builder /app/app ./app
COPY --from=builder /app/logs ./logs

# Create non-root user and install su-exec for privilege dropping
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    apk add --no-cache su-exec

# Create .auth directory and set ownership
RUN mkdir -p /app/.auth && chown -R nodejs:nodejs /app

# Entrypoint: fix volume permissions then drop to non-root user
RUN printf '#!/bin/sh\nchown -R nodejs:nodejs /app/.auth 2>/dev/null || true\nexec su-exec nodejs "$@"\n' > /entrypoint.sh && chmod +x /entrypoint.sh

EXPOSE 4173

ENV NODE_ENV=production
ENV PORT=4173

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:4173/health || exit 1

ENTRYPOINT ["/entrypoint.sh"]
CMD ["node", "server.js"]
