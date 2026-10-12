
/**
 * Algorithms for Question Bank Management System (QBMS)
 * Implements KMP, Rabin-Karp, and Levenshtein Distance matching Java DSA-3 Project.
 */

const Algorithms = {
    /**
     * KMP (Knuth-Morris-Pratt) Pattern Searching Algorithm
     * Uses an LPS array to avoid comparing characters unnecessarily.
     */
    kmp: {
        // Computes the Longest Proper Prefix which is also a Suffix (LPS) array.
        computeLPSArray: function (pat) {
            const M = pat.length;

            // Initially, every LPS value is zero.
            const lps = new Array(M).fill(0);

            // len stores the length of the current matching prefix and suffix.
            let len = 0;

            // Start from the second character of the pattern.
            let i = 1;

            while (i < M) {
                // If the current characters match, extend the matching prefix.
                if (pat.charAt(i) === pat.charAt(len)) {
                    len++;
                    lps[i] = len;
                    i++;
                } else {
                    // If a mismatch occurs, reuse an earlier LPS value.
                    if (len !== 0) {
                        len = lps[len - 1];
                    } else {
                        // No matching prefix exists, so keep this LPS value zero.
                        lps[i] = 0;
                        i++;
                    }
                }
            }

            // Return the array used to skip unnecessary comparisons.
            return lps;
        },

        // Searches for every occurrence of the pattern in the text.
        search: function (text, pattern) {
            // An empty pattern is treated as found at position zero.
            if (!pattern) return { found: true, matches: [0], lps: [], steps: [] };

            // An empty text cannot contain a non-empty pattern.
            if (!text) return { found: false, matches: [], lps: [], steps: [] };

            // Convert both strings to lowercase for case-insensitive searching.
            const txt = text.toLowerCase();
            const pat = pattern.toLowerCase();
            const N = txt.length;
            const M = pat.length;

            // Precompute the LPS array for the pattern.
            const lps = this.computeLPSArray(pat);
            const matches = [];

            // Store comparison details for visualizing the algorithm.
            const steps = [];

            let i = 0; // Current index in the text.
            let j = 0; // Current index in the pattern.

            while (i < N) {
                // Record the current comparison so the UI can display each step.
                steps.push({
                    textIndex: i,
                    patternIndex: j,
                    charText: txt.charAt(i),
                    charPat: pat.charAt(j),
                    match: pat.charAt(j) === txt.charAt(i)
                });

                // If the characters match, advance both indices.
                if (pat.charAt(j) === txt.charAt(i)) {
                    j++;
                    i++;
                }

                // If j reaches M, the entire pattern has matched.
                if (j === M) {
                    // Store the starting index of this occurrence.
                    matches.push(i - j);

                    // Use LPS to continue searching for overlapping matches.
                    j = lps[j - 1];
                } else if (i < N && pat.charAt(j) !== txt.charAt(i)) {
                    // On mismatch, use LPS instead of restarting the pattern.
                    if (j !== 0) {
                        j = lps[j - 1];
                    } else {
                        // If no prefix can be reused, move to the next text character.
                        i = i + 1;
                    }
                }
            }

            // Return whether a match exists, its positions, and tracing information.
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

        // Searches using hash values before comparing individual characters.
        search: function (text, pattern) {
            // An empty pattern is treated as found, with no recorded positions.
            if (!pattern) return { found: true, matches: [], windows: [] };

            // Return no matches when the text is empty.
            if (!text) return { found: false, matches: [], windows: [] };

            // Make searching case-insensitive.
            const txt = text.toLowerCase();
            const pat = pattern.toLowerCase();
            const M = pat.length;
            const N = txt.length;

            // The pattern cannot fit inside a shorter text.
            if (N < M) {
                return { found: false, matches: [], windows: [] };
            }

            const d = this.d;
            const q = this.q;

            let p = 0; // Hash value of the pattern.
            let t = 0; // Hash value of the current text window.
            let h = 1;

            // Calculate h = (d^(M-1)) % q.
            // This value helps remove the leading character from the old window.
            for (let i = 0; i < M - 1; i++) {
                h = (h * d) % q;
            }

            // Calculate the initial hash of the pattern and first text window.
            for (let i = 0; i < M; i++) {
                p = (d * p + pat.charCodeAt(i)) % q;
                t = (d * t + txt.charCodeAt(i)) % q;
            }

            const matches = [];

            // Store details about each window for visualization and debugging.
            const windows = [];

            // Move the pattern-sized window through the text.
            for (let i = 0; i <= N - M; i++) {
                const windowText = txt.substring(i, i + M);
                let charMatch = false;

                // Equal hashes are a possible match, not proof of a match.
                if (p === t) {
                    // Compare the characters to verify the hash match.
                    let matchCount = 0;
                    for (let j = 0; j < M; j++) {
                        if (txt.charAt(i + j) !== pat.charAt(j)) {
                            break;
                        }
                        matchCount++;
                    }

                    // If all characters match, record the starting position.
                    if (matchCount === M) {
                        charMatch = true;
                        matches.push(i);
                    }
                }

                // Record hashes and comparison results for this window.
                windows.push({
                    index: i,
                    windowText: windowText,
                    patternHash: p,
                    windowHash: t,
                    hashMatched: p === t,
                    charMatched: charMatch
                });

                // Calculate the hash for the next window without hashing it from scratch.
                if (i < N - M) {
                    // Remove the old leading character, shift the hash,
                    // and include the next character entering the window.
                    t = (d * (t - txt.charCodeAt(i) * h) + txt.charCodeAt(i + M)) % q;

                    // JavaScript can produce a negative remainder.
                    // Add q to correct a negative hash value.
                    if (t < 0) {
                        t = t + q;
                    }
                }
            }

            // Return the match positions and the recorded window details.
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
        // Calculates the minimum edits needed to transform s1 into s2.
        distance: function (s1, s2) {
            // Two empty strings require no edits.
            if (!s1 && !s2) return 0;

            // An empty source needs one insertion per target character.
            if (!s1) return s2.length;

            // An empty target needs one deletion per source character.
            if (!s2) return s1.length;

            // Compare lowercase versions so letter case does not affect distance.
            const str1 = s1.toLowerCase();
            const str2 = s2.toLowerCase();
            const len1 = str1.length;
            const len2 = str2.length;

            // dp[i][j] stores the edit distance between the first i and j characters.
            const dp = Array.from({ length: len1 + 1 }, () => new Array(len2 + 1).fill(0));

            // Transforming i characters into an empty string requires i deletions.
            for (let i = 0; i <= len1; i++) dp[i][0] = i;

            // Transforming an empty string into j characters requires j insertions.
            for (let j = 0; j <= len2; j++) dp[0][j] = j;

            // Fill the table by comparing each pair of characters.
            for (let i = 1; i <= len1; i++) {
                for (let j = 1; j <= len2; j++) {
                    // Matching characters require no additional edit.
                    if (str1.charAt(i - 1) === str2.charAt(j - 1)) {
                        dp[i][j] = dp[i - 1][j - 1];
                    } else {
                        // Choose the cheapest operation and add one edit:
                        dp[i][j] = 1 + Math.min(
                            dp[i - 1][j - 1], // Substitution: replace one character.
                            dp[i - 1][j],     // Deletion: remove one character from s1.
                            dp[i][j - 1]      // Insertion: add one character to s1.
                        );
                    }
                }
            }

            // Return the final distance and the matrix for visualization.
            return {
                distance: dp[len1][len2],
                matrix: dp,
                str1: str1,
                str2: str2
            };
        },

        // Converts edit distance into a percentage similarity score.
        similarity: function (s1, s2) {
            // Handle empty strings before calculating the distance.
            if (!s1 || !s2) {
                if (!s1 && !s2) return 100.0;
                return 0.0;
            }

            // Both empty strings are identical.
            if (s1.length === 0 && s2.length === 0) return 100.0;

            const res = this.distance(s1, s2);

            // Use the length of the longer string to normalize the score.
            const maxLen = Math.max(s1.length, s2.length);

            // Fewer edits relative to the string length means greater similarity.
            const score = ((1.0 - res.distance / maxLen) * 100.0);

            // Keep the score within the range 0 to 100.
            return {
                similarity: Math.max(0, Math.min(100, score)),
                distance: res.distance,
                maxLen: maxLen,
                matrix: res.matrix
            };
        },

        // Finds the substring of text that is closest to the query.
        bestSubstringDistance: function (query, text) {
            // Return a high distance when either input is missing.
            if (!query || !text) return { distance: 999, similarity: 0, matchedSubstring: "" };

            const q = query.toLowerCase();
            const t = text.toLowerCase();

            // An exact substring match has zero edit distance.
            if (t.includes(q)) {
                return { distance: 0, similarity: 100, matchedSubstring: query };
            }

            // Start with the distance between the query and the entire text.
            let minDistance = this.distance(q, t).distance;
            let bestSub = text;
            const qLen = q.length;

            // Check candidate substring lengths close to the query length.
            for (let len = Math.max(1, qLen - 3); len <= Math.min(t.length, qLen + 3); len++) {

                // Slide each candidate-length window through the text.
                for (let i = 0; i <= t.length - len; i++) {
                    const sub = t.substring(i, i + len);
                    const d = this.distance(q, sub).distance;

                    // Keep the substring with the smallest edit distance.
                    if (d < minDistance) {
                        minDistance = d;
                        bestSub = text.substring(i, i + len);
                    }
                }
            }

            // Convert the best distance into a normalized similarity percentage.
            const maxLen = Math.max(q.length, bestSub.length);
            const sim = Math.max(0, Math.min(100, (1.0 - minDistance / maxLen) * 100.0));

            // Return the best substring, its distance, and its similarity score.
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
        // Builds a table that tells the search how far to shift after a mismatch.
        buildBadCharTable: function (pat) {
            const M = pat.length;
            const badChar = {};

            // Store shifts for every pattern character except the last one.
            for (let i = 0; i < M - 1; i++) {
                // Characters closer to the end require smaller shifts.
                badChar[pat.charAt(i)] = M - 1 - i;
            }

            return badChar;
        },

        // Searches the text from right to left within each current window.
        search: function (text, pattern) {
            // An empty pattern is treated as found at position zero.
            if (!pattern) return { found: true, matches: [0], badChar: {}, comparisons: 0, shifts: [] };

            // Return no matches when the text is empty.
            if (!text) return { found: false, matches: [], badChar: {}, comparisons: 0, shifts: [] };

            // Make the search case-insensitive.
            const txt = text.toLowerCase();
            const pat = pattern.toLowerCase();
            const N = txt.length;
            const M = pat.length;

            // The pattern cannot fit in the text.
            if (N < M) return { found: false, matches: [], badChar: {}, comparisons: 0, shifts: [] };

            // Precompute the bad-character shift table.
            const badChar = this.buildBadCharTable(pat);
            const matches = [];

            // Record the shifts for later visualization.
            const shifts = [];
            let comparisons = 0;

            // s is the current starting position of the pattern in the text.
            let s = 0;

            while (s <= N - M) {
                // Begin comparing from the last character of the pattern.
                let j = M - 1;

                while (j >= 0) {
                    comparisons++;

                    // Stop at the first mismatch.
                    if (pat.charAt(j) !== txt.charAt(s + j)) {
                        break;
                    }

                    // Continue toward the beginning of the pattern.
                    j--;
                }

                // If j becomes negative, every character matched.
                if (j < 0) {
                    matches.push(s);

                    // Determine how far to move after a match.
                    const shiftVal = (s + M < N) ? (badChar[txt.charAt(s + M - 1)] || M) : 1;

                    // Record the successful match and its next shift.
                    shifts.push({ shiftIndex: s, match: true, nextShift: shiftVal });
                    s += shiftVal;
                } else {
                    // Record the character at the end of the current window.
                    const mismatchChar = txt.charAt(s + M - 1);

                    // Use the table's shift, or move by the full pattern length.
                    const shiftVal = badChar[mismatchChar] || M;

                    // Record the mismatch and shift to the next candidate window.
                    shifts.push({ shiftIndex: s, match: false, mismatchChar: mismatchChar, nextShift: shiftVal });
                    s += shiftVal;
                }
            }

            // Return match positions, comparison count, table, and shift history.
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
     * Aho-Corasick Multi-Pattern String Matching Automaton
     * Builds Trie + BFS Failure Transitions + Output Links
     * Finds multiple keywords simultaneously in O(N + M + Z) time.
     */
    ahoCorasick: {
        // Builds a trie and its failure links from one or more search patterns.
        buildAutomaton: function (patternsInput) {
            let patterns = [];

            // Accept either an array of patterns or a string of separated patterns.
            if (Array.isArray(patternsInput)) {
                // Remove empty or whitespace-only patterns from the array.
                patterns = patternsInput.filter(p => p && p.trim().length > 0);
            } else if (typeof patternsInput === 'string') {
                // Commas can separate multiple patterns.
                if (patternsInput.includes(',')) {
                    patterns = patternsInput.split(',').map(s => s.trim()).filter(Boolean);
                // A vertical bar can also separate multiple patterns.
                } else if (patternsInput.includes('|')) {
                    patterns = patternsInput.split('|').map(s => s.trim()).filter(Boolean);
                } else {
                    // A string without separators is treated as one pattern.
                    patterns = [patternsInput.trim()];
                }
            }

            // Node zero is the root of the trie.
            // next stores outgoing character transitions, fail stores a fallback state,
            // output stores patterns ending at this state, and depth stores its depth.
            const trie = [
                { id: 0, next: {}, fail: 0, output: [], char: 'ROOT', depth: 0 }
            ];

            // 1. Insert every pattern into the trie.
            patterns.forEach(pat => {
                const p = pat.toLowerCase();
                let curr = 0;

                // Follow or create one trie node for each character.
                for (let i = 0; i < p.length; i++) {
                    const char = p.charAt(i);

                    // Create a new node when this character path does not exist.
                    if (trie[curr].next[char] === undefined) {
                        const newId = trie.length;
                        trie.push({
                            id: newId,
                            next: {},
                            fail: 0,
                            output: [],
                            char: char,
                            depth: trie[curr].depth + 1
                        });

                        // Link the current node to the newly created node.
                        trie[curr].next[char] = newId;
                    }

                    // Move to the node representing the current character.
                    curr = trie[curr].next[char];
                }

                // Store the original pattern at its ending node without duplicates.
                if (!trie[curr].output.includes(pat)) {
                    trie[curr].output.push(pat);
                }
            });

            // 2. Build failure links and inherited output patterns using BFS.
            const queue = [];

            // Direct children of the root fail back to the root.
            for (const char in trie[0].next) {
                const childId = trie[0].next[char];
                trie[childId].fail = 0;
                queue.push(childId);
            }

            // Process trie nodes level by level.
            while (queue.length > 0) {
                const curr = queue.shift();

                // Examine every outgoing character transition from this node.
                for (const char in trie[curr].next) {
                    const childId = trie[curr].next[char];
                    let f = trie[curr].fail;

                    // Follow failure links until a state can accept this character
                    // or the root is reached.
                    while (f > 0 && trie[f].next[char] === undefined) {
                        f = trie[f].fail;
                    }

                    // Assign the longest available fallback transition.
                    if (trie[f].next[char] !== undefined && trie[f].next[char] !== childId) {
                        trie[childId].fail = trie[f].next[char];
                    } else {
                        trie[childId].fail = 0;
                    }

                    // Include patterns found through the failure state as well.
                    // This allows suffix patterns to be reported together.
                    const failOut = trie[trie[childId].fail].output;
                    failOut.forEach(outPat => {
                        if (!trie[childId].output.includes(outPat)) {
                            trie[childId].output.push(outPat);
                        }
                    });

                    // Process this child later in BFS order.
                    queue.push(childId);
                }
            }

            // Return the finished trie and the patterns used to construct it.
            return { trie, patterns };
        },

        // Searches the text for all supplied patterns in one traversal.
        search: function (text, patternsInput) {
            // An empty text has no recorded matches.
            if (!text) return { found: false, matches: [], transitions: 0, patterns: [], automaton: [] };

            // Construct the trie and its failure links.
            const { trie, patterns } = this.buildAutomaton(patternsInput);

            // If there are no valid patterns, return the empty match list.
            if (patterns.length === 0) return { found: true, matches: [], transitions: 0, patterns: [], automaton: trie };

            // Convert text to lowercase to match the case-insensitive pattern trie.
            const txt = text.toLowerCase();
            const matches = [];

            // Start at the root state.
            let curr = 0;

            // Count state transitions for performance visualization.
            let transitions = 0;

            // Store the state and matched patterns after each character.
            const steps = [];

            // Process every character in the text exactly in sequence.
            for (let i = 0; i < txt.length; i++) {
                const char = txt.charAt(i);
                transitions++;

                // Follow failure links while the current state has no matching edge.
                while (curr > 0 && trie[curr].next[char] === undefined) {
                    curr = trie[curr].fail;
                    transitions++;
                }

                // Follow the matching edge if it exists; otherwise return to the root.
                if (trie[curr].next[char] !== undefined) {
                    curr = trie[curr].next[char];
                } else {
                    curr = 0;
                }

                // Report every pattern ending at the current state.
                if (trie[curr].output.length > 0) {
                    trie[curr].output.forEach(matchedPat => {
                        // Calculate the starting and exclusive ending indices.
                        const startIdx = i - matchedPat.length + 1;
                        matches.push({
                            pattern: matchedPat,
                            index: startIdx,
                            endIndex: i + 1,
                            state: curr
                        });
                    });
                }

                // Save a snapshot of this search step for the UI.
                steps.push({
                    charIndex: i,
                    char: char,
                    stateId: curr,
                    outputs: [...trie[curr].output]
                });
            }

            // Return all matches, the automaton, and search tracing information.
            return {
                found: matches.length > 0,
                matches: matches,
                transitions: transitions,
                patterns: patterns,
                automaton: trie,
                steps: steps
            };
        }
    },

    /**
     * Benchmark & Compare All Searching Algorithms Simultaneously
     */
    // Runs each search algorithm against every item in the supplied corpus.
    benchmarkAll: function (corpus, pattern, maxEditDist = 4) {
        // Store the query, corpus size, and each algorithm's results.
        const results = {
            query: pattern,
            corpusSize: corpus.length,
            algorithms: {}
        };

        // 1. KMP Benchmark
        // Measure elapsed time and aggregate matches and recorded steps.
        const t0_kmp = performance.now();
        let kmpMatches = 0;
        let kmpComps = 0;

        corpus.forEach(item => {
            // Each corpus item can be a plain string or an object with a question field.
            const text = typeof item === 'string' ? item : (item.question || '');
            const res = this.kmp.search(text, pattern);

            if (res.found) kmpMatches++;

            // Count recorded steps when available; otherwise use text length as an estimate.
            kmpComps += res.steps ? res.steps.length : text.length;
        });

        const t1_kmp = performance.now();

        // Save the KMP benchmark summary.
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

            // Count processed windows when available, otherwise use text length.
            rkComps += res.windows ? res.windows.length : text.length;
        });

        const t1_rk = performance.now();

        // Save the Rabin-Karp benchmark summary.
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

            // This algorithm explicitly tracks character comparisons.
            bmComps += res.comparisons;
        });

        const t1_bm = performance.now();

        // Save the Boyer-Moore-Horspool benchmark summary.
        results.algorithms.boyerMoore = {
            name: "Boyer-Moore-Horspool",
            timeMs: (t1_bm - t0_bm),
            matches: bmMatches,
            comparisons: bmComps,
            timeComplexity: "O(N / M) best, O(NM) worst",
            spaceComplexity: "O(Σ) / O(M)",
            type: "Sublinear Search with Bad Character Table"
        };

        // 4. Aho-Corasick Multi-Pattern Benchmark
        const t0_ac = performance.now();
        let acMatches = 0;
        let acComps = 0;

        // Split comma-separated input into multiple search patterns.
        const acPatterns = pattern.includes(',') ? pattern.split(',').map(s => s.trim()).filter(Boolean) : [pattern.trim()];

        // Build the automaton once here for reference.
        const prebuiltAC = this.ahoCorasick.buildAutomaton(acPatterns);

        corpus.forEach(item => {
            const text = typeof item === 'string' ? item : (item.question || '');
            const res = this.ahoCorasick.search(text, acPatterns);

            if (res.found) acMatches++;

            // Count the transitions reported by the Aho-Corasick search.
            acComps += res.transitions;
        });

        const t1_ac = performance.now();

        // Save the Aho-Corasick benchmark summary.
        results.algorithms.ahoCorasick = {
            name: "Aho-Corasick Automaton",
            timeMs: (t1_ac - t0_ac),
            matches: acMatches,
            comparisons: acComps,
            timeComplexity: "O(N + M + Z)",
            spaceComplexity: "O(M × Σ)",
            type: "Multi-Pattern Trie & Failure Link Automaton"
        };

        // 5. Levenshtein / Fuzzy Benchmark
        const t0_fz = performance.now();
        let fzMatches = 0;
        let fzComps = 0;

        corpus.forEach(item => {
            const text = typeof item === 'string' ? item : (item.question || '');

            // Find the closest substring and calculate full-string similarity.
            const subMatch = this.levenshtein.bestSubstringDistance(pattern, text);
            const fullSim = this.levenshtein.similarity(pattern, text).similarity;

            // Count an item as a fuzzy match if it passes any of these conditions.
            if (subMatch.distance <= maxEditDist || fullSim >= 60 || text.toLowerCase().includes(pattern.toLowerCase())) {
                fzMatches++;
            }

            // Estimate work using query length and a capped text length.
            fzComps += (pattern.length * Math.min(text.length, 30));
        });

        const t1_fz = performance.now();

        // Save the fuzzy-search benchmark summary.
        results.algorithms.fuzzy = {
            name: "Fuzzy Search (Levenshtein DP)",
            timeMs: (t1_fz - t0_fz),
            matches: fzMatches,
            comparisons: fzComps,
            timeComplexity: "O(N × M)",
            spaceComplexity: "O(N × M)",
            type: "Dynamic Programming Edit Distance & Similarity"
        };

        // Return the combined benchmark results for display.
        return results;
    },

    /**
     * Text Diff / Highlighter helper to visualize matching & mismatched words
     */
    // Compares two pieces of text and separates common and unique words.
    getDiffSummary: function (text1, text2) {
        // Split each input into words using whitespace as the separator.
        const words1 = text1.split(/\s+/);
        const words2 = text2.split(/\s+/);

        const commonWords = [];
        const unique1 = [];
        const unique2 = [];

        // Normalize words by lowercasing them and removing non-alphanumeric characters.
        const set2 = new Set(words2.map(w => w.toLowerCase().replace(/[^a-z0-9]/g, '')));
        const set1 = new Set(words1.map(w => w.toLowerCase().replace(/[^a-z0-9]/g, '')));

        // Collect words from text1 that also appear in text2, or are unique to text1.
        words1.forEach(w => {
            const clean = w.toLowerCase().replace(/[^a-z0-9]/g, '');

            if (clean && set2.has(clean)) {
                commonWords.push(w);
            } else if (clean) {
                unique1.push(w);
            }
        });

        // Collect words that occur in text2 but not in text1.
        words2.forEach(w => {
            const clean = w.toLowerCase().replace(/[^a-z0-9]/g, '');

            if (clean && !set1.has(clean)) {
                unique2.push(w);
            }
        });

        // Remove duplicate entries from each result list.
        return {
            common: [...new Set(commonWords)],
            uniqueTo1: [...new Set(unique1)],
            uniqueTo2: [...new Set(unique2)]
        };
    }
};

// Expose the algorithms object so other browser scripts can use it.
window.Algorithms = Algorithms;
