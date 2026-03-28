# Conversation Log

- Platform: chatgpt
- Conversation ID: 69bf58df-45a0-8322-b098-b05832129ae8
- Title: Cline Error Analysis
- Captured: 2026-03-22T03:20:08.921Z
- URL: https://chatgpt.com/c/69bf58df-45a0-8322-b098-b05832129ae8

---

## User

analyze this cline error:

[cline] stream_initialization_failedFailed to create stream: inference request failed: failed to generate stream from Vercel: failed to invoke model 'anthropic/claude-sonnet-4.6' with streaming: request failed with status 400: {"error":{"message":"Bad Request","type":"AI_APICallError","param":{"error":"Bad Request","statusCode":400,"name":"AI_APICallError","message":"Bad Request","url":"https://bedrock-runtime.us-east-1.amazonaws.com/model/global.anthropic.claude-sonnet-4-6/invoke-with-response-stream","isRetryable":false,"type":"AI_APICallError"}},"providerMetadata":{"gateway":{"routing":{"originalModelId":"anthropic/claude-sonnet-4.6","resolvedProvider":"anthropic","resolvedProviderApiModelId":"claude-sonnet-4-6","internalResolvedModelId":"anthropic:claude-sonnet-4-6","fallbacksAvailable":["vertexAnthropic","bedrock"],"internalReasoning":"Selected anthropic as preferred provider for claude-sonnet-4.6. 2 fallback(s) available: vertexAnthropic, bedrock","canonicalSlug":"anthropic/claude-sonnet-4.6","attempts":[{"provider":"anthropic","internalModelId":"anthropic:claude-sonnet-4-6","providerApiModelId":"claude-sonnet-4-6","credentialType":"byok","success":false,"error":"messages.3.content.0: Invalid signature in thinking block","startTime":2281344.415425,"endTime":2281428.369783,"statusCode":400},{"provider":"anthropic","internalModelId":"anthropic:claude-sonnet-4-6","providerApiModelId":"claude-sonnet-4-6","credentialType":"system","success":false,"error":"messages.3.content.0: Invalid signature in thinking block","startTime":2281462.895715,"endTime":2281560.182724,"statusCode":400},{"provider":"vertexAnthropic","internalModelId":"vertexAnthropic:claude-sonnet-4-6","providerApiModelId":"claude-sonnet-4-6","credentialType":"system","success":false,"error":"messages.3.content.0: Invalid signature in thinking block","startTime":2281577.390757,"endTime":2282158.348471,"statusCode":400},{"provider":"bedrock","internalModelId":"bedrock:global.anthropic.claude-sonnet-4-6","providerApiModelId":"global.anthropic.claude-sonnet-4-6","credentialType":"system","success":false,"error":"Bad Request","startTime":2282175.991411,"endTime":2282451.887338,"statusCode":400}],"modelAttemptCount":1,"modelAttempts":[{"modelId":"anthropic:claude-sonnet-4-6","canonicalSlug":"anthropic/claude-sonnet-4.6","success":false,"providerAttemptCount":4,"providerAttempts":[{"provider":"anthropic","internalModelId":"anthropic:claude-sonnet-4-6","providerApiModelId":"claude-sonnet-4-6","credentialType":"byok","success":false,"error":"messages.3.content.0: Invalid signature in thinking block","startTime":2281344.415425,"endTime":2281428.369783,"statusCode":400},{"provider":"anthropic","internalModelId":"anthropic:claude-sonnet-4-6","providerApiModelId":"claude-sonnet-4-6","credentialType":"system","success":false,"error":"messages.3.content.0: Invalid signature in thinking block","startTime":2281462.895715,"endTime":2281560.182724,"statusCode":400},{"provider":"vertexAnthropic","internalModelId":"vertexAnthropic:claude-sonnet-4-6","providerApiModelId":"claude-sonnet-4-6","credentialType":"system","success":false,"error":"messages.3.content.0: Invalid signature in thinking block","startTime":2281577.390757,"endTime":2282158.348471,"statusCode":400},{"provider":"bedrock","internalModelId":"bedrock:global.anthropic.claude-sonnet-4-6","providerApiModelId":"global.anthropic.claude-sonnet-4-6","credentialType":"system","success":false,"error":"Bad Request","startTime":2282175.991411,"endTime":2282451.887338,"statusCode":400}]}],"totalProviderAttemptCount":4}}}}

Request ID: yIoJIQsmdYhbGdzGtJOLsRtsprtGUCtz

{"message":"Failed to create stream: inference request failed: failed to generate stream from Vercel: failed to invoke model 'anthropic/claude-sonnet-4.6' with streaming: request failed with status 400: {\\"error\\":{\\"message\\":\\"Bad Request\\",\\"type\\":\\"AI_APICallError\\",\\"param\\":{\\"error\\":\\"Bad Request\\",\\"statusCode\\":400,\\"name\\":\\"AI_APICallError\\",\\"message\\":\\"Bad Request\\",\\"url\\":\\"https://bedrock-runtime.us-east-1.amazonaws.com/model/global.anthropic.claude-sonnet-4-6/invoke-with-response-stream\\",\\"isRetryable\\":false,\\"type\\":\\"AI_APICallError\\"}},\\"providerMetadata\\":{\\"gateway\\":{\\"routing\\":{\\"originalModelId\\":\\"anthropic/claude-sonnet-4.6\\",\\"resolvedProvider\\":\\"anthropic\\",\\"resolvedProviderApiModelId\\":\\"claude-sonnet-4-6\\",\\"internalResolvedModelId\\":\\"anthropic:claude-sonnet-4-6\\",\\"fallbacksAvailable\\":[\\"vertexAnthropic\\",\\"bedrock\\"],\\"internalReasoning\\":\\"Selected anthropic as preferred provider for claude-sonnet-4.6. 2 fallback(s) available: vertexAnthropic, bedrock\\",\\"canonicalSlug\\":\\"anthropic/claude-sonnet-4.6\\",\\"attempts\\":[{\\"provider\\":\\"anthropic\\",\\"internalModelId\\":\\"anthropic:claude-sonnet-4-6\\",\\"providerApiModelId\\":\\"claude-sonnet-4-6\\",\\"credentialType\\":\\"byok\\",\\"success\\":false,\\"error\\":\\"messages.3.content.0: Invalid signature in thinking block\\",\\"startTime\\":2281344.415425,\\"endTime\\":2281428.369783,\\"statusCode\\":400},{\\"provider\\":\\"anthropic\\",\\"internalModelId\\":\\"anthropic:claude-sonnet-4-6\\",\\"providerApiModelId\\":\\"claude-sonnet-4-6\\",\\"credentialType\\":\\"system\\",\\"success\\":false,\\"error\\":\\"messages.3.content.0: Invalid signature in thinking block\\",\\"startTime\\":2281462.895715,\\"endTime\\":2281560.182724,\\"statusCode\\":400},{\\"provider\\":\\"vertexAnthropic\\",\\"internalModelId\\":\\"vertexAnthropic:claude-sonnet-4-6\\",\\"providerApiModelId\\":\\"claude-sonnet-4-6\\",\\"credentialType\\":\\"system\\",\\"success\\":false,\\"error\\":\\"messages.3.content.0: Invalid signature in thinking block\\",\\"startTime\\":2281577.390757,\\"endTime\\":2282158.348471,\\"statusCode\\":400},{\\"provider\\":\\"bedrock\\",\\"internalModelId\\":\\"bedrock:global.anthropic.claude-sonnet-4-6\\",\\"providerApiModelId\\":\\"global.anthropic.claude-sonnet-4-6\\",\\"credentialType\\":\\"system\\",\\"success\\":false,\\"error\\":\\"Bad Request\\",\\"startTime\\":2282175.991411,\\"endTime\\":2282451.887338,\\"statusCode\\":400}],\\"modelAttemptCount\\":1,\\"modelAttempts\\":[{\\"modelId\\":\\"anthropic:claude-sonnet-4-6\\",\\"canonicalSlug\\":\\"anthropic/claude-sonnet-4.6\\",\\"success\\":false,\\"providerAttemptCount\\":4,\\"providerAttempts\\":[{\\"provider\\":\\"anthropic\\",\\"internalModelId\\":\\"anthropic:claude-sonnet-4-6\\",\\"providerApiModelId\\":\\"claude-sonnet-4-6\\",\\"credentialType\\":\\"byok\\",\\"success\\":false,\\"error\\":\\"messages.3.content.0: Invalid signature in thinking block\\",\\"startTime\\":2281344.415425,\\"endTime\\":2281428.369783,\\"statusCode\\":400},{\\"provider\\":\\"anthropic\\",\\"internalModelId\\":\\"anthropic:claude-sonnet-4-6\\",\\"providerApiModelId\\":\\"claude-sonnet-4-6\\",\\"credentialType\\":\\"system\\",\\"success\\":false,\\"error\\":\\"messages.3.content.0: Invalid signature in thinking block\\",\\"startTime\\":2281462.895715,\\"endTime\\":2281560.182724,\\"statusCode\\":400},{\\"provider\\":\\"vertexAnthropic\\",\\"internalModelId\\":\\"vertexAnthropic:claude-sonnet-4-6\\",\\"providerApiModelId\\":\\"claude-sonnet-4-6\\",\\"credentialType\\":\\"system\\",\\"success\\":false,\\"error\\":\\"messages.3.content.0: Invalid signature in thinking block\\",\\"startTime\\":2281577.390757,\\"endTime\\":2282158.348471,\\"statusCode\\":400},{\\"provider\\":\\"bedrock\\",\\"internalModelId\\":\\"bedrock:global.anthropic.claude-sonnet-4-6\\",\\"providerApiModelId\\":\\"global.anthropic.claude-sonnet-4-6\\",\\"credentialType\\":\\"system\\",\\"success\\":false,\\"error\\":\\"Bad Request\\",\\"startTime\\":2282175.991411,\\"endTime\\":2282451.887338,\\"statusCode\\":400}]}],\\"totalProviderAttemptCount\\":4}}}}","request_id":"yIoJIQsmdYhbGdzGtJOLsRtsprtGUCtz","code":"stream_initialization_failed","modelId":"anthropic/claude-sonnet-4.6","providerId":"cline","details":{"code":"stream_initialization_failed","message":"Failed to create stream: inference request failed: failed to generate stream from Vercel: failed to invoke model 'anthropic/claude-sonnet-4.6' with streaming: request failed with status 400: {\\"error\\":{\\"message\\":\\"Bad Request\\",\\"type\\":\\"AI_APICallError\\",\\"param\\":{\\"error\\":\\"Bad Request\\",\\"statusCode\\":400,\\"name\\":\\"AI_APICallError\\",\\"message\\":\\"Bad Request\\",\\"url\\":\\"https://bedrock-runtime.us-east-1.amazonaws.com/model/global.anthropic.claude-sonnet-4-6/invoke-with-response-stream\\",\\"isRetryable\\":false,\\"type\\":\\"AI_APICallError\\"}},\\"providerMetadata\\":{\\"gateway\\":{\\"routing\\":{\\"originalModelId\\":\\"anthropic/claude-sonnet-4.6\\",\\"resolvedProvider\\":\\"anthropic\\",\\"resolvedProviderApiModelId\\":\\"claude-sonnet-4-6\\",\\"internalResolvedModelId\\":\\"anthropic:claude-sonnet-4-6\\",\\"fallbacksAvailable\\":[\\"vertexAnthropic\\",\\"bedrock\\"],\\"internalReasoning\\":\\"Selected anthropic as preferred provider for claude-sonnet-4.6. 2 fallback(s) available: vertexAnthropic, bedrock\\",\\"canonicalSlug\\":\\"anthropic/claude-sonnet-4.6\\",\\"attempts\\":[{\\"provider\\":\\"anthropic\\",\\"internalModelId\\":\\"anthropic:claude-sonnet-4-6\\",\\"providerApiModelId\\":\\"claude-sonnet-4-6\\",\\"credentialType\\":\\"byok\\",\\"success\\":false,\\"error\\":\\"messages.3.content.0: Invalid signature in thinking block\\",\\"startTime\\":2281344.415425,\\"endTime\\":2281428.369783,\\"statusCode\\":400},{\\"provider\\":\\"anthropic\\",\\"internalModelId\\":\\"anthropic:claude-sonnet-4-6\\",\\"providerApiModelId\\":\\"claude-sonnet-4-6\\",\\"credentialType\\":\\"system\\",\\"success\\":false,\\"error\\":\\"messages.3.content.0: Invalid signature in thinking block\\",\\"startTime\\":2281462.895715,\\"endTime\\":2281560.182724,\\"statusCode\\":400},{\\"provider\\":\\"vertexAnthropic\\",\\"internalModelId\\":\\"vertexAnthropic:claude-sonnet-4-6\\",\\"providerApiModelId\\":\\"claude-sonnet-4-6\\",\\"credentialType\\":\\"system\\",\\"success\\":false,\\"error\\":\\"messages.3.content.0: Invalid signature in thinking block\\",\\"startTime\\":2281577.390757,\\"endTime\\":2282158.348471,\\"statusCode\\":400},{\\"provider\\":\\"bedrock\\",\\"internalModelId\\":\\"bedrock:global.anthropic.claude-sonnet-4-6\\",\\"providerApiModelId\\":\\"global.anthropic.claude-sonnet-4-6\\",\\"credentialType\\":\\"system\\",\\"success\\":false,\\"error\\":\\"Bad Request\\",\\"startTime\\":2282175.991411,\\"endTime\\":2282451.887338,\\"statusCode\\":400}],\\"modelAttemptCount\\":1,\\"modelAttempts\\":[{\\"modelId\\":\\"anthropic:claude-sonnet-4-6\\",\\"canonicalSlug\\":\\"anthropic/claude-sonnet-4.6\\",\\"success\\":false,\\"providerAttemptCount\\":4,\\"providerAttempts\\":[{\\"provider\\":\\"anthropic\\",\\"internalModelId\\":\\"anthropic:claude-sonnet-4-6\\",\\"providerApiModelId\\":\\"claude-sonnet-4-6\\",\\"credentialType\\":\\"byok\\",\\"success\\":false,\\"error\\":\\"messages.3.content.0: Invalid signature in thinking block\\",\\"startTime\\":2281344.415425,\\"endTime\\":2281428.369783,\\"statusCode\\":400},{\\"provider\\":\\"anthropic\\",\\"internalModelId\\":\\"anthropic:claude-sonnet-4-6\\",\\"providerApiModelId\\":\\"claude-sonnet-4-6\\",\\"credentialType\\":\\"system\\",\\"success\\":false,\\"error\\":\\"messages.3.content.0: Invalid signature in thinking block\\",\\"startTime\\":2281462.895715,\\"endTime\\":2281560.182724,\\"statusCode\\":400},{\\"provider\\":\\"vertexAnthropic\\",\\"internalModelId\\":\\"vertexAnthropic:claude-sonnet-4-6\\",\\"providerApiModelId\\":\\"claude-sonnet-4-6\\",\\"credentialType\\":\\"system\\",\\"success\\":false,\\"error\\":\\"messages.3.content.0: Invalid signature in thinking block\\",\\"startTime\\":2281577.390757,\\"endTime\\":2282158.348471,\\"statusCode\\":400},{\\"provider\\":\\"bedrock\\",\\"internalModelId\\":\\"bedrock:global.anthropic.claude-sonnet-4-6\\",\\"providerApiModelId\\":\\"global.anthropic.claude-sonnet-4-6\\",\\"credentialType\\":\\"system\\",\\"success\\":false,\\"error\\":\\"Bad Request\\",\\"startTime\\":2282175.991411,\\"endTime\\":2282451.887338,\\"statusCode\\":400}]}],\\"totalProviderAttemptCount\\":4}}}}","request_id":"yIoJIQsmdYhbGdzGtJOLsRtsprtGUCtz","type":"stream_error"}}

(Click "Retry" below)

{"message":"Failed to create stream: inference request failed: failed to generate stream from Vercel: failed to invoke model 'anthropic/claude-sonnet-4.6' with streaming: request failed with status 400: {\\"error\\":{\\"message\\":\\"Bad Request\\",\\"type\\":\\"AI_APICallError\\",\\"param\\":{\\"error\\":\\"Bad Request\\",\\"statusCode\\":400,\\"name\\":\\"AI_APICallError\\",\\"message\\":\\"Bad Request\\",\\"url\\":\\"https://bedrock-runtime.us-east-1.amazonaws.com/model/global.anthropic.claude-sonnet-4-6/invoke-with-response-stream\\",\\"isRetryable\\":false,\\"type\\":\\"AI_APICallError\\"}},\\"providerMetadata\\":{\\"gateway\\":{\\"routing\\":{\\"originalModelId\\":\\"anthropic/claude-sonnet-4.6\\",\\"resolvedProvider\\":\\"anthropic\\",\\"resolvedProviderApiModelId\\":\\"claude-sonnet-4-6\\",\\"internalResolvedModelId\\":\\"anthropic:claude-sonnet-4-6\\",\\"fallbacksAvailable\\":[\\"vertexAnthropic\\",\\"bedrock\\"],\\"internalReasoning\\":\\"Selected anthropic as preferred provider for claude-sonnet-4.6. 2 fallback(s) available: vertexAnthropic, bedrock\\",\\"canonicalSlug\\":\\"anthropic/claude-sonnet-4.6\\",\\"attempts\\":[{\\"provider\\":\\"anthropic\\",\\"internalModelId\\":\\"anthropic:claude-sonnet-4-6\\",\\"providerApiModelId\\":\\"claude-sonnet-4-6\\",\\"credentialType\\":\\"byok\\",\\"success\\":false,\\"error\\":\\"messages.3.content.0: Invalid signature in thinking block\\",\\"startTime\\":2281344.415425,\\"endTime\\":2281428.369783,\\"statusCode\\":400},{\\"provider\\":\\"anthropic\\",\\"internalModelId\\":\\"anthropic:claude-sonnet-4-6\\",\\"providerApiModelId\\":\\"claude-sonnet-4-6\\",\\"credentialType\\":\\"system\\",\\"success\\":false,\\"error\\":\\"messages.3.content.0: Invalid signature in thinking block\\",\\"startTime\\":2281462.895715,\\"endTime\\":2281560.182724,\\"statusCode\\":400},{\\"provider\\":\\"vertexAnthropic\\",\\"internalModelId\\":\\"vertexAnthropic:claude-sonnet-4-6\\",\\"providerApiModelId\\":\\"claude-sonnet-4-6\\",\\"credentialType\\":\\"system\\",\\"success\\":false,\\"error\\":\\"messages.3.content.0: Invalid signature in thinking block\\",\\"startTime\\":2281577.390757,\\"endTime\\":2282158.348471,\\"statusCode\\":400},{\\"provider\\":\\"bedrock\\",\\"internalModelId\\":\\"bedrock:global.anthropic.claude-sonnet-4-6\\",\\"providerApiModelId\\":\\"global.anthropic.claude-sonnet-4-6\\",\\"credentialType\\":\\"system\\",\\"success\\":false,\\"error\\":\\"Bad Request\\",\\"startTime\\":2282175.991411,\\"endTime\\":2282451.887338,\\"statusCode\\":400}],\\"modelAttemptCount\\":1,\\"modelAttempts\\":[{\\"modelId\\":\\"anthropic:claude-sonnet-4-6\\",\\"canonicalSlug\\":\\"anthropic/claude-sonnet-4.6\\",\\"success\\":false,\\"providerAttemptCount\\":4,\\"providerAttempts\\":[{\\"provider\\":\\"anthropic\\",\\"internalModelId\\":\\"anthropic:claude-sonnet-4-6\\",\\"providerApiModelId\\":\\"claude-sonnet-4-6\\",\\"credentialType\\":\\"byok\\",\\"success\\":false,\\"error\\":\\"messages.3.content.0: Invalid signature in thinking block\\",\\"startTime\\":2281344.415425,\\"endTime\\":2281428.369783,\\"statusCode\\":400},{\\"provider\\":\\"anthropic\\",\\"internalModelId\\":\\"anthropic:claude-sonnet-4-6\\",\\"providerApiModelId\\":\\"claude-sonnet-4-6\\",\\"credentialType\\":\\"system\\",\\"success\\":false,\\"error\\":\\"messages.3.content.0: Invalid signature in thinking block\\",\\"startTime\\":2281462.895715,\\"endTime\\":2281560.182724,\\"statusCode\\":400},{\\"provider\\":\\"vertexAnthropic\\",\\"internalModelId\\":\\"vertexAnthropic:claude-sonnet-4-6\\",\\"providerApiModelId\\":\\"claude-sonnet-4-6\\",\\"credentialType\\":\\"system\\",\\"success\\":false,\\"error\\":\\"messages.3.content.0: Invalid signature in thinking block\\",\\"startTime\\":2281577.390757,\\"endTime\\":2282158.348471,\\"statusCode\\":400},{\\"provider\\":\\"bedrock\\",\\"internalModelId\\":\\"bedrock:global.anthropic.claude-sonnet-4-6\\",\\"providerApiModelId\\":\\"global.anthropic.claude-sonnet-4-6\\",\\"credentialType\\":\\"system\\",\\"success\\":false,\\"error\\":\\"Bad Request\\",\\"startTime\\":2282175.991411,\\"endTime\\":2282451.887338,\\"statusCode\\":400}]}],\\"totalProviderAttemptCount\\":4}}}}","request_id":"yIoJIQsmdYhbGdzGtJOLsRtsprtGUCtz","code":"stream_initialization_failed","modelId":"anthropic/claude-sonnet-4.6","providerId":"cline","details":{"code":"stream_initialization_failed","message":"Failed to create stream: inference request failed: failed to generate stream from Vercel: failed to invoke model 'anthropic/claude-sonnet-4.6' with streaming: request failed with status 400: {\\"error\\":{\\"message\\":\\"Bad Request\\",\\"type\\":\\"AI_APICallError\\",\\"param\\":{\\"error\\":\\"Bad Request\\",\\"statusCode\\":400,\\"name\\":\\"AI_APICallError\\",\\"message\\":\\"Bad Request\\",\\"url\\":\\"https://bedrock-runtime.us-east-1.amazonaws.com/model/global.anthropic.claude-sonnet-4-6/invoke-with-response-stream\\",\\"isRetryable\\":false,\\"type\\":\\"AI_APICallError\\"}},\\"providerMetadata\\":{\\"gateway\\":{\\"routing\\":{\\"originalModelId\\":\\"anthropic/claude-sonnet-4.6\\",\\"resolvedProvider\\":\\"anthropic\\",\\"resolvedProviderApiModelId\\":\\"claude-sonnet-4-6\\",\\"internalResolvedModelId\\":\\"anthropic:claude-sonnet-4-6\\",\\"fallbacksAvailable\\":[\\"vertexAnthropic\\",\\"bedrock\\"],\\"internalReasoning\\":\\"Selected anthropic as preferred provider for claude-sonnet-4.6. 2 fallback(s) available: vertexAnthropic, bedrock\\",\\"canonicalSlug\\":\\"anthropic/claude-sonnet-4.6\\",\\"attempts\\":[{\\"provider\\":\\"anthropic\\",\\"internalModelId\\":\\"anthropic:claude-sonnet-4-6\\",\\"providerApiModelId\\":\\"claude-sonnet-4-6\\",\\"credentialType\\":\\"byok\\",\\"success\\":false,\\"error\\":\\"messages.3.content.0: Invalid signature in thinking block\\",\\"startTime\\":2281344.415425,\\"endTime\\":2281428.369783,\\"statusCode\\":400},{\\"provider\\":\\"anthropic\\",\\"internalModelId\\":\\"anthropic:claude-sonnet-4-6\\",\\"providerApiModelId\\":\\"claude-sonnet-4-6\\",\\"credentialType\\":\\"system\\",\\"success\\":false,\\"error\\":\\"messages.3.content.0: Invalid signature in thinking block\\",\\"startTime\\":2281462.895715,\\"endTime\\":2281560.182724,\\"statusCode\\":400},{\\"provider\\":\\"vertexAnthropic\\",\\"internalModelId\\":\\"vertexAnthropic:claude-sonnet-4-6\\",\\"providerApiModelId\\":\\"claude-sonnet-4-6\\",\\"credentialType\\":\\"system\\",\\"success\\":false,\\"error\\":\\"messages.3.content.0: Invalid signature in thinking block\\",\\"startTime\\":2281577.390757,\\"endTime\\":2282158.348471,\\"statusCode\\":400},{\\"provider\\":\\"bedrock\\",\\"internalModelId\\":\\"bedrock:global.anthropic.claude-sonnet-4-6\\",\\"providerApiModelId\\":\\"global.anthropic.claude-sonnet-4-6\\",\\"credentialType\\":\\"system\\",\\"success\\":false,\\"error\\":\\"Bad Request\\",\\"startTime\\":2282175.991411,\\"endTime\\":2282451.887338,\\"statusCode\\":400}],\\"modelAttemptCount\\":1,\\"modelAttempts\\":[{\\"modelId\\":\\"anthropic:claude-sonnet-4-6\\",\\"canonicalSlug\\":\\"anthropic/claude-sonnet-4.6\\",\\"success\\":false,\\"providerAttemptCount\\":4,\\"providerAttempts\\":[{\\"provider\\":\\"anthropic\\",\\"internalModelId\\":\\"anthropic:claude-sonnet-4-6\\",\\"providerApiModelId\\":\\"claude-sonnet-4-6\\",\\"credentialType\\":\\"byok\\",\\"success\\":false,\\"error\\":\\"messages.3.content.0: Invalid signature in thinking block\\",\\"startTime\\":2281344.415425,\\"endTime\\":2281428.369783,\\"statusCode\\":400},{\\"provider\\":\\"anthropic\\",\\"internalModelId\\":\\"anthropic:claude-sonnet-4-6\\",\\"providerApiModelId\\":\\"claude-sonnet-4-6\\",\\"credentialType\\":\\"system\\",\\"success\\":false,\\"error\\":\\"messages.3.content.0: Invalid signature in thinking block\\",\\"startTime\\":2281462.895715,\\"endTime\\":2281560.182724,\\"statusCode\\":400},{\\"provider\\":\\"vertexAnthropic\\",\\"internalModelId\\":\\"vertexAnthropic:claude-sonnet-4-6\\",\\"providerApiModelId\\":\\"claude-sonnet-4-6\\",\\"credentialType\\":\\"system\\",\\"success\\":false,\\"error\\":\\"messages.3.content.0: Invalid signature in thinking block\\",\\"startTime\\":2281577.390757,\\"endTime\\":2282158.348471,\\"statusCode\\":400},{\\"provider\\":\\"bedrock\\",\\"internalModelId\\":\\"bedrock:global.anthropic.claude-sonnet-4-6\\",\\"providerApiModelId\\":\\"global.anthropic.claude-sonnet-4-6\\",\\"credentialType\\":\\"system\\",\\"success\\":false,\\"error\\":\\"Bad Request\\",\\"startTime\\":2282175.991411,\\"endTime\\":2282451.887338,\\"statusCode\\":400}]}],\\"totalProviderAttemptCount\\":4}}}}","request_id":"yIoJIQsmdYhbGdzGtJOLsRtsprtGUCtz","type":"stream_error"}

## Assistant

The key failure is here:

messages.3.content.0: Invalid signature in thinking block

That is the real root cause. Everything else is fallout.

What this means:
Your request payload includes a Claude thinking content block that has a signature Anthropic considers invalid. Because the request itself is malformed, Anthropic returns HTTP 400. Then Vercel/gateway retries other providers, but the same bad message payload keeps failing, so the whole stream initialization fails.

How to read the log:

Primary provider attempt failed on Anthropic BYOK with Invalid signature in thinking block

Retried on Anthropic system creds, same error

Retried on Vertex Anthropic, same error

Fell back to Bedrock, which only surfaces generic Bad Request

Cline reports the final wrapper error as stream_initialization_failed

So this is not:

a network problem

a streaming transport problem

an auth problem

a model outage

It is almost certainly a request-shape/problem in the conversation history you are sending.

Most likely causes:

You are replaying assistant thinking blocks from a prior Claude response back into the next request.

You are copying/transcoding Claude messages and corrupting the signature.

You are editing message history after receipt, which invalidates the signed thinking block.

Your gateway/provider translation is preserving thinking text but not the exact signed structure Anthropic expects.

You are mixing providers and forwarding Anthropic-specific internal blocks across providers.

Important clue:
messages.3.content.0 means the bad block is in the 4th message of the request, first content item. So one specific historical message in your outbound payload is malformed.

What to do:

Inspect the exact outbound payload before the API call.

Find messages[3].content[0].

If it is a thinking block, remove it from replayed history unless the provider explicitly supports returning it verbatim.

Only send normal user/assistant text blocks back unless you know how signed thinking replay works for that SDK/provider.

Do not stringify and reconstruct thinking blocks manually.

If you persist chat history, exclude provider-internal reasoning blocks from storage or from resend.

Practical fix:
Sanitize history before sending:

JavaScript
function sanitizeMessages(messages) {
  return messages.map((msg) => ({
    ...msg,
    content: Array.isArray(msg.content)
      ? msg.content.filter((block) => block.type !== "thinking")
      : msg.content,
  }));
}

If your framework uses string content sometimes, keep only standard visible content and tool blocks that the target API expects.

Safer rule:

Preserve: text, tool use/result blocks supported by the SDK

Drop: provider-internal reasoning/thinking blocks, especially signed ones

Why retries do not help:
The router is retrying the same invalid payload against multiple backends. A 400 validation error is deterministic, so retries and fallbacks will not recover it.

Best diagnosis in one line:
You are sending a previously returned Claude reasoning block back to the model, and its signed metadata is invalid or no longer valid.

What I’d check next in Cline/Vercel integration:

any history serialization/deserialization layer

any adapter converting Anthropic format to a generic chat format

any code that merges streamed partial assistant chunks back into stored history

any middleware that strips fields from content blocks

any cache/database roundtrip that mutates JSON field order/content

If you paste the exact outbound messages array you send right before the request, I can pinpoint which field to remove or transform.

## User

where can i find that outbound problem?

## Assistant

In the code that builds the final messages payload right before the model call.

From your error, the bad spot is specifically:

messages[3].content[0]

So you want to find wherever Cline or your wrapper does one of these:

loads conversation history from memory/db

converts internal chat history into Anthropic/Vercel format

calls streamText, generateText, or the raw provider SDK

logs or mutates assistant responses before re-sending them

What to search for:

messages:

content:

thinking

signature

streamText(

anthropic

claude-sonnet-4-6

invoke-with-response-stream

any history serializer like mapMessages, convertToModelMessages, buildMessages, prepareMessages

Where the bug usually lives:

History replay layer
You store prior assistant messages, then resend them on the next turn.

Provider adapter
You convert generic chat messages into Anthropic message blocks.

Streaming accumulation code
You collect streamed chunks and accidentally persist internal thinking blocks.

Persistence layer
You save raw provider responses, then reload them later with malformed fields.

What to inspect first:
Print the exact payload immediately before the request:

JavaScript
console.dir(messages, { depth: null });

Or better:

JavaScript
console.log(JSON.stringify(messages, null, 2));

Then inspect:

JavaScript
messages[3]
messages[3].content
messages[3].content[0]

If you see something like:

JSON
{
  "type": "thinking",
  "thinking": "...",
  "signature": "..."
}

that is almost certainly the problem.

What you should do with it:
Do not resend thinking blocks. Strip them before the request.

Example:

JavaScript
function sanitizeMessages(messages) {
  return messages.map((msg) => ({
    ...msg,
    content: Array.isArray(msg.content)
      ? msg.content.filter((block) => block.type !== "thinking")
      : msg.content,
  }));
}

Then call the model with:

JavaScript
const safeMessages = sanitizeMessages(messages);

Fastest way to find the source:
Add two logs:

right after loading history

right before the API call

Like this:

JavaScript
console.log("LOADED HISTORY", JSON.stringify(history, null, 2));
console.log("OUTBOUND MESSAGES", JSON.stringify(messages, null, 2));

If thinking appears in loaded history, your storage layer is the culprit.
If it appears only in outbound messages, your conversion layer is adding it.

In plain terms:
The outbound problem is not in the Bedrock URL. It is upstream, in the code that assembles the request body sent to Vercel/Anthropic.

If you want, paste the request-building code and I’ll tell you the exact line to patch.

