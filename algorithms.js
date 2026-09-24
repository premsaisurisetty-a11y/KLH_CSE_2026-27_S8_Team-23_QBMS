/**
 * Algorithms for Question Bank Management System (QBMS)
 * Implements KMP, Rabin-Karp, and Levenshtein Distance matching Java DSA-3 Project.
 */

const Algorithms = {
    /**
     * KMP (Knuth-Morris-Pratt) Pattern Searching Algorithm
     */
    kmp: {
        computeLPSArray: function (pat) {
            const M = pat.length;
            const lps = new Array(M).fill(0);
            let len = 0;
            let i = 1;

            while (i < M) {
                if (pat.charAt(i) === pat.charAt(len)) {
                    len++;
                    lps[i] = len;
                    i++;
                } else {
                    if (len !== 0) {
                        len = lps[len - 1];
                    } else {
                        lps[i] = 0;
                        i++;
                    }
                }
            }
            return lps;
        },

        search: function (text, pattern) {
            if (!pattern) return { found: true, matches: [0], lps: [], steps: [] };
            if (!text) return { found: false, matches: [], lps: [], steps: [] };

            const txt = text.toLowerCase();
            const pat = pattern.toLowerCase();
            const N = txt.length;
            const M = pat.length;

            const lps = this.computeLPSArray(pat);
            const matches = [];
            const steps = [];

            let i = 0; // index for txt
            let j = 0; // index for pat

            while (i < N) {
                steps.push({
                    textIndex: i,
                    patternIndex: j,
                    charText: txt.charAt(i),
                    charPat: pat.charAt(j),
                    match: pat.charAt(j) === txt.charAt(i)
                });

                if (pat.charAt(j) === txt.charAt(i)) {
                    j++;
                    i++;
                }

                if (j === M) {
                    matches.push(i - j);
                    j = lps[j - 1]; // look for next match
                } else if (i < N && pat.charAt(j) !== txt.charAt(i)) {
                    if (j !== 0) {
                        j = lps[j - 1];
                    } else {
                        i = i + 1;
                    }
                }
            }

            return {
                found: matches.length > 0,
                matches: matches,
                lps: lps,
                steps: steps
            };
        }
    },

    /**
     * Rabin-Karp Pattern Searching Algorithm using Rolling Hash
     * Base d = 256, Prime q = 101 (matching Java implementation)
     */
    rabinKarp: {
        d: 256,
        q: 101,

        search: function (text, pattern) {
            if (!pattern) return { found: true, matches: [], windows: [] };
            if (!text) return { found: false, matches: [], windows: [] };

            const txt = text.toLowerCase();
            const pat = pattern.toLowerCase();
            const M = pat.length;
            const N = txt.length;

            if (N < M) {
                return { found: false, matches: [], windows: [] };
            }

            const d = this.d;
            const q = this.q;
            let p = 0; // hash value for pattern
            let t = 0; // hash value for txt
            let h = 1;

            // h = (d^(M-1)) % q
            for (let i = 0; i < M - 1; i++) {
                h = (h * d) % q;
            }

            // Calculate pattern hash & first text window hash
            for (let i = 0; i < M; i++) {
                p = (d * p + pat.charCodeAt(i)) % q;
                t = (d * t + txt.charCodeAt(i)) % q;
            }

            const matches = [];
            const windows = [];

            for (let i = 0; i <= N - M; i++) {
                const windowText = txt.substring(i, i + M);
                let charMatch = false;

                if (p === t) {
                    // Check characters one by one
                    let matchCount = 0;
                    for (let j = 0; j < M; j++) {
                        if (txt.charAt(i + j) !== pat.charAt(j)) {
                            break;
                        }
                        matchCount++;
                    }
                    if (matchCount === M) {
                        charMatch = true;
                        matches.push(i);
                    }
                }

                windows.push({
                    index: i,
                    windowText: windowText,
                    patternHash: p,
                    windowHash: t,
                    hashMatched: p === t,
                    charMatched: charMatch
                });

                // Calculate hash for next window
                if (i < N - M) {
                    t = (d * (t - txt.charCodeAt(i) * h) + txt.charCodeAt(i + M)) % q;
                    if (t < 0) {
                        t = t + q;
                    }
                }
            }

            return {
                found: matches.length > 0,
                matches: matches,
                patternHash: p,
                windows: windows
            };
        }
    },

    /**
     * Levenshtein Distance & Similarity (Dynamic Programming)
     */
    levenshtein: {
        distance: function (s1, s2) {
            if (!s1 && !s2) return 0;
            if (!s1) return s2.length;
            if (!s2) return s1.length;

            const str1 = s1.toLowerCase();
            const str2 = s2.toLowerCase();
            const len1 = str1.length;
            const len2 = str2.length;

            const dp = Array.from({ length: len1 + 1 }, () => new Array(len2 + 1).fill(0));

            for (let i = 0; i <= len1; i++) dp[i][0] = i;
            for (let j = 0; j <= len2; j++) dp[0][j] = j;

            for (let i = 1; i <= len1; i++) {
                for (let j = 1; j <= len2; j++) {
                    if (str1.charAt(i - 1) === str2.charAt(j - 1)) {
                        dp[i][j] = dp[i - 1][j - 1];
                    } else {
                        dp[i][j] = 1 + Math.min(
                            dp[i - 1][j - 1], // Substitution
                            dp[i - 1][j],     // Deletion
                            dp[i][j - 1]      // Insertion
                        );
                    }
                }
            }

            return {
                distance: dp[len1][len2],
                matrix: dp,
                str1: str1,
                str2: str2
            };
        },

        similarity: function (s1, s2) {
            if (!s1 || !s2) {
                if (!s1 && !s2) return 100.0;
                return 0.0;
            }
            if (s1.length === 0 && s2.length === 0) return 100.0;

            const res = this.distance(s1, s2);
            const maxLen = Math.max(s1.length, s2.length);
            const score = ((1.0 - res.distance / maxLen) * 100.0);
            return {
                similarity: Math.max(0, Math.min(100, score)),
                distance: res.distance,
                maxLen: maxLen,
                matrix: res.matrix
            };
        },

        bestSubstringDistance: function (query, text) {
            if (!query || !text) return { distance: 999, similarity: 0, matchedSubstring: "" };
            const q = query.toLowerCase();
            const t = text.toLowerCase();

            if (t.includes(q)) {
                return { distance: 0, similarity: 100, matchedSubstring: query };
            }

            let minDistance = this.distance(q, t).distance;
            let bestSub = text;
            const qLen = q.length;

            // Check sliding windows of lengths around qLen
            for (let len = Math.max(1, qLen - 3); len <= Math.min(t.length, qLen + 3); len++) {
                for (let i = 0; i <= t.length - len; i++) {
                    const sub = t.substring(i, i + len);
                    const d = this.distance(q, sub).distance;
                    if (d < minDistance) {
                        minDistance = d;
                        bestSub = text.substring(i, i + len);
                    }
                }
            }

            const maxLen = Math.max(q.length, bestSub.length);
            const sim = Math.max(0, Math.min(100, (1.0 - minDistance / maxLen) * 100.0));
            return {
                distance: minDistance,
                similarity: sim,
                matchedSubstring: bestSub
            };
        }
    },

    /**
     * Boyer-Moore-Horspool Pattern Searching Algorithm
     * Uses Bad Character Shift Table (Delta 1) for sublinear skips
     */
    boyerMoore: {
        buildBadCharTable: function (pat) {
            const M = pat.length;
            const badChar = {};
            for (let i = 0; i < M - 1; i++) {
                badChar[pat.charAt(i)] = M - 1 - i;
            }
            return badChar;
        },

        search: function (text, pattern) {
            if (!pattern) return { found: true, matches: [0], badChar: {}, comparisons: 0, shifts: [] };
            if (!text) return { found: false, matches: [], badChar: {}, comparisons: 0, shifts: [] };

            const txt = text.toLowerCase();
            const pat = pattern.toLowerCase();
            const N = txt.length;
            const M = pat.length;

            if (N < M) return { found: false, matches: [], badChar: {}, comparisons: 0, shifts: [] };

            const badChar = this.buildBadCharTable(pat);
            const matches = [];
            const shifts = [];
            let comparisons = 0;
            let s = 0; // shift of pattern with respect to text

            while (s <= N - M) {
                let j = M - 1;

                while (j >= 0) {
                    comparisons++;
                    if (pat.charAt(j) !== txt.charAt(s + j)) {
                        break;
                    }
                    j--;
                }

                if (j < 0) {
                    matches.push(s);
                    const shiftVal = (s + M < N) ? (badChar[txt.charAt(s + M - 1)] || M) : 1;
                    shifts.push({ shiftIndex: s, match: true, nextShift: shiftVal });
                    s += shiftVal;
                } else {
                    const mismatchChar = txt.charAt(s + M - 1);
                    const shiftVal = badChar[mismatchChar] || M;
                    shifts.push({ shiftIndex: s, match: false, mismatchChar: mismatchChar, nextShift: shiftVal });
                    s += shiftVal;
                }
            }

            return {
                found: matches.length > 0,
                matches: matches,
                badChar: badChar,
                comparisons: comparisons,
                shifts: shifts
            };
        }
    },

    /**
     * Benchmark & Compare All Searching Algorithms Simultaneously
     */
    benchmarkAll: function (corpus, pattern, maxEditDist = 4) {
        const results = {
            query: pattern,
            corpusSize: corpus.length,
            algorithms: {}
        };

        // 1. KMP Benchmark
        const t0_kmp = performance.now();
        let kmpMatches = 0;
        let kmpComps = 0;
        corpus.forEach(item => {
            const text = typeof item === 'string' ? item : (item.question || '');
            const res = this.kmp.search(text, pattern);
            if (res.found) kmpMatches++;
            kmpComps += res.steps ? res.steps.length : text.length;
        });
        const t1_kmp = performance.now();
        results.algorithms.kmp = {
            name: "Knuth-Morris-Pratt (KMP)",
            timeMs: (t1_kmp - t0_kmp),
            matches: kmpMatches,
            comparisons: kmpComps,
            timeComplexity: "O(N + M)",
            spaceComplexity: "O(M)",
            type: "Exact Pattern Matching with LPS Array"
        };

        // 2. Rabin-Karp Benchmark
        const t0_rk = performance.now();
        let rkMatches = 0;
        let rkComps = 0;
        corpus.forEach(item => {
            const text = typeof item === 'string' ? item : (item.question || '');
            const res = this.rabinKarp.search(text, pattern);
            if (res.found) rkMatches++;
            rkComps += res.windows ? res.windows.length : text.length;
        });
        const t1_rk = performance.now();
        results.algorithms.rabinKarp = {
            name: "Rabin-Karp Rolling Hash",
            timeMs: (t1_rk - t0_rk),
            matches: rkMatches,
            comparisons: rkComps,
            timeComplexity: "O(N + M) avg, O(NM) worst",
            spaceComplexity: "O(1)",
            type: "Polynomial Rolling Hash (d=256, q=101)"
        };

        // 3. Boyer-Moore-Horspool Benchmark
        const t0_bm = performance.now();
        let bmMatches = 0;
        let bmComps = 0;
        corpus.forEach(item => {
            const text = typeof item === 'string' ? item : (item.question || '');
            const res = this.boyerMoore.search(text, pattern);
            if (res.found) bmMatches++;
            bmComps += res.comparisons;
        });
        const t1_bm = performance.now();
        results.algorithms.boyerMoore = {
            name: "Boyer-Moore-Horspool",
            timeMs: (t1_bm - t0_bm),
            matches: bmMatches,
            comparisons: bmComps,
            timeComplexity: "O(N / M) best, O(NM) worst",
            spaceComplexity: "O(Σ) / O(M)",
            type: "Sublinear Search with Bad Character Table"
        };

        // 4. Levenshtein / Fuzzy Benchmark
        const t0_fz = performance.now();
        let fzMatches = 0;
        let fzComps = 0;
        corpus.forEach(item => {
            const text = typeof item === 'string' ? item : (item.question || '');
            const subMatch = this.levenshtein.bestSubstringDistance(pattern, text);
            const fullSim = this.levenshtein.similarity(pattern, text).similarity;
            if (subMatch.distance <= maxEditDist || fullSim >= 60 || text.toLowerCase().includes(pattern.toLowerCase())) {
                fzMatches++;
            }
            fzComps += (pattern.length * Math.min(text.length, 30));
        });
        const t1_fz = performance.now();
        results.algorithms.fuzzy = {
            name: "Fuzzy Search (Levenshtein DP)",
            timeMs: (t1_fz - t0_fz),
            matches: fzMatches,
            comparisons: fzComps,
            timeComplexity: "O(N × M)",
            spaceComplexity: "O(N × M)",
            type: "Dynamic Programming Edit Distance & Similarity"
        };

        return results;
    },

    /**
     * Text Diff / Highlighter helper to visualize matching & mismatched words
     */
    getDiffSummary: function (text1, text2) {
        const words1 = text1.split(/\s+/);
        const words2 = text2.split(/\s+/);
        const commonWords = [];
        const unique1 = [];
        const unique2 = [];

        const set2 = new Set(words2.map(w => w.toLowerCase().replace(/[^a-z0-9]/g, '')));
        const set1 = new Set(words1.map(w => w.toLowerCase().replace(/[^a-z0-9]/g, '')));

        words1.forEach(w => {
            const clean = w.toLowerCase().replace(/[^a-z0-9]/g, '');
            if (clean && set2.has(clean)) {
                commonWords.push(w);
            } else if (clean) {
                unique1.push(w);
            }
        });

        words2.forEach(w => {
            const clean = w.toLowerCase().replace(/[^a-z0-9]/g, '');
            if (clean && !set1.has(clean)) {
                unique2.push(w);
            }
        });

        return {
            common: [...new Set(commonWords)],
            uniqueTo1: [...new Set(unique1)],
            uniqueTo2: [...new Set(unique2)]
        };
    }
};

window.Algorithms = Algorithms;
