"""
Management command to seed 10 curated blog posts for deepakkushwaha.tech.

Usage:
    python manage.py seed_blog
    python manage.py seed_blog --clear   # wipe all existing posts first
"""

from django.core.management.base import BaseCommand
from django.utils.timezone import datetime, make_aware

from blog.models import Category, Post, Tag


CATEGORIES = [
    {"name": "AI Engineering", "slug": "ai-engineering", "description": "RAG pipelines, LLMs, multi-agent systems, and production AI architecture."},
    {"name": "Infrastructure & DevOps", "slug": "infrastructure-devops", "description": "Kubernetes, MLOps, and cloud infrastructure for high-scale systems."},
    {"name": "Leadership & Culture", "slug": "leadership-culture", "description": "Engineering leadership, distributed teams, and startup culture."},
    {"name": "Career & Interviews", "slug": "career-interviews", "description": "System design interviews, career growth, and hiring."},
]

TAGS = [
    "RAG", "LLM", "Production", "Architecture", "Product",
    "Leadership", "Culture", "Startups", "LangChain", "LlamaIndex",
    "Kubernetes", "MLOps", "Infrastructure", "Interviews", "System Design",
    "Career", "Multi-Agent", "LangGraph", "Vector DB", "Django",
    "FastAPI", "Observability",
]

POSTS = [
    {
        "title": "LLM Observability: Building Eval Pipelines That Actually Catch Problems",
        "slug": "llm-observability-eval-pipelines",
        "excerpt": "Logging prompts and responses is not observability. Here is how to build eval pipelines that surface hallucinations, semantic drift, and cost spikes before your users do.",
        "category_slug": "ai-engineering",
        "tags": ["LLM", "Observability", "Production"],
        "published_at": make_aware(datetime(2026, 1, 15, 10, 0)),
        "meta_title": "LLM Observability: Eval Pipelines for Production AI | Deepak Kushwaha",
        "meta_description": "Learn how to build async eval pipelines that catch LLM hallucinations, semantic drift, and cost spikes in production. Covers RAGAS, LangSmith, and custom scorers.",
        "body": """<h2>The Logging Trap</h2>
<p>When you first deploy an LLM-powered feature, logging the prompt and response feels sufficient. Six months later, users are quietly churning and you have no idea why. Logging is not observability. Observability is the ability to ask arbitrary questions about system behaviour from the outside — for LLMs, that means evaluating <em>correctness</em>, not just latency.</p>
<h2>The Four Signals That Matter</h2>
<ul>
<li><strong>Groundedness:</strong> Is the response factually anchored to retrieved context? An NLI classifier or LLM-as-judge evaluator running asynchronously on sampled traffic catches hallucinations before they compound.</li>
<li><strong>Retrieval relevance:</strong> Did the vector search surface the right chunks? Track recall@k against a golden evaluation set you update every sprint.</li>
<li><strong>Semantic drift:</strong> Are responses shifting in tone, length, or style over weeks? Embedding-based distance from a baseline corpus surfaces prompt-injection attempts and silent model version updates.</li>
<li><strong>Cost per query:</strong> Token budgets spiral without guardrails. Track input and output tokens per session, segment by feature, and alert on anomalies.</li>
</ul>
<h2>Building the Async Eval Pipeline</h2>
<p>The most reliable eval architecture runs in three stages. First, online sampling — capture 5% of live traces asynchronously via a background queue, never blocking the critical path. Second, async evaluation — route each trace through a battery of scorers: groundedness (RAGAS), relevance (cosine similarity), toxicity (Perspective API), and at least one custom task-specific rubric. Third, a feedback loop — low-scoring traces land in a human review queue that doubles as fine-tuning data.</p>
<p>Evaluation should be fully decoupled from serving. Eval workers can use cheaper models (Claude Haiku, GPT-4o-mini) without impacting user-facing latency. We ran 50,000 eval traces per day at under $8 using this approach.</p>
<h2>Tooling That Holds Up in Production</h2>
<p>LangSmith is the most mature option if you are already on LangChain. For framework-agnostic setups, OpenTelemetry with a custom OTLP exporter into ClickHouse gives full query flexibility at low cost and no vendor lock-in. Avoid proprietary observability SaaS early — they extract maximum value exactly when you are most locked in.</p>
<p>For LLM-as-judge scoring, RAGAS and Prometheus (BerriAI) are good foundations, but expect to write custom scorers for your domain. Generic evals miss task-specific failure modes every time.</p>
<h2>The Mindset Shift</h2>
<p>Teams that catch LLM regressions before users do treat evaluation as a first-class engineering concern — not an afterthought bolted on after a bad week of support tickets. Budget engineering time for your eval harness the same way you budget for tests. In production AI systems, they are the same thing.</p>""",
    },
    {
        "title": "Django vs FastAPI for AI Backends: A Decision Framework",
        "slug": "django-fastapi-ai-backends",
        "excerpt": "After shipping AI products with both, here is the honest breakdown — when Django's batteries-included approach wins, when FastAPI's async-first design is the right call, and how to hybridize.",
        "category_slug": "ai-engineering",
        "tags": ["Django", "FastAPI", "Architecture"],
        "published_at": make_aware(datetime(2025, 10, 22, 10, 0)),
        "meta_title": "Django vs FastAPI for AI Backends: Decision Framework | Deepak Kushwaha",
        "meta_description": "A practical framework for choosing between Django and FastAPI for AI-powered backends, including the hybrid architecture that combines both for maximum leverage.",
        "body": """<h2>The Question I Get Asked Every Week</h2>
<p>Teams building AI-powered APIs inevitably hit this fork: Django or FastAPI? Both are excellent Python frameworks. Both power production systems at scale. The answer depends entirely on your context — and getting it wrong adds months of friction.</p>
<h2>When Django Wins</h2>
<p>Django's batteries-included philosophy is a genuine superpower when you need to move fast across a full application surface. The ORM, admin interface, auth system, migrations, and celery integration all work together out of the box. If your AI backend also manages users, subscriptions, content, and webhooks — Django pays dividends immediately.</p>
<p>Django's synchronous-first design is not the handicap it used to be. With async views (Django 4.1+) and async ORM support, you can handle concurrent LLM calls without reaching for a different framework. I use Django when: the project has a significant data model, needs an admin portal, involves payments or auth flows, or will be maintained by a team that already knows it.</p>
<h2>When FastAPI Wins</h2>
<p>FastAPI's async-first, Python type hints-driven approach shines for pure API services that need maximum throughput. If you are building a dedicated inference gateway, streaming LLM proxy, or embedding microservice that does one thing very fast — FastAPI's lower overhead and native async support win.</p>
<p>I use FastAPI when: the service is narrowly scoped, performance is the primary constraint, or the service is a pure microservice without a complex data model.</p>
<h2>The Hybrid Architecture</h2>
<p>The most powerful pattern I have shipped is a Django monolith for the core product — handling users, billing, content, and admin — plus one or two FastAPI microservices for the highest-throughput AI paths: the embedding service and the streaming inference endpoint. They share a PostgreSQL database and communicate via message queue for async tasks.</p>
<p>This hybrid gives you Django's operational simplicity plus FastAPI's performance where it actually matters. The boundary between them is a Celery task queue: Django enqueues work, FastAPI workers execute it.</p>
<h2>The Deciding Questions</h2>
<p>Ask yourself: Does this service have a data model? Will non-engineers use an admin UI? Will it grow? If yes to any — start with Django. Is this a pure API gateway or inference proxy that does one thing at high volume? Then FastAPI. Either way, the worst decision is spending two weeks choosing instead of building.</p>""",
    },
    {
        "title": "Vector Database Showdown: Pinecone vs Weaviate vs Chroma in 2025",
        "slug": "vector-database-comparison-2025",
        "excerpt": "Benchmarked all three in production RAG workloads. The winner depends entirely on your query patterns, budget, and ops maturity — not the benchmark charts.",
        "category_slug": "ai-engineering",
        "tags": ["Vector DB", "RAG", "Production"],
        "published_at": make_aware(datetime(2025, 8, 8, 10, 0)),
        "meta_title": "Pinecone vs Weaviate vs Chroma in 2025: Production Comparison | Deepak Kushwaha",
        "meta_description": "A production-tested comparison of Pinecone, Weaviate, and Chroma for RAG workloads. Covers cost, query patterns, ops overhead, and the decision matrix that actually matters.",
        "body": """<h2>Spoiler: There Is No Best Vector Database</h2>
<p>Every vector database benchmark article concludes that their preferred tool wins. The reality is that Pinecone, Weaviate, and Chroma serve different constraints — and the right choice depends on your query patterns, operational maturity, and budget, not ANN recall scores at 1 million synthetic vectors.</p>
<p>I have run all three in production RAG pipelines over the past eighteen months. Here is what actually happened.</p>
<h2>Pinecone: The Ops-Free Choice</h2>
<p>Pinecone is the fastest path to production. Zero infrastructure, automatic scaling, consistent sub-10ms P99 at 10 million vectors. The fully managed model means your team never oncalls for index compaction or replica failures.</p>
<p>The trade-offs: cost scales linearly with vector count and query volume — at 50 million vectors with moderate QPS, you are paying $1,500–$2,000/month. Use Pinecone when: you need production-grade reliability immediately and your team has no infrastructure bandwidth.</p>
<h2>Weaviate: The Power User's Choice</h2>
<p>Weaviate's schema-based design, GraphQL API, and first-class hybrid search (BM25 + vector) make it the most expressive of the three. For RAG workloads where metadata filtering is complex — filtering by document date, source type, access level, and semantic similarity simultaneously — Weaviate handles it natively with excellent performance.</p>
<p>Use Weaviate when: your retrieval logic is complex, you need hybrid search, or you want self-hosting flexibility.</p>
<h2>Chroma: The Prototype Champion</h2>
<p>Chroma is the fastest framework for local development and small-scale production. Native LangChain and LlamaIndex integration, simple Python API, runs embedded in your process or as a server. For corpora under 1 million vectors with modest QPS, it performs well and costs nothing.</p>
<p>Use Chroma when: prototyping, internal tools, or production workloads with modest scale requirements.</p>
<h2>The Real Decision Matrix</h2>
<p>Production-ready in days with no ops: Pinecone. Complex retrieval logic with infrastructure capacity: Weaviate. Prototyping or small-scale: Chroma. The mistake I see most often is teams evaluating benchmarks instead of running their actual query mix on their actual data. That test takes two hours and tells you everything the synthetic benchmarks hide.</p>""",
    },
    {
        "title": "Multi-Agent Systems in Production: LangGraph Patterns That Actually Work",
        "slug": "multi-agent-systems-langgraph",
        "excerpt": "State machines for LLMs are powerful and surprisingly tricky to operationalize. Graph patterns, error-recovery designs, and human-in-the-loop integrations that held up under real load.",
        "category_slug": "ai-engineering",
        "tags": ["Multi-Agent", "LangGraph", "LLM"],
        "published_at": make_aware(datetime(2025, 5, 19, 10, 0)),
        "meta_title": "Multi-Agent Systems in Production: LangGraph Patterns | Deepak Kushwaha",
        "meta_description": "Production-tested LangGraph patterns for multi-agent systems: the Supervisor pattern, conditional edges with fallbacks, human-in-the-loop interruptions, and durable state with PostgreSQL.",
        "body": """<h2>Why Multi-Agent Architectures Are Hard in Practice</h2>
<p>The demo version of a multi-agent system always looks clean: Agent A calls Agent B, B calls Agent C, tasks complete in sequence. Production is different. Agents timeout, produce malformed outputs, contradict each other, and loop indefinitely on edge cases. Building a multi-agent system that is robust under load requires treating it as a distributed system — because that is what it is.</p>
<h2>LangGraph's Core Abstraction</h2>
<p>LangGraph models agent workflows as stateful graphs where nodes are LLM calls or tools, and edges define conditional routing. This mental model forces you to make control flow explicit. Instead of a chain where failures propagate silently, you define exactly what happens when a node returns an unexpected output. The state object is the backbone — every node reads from and writes to a typed state dict. When something goes wrong, you replay the state at each step.</p>
<h2>Patterns That Hold Up Under Load</h2>
<p><strong>The Supervisor pattern:</strong> One orchestrator LLM routes tasks to specialist agents. The supervisor never does domain work — it only routes, validates, and retries. This separation of concerns makes the system dramatically easier to test: mock the specialists, unit-test the supervisor's routing logic.</p>
<p><strong>Conditional edges with fallbacks:</strong> Every agent node should have an explicit error edge. When an LLM call fails or returns malformed output, route to a fallback node — not to the caller's error handler. Fallback nodes can retry with a simpler prompt, call a backup model, or return a structured error the supervisor can handle gracefully.</p>
<p><strong>Human-in-the-loop at interruption points:</strong> LangGraph's <code>interrupt()</code> mechanism lets you pause the graph at defined points and wait for human input. For high-stakes decisions — approvals, irreversible actions — model the interruption explicitly in the graph rather than as a side effect.</p>
<h2>Operationalizing the Graph</h2>
<p>LangGraph's persistence layer (using PostgreSQL as the checkpointer) is essential for production. It gives you durable graph state across process restarts, natural resumability for long-running workflows, and a complete audit trail per execution thread. Without persistence, a 30-step workflow that fails at step 28 means starting over.</p>
<h2>What to Watch Out For</h2>
<p>The most common failure mode is an infinite routing loop — the supervisor keeps re-routing because no agent satisfies the success condition. Add a maximum step counter to every graph with a graceful degradation path. Also watch for context window blowout: passing the full conversation history between agents compounds cost and latency. Pass structured summaries, not raw history.</p>""",
    },
    {
        "title": "Building RAG Pipelines at Scale: Lessons from Production",
        "slug": "building-rag-pipelines-at-scale",
        "excerpt": "What nobody tells you about retrieval-augmented generation when you move from prototype to production: chunking strategies, re-ranking, eval loops, and the surprising cost of naive embeddings.",
        "category_slug": "ai-engineering",
        "tags": ["RAG", "LLM", "Production"],
        "published_at": make_aware(datetime(2025, 3, 28, 10, 0)),
        "meta_title": "Building RAG Pipelines at Scale: Production Lessons | Deepak Kushwaha",
        "meta_description": "Hard-won lessons from shipping RAG at scale: chunking strategies, two-stage retrieval with re-ranking, embedding cost optimisation, and building eval loops that let you iterate with confidence.",
        "body": """<h2>The Prototype Lie</h2>
<p>Every RAG prototype works. You chunk a PDF, embed it, push it into a vector store, run a semantic search, and get impressive results in an afternoon. Then you move to production — 10 million documents, 500 concurrent users, a P99 latency SLA — and everything breaks differently.</p>
<h2>Chunking Strategy Is Not a Detail</h2>
<p>The single biggest lever on retrieval quality is how you chunk. Naive fixed-size chunking works in demos. In production, it splits sentences mid-thought, breaks tabular data across chunks, and buries the most relevant snippet in a chunk of noise.</p>
<p>The strategies that actually move recall metrics: semantic chunking (split on topic shift, not token count), recursive chunking with per-document size tuning, and parent-child chunking (embed small child chunks, retrieve parent context). Measure recall@5 on a golden evaluation set before shipping any chunking change.</p>
<h2>Re-ranking Is Not Optional at Scale</h2>
<p>Vector similarity is a fast approximation — at 10 million documents, the top 5 results are often not the most relevant 5. A two-stage retrieval pipeline changes this: broad retrieval (top 50 via ANN) followed by a cross-encoder re-ranker (top 5 by semantic relevance). Cross-encoders are slower (50–150ms per query) but dramatically more accurate. Cohere Rerank and BGE-reranker-large are both solid choices; the latter is self-hostable.</p>
<h2>The Hidden Cost of Naive Embeddings</h2>
<p>OpenAI's text-embedding-3-large costs $0.00013 per 1K tokens — negligible for a prototype, devastating at scale. For 10 million 512-token chunks, initial embedding costs $665. We cut embedding costs by 80% by moving to a self-hosted bge-base-en-v1.5 model and batching re-indexing jobs during off-peak hours.</p>
<h2>Eval Loops Are the Product</h2>
<p>Build a golden evaluation set from day one: 200–500 question-answer pairs that represent real user queries. Measure recall@k, answer faithfulness (RAGAS), and answer relevance on every deployment. Without it, you are guessing whether changes helped or hurt. With it, you can iterate weekly and quantify improvement.</p>
<h2>Async Is a Requirement</h2>
<p>Synchronous RAG takes 300–800ms under ideal conditions. Under load, it stacks. Fire the vector search and metadata queries in parallel, await combined results, then feed the re-ranker. This alone cuts median latency by 35–40% in most production pipelines.</p>""",
    },
    {
        "title": "AI-Native Product Architecture: Beyond the ChatGPT Wrapper",
        "slug": "ai-native-product-architecture",
        "excerpt": "A framework for building products where AI is the core, not a feature bolted on. LLM routing, fallback chains, observability, and cost control at scale.",
        "category_slug": "ai-engineering",
        "tags": ["Architecture", "LLM", "Product"],
        "published_at": make_aware(datetime(2025, 2, 14, 10, 0)),
        "meta_title": "AI-Native Product Architecture: Beyond ChatGPT Wrappers | Deepak Kushwaha",
        "meta_description": "A practical framework for AI-native products: LLM routing, fallback chains, semantic caching, cost control, and the three properties that make AI products defensible.",
        "body": """<h2>What "AI-Native" Actually Means</h2>
<p>Most products today are AI-augmented: a traditional application with an LLM bolted on to summarize, classify, or generate. AI-native means AI is the core execution engine — it routes decisions, generates user-facing content, and drives product behaviour end-to-end. The architecture required is fundamentally different.</p>
<h2>LLM Routing: The Load Balancer for Intelligence</h2>
<p>Not all tasks require GPT-4 or Claude Opus. A routing layer directs each request to the cheapest model that can handle it acceptably. Simple classification and short-form generation go to a fast, cheap model (Haiku, GPT-4o-mini). Complex reasoning and long-form generation go to a frontier model. We reduced LLM spend by 55% on one product by implementing this pattern. The key metric is quality-at-cost, not quality alone.</p>
<h2>Fallback Chains</h2>
<p>Design explicit fallback chains: primary model → secondary provider → cached response → graceful degradation. Cache aggressively — a semantic cache (embed the query, check cosine similarity against a response cache) can serve 20–40% of traffic without a model call. LlamaIndex's SemanticCache and GPTCache are production-ready implementations.</p>
<h2>Cost Control as a Product Feature</h2>
<p>AI products have a unique cost structure: marginal cost per query is non-zero. Build cost control into the product layer: per-user token budgets, rate limiting by tier, and cost-per-feature dashboards let you price the product correctly and catch runaway usage before it becomes a finance problem.</p>
<h2>Avoiding the ChatGPT Wrapper Trap</h2>
<p>The ChatGPT wrapper is a product that is essentially a UI for a model — no proprietary data, no workflow integration, no switching cost. AI-native products are defensible through data flywheel (user interactions improve the model), workflow integration (AI embedded in the user's actual work), and proprietary retrieval (your corpus is something competitors cannot replicate). Build toward those properties from the first sprint.</p>""",
    },
    {
        "title": "Engineering Leadership in Remote-First Indian Startups",
        "slug": "engineering-leadership-remote-india",
        "excerpt": "Nine years of hard-won lessons on building high-performing distributed teams — hiring for ownership, async-first culture, and why velocity is a lagging indicator.",
        "category_slug": "leadership-culture",
        "tags": ["Leadership", "Culture", "Startups"],
        "published_at": make_aware(datetime(2025, 1, 5, 10, 0)),
        "meta_title": "Engineering Leadership in Remote-First Indian Startups | Deepak Kushwaha",
        "meta_description": "Nine years of lessons leading distributed engineering teams: hiring for ownership, async-first communication design, and the leading indicators that predict team health better than velocity.",
        "body": """<h2>What Nine Years in Distributed Teams Taught Me</h2>
<p>I have led engineering teams ranging from 4 to 35 people, always distributed, always in the pressure of a startup. The lessons that actually stuck are not from books on management — they are from the failures.</p>
<h2>Hire for Ownership, Not Skill Alone</h2>
<p>The most common hiring mistake I made early was optimizing for technical skill above everything else. A brilliant engineer who needs to be told what to do next is a net negative on a small team. The question I now weight most heavily is not "can you solve this problem?" but "what did you do when a problem you were not assigned to own was about to cause an incident?"</p>
<p>Ownership is not about working extra hours — it is about the absence of learned helplessness. Engineers who own outcomes find their own blockers, escalate early, and close the loop without reminders. No amount of technical skill compensates for its absence on a distributed team.</p>
<h2>Async-First Is Not Remote-First</h2>
<p>Remote-first means you allow people to work remotely. Async-first means you design the system of work so the default mode of communication does not require real-time presence. These are different things, and confusing them is why most remote teams are exhausted.</p>
<p>Async-first requires investment: well-written RFCs and decision documents, video walkthroughs for complex PRs, explicit decision logs. The payoff is that engineers in Bangalore, Amsterdam, and Buenos Aires can all do their best work in their own time zones — without 11pm video calls.</p>
<h2>Velocity Is a Lagging Indicator</h2>
<p>The leading indicators I watch: incident rate and MTTR (code quality), review queue depth (collaboration health), and product metric impact per engineering week (alignment). When all three are healthy, velocity follows. When velocity drops, I look at these three first — not at process or tooling.</p>
<h2>Why You Should Write More</h2>
<p>The highest-leverage activity I have found as an engineering leader is writing. Clear, well-reasoned documents multiply your thinking across the team. A well-written RFC prevents three architecture arguments and two mis-implemented features. The teams I have seen compound fastest have the highest ratio of clear written thought to meetings.</p>""",
    },
    {
        "title": "LangChain vs LlamaIndex in 2025: A Pragmatic Comparison",
        "slug": "langchain-vs-llamaindex-2025",
        "excerpt": "After building production systems with both, here is where each framework genuinely shines — and where they will slow you down.",
        "category_slug": "ai-engineering",
        "tags": ["LangChain", "LlamaIndex", "RAG"],
        "published_at": make_aware(datetime(2024, 12, 12, 10, 0)),
        "meta_title": "LangChain vs LlamaIndex in 2025: Pragmatic Comparison | Deepak Kushwaha",
        "meta_description": "A production-based comparison of LangChain and LlamaIndex in 2025: where each framework genuinely shines, where both slow you down, and a heuristic for choosing.",
        "body": """<h2>The Framework War That Is Not a War</h2>
<p>Every six months a new wave of posts declares LangChain dead or LlamaIndex the clear winner. I have built production systems with both, sometimes on the same project. The reality is that they solve overlapping but distinct problems — and the right choice is about fit, not fashion.</p>
<h2>What LangChain Is Actually Good At</h2>
<p>LangChain excels at building multi-step, multi-model pipelines where control flow matters. If your product involves routing decisions, tool use, agent workflows, or complex chains of prompts with conditional branching — LangChain's abstractions (chains, agents, runnables via LCEL) are genuinely expressive. LangSmith for observability is best-in-class and integrates seamlessly.</p>
<p>The overhead becomes real when you just need good retrieval. LangChain's document loaders and vector store integrations work — but the abstraction tax is high for simple RAG.</p>
<h2>What LlamaIndex Is Actually Good At</h2>
<p>LlamaIndex is purpose-built for retrieval. Its index types (VectorStoreIndex, SummaryIndex, KnowledgeGraphIndex), query engines, and data connectors are the most composable retrieval primitives I have worked with. For knowledge-intensive products — document Q&amp;A, enterprise search, long-context retrieval — LlamaIndex's retrieval abstractions map cleanly to the domain problems.</p>
<p>LlamaIndex's node pipeline, metadata filtering, and recursive retrieval (HyDE, sub-question decomposition) are significantly more mature than LangChain's retrieval stack. If retrieval quality is the primary product variable, LlamaIndex gives you more levers.</p>
<h2>Where Both Will Slow You Down</h2>
<p>Both frameworks abstract over LLM providers — and every abstraction leaks. When you need fine-grained control over prompts, streaming behaviour, or model parameters, fighting the abstraction layer costs more than writing the SDK call directly. Both also move fast and break their own APIs. Build on top of either requires pinning versions and budgeting for migration work.</p>
<h2>My Heuristic in 2025</h2>
<p>Use LangChain when: you need agent workflows, tool use, or complex multi-step chains. Use LlamaIndex when: retrieval quality is the primary concern. Use neither when: your use case is simple enough that raw SDK calls are cleaner. The worst outcome is picking a framework because it has more GitHub stars, then spending a week unwrapping its abstractions.</p>""",
    },
    {
        "title": "Kubernetes for ML Workloads: A Practical Playbook",
        "slug": "kubernetes-for-ml-workloads",
        "excerpt": "GPU node pools, spot instance strategies, model serving with vLLM, and the autoscaling configuration that cut our inference costs by 65%.",
        "category_slug": "infrastructure-devops",
        "tags": ["Kubernetes", "MLOps", "Infrastructure"],
        "published_at": make_aware(datetime(2024, 11, 3, 10, 0)),
        "meta_title": "Kubernetes for ML Workloads: A Practical Playbook | Deepak Kushwaha",
        "meta_description": "A production playbook for ML on Kubernetes: GPU node pools with taints, spot instance strategies, vLLM model serving, KEDA queue-depth autoscaling, and DCGM monitoring.",
        "body": """<h2>Why ML Workloads Break Standard Kubernetes Patterns</h2>
<p>Kubernetes is excellent at running stateless web services. ML workloads are neither stateless nor CPU-homogeneous — they have GPU affinity, burst memory requirements, long-running inference jobs, and wildly asymmetric scale patterns. Running them well requires departing from the patterns you learned running Rails apps.</p>
<h2>GPU Node Pools: Separate and Isolated</h2>
<p>GPU nodes are expensive (A100 spot instances run $2–4/hr on AWS) and should never be contaminated by CPU workloads. Use dedicated node pools with GPU taints and resource requests that require GPU limits. Without explicit GPU limits, pods that do not need GPUs will schedule onto GPU nodes and waste capacity.</p>
<p>Karpenter (EKS) or Node Auto-Provisioner (GKE) is essential for cost efficiency. Configure a fast scale-up trigger (80% utilisation, 60-second window) and a conservative scale-down (15 minutes idle to avoid GPU node thrash). GPU node startup takes 3–5 minutes — plan your buffer accordingly.</p>
<h2>vLLM for Model Serving</h2>
<p>vLLM's continuous batching and PagedAttention make it the highest-throughput open-source LLM serving framework available. On a single A100, vLLM serving Llama-3-70B achieves 3–5x the throughput of naive Hugging Face inference. Deployment pattern: one vLLM deployment per model, exposed via ClusterIP, load-balanced by NGINX that handles auth, rate limiting, and model routing.</p>
<h2>The Autoscaling Configuration That Cut Our Costs by 65%</h2>
<p>Standard Kubernetes HPA scales on CPU or memory — neither correlates well with LLM inference load. We scale on queue depth: Celery tasks pending per model endpoint, exposed as a custom metric via KEDA (Kubernetes Event-Driven Autoscaler). Scale up at 50 pending tasks, scale down at 5, with a 10-minute stabilisation window.</p>
<p>This single change reduced our GPU cluster bill by 65% compared to time-based scaling. Queue-depth scaling keeps nodes alive for actual load. For inference workloads with variable traffic, it is the right signal.</p>
<h2>Monitoring That Actually Helps</h2>
<p>Deploy NVIDIA DCGM Exporter for per-GPU utilisation, memory bandwidth, and temperature. Alert on sustained &gt;85% GPU memory (OOM risk) and &gt;95% VRAM (fragmentation risk). A GPU that looks healthy on CPU dashboards can be silently underperforming due to PCIe bandwidth saturation — you will only see it in DCGM data.</p>""",
    },
    {
        "title": "The System Design Interview: What Interviewers Actually Want",
        "slug": "mock-interview-system-design-guide",
        "excerpt": "After conducting 200+ mock interviews, I have noticed the same patterns. This is what separates strong candidates from exceptional ones.",
        "category_slug": "career-interviews",
        "tags": ["Interviews", "System Design", "Career"],
        "published_at": make_aware(datetime(2024, 10, 15, 10, 0)),
        "meta_title": "System Design Interview: What Interviewers Actually Want | Deepak Kushwaha",
        "meta_description": "After 200+ mock interviews, the patterns that separate strong from exceptional candidates: requirements clarity, explicit trade-offs, back-of-envelope estimation, and the first 10 minutes.",
        "body": """<h2>What Two Hundred Interviews Taught Me</h2>
<p>I have conducted over two hundred system design interviews as both a hiring manager and a mock interview coach. The patterns that separate strong from exceptional candidates are consistent, and almost none of them are about knowing the right frameworks.</p>
<h2>What Interviewers Actually Want to See</h2>
<p>The purpose of a system design interview is not to test whether you can design Twitter in 45 minutes. It is to observe how you think under uncertainty. Interviewers want to see: How do you clarify requirements before diving in? How do you make trade-off decisions and articulate them explicitly? How do you respond when they poke holes in your design?</p>
<p>The candidates who struggle most jump immediately to drawing boxes and arrows. They produce technically correct designs but reveal nothing about their thinking process. Interviewers are not grading the diagram — they are grading the conversation that produced it.</p>
<h2>The First Ten Minutes Are Everything</h2>
<p>Spend the first 8–10 minutes purely on requirements clarification. What are the scale targets? Read-heavy or write-heavy? Strong or eventual consistency? Geographic distribution requirements? Candidates who skip this phase produce designs that solve the wrong problem. When the interviewer introduces a constraint that invalidates their design, they have no foundation to pivot from.</p>
<h2>Trade-offs Are the Interview</h2>
<p>Every architectural decision is a trade-off. SQL vs NoSQL is not a quiz question — it is a trade-off between consistency guarantees, query flexibility, and scale. When you choose one, name the trade-off explicitly: "I am choosing PostgreSQL here because the join patterns favour relational data, and we can shard at the application layer if we hit write throughput limits."</p>
<p>Candidates who say "I would use Kafka" without explaining why are giving a vocabulary test. Candidates who say "I would use Kafka because the consumer group model lets us fan out to multiple pipelines independently, which matters because..." are designing.</p>
<h2>Back-of-Envelope Estimation</h2>
<p>Estimation is a forcing function for realism. If you estimate 10 million writes per day, that is ~115 writes/second — comfortably within a single Postgres instance. If you estimate 1 billion writes per day, that is ~11,500 writes/second — requiring a very different architecture. The numbers should drive your design decisions, not the other way around.</p>""",
    },
]


class Command(BaseCommand):
    help = "Seed 10 curated blog posts for deepakkushwaha.tech"

    def add_arguments(self, parser):
        parser.add_argument(
            "--clear",
            action="store_true",
            help="Delete all existing posts, tags, and categories before seeding",
        )

    def handle(self, *args, **options):
        if options["clear"]:
            Post.objects.all().delete()
            Tag.objects.all().delete()
            Category.objects.all().delete()
            self.stdout.write(self.style.WARNING("Cleared existing blog data."))

        # Upsert categories
        category_map = {}
        for cat in CATEGORIES:
            obj, created = Category.objects.get_or_create(
                slug=cat["slug"],
                defaults={"name": cat["name"], "description": cat["description"]},
            )
            category_map[cat["slug"]] = obj
            if created:
                self.stdout.write(f"  Created category: {obj.name}")

        # Upsert tags
        tag_map = {}
        for tag_name in TAGS:
            slug = tag_name.lower().replace(" ", "-").replace("&", "and")
            obj, created = Tag.objects.get_or_create(
                slug=slug,
                defaults={"name": tag_name},
            )
            tag_map[tag_name] = obj
            if created:
                self.stdout.write(f"  Created tag: {obj.name}")

        # Upsert posts
        created_count = 0
        updated_count = 0
        for data in POSTS:
            tag_names = data.pop("tags")
            cat_slug = data.pop("category_slug")

            post, created = Post.objects.update_or_create(
                slug=data["slug"],
                defaults={
                    **data,
                    "category": category_map[cat_slug],
                    "is_published": True,
                },
            )
            post.tags.set([tag_map[t] for t in tag_names if t in tag_map])
            # save() recalculates read_time
            post.save()

            if created:
                created_count += 1
            else:
                updated_count += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"\nDone. {created_count} post(s) created, {updated_count} post(s) updated."
            )
        )
