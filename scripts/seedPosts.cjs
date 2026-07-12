const { Client, Account, Databases, Storage, ID, Permission, Role } = require('node-appwrite');
const { InputFile } = require('node-appwrite/file');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const detailedStaticBlogs = {
  'agentic-research-intelligence': {
    title: 'Building an 8-Agent RAG Intelligence Factory',
    date: 'June 20, 2026',
    category: 'AI & Agentic Engineering',
    featuredImage: 'blog_platform.png',
    content: `
      <p>As enterprise data volumes grow exponentially, manual synthesis of analyst reports, industry feeds, and internal documentation becomes a major bottleneck. During the internal TCS <strong>AI Friday Season 2 Hackathon</strong> in June 2026, I set out to solve this by building an autonomous multi-agent pipeline designed to digest unstructured research documents and extract confidence-scored insights.</p>
      
      <h3>The Core Challenge</h3>
      <p>Traditional RAG (Retrieval-Augmented Generation) systems often struggle with synthesis. They are excellent at answering direct questions ("What was the Q3 revenue?"), but fail when asked to compile a comprehensive briefing or detect subtle market trends across thousands of pages. Furthermore, enterprise settings require strict PII protection and audit trails for every extracted insight.</p>
      
      <h3>The 6-Layer Multi-Agent Architecture</h3>
      <p>To address this, I designed a decentralized pipeline composed of 8 autonomous agents built on <strong>LangGraph</strong>. The system is split into six functional layers:</p>
      <ul>
        <li><strong>Ingestion & Sanitization Layer:</strong> Ingests PDFs, HTML, and text. The Ingestion Agent sanitizes inputs, stripping out sensitive PII (names, SSNs, accounts) before passing datasets forward.</li>
        <li><strong>Retrieval & Vector Layer:</strong> pair vector retrieval (using Google embeddings and FAISS) with GraphRAG to map entity relationships across documents.</li>
        <li><strong>Processing Agent Layer:</strong> Multiple parallel agents process chunked data—summarizing, extracting key assertions, and cross-referencing facts.</li>
        <li><strong>Orchestration Layer:</strong> A supervisor agent routes sub-tasks, ensuring conflicts between agent assertions are flagged.</li>
        <li><strong>API Layer:</strong> A FastAPI backend exposes endpoints for query inputs and streaming response payloads.</li>
        <li><strong>UI Layer:</strong> A modern React interface utilizing glassmorphism and real-time streaming displays.</li>
      </ul>

      <h3>LangGraph State Machines & GraphRAG</h3>
      <p>Using LangGraph allowed us to define cyclical agent workflows (e.g., if the Analyst Agent finds an assertion with low confidence, it cycles back to the Query Refinement Agent to pull additional chunks). Combining vector RAG with GraphRAG enabled the system to understand structural metadata—like how a particular technology stack affects project delivery timelines.</p>

      <blockquote>
        "The architecture achieved a 50% reduction in analyst research compilation times during testing, proving that orchestrating smaller, specialized agents yields higher accuracy than using a single monolithic prompt."
      </blockquote>

      <h3>Key Takeaways</h3>
      <p>Building local agent networks taught me that orchestrating state transitions is key to reliable LLM outputs. Rather than relying on LLMs to self-correct in a single context window, hardcoding state loops ensures structured error recovery and highly deterministic processing paths.</p>
    `
  },
  'local-llm-comparison': {
    title: 'Local LLM Benchmarks: MacBook M2 Air vs. RTX i9 Laptop',
    date: 'May 15, 2026',
    category: 'Hardware & AI Models',
    featuredImage: 'psbuilder.png',
    content: `
      <p>As an engineer building agentic systems, running models locally is essential for privacy, cost control, and rapid prototyping. I regularly run experiments comparing two very different development machines: a highly portable <strong>MacBook M2 Air (16GB RAM)</strong> and a heavy-duty <strong>Intel Core i9-14900HX laptop (32GB RAM, RTX GPU)</strong>. Here is what I discovered when running local models using Ollama, OpenClaw, and DeepSeek.</p>

      <h3>Test Parameters & Quantization</h3>
      <p>For these tests, I targeted two main models: <strong>DeepSeek-R1 (8B and 14B quantizations)</strong> and <strong>Qwen2.5-Coder (30B)</strong>. I utilized GGUF format quantizations (Q4_K_M for balanced speed/intelligence, and Q8_0 for maximum precision).</p>

      <h3>1. Apple Silicon: MacBook M2 Air (16GB RAM)</h3>
      <p>The M2 Air utilizes Unified Memory Architecture (UMA) which allows the CPU and GPU to share the same memory pool. This is massive for loading larger model weights.</p>
      <ul>
        <li><strong>DeepSeek-R1 (8B Q4):</strong> ~18-20 tokens per second. Highly responsive, runs silently with minimal thermal throttling.</li>
        <li><strong>DeepSeek-R1 (14B Q4):</strong> ~8-10 tokens per second. Usable for background agent tasks, but notice memory pressure warnings.</li>
        <li><strong>Qwen2.5-Coder (30B Q4):</strong> ~2-3 tokens per second. Heavily swaps memory. The Unified Memory is bottlenecked by the M2's 100 GB/s bandwidth.</li>
      </ul>

      <h3>2. NVIDIA Powerhouse: Intel i9 + RTX GPU (32GB RAM)</h3>
      <p>With dedicated VRAM and CUDA acceleration, this machine handles raw compute tasks with ease.</p>
      <ul>
        <li><strong>DeepSeek-R1 (8B Q4):</strong> ~65+ tokens per second. Extremely fast, near-instantaneous responses.</li>
        <li><strong>DeepSeek-R1 (14B Q8):</strong> ~35 tokens per second. Flawless execution with dedicated CUDA cores.</li>
        <li><strong>Qwen2.5-Coder (30B Q4):</strong> ~15-18 tokens per second. Excellent development speed, fully suitable for complex multi-step coding agents.</li>
      </ul>

      <h3>Which Dev Setup Wins?</h3>
      <p>For general coding assistance, prompt prototyping, and simple agent workflows, the silent, battery-efficient M2 Air is incredible. However, when deploying multi-agent pipelines (like the Locus Founder Hackathon flows using OpenClaw) where multiple models or parallel requests run concurrently, the dedicated CUDA cores and raw bandwidth of the RTX setup are irreplaceable.</p>
    `
  },
  'oracle-ebs-integration': {
    title: 'Modernizing Legacy: Zero-Loss Oracle Web ADI Pipelines',
    date: 'March 10, 2026',
    category: 'Enterprise Engineering',
    featuredImage: 'asd_detection.png',
    content: `
      <p>Modern full-stack web applications often exist in clean, greenfield environments. However, enterprise systems operate on decades-old infrastructure. At Tata Consultancy Services (TCS) in Bengaluru, I had the opportunity to build a custom integration pipeline resolving validation bottlenecks in <strong>Oracle E-Business Suite (EBS) R12</strong>.</p>

      <h3>The Problem: Legacy Web ADI Validation Bugs</h3>
      <p>The standard Oracle Web ADI (Desktop Integrator) layout allows users to upload financial receipts directly from Excel to Oracle. However, the system is prone to transaction dropouts, vague validation errors, and lacks robust real-time bank reconciliation logic. Finance teams were manually re-keying 40% of records due to silent validation drops.</p>

      <h3>The Solution: Custom Excel-to-Web Staging Pipelines</h3>
      <p>Instead of relying on the black-box Web ADI loader, I built a custom validation and staging solution using PL/SQL packages, transaction staging tables, and automated reconciliation rules:</p>
      <ol>
        <li><strong>Isolated Staging Layer:</strong> Receipts are uploaded directly to custom Oracle staging tables rather than production tables.</li>
        <li><strong>Asynchronous SQL Validation:</strong> Trigger-based PL/SQL packages automatically cross-reference receipt numbers against active bank statement registries.</li>
        <li><strong>Visual Excel Feedback:</strong> Return detailed error reports and transaction codes back to the Excel user interface using custom XML templates.</li>
      </ol>

      <blockquote>
        "By taking a staging-first approach, we guaranteed transaction isolation. If a batch of 500 receipts contains a single invalid entry, the remaining 400+ are safely committed while the faulty record is returned to the analyst with highlighted cells."
      </blockquote>

      <h3>Impact and Results</h3>
      <p>The integration successfully modernised a mission-critical financial routine:</p>
      <ul>
        <li>Manual data entry was cut by <strong>70%</strong>.</li>
        <li>Average turnaround time dropped from hours to minutes (<strong>50% reduction</strong>).</li>
        <li>Zero transaction loss occurred, ensuring absolute financial compliance.</li>
      </ul>
      <p>This project solidified my belief in the documentation-first engineering model. Working with legacy enterprise databases demands a deep architectural understanding of dependencies before writing a single line of SQL.</p>
    `
  }
};

const run = async () => {
  const client = new Client()
    .setEndpoint(process.env.VITE_APPWRITE_URL)
    .setProject(process.env.VITE_APPWRITE_PROJECT_ID);

  const account = new Account(client);
  const databases = new Databases(client);
  const storage = new Storage(client);

  const bucketId = process.env.VITE_APPWRITE_BUCKET_ID;
  const databaseId = process.env.VITE_APPWRITE_DATABASE_ID;
  const collectionId = process.env.VITE_APPWRITE_COLLECTION_ID;

  let session;
  try {
    console.log("Logging in as admin@sociohub.com...");
    session = await account.createEmailPasswordSession('admin@sociohub.com', 'password');
    client.setSession(session.secret);
    console.log("Logged in and session set!");
  } catch (err) {
    console.error("Login failed:", err.message);
    process.exit(1);
  }

  const userId = session.userId;
  console.log(`User ID: ${userId}`);

  for (const [slug, data] of Object.entries(detailedStaticBlogs)) {
    console.log(`\n--- Processing Post: ${data.title} ---`);

    const imagePath = path.resolve(__dirname, '..', 'public', data.featuredImage);
    let fileId;

    if (fs.existsSync(imagePath)) {
      console.log(`Uploading image ${data.featuredImage}...`);
      try {
        const fileResponse = await storage.createFile(
          bucketId,
          ID.unique(),
          InputFile.fromPath(imagePath, data.featuredImage),
          [Permission.read(Role.any())] // Public read
        );
        fileId = fileResponse.$id;
        console.log(`Image uploaded successfully. File ID: ${fileId}`);
      } catch (err) {
        console.error("Failed to upload image:", err.message);
        continue;
      }
    } else {
      console.log(`Image not found at ${imagePath}, skipping post.`);
      continue;
    }

    try {
      console.log(`Creating database document for post ${slug}...`);
      
      const permissions = [
          Permission.read(Role.any()), 
          Permission.update(Role.any()), 
          Permission.delete(Role.any())
      ];

      await databases.createDocument(
        databaseId,
        collectionId,
        slug, // Using the slug as Document ID
        {
          title: data.title,
          content: data.content,
          featuredImage: fileId,
          status: 'active',
          userId: userId,
        },
        permissions
      );
      console.log(`Post created successfully!`);
    } catch (err) {
      console.error("Failed to create post document:", err.message);
    }
  }

  console.log("\n✅ Seeding complete!");
};

run();
