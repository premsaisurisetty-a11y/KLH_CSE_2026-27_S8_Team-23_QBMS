# Question Bank Management System (QBMS)

[![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://www.java.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Algorithms](https://img.shields.io/badge/DSA-String%20Matching%20%26%20DP-6366F1?style=for-the-badge)](https://github.com/premsaisurisetty-a11y/KLH_CSE_2026-27_S8_Team-23_QBMS)

An intelligent, dual-mode academic platform designed to streamline question bank curation, prevent question redundancy, and accelerate exam paper preparation using advanced **Data Structures and String Matching Algorithms**.

Developed as the **DSA-3 Capstone Project** by **Team 23 (Section 8)**, Department of Computer Science & Engineering, **KL University Hyderabad (KLH)** (Academic Year 2026–27).

---

## 📌 Table of Contents
- [Problem Statement & Objectives](#-problem-statement--objectives)
- [System Architecture](#-system-architecture)
- [Algorithmic Foundations](#-algorithmic-foundations)
  - [1. Knuth-Morris-Pratt (KMP) Algorithm](#1-knuth-morris-pratt-kmp-algorithm)
  - [2. Rabin-Karp Rolling Hash Algorithm](#2-rabin-karp-rolling-hash-algorithm)
  - [3. Aho-Corasick Multi-Pattern Automaton](#3-aho-corasick-multi-pattern-automaton)
  - [4. Boyer-Moore-Horspool Algorithm](#4-boyer-moore-horspool-algorithm)
  - [5. Levenshtein Distance & Similarity Matrix (DP)](#5-levenshtein-distance--similarity-matrix-dp)
  - [Algorithm Complexity & Benchmark Summary](#algorithm-complexity--benchmark-summary)
- [Key Features](#-key-features)
  - [Question Bank CRUD & Document Organization](#question-bank-crud--document-organization)
  - [Multi-Subject Repositories](#multi-subject-repositories)
  - [Live Multi-Algorithm Benchmarking](#live-multi-algorithm-benchmarking)
  - [Interactive Step-by-Step Algorithm Visualizers](#interactive-step-by-step-algorithm-visualizers)
  - [Pairwise Similarity & Word Diff Analysis](#pairwise-similarity--word-diff-analysis)
  - [Duplicate Matrix Detection](#duplicate-matrix-detection)
  - [Automated Question Paper Generator](#automated-question-paper-generator)
  - [Role-Based Access Control (Student vs Admin)](#role-based-access-control-student-vs-admin)
- [Repository Structure](#-repository-structure)
- [Installation & Quick Start](#-installation--quick-start)
  - [Prerequisites](#prerequisites)
  - [Running the Java CLI Application](#running-the-java-cli-application)
  - [Running the Interactive Web Application](#running-the-interactive-web-application)
- [Sample Login Credentials](#-sample-login-credentials)
- [CLI Menu Reference](#-cli-menu-reference)
- [Academic & Team Credits](#-academic--team-credits)

---

## 🎯 Problem Statement & Objectives

In academic institutions, faculty members frequently face challenges when maintaining question repositories:
1. **Unintentional Duplication:** Multiple faculty members or subsequent semesters introduce paraphrased or identical questions without realizing it.
2. **Slow, Inexact Search:** Traditional database keyword searches fail when searching for multiple keywords simultaneously or when queries contain typographical errors.
3. **Manual Paper Generation Bottlenecks:** Balancing Bloom's taxonomy, difficulty levels (Easy/Medium/Hard), and unit distributions manually is error-prone and time-consuming.

**QBMS solves this** by pairing classical text-processing and dynamic programming algorithms with a dual-layer architecture:
- A high-performance, modular **Java CLI Engine** for headless verification and command-line automation.
- A glassmorphic, responsive **Single-Page Web Application (SPA)** offering real-time algorithm visualizers, pairwise diff analyzers, duplicate matrices, and automated paper generation.

---

## 🏛 System Architecture

The project delivers a cohesive twin-engine implementation:

```
                            ┌───────────────────────────────────────────────┐
                            │      Question Bank Management System (QBMS)   │
                            └───────────────────────┬───────────────────────┘
                                                    │
                 ┌──────────────────────────────────┴──────────────────────────────────┐
                 ▼                                                                     ▼
   ┌───────────────────────────┐                                         ┌───────────────────────────┐
   │      Java CLI Engine      │                                         │   Interactive Web Portal  │
   │       (Main.java)         │                                         │   (HTML5 / CSS3 / JS SPA) │
   └─────────────┬─────────────┘                                         └─────────────┬─────────────┘
                 │                                                                     │
   ┌─────────────┴─────────────┐                                         ┌─────────────┴─────────────┐
   │ • Modular Algorithm Classes│                                         │ • algorithms.js Engine    │
   │   - KMP.java              │                                         │ • app.js State Management │
   │   - RabinKarp.java        │                                         │ • LocalStorage Sync       │
   │   - AhoCorasick.java      │                                         │ • Visualizer Renderers    │
   │   - Levenshtein.java      │                                         │ • Paper Generator Engine  │
   │ • Interactive CLI Loop    │                                         │ • Role-Based Auth Portal  │
   └───────────────────────────┘                                         └───────────────────────────┘
```

---

## 🧠 Algorithmic Foundations

### 1. Knuth-Morris-Pratt (KMP) Algorithm
- **Files:** [`KMP.java`](file:///d:/Documents/Sem%202-1/DSA-3/Project/KMP.java), [`algorithms.js`](file:///d:/Documents/Sem%202-1/DSA-3/Project/algorithms.js)
- **Role:** Exact single-pattern string matching.
- **Mechanism:** Precomputes the Longest Proper Prefix that is also a Suffix (**LPS array**). When a character mismatch occurs, the search pointer skips redundant character comparisons by shifting the pattern according to the LPS table instead of backtracking to index 0.
- **Time Complexity:** Preprocessing: $\mathcal{O}(M)$ | Search: $\mathcal{O}(N)$ | Total: $\mathcal{O}(N + M)$
- **Space Complexity:** $\mathcal{O}(M)$

### 2. Rabin-Karp Rolling Hash Algorithm
- **Files:** [`RabinKarp.java`](file:///d:/Documents/Sem%202-1/DSA-3/Project/RabinKarp.java), [`algorithms.js`](file:///d:/Documents/Sem%202-1/DSA-3/Project/algorithms.js)
- **Role:** Hash-based substring search using a rolling polynomial hash.
- **Mechanism:** Computes numerical hash values for pattern and text windows using base $d = 256$ and large prime modulus $q = 101$. When sliding the window by one character, the new hash is computed in $\mathcal{O}(1)$ time by subtracting the leading character and appending the trailing character. Explicit character-by-character validation occurs only upon hash collisions.
- **Time Complexity:** Average/Best: $\mathcal{O}(N + M)$ | Worst (excessive hash collisions): $\mathcal{O}(N \times M)$
- **Space Complexity:** $\mathcal{O}(1)$

### 3. Aho-Corasick Multi-Pattern Automaton
- **Files:** [`AhoCorasick.java`](file:///d:/Documents/Sem%202-1/DSA-3/Project/AhoCorasick.java), [`algorithms.js`](file:///d:/Documents/Sem%202-1/DSA-3/Project/algorithms.js)
- **Role:** Multi-pattern dictionary matching across large text corpora.
- **Mechanism:** 
  1. Constructs a **Trie** from all target keywords.
  2. Constructs **Failure Links** via Breadth-First Search (BFS) pointing to longest proper suffix states.
  3. Populates **Dictionary Output Links** at matching states.
  Allows searching for dozens of keywords (e.g. `"Binary Search"`, `"Tree"`, `"Complexity"`, `"Sorting"`) simultaneously in a single pass over the question text.
- **Time Complexity:** Construction: $\mathcal{O}(M)$ | Search: $\mathcal{O}(N + M + Z)$ (where $Z$ is the count of matched patterns)
- **Space Complexity:** $\mathcal{O}(M \times \Sigma)$

### 4. Boyer-Moore-Horspool Algorithm
- **File:** [`algorithms.js`](file:///d:/Documents/Sem%202-1/DSA-3/Project/algorithms.js)
- **Role:** High-speed single-pattern search with sublinear average performance.
- **Mechanism:** Compares the pattern against the text from right to left ($M-1$ down to $0$). On mismatch, the algorithm queries the **Bad Character Shift Table** ($\Delta_1$), enabling shifts of up to $M$ characters in a single jump.
- **Time Complexity:** Best Case: $\mathcal{O}(N / M)$ (sublinear) | Average: $\mathcal{O}(N)$ | Worst Case: $\mathcal{O}(N \times M)$
- **Space Complexity:** $\mathcal{O}(\Sigma)$ where $\Sigma$ is the alphabet size.

### 5. Levenshtein Distance & Similarity Matrix (DP)
- **Files:** [`Levenshtein.java`](file:///d:/Documents/Sem%202-1/DSA-3/Project/Levenshtein.java), [`algorithms.js`](file:///d:/Documents/Sem%202-1/DSA-3/Project/algorithms.js)
- **Role:** Fuzzy search, typographical error tolerance, and duplicate detection.
- **Mechanism:** Fills an $(N+1) \times (M+1)$ Dynamic Programming matrix where cell $(i, j)$ represents minimum cost to transform prefix $s_1[0 \dots i-1]$ into $s_2[0 \dots j-1]$ using insertion, deletion, and substitution operations:
  $$\text{DP}[i][j] = \min \begin{cases} \text{DP}[i-1][j-1] & \text{if } s_1[i-1] == s_2[j-1] \\ 1 + \min(\text{DP}[i-1][j], \text{DP}[i][j-1], \text{DP}[i-1][j-1]) & \text{otherwise} \end{cases}$$
  Percentage similarity is derived as:
  $$\text{Similarity } (\%) = \left( 1 - \frac{\text{Levenshtein Distance}}{\max(|s_1|, |s_2|)} \right) \times 100\%$$
- **Time Complexity:** $\mathcal{O}(N \times M)$
- **Space Complexity:** $\mathcal{O}(N \times M)$

---

### Algorithm Complexity & Benchmark Summary

| Algorithm | Method | Best Time | Average Time | Worst Time | Space | Primary Use Case in QBMS |
|:---|:---|:---:|:---:|:---:|:---:|:---|
| **KMP** | LPS Array Skip | $\mathcal{O}(N)$ | $\mathcal{O}(N + M)$ | $\mathcal{O}(N + M)$ | $\mathcal{O}(M)$ | Fast exact keyword lookup |
| **Rabin-Karp** | Rolling Hash ($d=256, q=101$) | $\mathcal{O}(N + M)$ | $\mathcal{O}(N + M)$ | $\mathcal{O}(NM)$ | $\mathcal{O}(1)$ | Hash-based substring filtering |
| **Aho-Corasick** | Trie + BFS Failure Automaton | $\mathcal{O}(N)$ | $\mathcal{O}(N + M + Z)$ | $\mathcal{O}(N + M + Z)$ | $\mathcal{O}(M \Sigma)$ | Multi-keyword tag search |
| **Boyer-Moore** | Bad Character Shift ($\Delta_1$) | $\mathcal{O}(N / M)$ | $\mathcal{O}(N)$ | $\mathcal{O}(NM)$ | $\mathcal{O}(\Sigma)$ | Sublinear search on long questions |
| **Levenshtein** | 2D Dynamic Programming | $\mathcal{O}(NM)$ | $\mathcal{O}(NM)$ | $\mathcal{O}(NM)$ | $\mathcal{O}(NM)$ | Fuzzy matching & duplicate matrix |

---

## 🚀 Key Features

### Question Bank CRUD & Document Organization
- **Structured Fields:** Unique ID, Document Association (`docId`), Question Text, Subject, Unit (1–5), Difficulty (`Easy`, `Medium`, `Hard`), and Year.
- **Question Documents:** Organize questions into dedicated examination bundles (e.g., *DSA Mid-Sem Examination 2026*, *Operating Systems Bank*, *DBMS Core Set*, *CN Comprehensive Set*).
- **Persistent State:** Web application state is synchronized with browser `localStorage`, retaining custom edits and newly created questions.

### Multi-Subject Repositories
Includes curated datasets formatted in JSON:
- [`sample_questions.json`](file:///d:/Documents/Sem%202-1/DSA-3/Project/sample_questions.json) — Data Structures & Algorithms
- [`sample_questions_os.json`](file:///d:/Documents/Sem%202-1/DSA-3/Project/sample_questions_os.json) — Operating Systems
- [`sample_questions_dbms.json`](file:///d:/Documents/Sem%202-1/DSA-3/Project/sample_questions_dbms.json) — Database Management Systems
- [`sample_questions_cn.json`](file:///d:/Documents/Sem%202-1/DSA-3/Project/sample_questions_cn.json) — Computer Networks

### Live Multi-Algorithm Benchmarking
- Execute any query simultaneously across all 5 algorithms against the active repository.
- Live comparison cards display **Execution Time (ms)**, **Character Comparisons/Transitions**, **Number of Matches**, and **Algorithmic Complexities**.

### Interactive Step-by-Step Algorithm Visualizers
- **KMP Visualizer:** Displays the computed LPS table with an interactive step-by-step playback slider showing pattern and text index progression.
- **Rabin-Karp Visualizer:** Displays every sliding text window alongside calculated rolling hashes ($t$) and pattern hash ($p$), visually highlighting hash matches versus collisions.
- **Aho-Corasick Visualizer:** Displays Trie states, transitions, failure fallback links, and matched keyword occurrences.
- **Fuzzy DP Heatmap:** Visualizes the full 2D Levenshtein distance matrix with colored cells representing insertion, deletion, and match penalties.

### Pairwise Similarity & Word Diff Analysis
- Select any two questions to calculate exact Levenshtein Distance and Similarity Percentage.
- Includes a **Word Difference Highlighter** showing identical terms in green and distinct phrasing in amber.

### Duplicate Matrix Detection
- Cross-compares every pair of questions in the repository in $\mathcal{O}(K^2)$ comparisons.
- Highlights duplicate and near-duplicate questions exceeding a configurable similarity threshold (e.g., $60\%$, $75\%$, $90\%$).

### Automated Question Paper Generator
- Generate balanced exam question papers on demand.
- Configure Subject, Total Marks, Unit distribution, and target difficulty split ($40\%$ Easy, $40\%$ Medium, $20\%$ Hard).
- One-click print / PDF export capability formatted for official university examinations.

### Role-Based Access Control (Student vs Admin)
- **Student Portal:** Read-only access to question banks, search algorithms, visualizers, and paper view.
- **Admin/Faculty Portal:** Full CRUD permissions (Add, Edit, Delete questions and documents), duplicate detection management, and paper generation.

---

## 📁 Repository Structure

```
.
├── AhoCorasick.java                            # Aho-Corasick Automaton (Java)
├── KMP.java                                    # Knuth-Morris-Pratt Search (Java)
├── Levenshtein.java                            # Levenshtein Distance & Similarity (Java)
├── RabinKarp.java                              # Rabin-Karp Rolling Hash (Java)
├── Question.java                               # Question Entity Model (Java)
├── Main.java                                   # Interactive Terminal CLI Application (Java)
│
├── index.html                                  # Web Application GUI & Layout
├── styles.css                                  # Custom Glassmorphic Dark/Light Design System
├── algorithms.js                               # JavaScript Algorithm Implementations & Benchmarks
├── app.js                                      # Application Controller, State & Event Handlers
│
├── sample_questions.json                       # Sample Questions: Data Structures & Algorithms
├── sample_questions_os.json                    # Sample Questions: Operating Systems
├── sample_questions_dbms.json                  # Sample Questions: Database Management Systems
├── sample_questions_cn.json                    # Sample Questions: Computer Networks
│
├── Team_23_QBMS_Project_Documentation.pdf      # Detailed Project Report & Documentation
├── Team_No_23_DSA-3_Project_Abstract.pdf       # Project Abstract
├── Question_Bank_Management_System_Presentation.pptx # Project Review Presentation
├── QBMS_Review2.pptx                           # Review 2 Slide Deck
├── GEOTAG DSA.jpeg                             # Project Verification & Geotag Artifact
├── .gitignore                                  # Git ignore rules (*.class, IDE configs)
└── README.md                                   # Comprehensive System Documentation
```

---

## 💻 Installation & Quick Start

### Prerequisites
- **For Java CLI:** Java Development Kit (JDK) 8 or higher (`javac` and `java` available on PATH).
- **For Web Application:** Any modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari). No npm dependencies or external build tools required.

---

### Running the Java CLI Application

1. Open your terminal / PowerShell in the project directory:
   ```bash
   cd "d:/Documents/Sem 2-1/DSA-3/Project"
   ```

2. Compile all Java source files:
   ```bash
   javac Main.java Question.java KMP.java RabinKarp.java Levenshtein.java AhoCorasick.java
   ```

3. Run the interactive CLI:
   ```bash
   java Main
   ```

---

### Running the Interactive Web Application

#### Option 1: Direct Browser Launch
Simply double-click [`index.html`](file:///d:/Documents/Sem%202-1/DSA-3/Project/index.html) or open it directly in your browser:
```bash
# Windows PowerShell
Start-Process index.html
```

#### Option 2: Local HTTP Server (Recommended)
Using Python:
```bash
# Python 3
python -m http.server 8000
```
Then navigate to: `http://localhost:8000`

Using Node.js:
```bash
npx serve .
```

---

## 🔑 Sample Login Credentials

The web application comes pre-configured with the following mock login identities for rapid testing:

| Role | Login Identifier | Name / Description | Access Level |
|:---|:---|:---|:---|
| **Student** | `2520040001` | Rahul Verma (CSE) | Read-only Question Bank, Search, Visualizers |
| **Student** | `2520040023` | Ananya Reddy (CSE) | Read-only Question Bank, Search, Visualizers |
| **Admin** | `EMP1001` | Prof. Suresh Sharma | Full Administrative & CRUD Permissions |
| **Admin** | `EMP1024` | Dr. Priya Varma (DSA) | Full Administrative & CRUD Permissions |

*(Tip: In the web portal, you can click any of the sample quick-login cards on the login screen to autofill and sign in immediately.)*

---

## 📟 CLI Menu Reference

When running `java Main`, you are presented with an 11-option interactive console:

```text
====================================
 QUESTION BANK MANAGEMENT SYSTEM
====================================
1. Add Question                     # Enter subject, unit, difficulty, year, and text
2. View Questions                   # Display all questions formatted in table style
3. Edit Question                    # Modify existing question attributes by ID
4. Delete Question                  # Remove a question by ID
5. KMP Search                       # Single-pattern exact search using LPS array
6. Rabin-Karp Search                # Rolling hash search with collision detection
7. Aho-Corasick Multi-Pattern Search# Comma-separated multi-keyword simultaneous search
8. Fuzzy Search                     # Typo-tolerant search using Levenshtein distance
9. Question Similarity              # Compare two questions by ID and print similarity %
10. Duplicate Detection             # Find all question pairs with similarity >= 60%
11. Exit                            # Terminate application
```

---

## 👥 Academic & Team Credits

- **Course:** Data Structures & Algorithms 3 (DSA-3)
- **Academic Year:** 2026–2027 (Semester 2-1)
- **Institution:** Department of Computer Science and Engineering, **KL University Hyderabad (KLH)**
- **Team Identification:** Section 8 • **Team 23**
- **Repository:** [`KLH_CSE_2026-27_S8_Team-23_QBMS`](https://github.com/premsaisurisetty-a11y/KLH_CSE_2026-27_S8_Team-23_QBMS)

---
*Developed with focus on computational efficiency, algorithmic clarity, and modern interface aesthetics.*
