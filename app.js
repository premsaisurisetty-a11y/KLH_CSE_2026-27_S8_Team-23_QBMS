/**
 * QBMS - Question Bank Management System Application Logic
 * Supports Question Documents/Sets architecture & Single Document Storage
 */

// Initial Sample Documents
const INITIAL_DOCUMENTS = [
    {
        id: "doc-1",
        title: "DSA Mid-Sem Examination 2026 (Set A)",
        subject: "DSA",
        code: "23CS201",
        year: 2026,
        maxMarks: 100,
        description: "Official mid-semester question paper covering Units 1, 2, and 3."
    },
    {
        id: "doc-2",
        title: "Operating Systems Examination Bank 2026",
        subject: "Operating Systems",
        code: "23CS202",
        year: 2026,
        maxMarks: 100,
        description: "Official OS question set covering Process Scheduling, Deadlocks, Synchronization, and Memory Management."
    },
    {
        id: "doc-3",
        title: "Database Management Systems (DBMS) Core Bank",
        subject: "DBMS",
        code: "23CS203",
        year: 2026,
        maxMarks: 100,
        description: "DBMS question bank covering ER Modeling, Relational Algebra, Normalization, ACID, and B+ Trees."
    },
    {
        id: "doc-4",
        title: "Computer Networks (CN) Comprehensive Set",
        subject: "Computer Networks",
        code: "23CS204",
        year: 2026,
        maxMarks: 100,
        description: "Computer Networks bank covering OSI/TCP-IP, Subnetting, Routing Algorithms, and TCP Congestion Control."
    }
];

// Initial Sample Questions linked to documents
const INITIAL_QUESTIONS = [
    // DSA (doc-1)
    { id: 1, docId: "doc-1", question: "Explain the working of Binary Search.", subject: "DSA", unit: 1, difficulty: "Easy", year: 2024 },
    { id: 2, docId: "doc-1", question: "Explain Binary Search Tree and its operations.", subject: "DSA", unit: 2, difficulty: "Medium", year: 2025 },
    { id: 3, docId: "doc-1", question: "Explain the working of Bubble Sort.", subject: "DSA", unit: 3, difficulty: "Easy", year: 2023 },
    { id: 4, docId: "doc-1", question: "What is the time complexity of Merge Sort?", subject: "DSA", unit: 4, difficulty: "Medium", year: 2024 },
    { id: 5, docId: "doc-1", question: "Describe how Binary Search works.", subject: "DSA", unit: 1, difficulty: "Easy", year: 2026 },
    { id: 6, docId: "doc-1", question: "Discuss Dijkstra's Shortest Path Algorithm with an example.", subject: "DSA", unit: 5, difficulty: "Hard", year: 2025 },
    { id: 7, docId: "doc-1", question: "Explain Knuth-Morris-Pratt (KMP) string matching algorithm.", subject: "DSA", unit: 4, difficulty: "Hard", year: 2026 },
    { id: 8, docId: "doc-1", question: "What is Levenshtein Distance and how is it calculated?", subject: "DSA", unit: 3, difficulty: "Medium", year: 2025 },

    // Operating Systems (doc-2)
    { id: 9, docId: "doc-2", question: "Explain Process Control Block (PCB) and process state transition diagram.", subject: "Operating Systems", unit: 1, difficulty: "Easy", year: 2026 },
    { id: 10, docId: "doc-2", question: "Explain Peterson's algorithm for critical section problem and verify mutual exclusion.", subject: "Operating Systems", unit: 2, difficulty: "Hard", year: 2025 },
    { id: 11, docId: "doc-2", question: "Explain Banker's Algorithm for deadlock avoidance with safety algorithm steps.", subject: "Operating Systems", unit: 3, difficulty: "Hard", year: 2026 },
    { id: 12, docId: "doc-2", question: "Compare FIFO, Optimal, and LRU Page Replacement algorithms for a given reference string.", subject: "Operating Systems", unit: 4, difficulty: "Medium", year: 2026 },
    { id: 13, docId: "doc-2", question: "Discuss Disk Scheduling Algorithms: FCFS, SSTF, SCAN, and C-SCAN with seek time calculations.", subject: "Operating Systems", unit: 5, difficulty: "Medium", year: 2025 },

    // DBMS (doc-3)
    { id: 14, docId: "doc-3", question: "Explain Three-Schema Architecture and Physical/Logical Data Independence.", subject: "DBMS", unit: 1, difficulty: "Easy", year: 2026 },
    { id: 15, docId: "doc-3", question: "Explain fundamental Relational Algebra operations with syntax and examples.", subject: "DBMS", unit: 2, difficulty: "Medium", year: 2026 },
    { id: 16, docId: "doc-3", question: "Discuss Normalization forms (1NF, 2NF, 3NF, BCNF) and Lossless Join Decomposition.", subject: "DBMS", unit: 3, difficulty: "Hard", year: 2025 },
    { id: 17, docId: "doc-3", question: "Explain ACID properties of Transactions and Conflict Serializability testing.", subject: "DBMS", unit: 4, difficulty: "Hard", year: 2026 },
    { id: 18, docId: "doc-3", question: "Construct a B+ Tree of order 4 and explain why B+ trees are preferred for indexing.", subject: "DBMS", unit: 5, difficulty: "Hard", year: 2025 },

    // Computer Networks (doc-4)
    { id: 19, docId: "doc-4", question: "Compare 7-Layer OSI Reference Model with 4-Layer TCP/IP Protocol Suite.", subject: "Computer Networks", unit: 1, difficulty: "Easy", year: 2026 },
    { id: 20, docId: "doc-4", question: "Explain Sliding Window Flow Control: Stop-and-Wait, Go-Back-N, and Selective Repeat ARQ.", subject: "Computer Networks", unit: 2, difficulty: "Hard", year: 2026 },
    { id: 21, docId: "doc-4", question: "Explain Distance Vector Routing Algorithm using Bellman-Ford and Count-to-Infinity problem.", subject: "Computer Networks", unit: 3, difficulty: "Hard", year: 2025 },
    { id: 22, docId: "doc-4", question: "Explain TCP 3-Way Handshake Connection Establishment and Congestion Control (AIMD).", subject: "Computer Networks", unit: 4, difficulty: "Hard", year: 2026 },
    { id: 23, docId: "doc-4", question: "Explain Domain Name System (DNS) resolution process and DNS record types.", subject: "Computer Networks", unit: 5, difficulty: "Medium", year: 2025 }
];

// Pre-configured Sample Users for Authentication
const SAMPLE_USERS = [
    {
        id: "2520040001",
        name: "Rahul Verma",
        role: "student",
        dept: "B.Tech CSE - Sec 8",
        year: "2nd Year"
    },
    {
        id: "2520040023",
        name: "Ananya Reddy",
        role: "student",
        dept: "B.Tech CSE - Sec 8",
        year: "2nd Year"
    },
    {
        id: "EMP1001",
        name: "Prof. Suresh Sharma",
        role: "admin",
        dept: "CSE Department",
        designation: "Senior Faculty & Exam Head"
    },
    {
        id: "EMP1024",
        name: "Dr. Priya Varma",
        role: "admin",
        dept: "DSA Subject Coordinator",
        designation: "Assistant Professor"
    }
];

class QBMSApp {
    constructor() {
        this.documents = [];
        this.questions = [];
        this.activeDocId = 'all'; // 'all' or specific docId
        this.currentView = 'dashboard';
        this.currentUser = null;
        this.selectedLoginRole = 'student';
        this.tableFuzzyActive = true;
        this.globalFuzzyDebounce = null;

        this.initTheme();
        this.loadData();
        this.initEventListeners();
        this.initGlobalFuzzySearch();
        this.initSearchingAlgorithmsHub();
        this.initAuth();
        this.updateUI();
    }

    // --- Data Persistence & Setup ---
    loadData() {
        const storedDocs = localStorage.getItem('qbms_documents');
        if (storedDocs) {
            try {
                this.documents = JSON.parse(storedDocs);
            } catch (e) {
                this.documents = [...INITIAL_DOCUMENTS];
            }
        } else {
            this.documents = [...INITIAL_DOCUMENTS];
            this.saveDocuments();
        }

        const storedQuestions = localStorage.getItem('qbms_questions');
        if (storedQuestions) {
            try {
                this.questions = JSON.parse(storedQuestions);
            } catch (e) {
                this.questions = [...INITIAL_QUESTIONS];
            }
        } else {
            this.questions = [...INITIAL_QUESTIONS];
            this.saveQuestions();
        }

        const storedActiveDoc = localStorage.getItem('qbms_active_doc');
        if (storedActiveDoc && (storedActiveDoc === 'all' || this.documents.some(d => d.id === storedActiveDoc))) {
            this.activeDocId = storedActiveDoc;
        } else {
            this.activeDocId = 'all';
        }
    }

    saveDocuments() {
        localStorage.setItem('qbms_documents', JSON.stringify(this.documents));
    }

    saveQuestions() {
        localStorage.setItem('qbms_questions', JSON.stringify(this.questions));
    }

    setActiveDoc(docId) {
        this.activeDocId = docId;
        localStorage.setItem('qbms_active_doc', docId);
        this.updateDocSelectors();
        this.renderQuestionsTable();
        this.renderDocumentsView();
        this.updateStats();

        const docName = docId === 'all' ? 'All Documents' : (this.documents.find(d => d.id === docId)?.title || docId);
        this.showToast(`Active Document: ${docName}`, 'info');
    }

    getNextQuestionId() {
        if (this.questions.length === 0) return 1;
        return Math.max(...this.questions.map(q => q.id)) + 1;
    }

    getNextDocId() {
        return 'doc-' + Date.now();
    }

    // --- Authentication & Role Management ---
    initAuth() {
        const storedUser = localStorage.getItem('qbms_user');
        if (storedUser) {
            try {
                this.currentUser = JSON.parse(storedUser);
            } catch (e) {
                this.currentUser = null;
            }
        }
        this.applyAuthState();
    }

    setLoginRole(role) {
        this.selectedLoginRole = role;
        const studentTab = document.getElementById('roleTabStudent');
        const adminTab = document.getElementById('roleTabAdmin');
        const inputLabel = document.getElementById('loginInputLabel');
        const idInput = document.getElementById('loginIdInput');
        const hintText = document.getElementById('loginHint');
        const btnText = document.getElementById('loginBtnText');
        const errorEl = document.getElementById('loginErrorMsg');

        if (errorEl) {
            errorEl.style.display = 'none';
            errorEl.textContent = '';
        }

        if (role === 'student') {
            studentTab?.classList.add('active');
            adminTab?.classList.remove('active');
            if (inputLabel) inputLabel.textContent = 'Student 10-Digit Roll Number:';
            if (idInput) {
                idInput.placeholder = 'e.g. 2520040001';
                idInput.value = '';
                idInput.focus();
            }
            if (hintText) hintText.textContent = 'Format: 10-digit Roll No starting with 25200 (e.g. 25200*****)';
            if (btnText) btnText.textContent = 'Login as Student';
        } else {
            adminTab?.classList.add('active');
            studentTab?.classList.remove('active');
            if (inputLabel) inputLabel.textContent = 'Admin Employee ID (Emp ID):';
            if (idInput) {
                idInput.placeholder = 'e.g. EMP1001';
                idInput.value = '';
                idInput.focus();
            }
            if (hintText) hintText.textContent = 'Format: Employee ID starting with EMP (e.g. EMP1001)';
            if (btnText) btnText.textContent = 'Login as Admin';
        }
    }

    login(id, role) {
        const cleanId = (id || '').trim();
        const errorEl = document.getElementById('loginErrorMsg');

        if (errorEl) {
            errorEl.style.display = 'none';
            errorEl.textContent = '';
        }

        if (!cleanId) {
            this.showLoginError('Please enter an ID or Roll Number to proceed.');
            return;
        }

        if (role === 'student') {
            // Roll number validation: 10 digits starting with 25200
            const studentRegex = /^25200\d{5}$/;
            if (!studentRegex.test(cleanId)) {
                this.showLoginError('Invalid Student Roll Number! Must be 10 digits starting with "25200" (e.g. 2520040001).');
                return;
            }

            // Find from sample users or create dynamic profile
            const sampleUser = SAMPLE_USERS.find(u => u.id === cleanId && u.role === 'student');
            this.currentUser = sampleUser ? { ...sampleUser } : {
                id: cleanId,
                name: `Student (${cleanId})`,
                role: 'student',
                dept: 'B.Tech CSE',
                year: '2nd Year'
            };
        } else {
            // Admin validation: starts with EMP
            const adminRegex = /^EMP[A-Za-z0-9_-]+$/i;
            if (!adminRegex.test(cleanId)) {
                this.showLoginError('Invalid Admin Employee ID! Must start with "EMP" (e.g. EMP1001).');
                return;
            }

            const sampleAdmin = SAMPLE_USERS.find(u => u.id.toUpperCase() === cleanId.toUpperCase() && u.role === 'admin');
            this.currentUser = sampleAdmin ? { ...sampleAdmin } : {
                id: cleanId.toUpperCase(),
                name: `Faculty Admin (${cleanId.toUpperCase()})`,
                role: 'admin',
                dept: 'Computer Science Department',
                designation: 'Faculty'
            };
        }

        localStorage.setItem('qbms_user', JSON.stringify(this.currentUser));
        this.applyAuthState();
        this.showToast(`Welcome, ${this.currentUser.name}! Logged in as ${this.currentUser.role === 'admin' ? 'Administrator' : 'Student'}.`, 'success');
    }

    showLoginError(msg) {
        const errorEl = document.getElementById('loginErrorMsg');
        if (errorEl) {
            errorEl.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> <span>${this.escapeHTML(msg)}</span>`;
            errorEl.style.display = 'flex';
        }
    }

    logout() {
        localStorage.removeItem('qbms_user');
        this.currentUser = null;
        this.applyAuthState();
        this.showToast('You have been logged out from QBMS.', 'info');
    }

    applyAuthState() {
        const loginOverlay = document.getElementById('loginScreen');
        const mainLayout = document.getElementById('mainAppLayout');
        const userDisplayName = document.getElementById('userDisplayName');
        const userRoleBadge = document.getElementById('userRoleBadge');
        const userIdCode = document.getElementById('userIdCode');
        const userAvatarCircle = document.getElementById('userAvatarCircle');
        const userAvatarIcon = document.getElementById('userAvatarIcon');

        if (this.currentUser) {
            if (loginOverlay) loginOverlay.style.display = 'none';
            if (mainLayout) mainLayout.style.display = 'flex';

            if (userDisplayName) userDisplayName.textContent = this.currentUser.name;
            if (userIdCode) userIdCode.textContent = this.currentUser.id;

            const isAdmin = this.currentUser.role === 'admin';

            if (userRoleBadge) {
                userRoleBadge.className = isAdmin ? 'badge badge-admin' : 'badge badge-student';
                userRoleBadge.textContent = isAdmin ? 'Admin' : 'Student';
            }

            if (userAvatarCircle) {
                userAvatarCircle.className = isAdmin ? 'user-avatar-circle admin' : 'user-avatar-circle student';
            }

            if (userAvatarIcon) {
                userAvatarIcon.className = isAdmin ? 'fa-solid fa-user-shield' : 'fa-solid fa-user-graduate';
            }

            // Adjust role permissions on UI elements
            const addBtn = document.getElementById('openAddModalBtn');
            const importBtn = document.getElementById('importDocBtn');
            const createDocBtn = document.getElementById('openCreateDocBtn');
            const sampleResetBtn = document.getElementById('sampleDataBtn');

            if (addBtn) addBtn.style.display = isAdmin ? 'inline-flex' : 'none';
            if (importBtn) importBtn.style.display = isAdmin ? 'inline-flex' : 'none';
            if (createDocBtn) createDocBtn.style.display = isAdmin ? 'inline-flex' : 'none';
            if (sampleResetBtn) sampleResetBtn.style.display = isAdmin ? 'inline-block' : 'none';

            this.renderQuestionsTable();
            this.renderDocumentsView();
        } else {
            if (loginOverlay) loginOverlay.style.display = 'flex';
            if (mainLayout) mainLayout.style.display = 'none';
        }
    }

    // --- Theme Management ---
    initTheme() {
        const savedTheme = localStorage.getItem('qbms_theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        this.updateThemeIcon(savedTheme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('qbms_theme', newTheme);
        this.updateThemeIcon(newTheme);
    }

    updateThemeIcon(theme) {
        const icon = document.getElementById('themeIcon');
        if (icon) {
            icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
        }
    }

    // --- Navigation & View Switching ---
    switchView(viewName) {
        this.currentView = viewName;

        document.querySelectorAll('.nav-item').forEach(item => {
            if (item.dataset.view === viewName) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        document.querySelectorAll('.nav-sub-item').forEach(item => {
            if (item.dataset.view === viewName) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        document.querySelectorAll('.view-panel').forEach(panel => {
            panel.classList.remove('active');
        });

        const targetPanel = document.getElementById(`view-${viewName}`);
        if (targetPanel) {
            targetPanel.classList.add('active');
        }

        if (viewName === 'documents') {
            this.renderDocumentsView();
        } else if (viewName === 'search-algorithms') {
            this.runHubBenchmark();
        } else if (viewName === 'similarity') {
            this.populateSimilarityDropdowns();
        } else if (viewName === 'duplicates') {
            this.runDuplicateScan();
        } else if (viewName === 'paper-generator') {
            this.populatePaperSubjects();
            this.generateQuestionPaper();
        }
    }

    // --- Global Universal Fuzzy Search Bar ---
    initGlobalFuzzySearch() {
        const input = document.getElementById('globalFuzzySearchInput');
        const clearBtn = document.getElementById('globalFuzzyClearBtn');
        const dropdown = document.getElementById('globalFuzzyDropdown');
        const openAlgosBtn = document.getElementById('fuzzyGoToAlgosBtn');

        if (!input) return;

        input.addEventListener('input', (e) => {
            const query = e.target.value;
            if (clearBtn) clearBtn.style.display = query.length > 0 ? 'inline-block' : 'none';

            clearTimeout(this.globalFuzzyDebounce);
            this.globalFuzzyDebounce = setTimeout(() => {
                this.handleGlobalFuzzyInput(query);
            }, 120);
        });

        input.addEventListener('focus', () => {
            if (input.value.trim().length > 0) {
                if (dropdown) dropdown.style.display = 'flex';
            }
        });

        clearBtn?.addEventListener('click', () => {
            input.value = '';
            clearBtn.style.display = 'none';
            if (dropdown) dropdown.style.display = 'none';
            input.focus();
        });

        openAlgosBtn?.addEventListener('click', () => {
            if (dropdown) dropdown.style.display = 'none';
            this.switchView('search-algorithms');
            const hubInput = document.getElementById('hubBenchmarkInput');
            if (hubInput && input.value.trim()) {
                hubInput.value = input.value.trim();
                this.runHubBenchmark();
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            const wrap = document.getElementById('globalFuzzySearchWrap');
            if (wrap && !wrap.contains(e.target)) {
                if (dropdown) dropdown.style.display = 'none';
            }
        });

        // Global Keyboard Shortcut: '/' or 'Ctrl+K'
        document.addEventListener('keydown', (e) => {
            if ((e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) {
                e.preventDefault();
                input.focus();
                input.select();
            } else if (e.key === 'Escape') {
                if (dropdown) dropdown.style.display = 'none';
                input.blur();
            }
        });
    }

    handleGlobalFuzzyInput(rawQuery) {
        const query = (rawQuery || '').trim();
        const dropdown = document.getElementById('globalFuzzyDropdown');
        const list = document.getElementById('globalFuzzyResultsList');
        const countEl = document.getElementById('globalFuzzyCount');

        if (!dropdown || !list) return;

        if (!query) {
            dropdown.style.display = 'none';
            list.innerHTML = '';
            return;
        }

        dropdown.style.display = 'flex';

        const matched = [];
        const questions = this.questions;

        questions.forEach(q => {
            const qLower = q.question.toLowerCase();
            const qryLower = query.toLowerCase();

            // 1. Direct exact containment
            if (qLower.includes(qryLower)) {
                matched.push({
                    question: q,
                    similarity: 100,
                    distance: 0,
                    matchedPhrase: query,
                    isExact: true
                });
                return;
            }

            // 2. Levenshtein Substring & Whole Text Fuzzy Distance
            const subMatch = Algorithms.levenshtein.bestSubstringDistance(query, q.question);
            const fullSim = Algorithms.levenshtein.similarity(query, q.question).similarity;
            const fullDist = Algorithms.levenshtein.distance(query, q.question).distance;

            const bestDist = Math.min(subMatch.distance, fullDist);
            const bestSim = Math.max(subMatch.similarity, fullSim);

            // Allow match if edit distance is within tolerant threshold or similarity >= 45%
            const threshold = Math.max(2, Math.floor(query.length * 0.45));
            if (bestDist <= threshold || bestSim >= 50) {
                matched.push({
                    question: q,
                    similarity: bestSim,
                    distance: bestDist,
                    matchedPhrase: subMatch.matchedSubstring || query,
                    isExact: false
                });
            }
        });

        matched.sort((a, b) => b.similarity - a.similarity || a.distance - b.distance);

        if (countEl) countEl.textContent = `${matched.length} question(s) found`;

        if (matched.length === 0) {
            list.innerHTML = `
                <div style="text-align: center; padding: 24px; color: var(--text-muted);">
                    <i class="fa-solid fa-wand-magic-sparkles" style="font-size: 1.6rem; opacity: 0.5; margin-bottom: 8px; display: block;"></i>
                    No questions found matching "${this.escapeHTML(query)}".
                    <div style="font-size: 0.75rem; margin-top: 4px;">Try searching broader keywords like "tree", "sort", "banker", "dijkstra".</div>
                </div>
            `;
            return;
        }

        list.innerHTML = matched.slice(0, 10).map(m => {
            const doc = this.documents.find(d => d.id === m.question.docId);
            const docName = doc ? doc.title : 'Global Bank';
            const scoreClass = m.similarity >= 80 ? 'fuzzy-score-high' : (m.similarity >= 60 ? 'fuzzy-score-med' : 'fuzzy-score-low');
            const highlightedText = this.highlightMatches(m.question.question, m.matchedPhrase || query);

            return `
                <div class="fuzzy-result-item" onclick="app.selectFuzzyResult(${m.question.id})">
                    <div class="fuzzy-result-info">
                        <div class="fuzzy-result-text">#${m.question.id} ${highlightedText}</div>
                        <div class="fuzzy-result-meta">
                            <span class="badge badge-doc">${this.escapeHTML(docName.substring(0, 18))}...</span>
                            <span class="badge badge-subject">${m.question.subject}</span>
                            <span class="badge badge-unit">U${m.question.unit}</span>
                            <span class="badge badge-${m.question.difficulty.toLowerCase()}">${m.question.difficulty}</span>
                            <span style="color: var(--text-muted);">Dist: ${m.distance}</span>
                        </div>
                    </div>
                    <div class="fuzzy-score-badge ${scoreClass}" title="${m.isExact ? 'Exact Match' : 'Fuzzy Distance Match'}">
                        ${m.similarity.toFixed(0)}%
                    </div>
                </div>
            `;
        }).join('');
    }

    selectFuzzyResult(questionId) {
        const dropdown = document.getElementById('globalFuzzyDropdown');
        if (dropdown) dropdown.style.display = 'none';

        this.switchView('dashboard');
        const searchInput = document.getElementById('quickSearchInput');
        const targetQ = this.questions.find(q => q.id === questionId);
        if (searchInput && targetQ) {
            searchInput.value = targetQ.question.substring(0, 25);
            this.renderQuestionsTable();
        }
        this.showToast(`Selected Question #${questionId}`, 'info');
    }

    // --- Searching Algorithms Hub & Live Benchmark Suite ---
    initSearchingAlgorithmsHub() {
        // Hub Tab Navigation
        document.querySelectorAll('.hub-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                this.switchHubTab(tab.dataset.hubTab);
            });
        });

        // Benchmark Arena Run
        document.getElementById('hubRunBenchmarkBtn')?.addEventListener('click', () => this.runHubBenchmark());
        document.getElementById('hubBenchmarkInput')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.runHubBenchmark();
        });
        document.getElementById('hubBenchmarkScope')?.addEventListener('change', () => this.runHubBenchmark());
        document.getElementById('hubBenchmarkDist')?.addEventListener('input', (e) => {
            document.getElementById('hubBenchmarkDistVal').textContent = e.target.value;
            this.runHubBenchmark();
        });

        // Quick Query Chips
        document.querySelectorAll('.query-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                const query = chip.dataset.query;
                const input = document.getElementById('hubBenchmarkInput');
                if (input && query) {
                    input.value = query;
                    this.runHubBenchmark();
                }
            });
        });

        // Deep-Dive Tabs Runners
        document.getElementById('hubKmpRunBtn')?.addEventListener('click', () => this.runHubKmp());
        document.getElementById('hubKmpInput')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.runHubKmp();
        });

        document.getElementById('hubRkRunBtn')?.addEventListener('click', () => this.runHubRabinKarp());
        document.getElementById('hubRkInput')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.runHubRabinKarp();
        });

        document.getElementById('hubFuzzyRunBtn')?.addEventListener('click', () => this.runHubFuzzyMatrix());
        document.getElementById('hubFuzzySampleBtn')?.addEventListener('click', () => this.loadFuzzySamplePair());

        document.getElementById('hubBmRunBtn')?.addEventListener('click', () => this.runHubBoyerMoore());
        document.getElementById('hubBmInput')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.runHubBoyerMoore();
        });
    }

    switchHubTab(tabName) {
        document.querySelectorAll('.hub-tab').forEach(tab => {
            if (tab.dataset.hubTab === tabName) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        document.querySelectorAll('.hub-tab-pane').forEach(pane => {
            pane.classList.remove('active');
        });

        const targetPane = document.getElementById(`hub-pane-${tabName}`);
        if (targetPane) {
            targetPane.classList.add('active');
        }

        if (tabName === 'arena') {
            this.runHubBenchmark();
        } else if (tabName === 'kmp') {
            this.runHubKmp();
        } else if (tabName === 'rabinkarp') {
            this.runHubRabinKarp();
        } else if (tabName === 'fuzzy') {
            this.runHubFuzzyMatrix();
        } else if (tabName === 'boyermoore') {
            this.runHubBoyerMoore();
        }
    }

    runHubBenchmark() {
        const query = (document.getElementById('hubBenchmarkInput')?.value || 'Binary Search').trim();
        const scope = document.getElementById('hubBenchmarkScope')?.value || 'all';
        const maxDist = parseInt(document.getElementById('hubBenchmarkDist')?.value || '4');
        const cardsGrid = document.getElementById('hubBenchmarkCards');
        const resultsList = document.getElementById('hubBenchmarkResultsList');
        const summaryCount = document.getElementById('hubMatchesSummaryCount');

        if (!cardsGrid || !resultsList) return;

        const targetCorpus = scope === 'active' ? this.getScopedQuestions() : this.questions;

        if (targetCorpus.length === 0) {
            cardsGrid.innerHTML = `<p style="grid-column: 1 / -1; color: var(--text-muted); text-align: center;">No questions available in selected scope to benchmark.</p>`;
            resultsList.innerHTML = '';
            return;
        }

        const bench = Algorithms.benchmarkAll(targetCorpus, query, maxDist);

        // Find fastest algorithm
        const algos = [
            { key: 'kmp', data: bench.algorithms.kmp, icon: 'fa-bolt', color: '#6366f1' },
            { key: 'rabinKarp', data: bench.algorithms.rabinKarp, icon: 'fa-fingerprint', color: '#a855f7' },
            { key: 'boyerMoore', data: bench.algorithms.boyerMoore, icon: 'fa-forward-fast', color: '#06b6d4' },
            { key: 'fuzzy', data: bench.algorithms.fuzzy, icon: 'fa-wand-magic-sparkles', color: '#ec4899' }
        ];

        let minTime = Infinity;
        let fastestKey = 'kmp';
        algos.forEach(a => {
            if (a.data.timeMs < minTime) {
                minTime = a.data.timeMs;
                fastestKey = a.key;
            }
        });

        // Render 4 Performance Cards
        cardsGrid.innerHTML = algos.map(a => {
            const isWinner = a.key === fastestKey;
            const timeMicros = (a.data.timeMs * 1000).toFixed(1);

            return `
                <div class="benchmark-card ${isWinner ? 'winner' : ''}">
                    <div>
                        <div class="bench-card-header">
                            <div class="bench-card-icon" style="color: ${a.color};">
                                <i class="fa-solid ${a.icon}"></i>
                            </div>
                            <div>
                                <div class="bench-card-title">${a.data.name}</div>
                                <div class="bench-card-type">${a.data.type}</div>
                            </div>
                        </div>
                        <div class="bench-metrics-row">
                            <div class="bench-metric-item">
                                <span>Execution Time</span>
                                <strong style="color: ${isWinner ? '#10b981' : 'var(--text-primary)'};">${timeMicros} μs</strong>
                            </div>
                            <div class="bench-metric-item">
                                <span>Matches Found</span>
                                <strong style="color: ${a.data.matches > 0 ? 'var(--accent-primary)' : 'var(--text-muted)'};">${a.data.matches}</strong>
                            </div>
                            <div class="bench-metric-item" style="margin-top: 8px;">
                                <span>Comparisons</span>
                                <strong>${a.data.comparisons}</strong>
                            </div>
                            <div class="bench-metric-item" style="margin-top: 8px;">
                                <span>Corpus Scope</span>
                                <strong>${targetCorpus.length} Qs</strong>
                            </div>
                        </div>
                    </div>
                    <div class="bench-complexity-row">
                        <span>Time: <strong>${a.data.timeComplexity}</strong></span>
                        <span>Space: <strong>${a.data.spaceComplexity}</strong></span>
                    </div>
                </div>
            `;
        }).join('');

        // Find match details for each question
        const matchedQuestions = [];
        targetCorpus.forEach(q => {
            const kmpRes = Algorithms.kmp.search(q.question, query);
            const rkRes = Algorithms.rabinKarp.search(q.question, query);
            const bmRes = Algorithms.boyerMoore.search(q.question, query);
            const fzRes = Algorithms.levenshtein.bestSubstringDistance(query, q.question);
            const fzSim = Algorithms.levenshtein.similarity(query, q.question).similarity;

            const isFuzzyMatch = fzRes.distance <= maxDist || fzSim >= 60 || q.question.toLowerCase().includes(query.toLowerCase());

            if (kmpRes.found || rkRes.found || bmRes.found || isFuzzyMatch) {
                matchedQuestions.push({
                    question: q,
                    kmp: kmpRes.found,
                    rk: rkRes.found,
                    bm: bmRes.found,
                    fuzzy: isFuzzyMatch,
                    fzDistance: fzRes.distance,
                    fzSimilarity: Math.max(fzSim, fzRes.similarity),
                    matchedPhrase: fzRes.matchedSubstring || query
                });
            }
        });

        if (summaryCount) summaryCount.textContent = `${matchedQuestions.length} Questions Matched`;

        if (matchedQuestions.length === 0) {
            resultsList.innerHTML = `
                <div style="text-align: center; padding: 32px; color: var(--text-muted); background: var(--bg-glass); border-radius: var(--radius-md);">
                    <i class="fa-solid fa-crosshairs" style="font-size: 2rem; opacity: 0.5; margin-bottom: 8px; display: block;"></i>
                    No questions matched the query "${this.escapeHTML(query)}" across the 4 algorithms.
                </div>
            `;
            return;
        }

        resultsList.innerHTML = matchedQuestions.map(m => {
            const doc = this.documents.find(d => d.id === m.question.docId);
            const docName = doc ? doc.title : 'Global Bank';
            const highlighted = this.highlightMatches(m.question.question, m.matchedPhrase || query);

            return `
                <div class="dup-item" style="flex-direction: column; align-items: stretch;">
                    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 8px;">
                        <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                            <span style="font-weight: 700; color: var(--accent-primary);">#${m.question.id}</span>
                            <span class="badge badge-doc">${this.escapeHTML(docName)}</span>
                            <span class="badge badge-subject">${m.question.subject}</span>
                            <span class="badge badge-unit">Unit ${m.question.unit}</span>
                            <span class="badge badge-${m.question.difficulty.toLowerCase()}">${m.question.difficulty}</span>
                        </div>
                        <div style="display: flex; gap: 6px; align-items: center;">
                            <span class="badge ${m.kmp ? 'badge-easy' : 'badge-hard'}" style="font-size: 0.72rem;">KMP: ${m.kmp ? '✓ Match' : '✗'}</span>
                            <span class="badge ${m.rk ? 'badge-easy' : 'badge-hard'}" style="font-size: 0.72rem;">Rabin-Karp: ${m.rk ? '✓ Match' : '✗'}</span>
                            <span class="badge ${m.bm ? 'badge-easy' : 'badge-hard'}" style="font-size: 0.72rem;">Boyer-Moore: ${m.bm ? '✓ Match' : '✗'}</span>
                            <span class="badge ${m.fuzzy ? 'badge-easy' : 'badge-hard'}" style="font-size: 0.72rem;">Fuzzy (${m.fzSimilarity.toFixed(0)}%): ${m.fuzzy ? '✓ Match' : '✗'}</span>
                        </div>
                    </div>
                    <div style="margin-top: 10px; font-size: 0.95rem; line-height: 1.5;">
                        ${highlighted}
                    </div>
                </div>
            `;
        }).join('');
    }

    runHubKmp() {
        const pattern = (document.getElementById('hubKmpInput')?.value || 'Binary Search').trim();
        const lpsDisplay = document.getElementById('hubKmpLpsDisplay');
        const resultsList = document.getElementById('hubKmpResultsList');

        if (!pattern || !lpsDisplay) return;

        const lps = Algorithms.kmp.computeLPSArray(pattern);
        lpsDisplay.innerHTML = pattern.split('').map((char, idx) => `
            <div class="array-cell">
                <span class="cell-char">${this.escapeHTML(char)}</span>
                <span class="cell-val">${lps[idx]}</span>
            </div>
        `).join('');

        const targetQuestions = this.getScopedQuestions();
        const matches = [];

        targetQuestions.forEach(q => {
            const res = Algorithms.kmp.search(q.question, pattern);
            if (res.found) matches.push({ question: q, matchIndices: res.matches });
        });

        if (matches.length === 0) {
            resultsList.innerHTML = `<p style="color: var(--text-muted); font-style: italic; padding: 14px;">No exact KMP substring matches found for "${this.escapeHTML(pattern)}".</p>`;
            return;
        }

        resultsList.innerHTML = matches.map(m => {
            const doc = this.documents.find(d => d.id === m.question.docId);
            return `
                <div class="dup-item">
                    <div style="flex: 1;">
                        <div style="display: flex; gap: 8px; margin-bottom: 6px; align-items: center;">
                            <span style="font-weight: 700; color: var(--accent-primary);">#${m.question.id}</span>
                            <span class="badge badge-doc">${this.escapeHTML(doc ? doc.title : 'Global')}</span>
                            <span class="badge badge-subject">${m.question.subject}</span>
                            <span class="badge badge-${m.question.difficulty.toLowerCase()}">${m.question.difficulty}</span>
                            <span style="color: var(--success); font-size: 0.8rem;"><i class="fa-solid fa-check"></i> ${m.matchIndices.length} occurrence(s)</span>
                        </div>
                        <div style="font-size: 0.95rem;">${this.highlightMatches(m.question.question, pattern)}</div>
                    </div>
                </div>
            `;
        }).join('');
    }

    runHubRabinKarp() {
        const pattern = (document.getElementById('hubRkInput')?.value || 'Deadlock').trim();
        const diag = document.getElementById('hubRkHashDiagnostics');
        const resultsList = document.getElementById('hubRkResultsList');

        if (!pattern || !diag) return;

        const targetQuestions = this.getScopedQuestions();
        const matches = [];
        let pHash = null;

        targetQuestions.forEach(q => {
            const res = Algorithms.rabinKarp.search(q.question, pattern);
            if (pHash === null) pHash = res.patternHash;
            if (res.found) matches.push({ question: q, res: res });
        });

        diag.innerHTML = `
            <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
                <span class="badge badge-doc" style="font-size: 0.85rem;">Pattern: <strong>"${this.escapeHTML(pattern)}"</strong></span>
                <span class="badge badge-subject" style="font-size: 0.85rem;">Polynomial Hash ($P \\pmod{101}$): <strong>${pHash}</strong></span>
                <span class="badge badge-unit">Base $d = 256$</span>
                <span class="badge badge-unit">Modulo Prime $q = 101$</span>
            </div>
        `;

        if (matches.length === 0) {
            resultsList.innerHTML = `<p style="color: var(--text-muted); font-style: italic; padding: 14px;">No Rabin-Karp matches found for "${this.escapeHTML(pattern)}".</p>`;
            return;
        }

        resultsList.innerHTML = matches.map(m => {
            const doc = this.documents.find(d => d.id === m.question.docId);
            const matchedWindows = m.res.windows.filter(w => w.hashMatched);

            return `
                <div class="dup-item" style="flex-direction: column; align-items: stretch;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div style="display: flex; gap: 8px; align-items: center;">
                            <span style="font-weight: 700; color: var(--accent-primary);">#${m.question.id}</span>
                            <span class="badge badge-doc">${this.escapeHTML(doc ? doc.title : 'Global')}</span>
                            <span class="badge badge-subject">${m.question.subject}</span>
                            <span class="badge badge-${m.question.difficulty.toLowerCase()}">${m.question.difficulty}</span>
                        </div>
                        <span style="font-size: 0.8rem; color: var(--info); font-family: var(--font-mono);">
                            Matching Hash Windows: ${matchedWindows.length}
                        </span>
                    </div>
                    <div style="margin-top: 8px; font-size: 0.95rem;">${this.highlightMatches(m.question.question, pattern)}</div>
                </div>
            `;
        }).join('');
    }

    runHubFuzzyMatrix() {
        const s1 = (document.getElementById('hubFuzzyString1')?.value || 'binry').trim();
        const s2 = (document.getElementById('hubFuzzyString2')?.value || 'binary').trim();
        const matrixDisplay = document.getElementById('hubFuzzyMatrixDisplay');
        const distanceBadge = document.getElementById('hubFuzzyDistanceBadge');

        if (!matrixDisplay) return;

        const res = Algorithms.levenshtein.distance(s1, s2);
        const sim = Algorithms.levenshtein.similarity(s1, s2);

        if (distanceBadge) {
            distanceBadge.textContent = `Levenshtein Edit Distance: ${res.distance} (${sim.similarity.toFixed(1)}% Similarity)`;
            distanceBadge.className = res.distance <= 1 ? 'badge badge-easy' : (res.distance <= 3 ? 'badge badge-medium' : 'badge badge-hard');
        }

        const dp = res.matrix;
        const len1 = s1.length;
        const len2 = s2.length;

        // Build 2D Dynamic Programming Table HTML
        let tableHtml = '<table class="dp-matrix-table"><thead><tr><th>DP</th><th>ε</th>';
        for (let j = 0; j < len2; j++) {
            tableHtml += `<th>${this.escapeHTML(s2.charAt(j))}</th>`;
        }
        tableHtml += '</tr></thead><tbody>';

        for (let i = 0; i <= len1; i++) {
            tableHtml += '<tr>';
            const rowHeader = i === 0 ? 'ε' : this.escapeHTML(s1.charAt(i - 1));
            tableHtml += `<th>${rowHeader}</th>`;

            for (let j = 0; j <= len2; j++) {
                const isFinal = (i === len1 && j === len2);
                const isMatch = (i > 0 && j > 0 && s1.charAt(i - 1).toLowerCase() === s2.charAt(j - 1).toLowerCase());
                let cellClass = 'dp-cell';
                if (isFinal) cellClass += ' final';
                else if (isMatch) cellClass += ' match';

                tableHtml += `<td class="${cellClass}">${dp[i][j]}</td>`;
            }
            tableHtml += '</tr>';
        }
        tableHtml += '</tbody></table>';

        matrixDisplay.innerHTML = tableHtml;
    }

    loadFuzzySamplePair() {
        const samples = [
            { s1: 'binry serch', s2: 'binary search' },
            { s1: 'deadlok', s2: 'deadlock' },
            { s1: 'algorthm', s2: 'algorithm' },
            { s1: 'dijksta', s2: 'dijkstra' },
            { s1: 'buble srt', s2: 'bubble sort' },
            { s1: 'relatinal', s2: 'relational' }
        ];

        const randomPair = samples[Math.floor(Math.random() * samples.length)];
        const input1 = document.getElementById('hubFuzzyString1');
        const input2 = document.getElementById('hubFuzzyString2');

        if (input1 && input2) {
            input1.value = randomPair.s1;
            input2.value = randomPair.s2;
            this.runHubFuzzyMatrix();
            this.showToast(`Loaded sample pair: "${randomPair.s1}" vs "${randomPair.s2}"`, 'info');
        }
    }

    runHubBoyerMoore() {
        const pattern = (document.getElementById('hubBmInput')?.value || 'Algorithm').trim();
        const tableDisplay = document.getElementById('hubBmTableDisplay');
        const resultsList = document.getElementById('hubBmResultsList');

        if (!pattern || !tableDisplay) return;

        const res = Algorithms.boyerMoore.search('dummy', pattern);
        const badChar = res.badChar;

        const uniqueChars = Object.keys(badChar);

        if (uniqueChars.length === 0) {
            tableDisplay.innerHTML = `<span style="color: var(--text-muted);">Pattern is too short for shift table.</span>`;
        } else {
            tableDisplay.innerHTML = uniqueChars.map(char => `
                <div class="array-cell">
                    <span class="cell-char">${this.escapeHTML(char)}</span>
                    <span class="cell-val">${badChar[char]}</span>
                </div>
            `).join('') + `
                <div class="array-cell" style="border-color: var(--accent-primary);">
                    <span class="cell-char">Other (*)</span>
                    <span class="cell-val">${pattern.length}</span>
                </div>
            `;
        }

        const targetQuestions = this.getScopedQuestions();
        const matches = [];

        targetQuestions.forEach(q => {
            const searchRes = Algorithms.boyerMoore.search(q.question, pattern);
            if (searchRes.found) {
                matches.push({ question: q, comparisons: searchRes.comparisons, matchesCount: searchRes.matches.length });
            }
        });

        if (matches.length === 0) {
            resultsList.innerHTML = `<p style="color: var(--text-muted); font-style: italic; padding: 14px;">No Boyer-Moore matches found for "${this.escapeHTML(pattern)}".</p>`;
            return;
        }

        resultsList.innerHTML = matches.map(m => {
            const doc = this.documents.find(d => d.id === m.question.docId);
            return `
                <div class="dup-item">
                    <div style="flex: 1;">
                        <div style="display: flex; gap: 8px; margin-bottom: 6px; align-items: center;">
                            <span style="font-weight: 700; color: var(--accent-primary);">#${m.question.id}</span>
                            <span class="badge badge-doc">${this.escapeHTML(doc ? doc.title : 'Global')}</span>
                            <span class="badge badge-subject">${m.question.subject}</span>
                            <span class="badge badge-${m.question.difficulty.toLowerCase()}">${m.question.difficulty}</span>
                            <span style="color: var(--info); font-size: 0.8rem;"><i class="fa-solid fa-chart-simple"></i> ${m.comparisons} char comparisons</span>
                        </div>
                        <div style="font-size: 0.95rem;">${this.highlightMatches(m.question.question, pattern)}</div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // --- Event Listeners ---
    initEventListeners() {
        // Theme toggle
        document.getElementById('themeToggle')?.addEventListener('click', () => this.toggleTheme());

        // Authentication & Role Selector Tabs
        document.getElementById('roleTabStudent')?.addEventListener('click', () => this.setLoginRole('student'));
        document.getElementById('roleTabAdmin')?.addEventListener('click', () => this.setLoginRole('admin'));

        // Login Form submission
        document.getElementById('loginForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            const idInput = document.getElementById('loginIdInput');
            this.login(idInput ? idInput.value : '', this.selectedLoginRole);
        });

        // Clickable Sample Credentials Cards
        document.querySelectorAll('.sample-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = card.dataset.id;
                const role = card.dataset.role;
                if (id && role) {
                    this.setLoginRole(role);
                    const idInput = document.getElementById('loginIdInput');
                    if (idInput) idInput.value = id;
                    this.login(id, role);
                }
            });
        });

        // Logout Button
        document.getElementById('logoutBtn')?.addEventListener('click', () => this.logout());

        // Navigation Menu & Sub-menu items
        document.querySelectorAll('.nav-item, .nav-sub-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchView(item.dataset.view);
            });
        });

        // Active Document Dropdown in Header
        document.getElementById('activeDocSelect')?.addEventListener('change', (e) => {
            this.setActiveDoc(e.target.value);
        });

        // Export Active Document button
        document.getElementById('exportActiveDocBtn')?.addEventListener('click', () => {
            const targetDocId = this.activeDocId === 'all' && this.documents.length > 0 ? this.documents[0].id : this.activeDocId;
            this.openExportModal(targetDocId);
        });

        // Import Document button
        document.getElementById('importDocBtn')?.addEventListener('click', () => this.openImportModal());
        document.getElementById('openImportModalBtn')?.addEventListener('click', () => this.openImportModal());
        document.getElementById('importModalCloseBtn')?.addEventListener('click', () => document.getElementById('importModal').classList.remove('active'));
        document.getElementById('importCancelBtn')?.addEventListener('click', () => document.getElementById('importModal').classList.remove('active'));
        document.getElementById('importExecuteBtn')?.addEventListener('click', () => this.handleImportExecution());
        document.getElementById('importFileInput')?.addEventListener('change', (e) => this.handleFileInput(e));

        // Export Modal actions
        document.getElementById('exportModalCloseBtn')?.addEventListener('click', () => document.getElementById('exportModal').classList.remove('active'));
        document.getElementById('exportJsonBtn')?.addEventListener('click', () => this.exportCurrentDoc('json'));
        document.getElementById('exportWordBtn')?.addEventListener('click', () => this.exportCurrentDoc('word'));
        document.getElementById('exportTextBtn')?.addEventListener('click', () => this.exportCurrentDoc('text'));

        // Document Modal (Create/Edit Document)
        document.getElementById('openCreateDocBtn')?.addEventListener('click', () => this.openCreateDocModal());
        document.getElementById('docModalCloseBtn')?.addEventListener('click', () => document.getElementById('docModal').classList.remove('active'));
        document.getElementById('docModalCancelBtn')?.addEventListener('click', () => document.getElementById('docModal').classList.remove('active'));
        document.getElementById('docForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleDocFormSubmit();
        });

        // Sample Data Reset
        document.getElementById('sampleDataBtn')?.addEventListener('click', () => {
            if (confirm('Reset database to default sample documents and questions?')) {
                this.documents = [...INITIAL_DOCUMENTS];
                this.questions = [...INITIAL_QUESTIONS];
                this.activeDocId = 'all';
                this.saveDocuments();
                this.saveQuestions();
                this.updateUI();
                this.showToast('Database reset to sample documents and questions', 'success');
            }
        });

        // Question Modal Controls
        const qModal = document.getElementById('questionModal');
        document.getElementById('openAddModalBtn')?.addEventListener('click', () => this.openAddQuestionModal());
        document.getElementById('modalCloseBtn')?.addEventListener('click', () => qModal.classList.remove('active'));
        document.getElementById('modalCancelBtn')?.addEventListener('click', () => qModal.classList.remove('active'));

        // Question Form Submit
        document.getElementById('questionForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleQuestionFormSubmit();
        });

        // Table Quick Search & Fuzzy Mode Toggle
        document.getElementById('quickSearchInput')?.addEventListener('input', () => this.renderQuestionsTable());
        document.getElementById('tableFuzzyToggle')?.addEventListener('click', () => {
            this.tableFuzzyActive = !this.tableFuzzyActive;
            const toggleBtn = document.getElementById('tableFuzzyToggle');
            if (toggleBtn) {
                toggleBtn.className = this.tableFuzzyActive ? 'btn btn-secondary btn-sm fuzzy-table-toggle active' : 'btn btn-secondary btn-sm fuzzy-table-toggle';
                toggleBtn.innerHTML = `<i class="fa-solid fa-wand-magic-sparkles"></i> <span>Fuzzy Match: ${this.tableFuzzyActive ? 'ON' : 'OFF'}</span>`;
            }
            this.renderQuestionsTable();
            this.showToast(`Table Fuzzy Matching ${this.tableFuzzyActive ? 'Activated' : 'Deactivated'}`, 'info');
        });

        document.getElementById('filterDoc')?.addEventListener('change', () => this.renderQuestionsTable());
        document.getElementById('filterSubject')?.addEventListener('change', () => this.renderQuestionsTable());
        document.getElementById('filterUnit')?.addEventListener('change', () => this.renderQuestionsTable());
        document.getElementById('filterDifficulty')?.addEventListener('change', () => this.renderQuestionsTable());
        document.getElementById('clearFiltersBtn')?.addEventListener('click', () => {
            document.getElementById('quickSearchInput').value = '';
            document.getElementById('filterDoc').value = '';
            document.getElementById('filterSubject').value = '';
            document.getElementById('filterUnit').value = '';
            document.getElementById('filterDifficulty').value = '';
            this.renderQuestionsTable();
        });

        // KMP Search View
        document.getElementById('kmpSearchBtn')?.addEventListener('click', () => this.runKMPSearch());
        document.getElementById('kmpKeyword')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.runKMPSearch();
        });

        // Rabin-Karp Search View
        document.getElementById('rkSearchBtn')?.addEventListener('click', () => this.runRabinKarpSearch());
        document.getElementById('rkKeyword')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.runRabinKarpSearch();
        });

        // Fuzzy Search View
        document.getElementById('fuzzyThreshold')?.addEventListener('input', (e) => {
            document.getElementById('fuzzyThresholdVal').textContent = e.target.value;
        });
        document.getElementById('fuzzySearchBtn')?.addEventListener('click', () => this.runFuzzySearch());
        document.getElementById('fuzzyQuery')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.runFuzzySearch();
        });

        // Similarity View & Real-Time Search Listeners
        document.getElementById('compareSimilarityBtn')?.addEventListener('click', () => this.runSimilarityCompare());
        
        document.getElementById('simSearch1')?.addEventListener('input', () => this.filterSimilarityQuestions(1, true));
        document.getElementById('simSubject1')?.addEventListener('change', () => this.filterSimilarityQuestions(1, true));
        document.getElementById('simClearSearch1')?.addEventListener('click', () => {
            const s1 = document.getElementById('simSearch1');
            const sub1 = document.getElementById('simSubject1');
            if (s1) s1.value = '';
            if (sub1) sub1.value = '';
            this.filterSimilarityQuestions(1, false);
        });

        document.getElementById('simSearch2')?.addEventListener('input', () => this.filterSimilarityQuestions(2, true));
        document.getElementById('simSubject2')?.addEventListener('change', () => this.filterSimilarityQuestions(2, true));
        document.getElementById('simClearSearch2')?.addEventListener('click', () => {
            const s2 = document.getElementById('simSearch2');
            const sub2 = document.getElementById('simSubject2');
            if (s2) s2.value = '';
            if (sub2) sub2.value = '';
            this.filterSimilarityQuestions(2, false);
        });

        document.getElementById('simSelect1')?.addEventListener('change', (e) => {
            const q = this.questions.find(x => x.id === parseInt(e.target.value));
            if (q) document.getElementById('simCustom1').value = q.question;
        });
        document.getElementById('simSelect2')?.addEventListener('change', (e) => {
            const q = this.questions.find(x => x.id === parseInt(e.target.value));
            if (q) document.getElementById('simCustom2').value = q.question;
        });

        document.getElementById('simSwapBtn')?.addEventListener('click', () => this.swapSimilarityQuestions());
        document.getElementById('simRandomBtn')?.addEventListener('click', () => this.pickRandomSimilarityPair());

        // Duplicate Detection View
        document.getElementById('dupThresholdSlider')?.addEventListener('input', (e) => {
            document.getElementById('dupThresholdLabel').textContent = `${e.target.value}%`;
        });
        document.getElementById('runDuplicateScanBtn')?.addEventListener('click', () => this.runDuplicateScan());

        // Question Paper Generator
        document.getElementById('generatePaperBtn')?.addEventListener('click', () => this.generateQuestionPaper());
        document.getElementById('paperSubjectSelect')?.addEventListener('change', () => this.generateQuestionPaper());
    }

    // --- Helper to get scoped questions based on active document ---
    getScopedQuestions() {
        if (this.activeDocId === 'all') {
            return this.questions;
        }
        return this.questions.filter(q => q.docId === this.activeDocId);
    }

    // --- UI Updates ---
    updateUI() {
        this.updateDocSelectors();
        this.updateStats();
        this.populateSubjectFilters();
        this.renderQuestionsTable();
        this.renderDocumentsView();
    }

    updateDocSelectors() {
        // Top bar activeDocSelect
        const topSelect = document.getElementById('activeDocSelect');
        if (topSelect) {
            topSelect.innerHTML = '<option value="all">-- All Documents / Global --</option>' +
                this.documents.map(d => `<option value="${d.id}" ${d.id === this.activeDocId ? 'selected' : ''}>📁 ${this.escapeHTML(d.title)}</option>`).join('');
        }

        // Filter doc in question bank
        const filterDoc = document.getElementById('filterDoc');
        if (filterDoc) {
            const currVal = filterDoc.value;
            filterDoc.innerHTML = '<option value="">All Documents</option>' +
                this.documents.map(d => `<option value="${d.id}" ${d.id === currVal ? 'selected' : ''}>${this.escapeHTML(d.title)}</option>`).join('');
        }

        // Form document in add/edit question modal
        const formDoc = document.getElementById('formDocument');
        if (formDoc) {
            formDoc.innerHTML = this.documents.map(d => `<option value="${d.id}">${this.escapeHTML(d.title)} (${d.subject})</option>`).join('');
        }
    }

    updateStats() {
        const total = this.questions.length;
        const totalDocs = this.documents.length;
        const subjects = new Set(this.questions.map(q => q.subject)).size;

        const easyCount = this.questions.filter(q => q.difficulty.toLowerCase() === 'easy').length;
        const medCount = this.questions.filter(q => q.difficulty.toLowerCase() === 'medium').length;
        const hardCount = this.questions.filter(q => q.difficulty.toLowerCase() === 'hard').length;

        // Duplicates count (threshold >= 75%)
        let dupCount = 0;
        for (let i = 0; i < this.questions.length; i++) {
            for (let j = i + 1; j < this.questions.length; j++) {
                const sim = Algorithms.levenshtein.similarity(this.questions[i].question, this.questions[j].question).similarity;
                if (sim >= 75) dupCount++;
            }
        }

        document.getElementById('statTotalQuestions').textContent = total;
        document.getElementById('totalQuestionsBadge').textContent = total;
        document.getElementById('totalDocsBadge').textContent = totalDocs;
        document.getElementById('statTotalSubjects').textContent = subjects;
        document.getElementById('statDuplicateCount').textContent = dupCount;
        document.getElementById('statDifficultySplit').textContent = `${easyCount} / ${medCount} / ${hardCount}`;
    }

    populateSubjectFilters() {
        const subjects = [...new Set(this.questions.map(q => q.subject))].sort();
        const filterSubject = document.getElementById('filterSubject');
        if (!filterSubject) return;
        const currentVal = filterSubject.value;

        filterSubject.innerHTML = '<option value="">All Subjects</option>';
        subjects.forEach(sub => {
            const opt = document.createElement('option');
            opt.value = sub;
            opt.textContent = sub;
            if (sub === currentVal) opt.selected = true;
            filterSubject.appendChild(opt);
        });
    }

    // --- Render Documents View (Question Sets Repository) ---
    renderDocumentsView() {
        const container = document.getElementById('documentsListGrid');
        if (!container) return;

        if (this.documents.length === 0) {
            container.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 48px 20px; color: var(--text-muted);">
                    <i class="fa-solid fa-folder-open" style="font-size: 3rem; margin-bottom: 12px; display: block; opacity: 0.5;"></i>
                    <h3>No Question Documents created yet.</h3>
                    <p style="margin-top: 6px;">Create a new document to store your set of questions in one unified place.</p>
                </div>
            `;
            return;
        }

        const isAdmin = this.currentUser?.role === 'admin';

        container.innerHTML = this.documents.map(doc => {
            const docQuestions = this.questions.filter(q => q.docId === doc.id);
            const isActive = this.activeDocId === doc.id;

            return `
                <div class="doc-card ${isActive ? 'active-doc' : ''}">
                    <div>
                        <div class="doc-card-header">
                            <div>
                                <span class="badge badge-doc"><i class="fa-solid fa-file-lines"></i> ${this.escapeHTML(doc.code || doc.subject)}</span>
                                <h4 class="doc-card-title" style="margin-top: 6px;">${this.escapeHTML(doc.title)}</h4>
                            </div>
                            ${isActive ? '<span class="badge badge-easy"><i class="fa-solid fa-check"></i> Active</span>' : ''}
                        </div>
                        <p class="doc-card-desc">${this.escapeHTML(doc.description || 'No description provided.')}</p>
                        <div class="doc-card-stats">
                            <span class="doc-card-stat-pill"><i class="fa-solid fa-list-check" style="color: var(--accent-primary);"></i> <strong>${docQuestions.length}</strong> Questions</span>
                            <span class="doc-card-stat-pill"><i class="fa-solid fa-graduation-cap" style="color: var(--info);"></i> <strong>${this.escapeHTML(doc.subject)}</strong></span>
                            <span class="doc-card-stat-pill"><i class="fa-solid fa-award" style="color: var(--warning);"></i> <strong>${doc.maxMarks || 100}</strong> Marks</span>
                            <span class="doc-card-stat-pill"><i class="fa-solid fa-calendar" style="color: var(--text-muted);"></i> ${doc.year}</span>
                        </div>
                    </div>
                    <div class="doc-card-actions">
                        <button class="btn ${isActive ? 'btn-secondary' : 'btn-primary'} btn-sm" onclick="app.setActiveDoc('${doc.id}')">
                            <i class="fa-solid fa-folder-open"></i> ${isActive ? 'Current' : 'Select Active'}
                        </button>
                        <button class="btn btn-secondary btn-sm" title="Export this document as a file" onclick="app.openExportModal('${doc.id}')">
                            <i class="fa-solid fa-file-arrow-down"></i> Export
                        </button>
                        ${isAdmin ? `
                            <button class="btn btn-secondary btn-sm btn-icon" title="Edit Document Metadata" onclick="app.openEditDocModal('${doc.id}')">
                                <i class="fa-solid fa-pen"></i>
                            </button>
                            <button class="btn btn-danger btn-sm btn-icon" title="Delete Document" onclick="app.deleteDocument('${doc.id}')">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        ` : ''}
                    </div>
                </div>
            `;
        }).join('');
    }

    // --- Render Questions Table ---
    renderQuestionsTable() {
        const tbody = document.getElementById('questionsTableBody');
        if (!tbody) return;

        const isAdmin = this.currentUser?.role === 'admin';
        const query = (document.getElementById('quickSearchInput')?.value || '').toLowerCase().trim();
        const selDoc = document.getElementById('filterDoc')?.value || (this.activeDocId !== 'all' ? this.activeDocId : '');
        const selSubject = document.getElementById('filterSubject')?.value || '';
        const selUnit = document.getElementById('filterUnit')?.value || '';
        const selDiff = document.getElementById('filterDifficulty')?.value || '';

        const filtered = this.questions.filter(q => {
            if (query) {
                if (this.tableFuzzyActive) {
                    const qLower = q.question.toLowerCase();
                    const subLower = q.subject.toLowerCase();
                    const isExact = qLower.includes(query) || subLower.includes(query);
                    if (!isExact) {
                        const subMatch = Algorithms.levenshtein.bestSubstringDistance(query, q.question);
                        const fullSim = Algorithms.levenshtein.similarity(query, q.question).similarity;
                        const fullDist = Algorithms.levenshtein.distance(query, q.question).distance;
                        const bestDist = Math.min(subMatch.distance, fullDist);
                        const bestSim = Math.max(subMatch.similarity, fullSim);
                        const threshold = Math.max(2, Math.floor(query.length * 0.45));
                        if (bestDist > threshold && bestSim < 48) {
                            return false;
                        }
                    }
                } else {
                    if (!q.question.toLowerCase().includes(query) && !q.subject.toLowerCase().includes(query)) {
                        return false;
                    }
                }
            }
            if (selDoc && q.docId !== selDoc) return false;
            if (selSubject && q.subject !== selSubject) return false;
            if (selUnit && q.unit !== parseInt(selUnit)) return false;
            if (selDiff && q.difficulty.toLowerCase() !== selDiff.toLowerCase()) return false;
            return true;
        });

        if (filtered.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="8" style="text-align: center; padding: 32px; color: var(--text-muted);">
                        <i class="fa-solid fa-magnifying-glass" style="font-size: 2rem; margin-bottom: 8px; display: block; opacity: 0.5;"></i>
                        No questions match the current criteria.
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = filtered.map(q => {
            const doc = this.documents.find(d => d.id === q.docId);
            const docName = doc ? doc.title : 'Global Bank';

            let displayText = this.escapeHTML(q.question);
            if (query) {
                displayText = this.highlightMatches(q.question, query);
            }

            return `
                <tr>
                    <td style="font-family: var(--font-mono); font-weight: 600; color: var(--text-muted);">#${q.id}</td>
                    <td class="question-text-cell">${displayText}</td>
                    <td><span class="badge badge-doc" title="${this.escapeHTML(docName)}">${this.escapeHTML(docName.substring(0, 22))}${docName.length > 22 ? '...' : ''}</span></td>
                    <td><span class="badge badge-subject">${this.escapeHTML(q.subject)}</span></td>
                    <td><span class="badge badge-unit">Unit ${q.unit}</span></td>
                    <td><span class="badge badge-${q.difficulty.toLowerCase()}">${q.difficulty}</span></td>
                    <td><span class="badge badge-year">${q.year}</span></td>
                    <td style="text-align: right;">
                        ${isAdmin ? `
                            <div class="action-buttons" style="justify-content: flex-end;">
                                <button class="btn btn-secondary btn-icon" title="Edit Question" onclick="app.openEditQuestionModal(${q.id})">
                                    <i class="fa-solid fa-pen-to-square"></i>
                                </button>
                                <button class="btn btn-danger btn-icon" title="Delete Question" onclick="app.deleteQuestion(${q.id})">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        ` : `
                            <span class="badge badge-student" style="font-size: 0.72rem; opacity: 0.85;"><i class="fa-solid fa-eye"></i> View Only</span>
                        `}
                    </td>
                </tr>
            `;
        }).join('');
    }

    // --- Document CRUD Handling ---
    openCreateDocModal() {
        document.getElementById('docModalTitle').textContent = 'Create Question Document';
        document.getElementById('editDocId').value = '';
        document.getElementById('docFormTitle').value = '';
        document.getElementById('docFormSubject').value = 'DSA';
        document.getElementById('docFormCode').value = '23CS201';
        document.getElementById('docFormYear').value = 2026;
        document.getElementById('docFormMaxMarks').value = 100;
        document.getElementById('docFormDesc').value = '';
        document.getElementById('docModal').classList.add('active');
    }

    openEditDocModal(docId) {
        const doc = this.documents.find(d => d.id === docId);
        if (!doc) return;

        document.getElementById('docModalTitle').textContent = `Edit Document: ${doc.title}`;
        document.getElementById('editDocId').value = doc.id;
        document.getElementById('docFormTitle').value = doc.title;
        document.getElementById('docFormSubject').value = doc.subject;
        document.getElementById('docFormCode').value = doc.code || '';
        document.getElementById('docFormYear').value = doc.year;
        document.getElementById('docFormMaxMarks').value = doc.maxMarks || 100;
        document.getElementById('docFormDesc').value = doc.description || '';
        document.getElementById('docModal').classList.add('active');
    }

    handleDocFormSubmit() {
        const idField = document.getElementById('editDocId').value;
        const title = document.getElementById('docFormTitle').value.trim();
        const subject = document.getElementById('docFormSubject').value.trim();
        const code = document.getElementById('docFormCode').value.trim();
        const year = parseInt(document.getElementById('docFormYear').value);
        const maxMarks = parseInt(document.getElementById('docFormMaxMarks').value) || 100;
        const description = document.getElementById('docFormDesc').value.trim();

        if (!title || !subject || isNaN(year)) {
            this.showToast('Please fill all required document fields.', 'warning');
            return;
        }

        if (idField) {
            const index = this.documents.findIndex(d => d.id === idField);
            if (index !== -1) {
                this.documents[index] = { ...this.documents[index], title, subject, code, year, maxMarks, description };
                this.showToast(`Document "${title}" updated successfully!`, 'success');
            }
        } else {
            const newDocId = this.getNextDocId();
            const newDoc = { id: newDocId, title, subject, code, year, maxMarks, description };
            this.documents.push(newDoc);
            this.activeDocId = newDocId;
            this.showToast(`Document "${title}" created and activated!`, 'success');
        }

        this.saveDocuments();
        this.updateUI();
        document.getElementById('docModal').classList.remove('active');
    }

    deleteDocument(docId) {
        const doc = this.documents.find(d => d.id === docId);
        if (!doc) return;

        const docQuestions = this.questions.filter(q => q.docId === docId);
        if (confirm(`Are you sure you want to delete Document "${doc.title}"?\n\nThis will also remove its ${docQuestions.length} associated questions.`)) {
            this.documents = this.documents.filter(d => d.id !== docId);
            this.questions = this.questions.filter(q => q.docId !== docId);

            if (this.activeDocId === docId) {
                this.activeDocId = this.documents.length > 0 ? this.documents[0].id : 'all';
            }

            this.saveDocuments();
            this.saveQuestions();
            this.updateUI();
            this.showToast(`Document "${doc.title}" deleted.`, 'danger');
        }
    }

    // --- Question CRUD Handling ---
    openAddQuestionModal() {
        if (this.currentUser?.role !== 'admin') {
            this.showToast('Administrator privileges required to add questions.', 'warning');
            return;
        }
        document.getElementById('modalTitle').textContent = 'Add New Question';
        document.getElementById('editQuestionId').value = '';
        document.getElementById('formQuestionText').value = '';
        document.getElementById('formSubject').value = 'DSA';
        document.getElementById('formUnit').value = 1;
        document.getElementById('formDifficulty').value = 'Medium';
        document.getElementById('formYear').value = 2026;

        const formDoc = document.getElementById('formDocument');
        if (formDoc && this.documents.length > 0) {
            formDoc.value = this.activeDocId !== 'all' ? this.activeDocId : this.documents[0].id;
        }

        document.getElementById('questionModal').classList.add('active');
    }

    openEditQuestionModal(id) {
        const q = this.questions.find(x => x.id === id);
        if (!q) return;

        document.getElementById('modalTitle').textContent = `Edit Question #${id}`;
        document.getElementById('editQuestionId').value = q.id;
        document.getElementById('formQuestionText').value = q.question;
        document.getElementById('formSubject').value = q.subject;
        document.getElementById('formUnit').value = q.unit;
        document.getElementById('formDifficulty').value = q.difficulty;
        document.getElementById('formYear').value = q.year;

        const formDoc = document.getElementById('formDocument');
        if (formDoc && q.docId) {
            formDoc.value = q.docId;
        }

        document.getElementById('questionModal').classList.add('active');
    }

    handleQuestionFormSubmit() {
        const idField = document.getElementById('editQuestionId').value;
        const docId = document.getElementById('formDocument').value || (this.documents[0] ? this.documents[0].id : 'doc-1');
        const text = document.getElementById('formQuestionText').value.trim();
        const subject = document.getElementById('formSubject').value.trim();
        const unit = parseInt(document.getElementById('formUnit').value);
        const difficulty = document.getElementById('formDifficulty').value;
        const year = parseInt(document.getElementById('formYear').value);

        if (!text || !subject || isNaN(unit) || isNaN(year)) {
            this.showToast('Please fill all required fields properly.', 'warning');
            return;
        }

        if (idField) {
            const id = parseInt(idField);
            const index = this.questions.findIndex(q => q.id === id);
            if (index !== -1) {
                this.questions[index] = { id, docId, question: text, subject, unit, difficulty, year };
                this.showToast(`Question #${id} updated successfully!`, 'success');
            }
        } else {
            const newId = this.getNextQuestionId();
            this.questions.push({ id: newId, docId, question: text, subject, unit, difficulty, year });
            this.showToast(`Question #${newId} saved to Document!`, 'success');
        }

        this.saveQuestions();
        this.updateUI();
        document.getElementById('questionModal').classList.remove('active');
    }

    deleteQuestion(id) {
        const q = this.questions.find(x => x.id === id);
        if (!q) return;

        if (confirm(`Are you sure you want to delete Question #${id}?\n\n"${q.question}"`)) {
            this.questions = this.questions.filter(x => x.id !== id);
            this.saveQuestions();
            this.updateUI();
            this.showToast(`Question #${id} deleted.`, 'danger');
        }
    }

    // --- Document Single-File Export & Import System ---
    openExportModal(docId) {
        let doc = this.documents.find(d => d.id === docId);
        if (!doc) {
            if (this.documents.length > 0) doc = this.documents[0];
            else {
                this.showToast('No document available to export.', 'warning');
                return;
            }
        }

        this.exportTargetDocId = doc.id;
        document.getElementById('exportDocName').textContent = `"${doc.title}"`;
        document.getElementById('exportModal').classList.add('active');
    }

    exportCurrentDoc(format) {
        const doc = this.documents.find(d => d.id === this.exportTargetDocId) || this.documents[0];
        if (!doc) return;

        const docQuestions = this.questions.filter(q => q.docId === doc.id);
        const fileNameBase = doc.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

        if (format === 'json') {
            // Full Single Document Package
            const packageData = {
                documentMetadata: {
                    id: doc.id,
                    title: doc.title,
                    subject: doc.subject,
                    code: doc.code,
                    year: doc.year,
                    maxMarks: doc.maxMarks,
                    description: doc.description,
                    exportedAt: new Date().toISOString(),
                    version: "1.0-QBMS"
                },
                questionsCount: docQuestions.length,
                questions: docQuestions
            };

            const blob = new Blob([JSON.stringify(packageData, null, 2)], { type: 'application/json' });
            this.triggerDownload(blob, `${fileNameBase}.json`);
            this.showToast(`Downloaded JSON Document: ${fileNameBase}.json`, 'success');
        } else if (format === 'word') {
            // Formatted Word (.doc) File
            let htmlContent = `
                <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
                <head><meta charset='utf-8'><title>${this.escapeHTML(doc.title)}</title>
                <style>
                    body { font-family: 'Times New Roman', serif; margin: 40px; }
                    .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px; }
                    .header h1 { font-size: 20pt; margin: 0; }
                    .header p { font-size: 11pt; margin: 4px 0; }
                    .meta { display: flex; justify-content: space-between; font-weight: bold; margin: 15px 0; }
                    .section-title { font-weight: bold; font-size: 13pt; margin-top: 20px; border-bottom: 1px dashed #666; padding-bottom: 4px; }
                    .q-item { margin: 12px 0; font-size: 12pt; }
                </style>
                </head>
                <body>
                    <div class='header'>
                        <h1>${this.escapeHTML(doc.title)}</h1>
                        <p>Course: ${this.escapeHTML(doc.subject)} (${this.escapeHTML(doc.code || '')}) | Year: ${doc.year}</p>
                        <p>Max Marks: ${doc.maxMarks || 100} | Instructions: ${this.escapeHTML(doc.description || 'Answer all questions.')}</p>
                    </div>
            `;

            let qNum = 1;
            const units = [...new Set(docQuestions.map(q => q.unit))].sort((a, b) => a - b);
            units.forEach(u => {
                htmlContent += `<div class='section-title'>UNIT - ${u}</div>`;
                docQuestions.filter(q => q.unit === u).forEach(q => {
                    const marks = q.difficulty.toLowerCase() === 'easy' ? '5 Marks' : (q.difficulty.toLowerCase() === 'medium' ? '10 Marks' : '15 Marks');
                    htmlContent += `<div class='q-item'><strong>Q${qNum++}.</strong> ${this.escapeHTML(q.question)} <span style='float:right;'>[${marks}] (${q.difficulty})</span></div>`;
                });
            });

            htmlContent += `</body></html>`;
            const blob = new Blob(['\ufeff', htmlContent], { type: 'application/msword' });
            this.triggerDownload(blob, `${fileNameBase}.doc`);
            this.showToast(`Downloaded Word Document: ${fileNameBase}.doc`, 'success');
        } else if (format === 'text') {
            // Formatted Markdown/Plain Text (.txt)
            let txtContent = `====================================================\n`;
            txtContent += `  ${doc.title.toUpperCase()}\n`;
            txtContent += `  Subject: ${doc.subject} (${doc.code || ''}) | Year: ${doc.year}\n`;
            txtContent += `  Max Marks: ${doc.maxMarks || 100}\n`;
            txtContent += `  Instructions: ${doc.description || 'Answer all questions.'}\n`;
            txtContent += `====================================================\n\n`;

            let qNum = 1;
            const units = [...new Set(docQuestions.map(q => q.unit))].sort((a, b) => a - b);
            units.forEach(u => {
                txtContent += `--- UNIT ${u} ---\n`;
                docQuestions.filter(q => q.unit === u).forEach(q => {
                    const marks = q.difficulty.toLowerCase() === 'easy' ? '5 Marks' : (q.difficulty.toLowerCase() === 'medium' ? '10 Marks' : '15 Marks');
                    txtContent += `Q${qNum++}. ${q.question} [${marks}] (${q.difficulty})\n`;
                });
                txtContent += `\n`;
            });

            const blob = new Blob([txtContent], { type: 'text/plain;charset=utf-8' });
            this.triggerDownload(blob, `${fileNameBase}.txt`);
            this.showToast(`Downloaded Text Document: ${fileNameBase}.txt`, 'success');
        }

        document.getElementById('exportModal').classList.remove('active');
    }

    triggerDownload(blob, fileName) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    openImportModal() {
        if (this.currentUser?.role !== 'admin') {
            this.showToast('Administrator privileges required to import question documents.', 'warning');
            return;
        }
        document.getElementById('importPasteJson').value = '';
        document.getElementById('importFileInput').value = '';
        document.getElementById('importModal').classList.add('active');
    }

    handleFileInput(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById('importPasteJson').value = e.target.result;
        };
        reader.readAsText(file);
    }

    handleImportExecution() {
        const rawJson = document.getElementById('importPasteJson').value.trim();
        if (!rawJson) {
            this.showToast('Please select a document file or paste JSON content.', 'warning');
            return;
        }

        try {
            const data = JSON.parse(rawJson);
            let importedDoc = null;
            let importedQuestions = [];

            if (data.documentMetadata && Array.isArray(data.questions)) {
                // Structured QBMS Document Package
                importedDoc = {
                    id: 'doc-' + Date.now(),
                    title: data.documentMetadata.title || 'Imported Question Document',
                    subject: data.documentMetadata.subject || 'General',
                    code: data.documentMetadata.code || '',
                    year: data.documentMetadata.year || 2026,
                    maxMarks: data.documentMetadata.maxMarks || 100,
                    description: data.documentMetadata.description || 'Imported from external file.'
                };

                let startId = this.getNextQuestionId();
                importedQuestions = data.questions.map(q => ({
                    id: startId++,
                    docId: importedDoc.id,
                    question: q.question,
                    subject: q.subject || importedDoc.subject,
                    unit: parseInt(q.unit) || 1,
                    difficulty: q.difficulty || 'Medium',
                    year: parseInt(q.year) || importedDoc.year
                }));
            } else if (Array.isArray(data)) {
                // Raw array of questions
                importedDoc = {
                    id: 'doc-' + Date.now(),
                    title: 'Imported Question Set (' + new Date().toLocaleDateString() + ')',
                    subject: data[0]?.subject || 'DSA',
                    code: 'IMP101',
                    year: 2026,
                    maxMarks: 100,
                    description: `Contains ${data.length} questions imported as a document set.`
                };

                let startId = this.getNextQuestionId();
                importedQuestions = data.map(q => ({
                    id: startId++,
                    docId: importedDoc.id,
                    question: typeof q === 'string' ? q : (q.question || 'Untitled Question'),
                    subject: q.subject || importedDoc.subject,
                    unit: parseInt(q.unit) || 1,
                    difficulty: q.difficulty || 'Medium',
                    year: parseInt(q.year) || 2026
                }));
            } else {
                throw new Error('Unrecognized document format');
            }

            // Save into repository
            this.documents.push(importedDoc);
            this.questions.push(...importedQuestions);
            this.activeDocId = importedDoc.id;

            this.saveDocuments();
            this.saveQuestions();
            this.updateUI();

            document.getElementById('importModal').classList.remove('active');
            this.showToast(`Successfully imported "${importedDoc.title}" with ${importedQuestions.length} questions!`, 'success');
        } catch (err) {
            this.showToast('Failed to parse document file. Please ensure it is valid JSON.', 'danger');
        }
    }

    // --- View 2: KMP Search Execution ---
    runKMPSearch() {
        const keyword = document.getElementById('kmpKeyword').value.trim();
        const lpsContainer = document.getElementById('kmpLpsContainer');
        const lpsDisplay = document.getElementById('kmpLpsDisplay');
        const resultsList = document.getElementById('kmpResultsList');

        if (!keyword) {
            this.showToast('Please enter a pattern keyword to search.', 'warning');
            return;
        }

        const lps = Algorithms.kmp.computeLPSArray(keyword);
        lpsContainer.style.display = 'block';
        lpsDisplay.innerHTML = keyword.split('').map((char, idx) => `
            <div class="array-cell">
                <span class="cell-char">${this.escapeHTML(char)}</span>
                <span class="cell-val">${lps[idx]}</span>
            </div>
        `).join('');

        const targetQuestions = this.getScopedQuestions();
        const matches = [];

        targetQuestions.forEach(q => {
            const res = Algorithms.kmp.search(q.question, keyword);
            if (res.found) {
                matches.push({ question: q, matchIndices: res.matches });
            }
        });

        if (matches.length === 0) {
            resultsList.innerHTML = `<p style="color: var(--text-muted); font-style: italic;">No exact KMP match found in the selected scope.</p>`;
            return;
        }

        resultsList.innerHTML = matches.map(m => {
            const highlightedText = this.highlightMatches(m.question.question, keyword);
            const doc = this.documents.find(d => d.id === m.question.docId);
            return `
                <div class="dup-item">
                    <div style="flex: 1;">
                        <div style="display: flex; gap: 8px; margin-bottom: 6px; align-items: center;">
                            <span style="font-weight: 700; color: var(--accent-primary);">#${m.question.id}</span>
                            <span class="badge badge-doc">${this.escapeHTML(doc ? doc.title : 'Global')}</span>
                            <span class="badge badge-subject">${m.question.subject}</span>
                            <span class="badge badge-${m.question.difficulty.toLowerCase()}">${m.question.difficulty}</span>
                            <span style="font-size: 0.8rem; color: var(--success);"><i class="fa-solid fa-check"></i> ${m.matchIndices.length} occurrence(s)</span>
                        </div>
                        <div style="font-size: 0.95rem;">${highlightedText}</div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // --- View 3: Rabin-Karp Execution ---
    runRabinKarpSearch() {
        const keyword = document.getElementById('rkKeyword').value.trim();
        const hashContainer = document.getElementById('rkHashContainer');
        const hashText = document.getElementById('rkHashText');
        const resultsList = document.getElementById('rkResultsList');

        if (!keyword) {
            this.showToast('Please enter a keyword for Rabin-Karp search.', 'warning');
            return;
        }

        const matches = [];
        let patternHashSample = null;
        const targetQuestions = this.getScopedQuestions();

        targetQuestions.forEach(q => {
            const res = Algorithms.rabinKarp.search(q.question, keyword);
            if (patternHashSample === null) patternHashSample = res.patternHash;
            if (res.found) {
                matches.push({ question: q, res: res });
            }
        });

        hashContainer.style.display = 'block';
        hashText.innerHTML = `Pattern: <strong>"${this.escapeHTML(keyword)}"</strong> | Hash Value ($P \\pmod{101}$): <strong style="color: #6366f1;">${patternHashSample}</strong> (Base: 256, Modulo: 101)`;

        if (matches.length === 0) {
            resultsList.innerHTML = `<p style="color: var(--text-muted); font-style: italic;">No exact Rabin-Karp match found in selected scope.</p>`;
            return;
        }

        resultsList.innerHTML = matches.map(m => {
            const highlightedText = this.highlightMatches(m.question.question, keyword);
            const matchedWindows = m.res.windows.filter(w => w.hashMatched);
            const doc = this.documents.find(d => d.id === m.question.docId);

            return `
                <div class="dup-item" style="flex-direction: column; align-items: stretch;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div style="display: flex; gap: 8px; align-items: center;">
                            <span style="font-weight: 700; color: var(--accent-primary);">#${m.question.id}</span>
                            <span class="badge badge-doc">${this.escapeHTML(doc ? doc.title : 'Global')}</span>
                            <span class="badge badge-subject">${m.question.subject}</span>
                            <span class="badge badge-${m.question.difficulty.toLowerCase()}">${m.question.difficulty}</span>
                        </div>
                        <span style="font-size: 0.8rem; color: var(--info); font-family: var(--font-mono);">
                            Hash Matches: ${matchedWindows.length}
                        </span>
                    </div>
                    <div style="margin-top: 8px; font-size: 0.95rem;">${highlightedText}</div>
                </div>
            `;
        }).join('');
    }

    // --- View 4: Fuzzy Search (Levenshtein) ---
    runFuzzySearch() {
        const query = document.getElementById('fuzzyQuery').value.trim();
        const threshold = parseInt(document.getElementById('fuzzyThreshold').value);
        const resultsList = document.getElementById('fuzzyResultsList');

        if (!query) {
            this.showToast('Please enter a query text to perform fuzzy search.', 'warning');
            return;
        }

        const results = [];
        const targetQuestions = this.getScopedQuestions();

        targetQuestions.forEach(q => {
            const fullDist = Algorithms.levenshtein.distance(query, q.question).distance;
            const fullSim = Algorithms.levenshtein.similarity(query, q.question).similarity;
            const subMatch = Algorithms.levenshtein.bestSubstringDistance(query, q.question);

            const effectiveDist = Math.min(fullDist, subMatch.distance);
            const effectiveSim = Math.max(fullSim, subMatch.similarity);

            if (effectiveDist <= threshold || q.question.toLowerCase().includes(query.toLowerCase())) {
                results.push({
                    question: q,
                    distance: effectiveDist,
                    similarity: effectiveSim,
                    matchedPhrase: subMatch.matchedSubstring
                });
            }
        });

        results.sort((a, b) => b.similarity - a.similarity);

        if (results.length === 0) {
            resultsList.innerHTML = `<p style="color: var(--text-muted); font-style: italic;">No questions match within edit distance ≤ ${threshold}.</p>`;
            return;
        }

        resultsList.innerHTML = results.map(r => {
            const doc = this.documents.find(d => d.id === r.question.docId);
            return `
                <div class="dup-item">
                    <div style="flex: 1;">
                        <div style="display: flex; gap: 8px; margin-bottom: 6px; align-items: center;">
                            <span style="font-weight: 700; color: var(--accent-primary);">#${r.question.id}</span>
                            <span class="badge badge-doc">${this.escapeHTML(doc ? doc.title : 'Global')}</span>
                            <span class="badge badge-subject">${r.question.subject}</span>
                            <span class="badge badge-${r.question.difficulty.toLowerCase()}">${r.question.difficulty}</span>
                            ${r.matchedPhrase ? `<span class="badge badge-unit"><i class="fa-solid fa-crosshairs"></i> Closest: "${this.escapeHTML(r.matchedPhrase)}"</span>` : ''}
                        </div>
                        <div style="font-size: 0.95rem; margin-bottom: 4px;">${this.highlightMatches(r.question.question, r.matchedPhrase || query)}</div>
                        <div style="font-size: 0.8rem; color: var(--text-secondary); display: flex; gap: 16px; margin-top: 6px;">
                            <span>Edit Distance: <strong style="color: var(--accent-primary);">${r.distance}</strong></span>
                            <span>Similarity Score: <strong style="color: ${r.similarity > 70 ? 'var(--success)' : 'var(--warning)'};">${r.similarity.toFixed(2)}%</strong></span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // --- View 5: Question Similarity Comparison & Real-Time Search ---
    populateSimilarityDropdowns() {
        const subjects = [...new Set(this.questions.map(q => q.subject))].filter(Boolean);
        const sub1 = document.getElementById('simSubject1');
        const sub2 = document.getElementById('simSubject2');

        const subjectOptions = '<option value="">All Subjects</option>' +
            subjects.map(s => `<option value="${this.escapeHTML(s)}">${this.escapeHTML(s)}</option>`).join('');

        if (sub1) sub1.innerHTML = subjectOptions;
        if (sub2) sub2.innerHTML = subjectOptions;

        this.filterSimilarityQuestions(1, false);
        this.filterSimilarityQuestions(2, false);

        const custom1 = document.getElementById('simCustom1');
        const custom2 = document.getElementById('simCustom2');
        const questions = this.getScopedQuestions();

        if (custom1 && custom2 && (!custom1.value || !custom2.value) && questions.length >= 2) {
            custom1.value = questions[0].question;
            custom2.value = questions[1].question;
            const sel1 = document.getElementById('simSelect1');
            const sel2 = document.getElementById('simSelect2');
            if (sel1) sel1.value = questions[0].id;
            if (sel2) sel2.value = questions[1].id;
        }

        if (custom1?.value && custom2?.value) {
            this.runSimilarityCompare();
        }
    }

    filterSimilarityQuestions(targetNum, autoSelectFirst = false) {
        const searchInput = document.getElementById(`simSearch${targetNum}`);
        const subjectSelect = document.getElementById(`simSubject${targetNum}`);
        const selectEl = document.getElementById(`simSelect${targetNum}`);
        const badgeEl = document.getElementById(`simCountBadge${targetNum}`);
        const customText = document.getElementById(`simCustom${targetNum}`);

        if (!selectEl) return;

        const query = (searchInput?.value || '').trim().toLowerCase();
        const selectedSubject = subjectSelect?.value || '';
        const scoped = this.getScopedQuestions();

        const filtered = scoped.filter(q => {
            if (selectedSubject && q.subject !== selectedSubject) return false;
            if (!query) return true;

            const numQuery = query.replace(/^#/, '');
            if (numQuery && !isNaN(numQuery) && q.id === parseInt(numQuery)) return true;

            const textMatch = q.question.toLowerCase().includes(query);
            const subjectMatch = q.subject.toLowerCase().includes(query);
            const diffMatch = q.difficulty.toLowerCase().includes(query);
            const unitMatch = `unit ${q.unit}`.includes(query) || `u${q.unit}`.includes(query);

            return textMatch || subjectMatch || diffMatch || unitMatch;
        });

        if (badgeEl) {
            badgeEl.textContent = `${filtered.length} found`;
            badgeEl.className = filtered.length > 0 ? 'badge badge-doc' : 'badge badge-hard';
        }

        const currentVal = selectEl.value;

        if (filtered.length === 0) {
            selectEl.innerHTML = `<option value="" disabled style="font-style: italic; color: var(--text-muted);">No matching questions found</option>`;
            return;
        }

        selectEl.innerHTML = filtered.map(q => {
            const shortQ = q.question.length > 60 ? q.question.substring(0, 58) + '...' : q.question;
            return `<option value="${q.id}">#${q.id} [${this.escapeHTML(q.subject)} U${q.unit} - ${q.difficulty}]: ${this.escapeHTML(shortQ)}</option>`;
        }).join('');

        if (filtered.some(q => q.id.toString() === currentVal)) {
            selectEl.value = currentVal;
        } else if (autoSelectFirst && filtered.length > 0) {
            selectEl.value = filtered[0].id;
            if (customText) {
                customText.value = filtered[0].question;
            }
        }
    }

    swapSimilarityQuestions() {
        const s1 = document.getElementById('simSearch1');
        const s2 = document.getElementById('simSearch2');
        const sub1 = document.getElementById('simSubject1');
        const sub2 = document.getElementById('simSubject2');
        const c1 = document.getElementById('simCustom1');
        const c2 = document.getElementById('simCustom2');

        const tempSearch = s1?.value || '';
        if (s1) s1.value = s2?.value || '';
        if (s2) s2.value = tempSearch;

        const tempSub = sub1?.value || '';
        if (sub1) sub1.value = sub2?.value || '';
        if (sub2) sub2.value = tempSub;

        const tempText = c1?.value || '';
        if (c1) c1.value = c2?.value || '';
        if (c2) c2.value = tempText;

        this.filterSimilarityQuestions(1, false);
        this.filterSimilarityQuestions(2, false);

        if (c1?.value && c2?.value) {
            this.runSimilarityCompare();
            this.showToast('Questions swapped successfully', 'info');
        }
    }

    pickRandomSimilarityPair() {
        const questions = this.getScopedQuestions();
        if (questions.length < 2) {
            this.showToast('At least 2 questions are required to pick a random pair.', 'warning');
            return;
        }

        const idx1 = Math.floor(Math.random() * questions.length);
        let idx2 = Math.floor(Math.random() * (questions.length - 1));
        if (idx2 >= idx1) idx2++;

        const q1 = questions[idx1];
        const q2 = questions[idx2];

        const s1 = document.getElementById('simSearch1');
        const s2 = document.getElementById('simSearch2');
        const sub1 = document.getElementById('simSubject1');
        const sub2 = document.getElementById('simSubject2');

        if (s1) s1.value = '';
        if (s2) s2.value = '';
        if (sub1) sub1.value = '';
        if (sub2) sub2.value = '';

        this.filterSimilarityQuestions(1, false);
        this.filterSimilarityQuestions(2, false);

        const sel1 = document.getElementById('simSelect1');
        const sel2 = document.getElementById('simSelect2');
        if (sel1) sel1.value = q1.id;
        if (sel2) sel2.value = q2.id;

        const c1 = document.getElementById('simCustom1');
        const c2 = document.getElementById('simCustom2');
        if (c1) c1.value = q1.question;
        if (c2) c2.value = q2.question;

        this.runSimilarityCompare();
        this.showToast(`Selected Random Pair: #${q1.id} & #${q2.id}`, 'success');
    }

    runSimilarityCompare() {
        const text1 = document.getElementById('simCustom1').value.trim();
        const text2 = document.getElementById('simCustom2').value.trim();

        if (!text1 || !text2) {
            this.showToast('Please provide both questions to compare.', 'warning');
            return;
        }

        const simResult = Algorithms.levenshtein.similarity(text1, text2);
        const diffSummary = Algorithms.getDiffSummary(text1, text2);

        const resultBox = document.getElementById('similarityResultBox');
        resultBox.style.display = 'block';

        const gauge = document.getElementById('simGauge');
        gauge.style.setProperty('--percent', simResult.similarity.toFixed(1));
        document.getElementById('simPercentScore').textContent = `${simResult.similarity.toFixed(1)}%`;

        const verdictBadge = document.getElementById('simVerdictBadge');
        if (simResult.similarity >= 80) {
            verdictBadge.innerHTML = `<span class="badge badge-hard" style="font-size: 0.85rem;"><i class="fa-solid fa-triangle-exclamation"></i> Possible Duplicate</span>`;
        } else if (simResult.similarity >= 50) {
            verdictBadge.innerHTML = `<span class="badge badge-medium" style="font-size: 0.85rem;"><i class="fa-solid fa-circle-exclamation"></i> Moderate Overlap</span>`;
        } else {
            verdictBadge.innerHTML = `<span class="badge badge-easy" style="font-size: 0.85rem;"><i class="fa-solid fa-check"></i> Distinct Questions</span>`;
        }

        document.getElementById('simEditDistanceInfo').textContent = `Levenshtein Edit Distance: ${simResult.distance} / ${simResult.maxLen}`;

        document.getElementById('diffText1').innerHTML = this.renderDiffWords(text1, diffSummary.common);
        document.getElementById('diffText2').innerHTML = this.renderDiffWords(text2, diffSummary.common);
    }

    renderDiffWords(text, commonWords) {
        const commonSet = new Set(commonWords.map(w => w.toLowerCase()));
        return text.split(/(\s+)/).map(part => {
            const clean = part.toLowerCase().replace(/[^a-z0-9]/g, '');
            if (clean && commonSet.has(clean)) {
                return `<span class="diff-highlight">${this.escapeHTML(part)}</span>`;
            } else if (clean) {
                return `<span class="diff-unique">${this.escapeHTML(part)}</span>`;
            }
            return part;
        }).join('');
    }

    // --- View 6: Duplicate Matrix ---
    runDuplicateScan() {
        const threshold = parseFloat(document.getElementById('dupThresholdSlider')?.value || 60);
        const container = document.getElementById('duplicateMatrixResults');
        if (!container) return;

        const targetQuestions = this.getScopedQuestions();
        const duplicates = [];

        for (let i = 0; i < targetQuestions.length; i++) {
            for (let j = i + 1; j < targetQuestions.length; j++) {
                const sim = Algorithms.levenshtein.similarity(targetQuestions[i].question, targetQuestions[j].question);
                if (sim.similarity >= threshold) {
                    duplicates.push({
                        q1: targetQuestions[i],
                        q2: targetQuestions[j],
                        similarity: sim.similarity,
                        distance: sim.distance
                    });
                }
            }
        }

        duplicates.sort((a, b) => b.similarity - a.similarity);

        if (duplicates.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 36px; color: var(--text-muted); background: var(--bg-primary); border-radius: var(--radius-md);">
                    <i class="fa-solid fa-shield-check" style="font-size: 2.2rem; color: var(--success); margin-bottom: 10px; display: block;"></i>
                    No duplicate question pairs found in scope with similarity ≥ ${threshold}%.
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <div style="margin-bottom: 14px; font-weight: 600; color: var(--danger);">
                <i class="fa-solid fa-triangle-exclamation"></i> Found ${duplicates.length} potential duplicate pair(s):
            </div>
            ${duplicates.map(dup => {
                const doc1 = this.documents.find(d => d.id === dup.q1.docId);
                const doc2 = this.documents.find(d => d.id === dup.q2.docId);

                return `
                    <div class="dup-item" style="flex-direction: column; align-items: stretch;">
                        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 8px;">
                            <span style="font-weight: 700; color: var(--danger);">
                                <i class="fa-solid fa-circle-exclamation"></i> Similarity: ${dup.similarity.toFixed(2)}%
                            </span>
                            <span style="font-size: 0.8rem; color: var(--text-muted);">
                                Edit Distance: ${dup.distance}
                            </span>
                        </div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 10px;">
                            <div style="background: var(--bg-glass); padding: 10px; border-radius: 6px;">
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <span style="font-size: 0.8rem; color: var(--accent-primary); font-weight: bold;">Q#${dup.q1.id} (Unit ${dup.q1.unit})</span>
                                    <span class="badge badge-doc">${this.escapeHTML(doc1 ? doc1.title : 'Global')}</span>
                                </div>
                                <p style="margin-top: 6px; font-size: 0.9rem;">${this.escapeHTML(dup.q1.question)}</p>
                            </div>
                            <div style="background: var(--bg-glass); padding: 10px; border-radius: 6px;">
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <span style="font-size: 0.8rem; color: var(--accent-primary); font-weight: bold;">Q#${dup.q2.id} (Unit ${dup.q2.unit})</span>
                                    <span class="badge badge-doc">${this.escapeHTML(doc2 ? doc2.title : 'Global')}</span>
                                </div>
                                <p style="margin-top: 6px; font-size: 0.9rem;">${this.escapeHTML(dup.q2.question)}</p>
                            </div>
                        </div>
                    </div>
                `;
            }).join('')}
        `;
    }

    // --- View 7: Question Paper Generator ---
    populatePaperSubjects() {
        const subjects = [...new Set(this.questions.map(q => q.subject))].sort();
        const sel = document.getElementById('paperSubjectSelect');
        if (!sel) return;
        sel.innerHTML = '<option value="">All Subjects</option>' +
            subjects.map(s => `<option value="${s}">${s}</option>`).join('');
    }

    generateQuestionPaper() {
        const activeDoc = this.documents.find(d => d.id === this.activeDocId);
        const defaultTitle = activeDoc ? activeDoc.title : 'Data Structures & Algorithms - Examination';
        const title = document.getElementById('paperTitleInput')?.value || defaultTitle;
        const selSubject = document.getElementById('paperSubjectSelect')?.value || '';

        document.getElementById('paperExamTitle').textContent = title;
        document.getElementById('paperSubjectMeta').textContent = `Subject: ${selSubject || (activeDoc ? activeDoc.subject : 'All Subjects')}`;

        const container = document.getElementById('paperSectionsContainer');
        const sourceQuestions = this.getScopedQuestions();
        const filtered = sourceQuestions.filter(q => !selSubject || q.subject === selSubject);

        const units = [...new Set(filtered.map(q => q.unit))].sort((a, b) => a - b);

        if (units.length === 0) {
            container.innerHTML = `<p style="text-align: center; padding: 20px;">No questions available in selected scope to generate paper.</p>`;
            return;
        }

        let questionIndex = 1;
        container.innerHTML = units.map(u => {
            const unitQuestions = filtered.filter(q => q.unit === u);
            return `
                <div class="paper-section-title">UNIT - ${u}</div>
                ${unitQuestions.map(q => {
                    const marks = q.difficulty.toLowerCase() === 'easy' ? '5 Marks' : (q.difficulty.toLowerCase() === 'medium' ? '10 Marks' : '15 Marks');
                    return `
                        <div class="paper-question-item">
                            <div><strong>Q${questionIndex++}.</strong> ${this.escapeHTML(q.question)}</div>
                            <div class="paper-q-marks">[${marks}]</div>
                        </div>
                    `;
                }).join('')}
            `;
        }).join('');
    }

    // --- General Helpers ---
    highlightMatches(text, keyword) {
        if (!keyword) return this.escapeHTML(text);
        const regex = new RegExp(`(${this.escapeRegExp(keyword)})`, 'gi');
        return this.escapeHTML(text).replace(regex, `<mark style="background: rgba(99, 102, 241, 0.35); color: #fff; border-radius: 3px; padding: 1px 4px;">$1</mark>`);
    }

    escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    escapeHTML(str) {
        if (str === null || str === undefined) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    showToast(message, type = 'info') {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        const icon = type === 'success' ? 'fa-check' : (type === 'danger' ? 'fa-trash' : (type === 'warning' ? 'fa-circle-exclamation' : 'fa-info'));
        toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${this.escapeHTML(message)}</span>`;

        container.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}

// Instantiate on load
document.addEventListener('DOMContentLoaded', () => {
    window.app = new QBMSApp();
});
