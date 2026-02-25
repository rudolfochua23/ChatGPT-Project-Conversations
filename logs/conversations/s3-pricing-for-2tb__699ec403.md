# ChatGPT Conversation Log

- Conversation ID: 699ec403-a818-8321-9fb9-75e2acac06ea
- Title: S3 Pricing for 2TB
- Captured: 2026-02-25T10:40:01.073Z
- URL: https://chatgpt.com/c/699ec403-a818-8321-9fb9-75e2acac06ea

---

## User

you are a senior project manager and devops operator in Amazon AWS. can you describe the pricing plan how it will be computed if let say i currently have 2TB of storage usage in S3. how much will be the cost?

## Assistant

Here’s how Amazon S3 pricing is computed for “I have ~2 TB stored” — and what it would cost in a very typical scenario.

1) What S3 charges you for (high level)

S3 bills are usually the sum of:

Storage (GB-month) – what you’re asking about

Requests (PUT/COPY/POST/LIST, GET, etc.)

Data transfer out (downloading to the internet or to other regions/services in some cases)

Optional extras: replication, Inventory, analytics/insights, Object Lambda, etc. 
Amazon Web Services, Inc.

If you only care about “I store 2 TB and barely touch it,” storage is the main driver.

2) Storage cost example for 2 TB (common default: S3 Standard, us-east-1 style pricing)

S3 storage pricing is tiered. A commonly used reference price for S3 Standard in major regions is:

$0.023 per GB-month for the first 50 TB/month 
CloudZero
+2
Cloudchipr
+2

AWS measures storage in binary GB (GiB): 1 TB = 1024 GB. 
Amazon Web Services, Inc.

So for 2 TB:

2 TB = 2 × 1024 GB = 2048 GB 
Amazon Web Services, Inc.

Monthly storage cost ≈ 2048 GB × $0.023/GB-month = $47.10/month

✅ Estimated S3 Standard storage-only cost for 2 TB: ≈ $47.10 per month (before requests and data transfer).

3) Why your real bill might differ

Even with the same 2 TB stored, your actual bill changes based on:

Region (prices vary by region)

Storage class (Standard vs Standard-IA vs One Zone-IA vs Glacier tiers, etc.)

How many API requests you do (heavy GET/LIST/PUT traffic can add up) 
Amazon Web Services, Inc.

How much you download (data transfer out) (often a big cost driver) 
Amazon Web Services, Inc.
+1

4) If you want an exact estimate (recommended)

Use the official AWS Pricing Calculator and set:

Region

Storage class

Average stored GB (2048)

Monthly requests + data transfer out

AWS points to the calculator directly for estimating S3 costs. 
Amazon Web Services, Inc.
+1

If you tell me your region (e.g., Singapore ap-southeast-1, Tokyo ap-northeast-1, etc.) and storage class (Standard vs IA vs Glacier), I’ll compute a tighter number for your exact case.

## User

assuming my app is a social media app that is just starting so burst and spikes are not so often yet and only few are still using it. can you give me an estimated cost for these server setup? and add other services that basically might needed for my app in the future:
1. 3 instances x EC2 service ( 2vCPU, 6GB RAM, 80GB Storage ) with 1 snapshot per day
2. S3 service ( assume 200GB a month for 1 year ) with snapshot 1 per day
3. RDS service ( assume i can consume 5GB per month for 1 year ) with 1 snapshot per day

## Assistant

Great — I’ll estimate this like I would for an early-stage social app running in a common region (example: us-east-1) using on-demand pricing, no Reserved Instances yet.

I’ll assume:

Linux EC2

General purpose instances (t3.large–equivalent: 2 vCPU, ~8GB RAM; closest practical size to your 6GB spec)

gp3 EBS

Standard S3

RDS MySQL/Postgres small instance

Moderate usage (low traffic, low data transfer)

All numbers are approximate but realistic for planning.

1️⃣ EC2 Cost Estimate
🔹 Instance Type

Closest common type: t3.large

2 vCPU

8GB RAM

~$0.083/hour

Monthly per instance:

Code
$0.083 × 730 hours ≈ $60.59

For 3 instances:

Code
$60.59 × 3 ≈ $181.77/month
🔹 EBS Storage (80GB per instance)

Assume gp3 @ ~$0.08 per GB/month

Per instance:

Code
80GB × $0.08 = $6.40

3 instances:

Code
$6.40 × 3 = $19.20/month
🔹 EBS Snapshots (1 per day)

Snapshots are incremental.
Assume ~20GB change per month per instance (conservative early-stage estimate).

Snapshot storage:

Code
60GB total (approx across instances) × $0.05 = ~$3/month

Safe estimate:
✅ ~$5/month for snapshots

✅ EC2 Total
Component	Monthly
EC2 compute	~$182
EBS volumes	~$19
Snapshots	~$5
Total EC2	~$206/month
2️⃣ S3 Cost (200GB growing per month for 1 year)

You said:

assume 200GB a month for 1 year

That means:
Month 1 = 200GB
Month 12 = 2400GB

Average stored over year ≈ 1300GB (~1.3TB)

S3 Standard pricing:
~$0.023 per GB

Monthly average:

Code
1300GB × $0.023 ≈ $29.90/month

Add:

PUT/GET requests (small startup traffic) ≈ $5–10

Lifecycle / versioning overhead ≈ $5

✅ Estimated S3 monthly average:
~$40/month

By month 12 alone:

Code
2400GB × 0.023 ≈ $55/month
3️⃣ RDS Cost Estimate
🔹 Instance

db.t3.medium (2 vCPU, 4GB RAM)
~$0.067/hour

Monthly:

Code
$0.067 × 730 ≈ $49/month
🔹 Storage

Assume starting 5GB per month growth:
After 12 months = 60GB

Average storage ~30GB

gp storage ~$0.115 per GB

Code
30GB × 0.115 ≈ $3.45/month
🔹 Snapshots

Automated backups up to DB size are free.
Beyond that charged at ~$0.095/GB.

For early stage:
Estimate ~$5/month

✅ RDS Total
Component	Monthly
RDS compute	~$49
Storage	~$3–7
Snapshots	~$5
Total RDS	~$60/month
📊 TOTAL INFRASTRUCTURE ESTIMATE
Service	Estimated Monthly
EC2	~$206
S3	~$40
RDS	~$60
Grand Total	~$306/month
⚠️ Costs You’re Probably Forgetting (Very Important)

For social apps, these become significant:

🔹 Data Transfer (can become expensive fast)

Outbound internet traffic:

First 100GB free

Then ~$0.09/GB

If users download images/videos:

1TB outbound = ~$90

5TB outbound = ~$450

⚠️ This becomes your biggest cost later.

🔹 Load Balancer (ALB)

~$18–25/month

🔹 NAT Gateway (if private subnet)

~$32/month + data processing

🔹 CloudWatch Logs

~$5–20/month depending on logs

🔹 Route53

~$0.50 per hosted zone + queries

🧮 Realistic Startup Monthly Total

Including basic networking:

Setup Level	Monthly Cost
Bare minimum	~$300
Production-ready small startup	~$350–450/month
With some traffic (1–2TB outbound)	~$500–700/month
💡 How I Would Optimize as a DevOps Lead

For early stage social app:

✅ Use:

1 EC2 + Auto Scaling (instead of 3 always running)

CloudFront (reduce S3 bandwidth costs)

S3 lifecycle → move older content to IA

Consider Lightsail for MVP

Use Graviton (t4g) to reduce cost ~20%

Consider Aurora Serverless v2 for scaling DB

You could realistically reduce this to:
👉 ~$150–220/month at early stage

If you’d like, I can now:

Design a lean startup architecture

Or design a scalable production-ready architecture

Or simulate cost at 10k / 100k users**

Just tell me your expected users in first 6 months.

## User

Design a lean startup architecture with basic security service then design a scalable production-ready architecture and have a simulated cost at 10k to 100k users

## Assistant

Below is a practical way to estimate AWS costs for a starter social app, plus a lean startup architecture and a production-ready scalable architecture, with simulated monthly costs for ~10k vs ~100k users.

I’ll assume US East (N. Virginia / us-east-1) pricing unless noted, and I’ll call out the big variables (egress + request volume) because those usually dominate.

1) S3 pricing example: “I have 2TB in S3—how much per month?”

S3 is billed mainly on:

Storage (GB-month)

Requests (PUT/GET/LIST)

Data transfer out (egress) (often the real bill if users download media)

For S3 Standard storage, a common baseline rate in major regions is ~$0.023 per GB-month (tiered at higher usage). 
handbook.vantage.sh
+1

Storage-only estimate (no requests / no egress)

2 TB ≈ 2,048 GB

2,048 GB × $0.023 ≈ $47.10 / month

That’s just storage. If you serve images/videos directly from S3 to users, egress can dwarf storage. Most teams front S3 with CloudFront.

2) Your “starter setup” (EC2 + S3 + RDS + daily snapshots): what to expect
A) EC2 (3 instances, 2 vCPU / ~6GB RAM, 80GB disk each)

AWS doesn’t have an exact “2 vCPU / 6GB” standard shape, so teams often land near:

t3.large (2 vCPU, 8 GiB) or

t4g.large (2 vCPU, 8 GiB, Graviton/ARM)

Example on-demand starting points:

t4g.large ~ $0.0672/hr (~$49/mo) 
Holori Cloud Calculator
+1

So 3 instances ≈ $147/mo compute before load balancers, bandwidth, etc.

EBS volumes (80GB each): gp3 is commonly modeled around ~$0.08/GB-month (varies by region/config). 
Amazon Web Services, Inc.
+1

So 240GB total ≈ $19.20/mo for disks.

Daily snapshots: EBS snapshots are billed by GB-month of snapshot data stored (incremental). AWS cites $0.05 per GB-month for standard snapshot storage in many regions. 
Amazon Web Services, Inc.
+2
Repost
+2

Rule of thumb: if your 80GB disks change ~5–10% daily and you keep ~30 days, you might land around $5–$30/mo in snapshot storage (very workload dependent).

B) S3 (200GB/month growth for 12 months + “daily snapshot”)

S3 doesn’t do “snapshots” like EBS—typically you’d use:

Versioning + Lifecycle rules, or

Cross-Region Replication, or

Periodic backup exports

Storage growth: if you add 200GB per month, after 12 months you have ~2.4TB total, and your average stored over the year is about ~1.2TB.

Average storage cost over that year ≈ 1,200GB × $0.023 ≈ $27.60/mo average (ramps up monthly). 
handbook.vantage.sh
+1

C) RDS (5GB/month growth + daily snapshots)

Compute is typically the biggest part; storage is often smaller early on.

RDS “backup/snapshot” storage behavior depends on engine/settings, but you generally pay for storage and any backup storage above free allocations (details vary). AWS provides the RDS pricing structure and free-tier notes on its pricing page. 
Amazon Web Services, Inc.
+1

3) Lean startup architecture (cheap idle cost + basic security)

Goal: near-zero cost when users are low, and scale automatically.

Recommended lean stack

Edge + static/media

CloudFront (flat-rate “Pro” plan) + S3

CloudFront flat-rate plans bundle CDN + WAF/DDoS/DNS/logging/edge compute allowances into a fixed monthly price. 
Amazon Web Services, Inc.
+1

S3 buckets: uploads/, processed/, static/

API

API Gateway (HTTP API) → Lambda

HTTP API requests can be $1.00 per million (example shown on pricing page). 
Amazon Web Services, Inc.

Optional: WebSockets (later) via API Gateway if you add realtime chat/notifications 
Amazon Web Services, Inc.

Database

Early stage:

DynamoDB on-demand (great for spiky read/write without capacity planning)

Or Aurora Serverless (if you want relational from day 1)

Auth

Cognito User Pools

Free tier includes 10,000 MAU/month for certain tiers. 
Amazon Web Services, Inc.

Async / future-proofing

SQS for background jobs (image/video processing, email fanout)

EventBridge for event routing (later)

Basic security (do this even in lean mode)

IAM least privilege + separate dev/stage/prod accounts

KMS encryption for S3 + DB

CloudTrail, CloudWatch alarms

WAF (basic rules) if you’re public-facing (or rely on CloudFront plan that bundles it) 
Amazon Web Services, Inc.
+1

4) Production-ready scalable architecture (10k → 100k users)

Goal: high availability, controlled blast radius, predictable scaling.

Production stack

Networking

VPC across 2–3 AZs

Public subnets: ALB, NAT (or avoid NAT with VPC endpoints where possible)

Private subnets: app + DB

Compute

ECS on Fargate (fast ops) or EKS (if you need Kubernetes)

Autoscaling based on CPU, memory, RPS, queue depth

Ingress

ALB (Layer 7 routing)

ALB billed per hour + LCUs (example shows $0.0225/hour and $0.008 per LCU-hour in US East examples). 
Amazon Web Services, Inc.

Data

Aurora (Multi-AZ) or RDS Multi-AZ

ElastiCache Redis (feed caching, sessions, rate limiting)

OpenSearch (search) if needed

Media

CloudFront + S3

Processing pipeline: S3 → SQS → Lambda/ECS workers → store derivatives in S3

Security hardening

AWS WAF (Web ACL + managed rules)

Example pricing components: $5/Web ACL, $1/rule, $0.60 per million requests (base WAF example). 
Amazon Web Services, Inc.

GuardDuty/Security Hub/Inspector (as you mature)

5) Simulated monthly cost at ~10k vs ~100k users (two scenarios)
Assumptions (so the math is meaningful)

10k users (MAU):

API requests: 3M / month

CDN requests (images/video): 30M / month

New uploads stored: +100GB / month

CDN data transfer: ~1TB / month

100k users (MAU):

API requests: 60M / month

CDN requests: 300M / month

New uploads stored: +1TB / month

CDN data transfer: ~10TB / month

These are conservative for a media-heavy app; real social feeds can be higher.

A) Lean (serverless) estimated monthly cost

10k users

CloudFront flat-rate:

Business plan $200/mo includes 125M requests + 50TB transfer (fits 30M req + 1TB) 
Amazon Web Services, Inc.
+1

Cognito:

$0 if you stay within 10,000 MAU free tier 
Amazon Web Services, Inc.

API Gateway HTTP API:

3M × $1/million ≈ $3 
Amazon Web Services, Inc.

Lambda:

Requests are priced (commonly $0.20 per 1M requests) + compute; pricing is described on Lambda pricing page 
Amazon Web Services, Inc.

Ballpark: $2–$20 depending on function duration/memory

S3 storage (say you have ~500GB stored early on):

~$10–$15 storage-only (plus requests)

Lean total (10k MAU): ~ $230 – $300 / month (dominated by CloudFront Business)

100k users

CloudFront:

Likely Premium $1,000/mo to cover ~300M requests (Premium includes 500M requests + 50TB transfer). 
Amazon Web Services, Inc.
+1

Cognito Essentials:

(100k − 10k) × $0.015 = $1,350/mo 
Amazon Web Services, Inc.

API Gateway:

60M × $1/million ≈ $60 (still small) 
Amazon Web Services, Inc.

Lambda:

Roughly $50–$400 depending on compute

S3 storage (say several TB):

$50–$150 storage-only

Lean total (100k MAU): ~ $2,400 – $3,200 / month (Cognito + CloudFront dominate)

Note: If Cognito MAU pricing becomes your biggest driver, you’ll want to evaluate tier choices and/or alternative auth patterns—but don’t prematurely optimize early.

B) Production (containers + ALB + RDS Multi-AZ) estimated monthly cost

10k users (baseline always-on)

2× ECS/Fargate tasks or 2× EC2 t4g.large equivalents:

~$100–$250 compute (depends on sizing/always-on vs autoscale) 
Holori Cloud Calculator
+1

ALB:

$0.0225/hr ≈ $16.43/mo + LCU (say +$5–$30) 
Amazon Web Services, Inc.

RDS (Multi-AZ) small instance:

Example instance pricing reference: db.t4g.medium starts ~$0.065/hr (~$47/mo); Multi-AZ roughly doubles instance-side cost 
Vantage

So ballpark: $100–$250 including storage/IO/backup early on

WAF:

If you run WAF: minimum $5/Web ACL + rules + request fees 
Amazon Web Services, Inc.

CloudFront:

likely still Business $200/mo 
Amazon Web Services, Inc.
+1

Production total (10k MAU): ~ $450 – $900 / month

100k users

App compute (autoscaled):

$600 – $2,000 (depends heavily on CPU time per request and caching)

ALB + LCUs:

$50 – $250

RDS/Aurora (Multi-AZ + read replica, bigger instance):

$500 – $2,000

CloudFront Premium:

$1,000/mo 
Amazon Web Services, Inc.
+1

Cognito:

~$1,350/mo (Essentials example math) 
Amazon Web Services, Inc.

WAF:

Could be $50–$300+ depending on request volume and managed rules 
Amazon Web Services, Inc.

Production total (100k MAU): ~ $3,500 – $7,000 / month

What I’d do in your situation

Start with Lean serverless + CloudFront plan (cheap ops, fast iteration).

Add SQS-based async processing early (media processing + notifications).

Move to containers + RDS/Aurora Multi-AZ + Redis once you see sustained growth and performance bottlenecks.

If you tell me (a) region, (b) average photo/video size, and (c) expected CDN egress (GB/month), I can tighten these estimates a lot—those 3 inputs usually determine 80% of the bill.

## User

can we re estimate the monthly for only 5k users?

## Assistant

Yes — let’s properly re-estimate for ~5,000 Monthly Active Users (MAU).

I’ll model this realistically for an early social app (images only, light video) and assume:

Region: us-east-1

Users active but not heavy yet

Basic feed, profile pictures, small uploads

No viral spikes yet

Using the lean serverless architecture

📊 Assumptions for 5K Users

To make the estimate meaningful, we need behavior assumptions.

Usage Model (Conservative but realistic)

Per user per month:

20 sessions

50 API calls per session → 1,000 API calls/user/month

30 feed refreshes pulling images

10 uploads (avg 1MB each)

Totals
Metric	Monthly
API requests	~5M
CDN image requests	~15M
New storage added	~50GB
Total stored media	~300GB (early stage)
Data transfer (CDN egress)	~500GB–800GB

This is modest usage.

🧮 Lean Serverless Architecture Cost (5K Users)
1️⃣ CloudFront + S3 (Media Delivery)
Option A — Traditional usage-based pricing

CloudFront data transfer ≈ $0.085–$0.09 per GB

Assume:

700GB outbound × $0.085 ≈ $60

15M requests (very cheap, few dollars)

S3 storage:

300GB × $0.023 ≈ $6.90

S3 requests:

~$3–5

CloudFront + S3 total:

👉 ~$70–80/month

2️⃣ API Gateway (HTTP API)

5M requests
Pricing: ~$1 per million

👉 $5/month

3️⃣ Lambda

5M invocations
$0.20 per 1M requests = $1
Compute time (light functions) ≈ $5–15

👉 ~$10–20/month

4️⃣ Cognito (Authentication)

Free tier includes 10,000 MAU

At 5K users:

👉 $0

5️⃣ DynamoDB (or Aurora Serverless small load)

Light usage:
👉 $15–30/month

6️⃣ CloudWatch + Logs + Misc

👉 $10–20

✅ Total Estimated Monthly Cost (5K Users, Lean Setup)
Service	Estimated Monthly
CloudFront + S3	$70–80
API Gateway	$5
Lambda	$10–20
DynamoDB	$15–30
Logs/Misc	$10–20
Total	~$110 – $155/month
🔥 If You Use EC2 Instead (3 instances always running)

From earlier estimate:

EC2 cluster: ~$200

S3/CDN: ~$70

RDS: ~$60

ALB + misc: ~$40

👉 ~$370–450/month

For only 5K users, that’s overkill.

💡 What Actually Dominates Cost at 5K Users?

Not compute.

It’s:

CDN bandwidth

Storage growth over time

If your users:

Upload videos

Auto-play media

Download full-resolution images

Bandwidth doubles or triples quickly.

🚀 What I Recommend at 5K Users

Use:

API Gateway + Lambda

DynamoDB

S3 + CloudFront

Cognito

SQS for async jobs

You stay under:
👉 $150/month comfortably

And you automatically scale to 20K users without re-architecting.

📈 Realistic Growth Path Cost Projection
Users	Monthly Cost (Lean)
5K	$120
10K	$250
25K	$600–900
50K	$1.5K–2.5K
100K	$3K+

(Bandwidth and auth become primary drivers.)

If you’d like, I can next:

Break down cost per user

Or simulate “what if users upload short videos?”

Or design a $100/month ultra-lean MVP architecture

Or calculate when you should move from serverless to containers**

Just tell me which direction you want.

## User

ok since you told me that For only 5K users, that’s overkill for EC2, can you adjust the specs of 3 EC2 instances, cloudfront + S3 etc that match for 5k users. I prefer 3 instances for ALB so just lessen the specs

## Assistant

Sure — if you insist on 3 EC2 instances behind an ALB for ~5,000 users, here’s a right-sized setup that’s still “real” (HA-ish, can do rolling deploys), but not overkill.

I’ll assume Linux, us-east-1, steady low traffic, and that most media (images) is served via CloudFront + S3 (so your EC2s mostly serve APIs + dynamic pages).

Recommended “3-instance” spec for ~5K users
EC2 (App/API)

Option I’d deploy first (balanced):

3 × t4g.medium (Graviton, 2 vCPU / 4 GiB RAM)
This is a common sweet spot for small production and gives you headroom without wasting too much.

Why not 6–8GB? For 5K users, your bottleneck is usually media bandwidth + database, not app CPU/RAM—especially if CloudFront caches images and static assets.

Pricing reference for t4g.medium (us-east-1) is ~$0.0336/hr (~$24.53/mo). 
Holori Cloud Calculator
+1

Storage per instance (EBS gp3)

40 GB gp3 each (instead of 80 GB)

Keep the OS + logs small; ship logs to CloudWatch, keep the instance stateless.

gp3 storage is commonly modeled around $0.08/GB-month. 
Elite Cloud |

Snapshots

1 snapshot/day, retention 7–14 days (not 30+) for early stage

Snapshot storage is billed per GB-month, and EBS standard snapshot storage is $0.05/GB-month. 
Amazon Web Services, Inc.
+2
AWS Documentation
+2

Traffic + Media layer (CloudFront + S3)
CloudFront

Two ways to price this:

A) Pay-as-you-go (usually cheaper at 5K users)
If you expect something like ~500 GB/month of media delivery, CloudFront cost is mainly egress. A widely cited first-tier rate for US/EU is ~$0.085/GB (first 10TB). 
BlazingCDN Blog

B) Flat-rate plan (predictable + bundled security)
CloudFront now has flat-rate plans:

Pro $15/mo (too small for most apps)

Business $200/mo (includes WAF/DDoS/DNS/logging + usage allowance) 
Amazon Web Services, Inc.

For a typical 5K-user app, pay-as-you-go is often cheaper than $200/mo unless you really want the “bundle + no overage” model.

S3

S3 charges are mainly storage + requests. 
Amazon Web Services, Inc.

If you store ~300 GB of images, storage-only is roughly:

300 GB × ~$0.023 ≈ $6.90/mo (storage-only baseline). 
Amazon Web Services, Inc.
+1

ALB

You pay:

per hour the ALB runs

plus LCU usage (capacity units) 
Amazon Web Services, Inc.
+1

For low traffic, ALB base cost dominates. (Exact $/hour varies by region; AWS documents the model on the pricing page.) 
Amazon Web Services, Inc.
+1

Also note AWS now mentions Public IPv4 address charges for load balancers. 
Amazon Web Services, Inc.

Estimated monthly cost (5K users, 3 EC2 + ALB + CloudFront + S3)
Assumptions for the estimate

CloudFront egress: 500 GB/month

S3 stored: 300 GB

EBS: 40 GB each instance (120 GB total)

Snapshot stored delta: modest (small app) with 7–14 day retention

1) EC2 compute

3 × t4g.medium ≈ 3 × $24.53 = $73.59/mo 
Holori Cloud Calculator
+1

2) EBS gp3 storage

120 GB × $0.08 ≈ $9.60/mo 
Elite Cloud |

3) EBS snapshots

Early-stage typical: ~$3–$15/mo depending on change rate + retention
($0.05/GB-month snapshot storage) 
Amazon Web Services, Inc.
+2
AWS Documentation
+2

4) ALB

Expect ~$16–$30/mo for “small traffic” (base hourly + small LCU), plus IPv4 charges depending on config. Pricing model is documented by AWS. 
Amazon Web Services, Inc.
+1

5) CloudFront (pay-as-you-go example)

500 GB × $0.085 ≈ $42.50/mo 
BlazingCDN Blog

6) S3 storage

~300 GB × $0.023 ≈ $6.90/mo 
Amazon Web Services, Inc.
+1

✅ Total (ballpark)

~ $73.6 (EC2) + $9.6 (EBS) + $3–15 (snapshots) + $16–30 (ALB) + $42.5 (CDN) + $6.9 (S3)
➡️ ≈ $152 – $178 per month (plus small request costs + IPv4 charges)

That’s a much more reasonable “3-instance” baseline for 5K users.

“Even leaner” 3-instance variant (if your app is very light)

If you want to squeeze cost further:

3 × t4g.small (2 vCPU / 2 GiB) + 30GB gp3 each
This can work if your API is simple and you keep memory usage low, but you’ll feel it sooner (OOM risk).

Basic security add-ons I’d include (cheap but important)

ACM TLS cert on ALB (free)

Security Groups (ALB only open 443; instances only from ALB)

IAM least privilege roles

S3 block public access + bucket policies (CloudFront OAC)

CloudTrail enabled

CloudWatch alarms (CPU, memory via agent, 5xx on ALB)

If you tell me your AWS region (Singapore is typically pricier than us-east-1) and whether your users mostly load images only or videos too, I can re-run the same sizing with a tighter bandwidth assumption (that’s the #1 swing factor).

