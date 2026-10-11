import java.util.*;

/**
 * Aho-Corasick Multi-Pattern String Matching Algorithm
 * Constructs a Trie with Failure Transitions (Automaton) and Output Links
 * to search for multiple patterns simultaneously in O(N + M + Z) time.
 */
public class AhoCorasick {

    public static class Match {
        public String pattern;
        public int startIndex;
        public int endIndex;

        public Match(String pattern, int startIndex, int endIndex) {
            this.pattern = pattern;
            this.startIndex = startIndex;
            this.endIndex = endIndex;
        }

        @Override
        public String toString() {
            return String.format("'%s' at [%d, %d)", pattern, startIndex, endIndex);
        }
    }

    private static class Node {
        Map<Character, Node> next = new HashMap<>();
        Node fail = null;
        List<String> output = new ArrayList<>();
    }

    private Node root;

    public AhoCorasick(Collection<String> patterns) {
        buildAutomaton(patterns);
    }

    public AhoCorasick(String... patterns) {
        buildAutomaton(Arrays.asList(patterns));
    }

    private void buildAutomaton(Collection<String> patterns) {
        root = new Node();

        // 1. Insert patterns into Trie
        for (String pat : patterns) {
            if (pat == null || pat.trim().isEmpty()) continue;
            String p = pat.trim().toLowerCase();
            Node curr = root;
            for (char c : p.toCharArray()) {
                curr.next.putIfAbsent(c, new Node());
                curr = curr.next.get(c);
            }
            if (!curr.output.contains(pat.trim())) {
                curr.output.add(pat.trim());
            }
        }

        // 2. Build Failure and Output links via BFS
        Queue<Node> queue = new LinkedList<>();

        // Depth 1 nodes point fail to root
        for (Map.Entry<Character, Node> entry : root.next.entrySet()) {
            Node child = entry.getValue();
            child.fail = root;
            queue.add(child);
        }

        while (!queue.isEmpty()) {
            Node curr = queue.poll();

            for (Map.Entry<Character, Node> entry : curr.next.entrySet()) {
                char c = entry.getKey();
                Node child = entry.getValue();

                Node f = curr.fail;
                while (f != null && !f.next.containsKey(c)) {
                    f = f.fail;
                }

                if (f != null && f.next.containsKey(c)) {
                    child.fail = f.next.get(c);
                } else {
                    child.fail = root;
                }

                // Add failure node's outputs
                if (child.fail != null && !child.fail.output.isEmpty()) {
                    for (String out : child.fail.output) {
                        if (!child.output.contains(out)) {
                            child.output.add(out);
                        }
                    }
                }

                queue.add(child);
            }
        }
    }

    /**
     * Search text for all occurrences of patterns.
     */
    public List<Match> searchAll(String text) {
        List<Match> results = new ArrayList<>();
        if (text == null || text.isEmpty() || root == null) {
            return results;
        }

        String txt = text.toLowerCase();
        Node curr = root;

        for (int i = 0; i < txt.length(); i++) {
            char c = txt.charAt(i);

            while (curr != null && !curr.next.containsKey(c) && curr != root) {
                curr = curr.fail;
            }

            if (curr != null && curr.next.containsKey(c)) {
                curr = curr.next.get(c);
            } else {
                curr = root;
            }

            if (curr != null && !curr.output.isEmpty()) {
                for (String matchedPattern : curr.output) {
                    int start = i - matchedPattern.length() + 1;
                    results.add(new Match(matchedPattern, start, i + 1));
                }
            }
        }

        return results;
    }

    /**
     * Helper static method: checks if text contains ANY of the given patterns.
     */
    public static boolean search(String text, String... patterns) {
        if (patterns == null || patterns.length == 0) return true;
        AhoCorasick ac = new AhoCorasick(patterns);
        return !ac.searchAll(text).isEmpty();
    }

    public static boolean search(String text, Collection<String> patterns) {
        if (patterns == null || patterns.isEmpty()) return true;
        AhoCorasick ac = new AhoCorasick(patterns);
        return !ac.searchAll(text).isEmpty();
    }
}
