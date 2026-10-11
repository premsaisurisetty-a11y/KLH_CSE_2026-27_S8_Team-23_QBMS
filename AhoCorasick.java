
import java.util.*;

/**
 * Aho-Corasick Multi-Pattern String Matching Algorithm.
 *
 * This algorithm searches for multiple patterns in a text simultaneously.
 * It uses a Trie to store patterns, Failure Links to continue searching
 * after a mismatch, and Output Lists to store matched patterns.
 *
 * Time Complexity: O(N + M + Z), where:
 * N = length of the text
 * M = total length of all patterns
 * Z = number of matches found
 */
public class AhoCorasick {

    /**
     * Stores the details of a pattern found in the text.
     * startIndex is inclusive and endIndex is exclusive.
     */
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
            // Displays the matched pattern and its starting and ending positions.
            return String.format("'%s' at [%d, %d)", pattern, startIndex, endIndex);
        }
    }

    /**
     * Represents one node in the Trie.
     * next stores links to child nodes for each character.
     * fail points to the node used when the current path cannot continue.
     * output stores the patterns that end at this node.
     */
    private static class Node {
        Map<Character, Node> next = new HashMap<>();
        Node fail = null;
        List<String> output = new ArrayList<>();
    }

    // Root node of the Trie, representing the starting state of the automaton.
    private Node root;

    /**
     * Creates the Aho-Corasick automaton using a collection of patterns.
     */
    public AhoCorasick(Collection<String> patterns) {
        buildAutomaton(patterns);
    }

    /**
     * Creates the automaton using a variable number of pattern strings.
     */
    public AhoCorasick(String... patterns) {
        buildAutomaton(Arrays.asList(patterns));
    }

    /**
     * Builds the Trie and connects its nodes using Failure Links.
     */
    private void buildAutomaton(Collection<String> patterns) {
        root = new Node();

        // 1. Insert patterns into Trie.
        // Convert patterns to lowercase so that searching is case-insensitive.
        for (String pat : patterns) {
            if (pat == null || pat.trim().isEmpty()) continue;
            String p = pat.trim().toLowerCase();
            Node curr = root;
            for (char c : p.toCharArray()) {
                // Create a child node only if the character path does not exist.
                curr.next.putIfAbsent(c, new Node());
                // Move to the node representing the current character.
                curr = curr.next.get(c);
            }
            // Store the original trimmed pattern at its ending node.
            // Avoid adding the same output more than once.
            if (!curr.output.contains(pat.trim())) {
                curr.output.add(pat.trim());
            }
        }

        // 2. Build Failure Links and propagate Output Lists using BFS.
        // BFS processes nodes level by level, starting from the root's children.
        Queue<Node> queue = new LinkedList<>();

        // All nodes directly below the root use the root as their failure node.
        for (Map.Entry<Character, Node> entry : root.next.entrySet()) {
            Node child = entry.getValue();
            child.fail = root;
            queue.add(child);
        }

        while (!queue.isEmpty()) {
            // Remove the next node to process from the BFS queue.
            Node curr = queue.poll();

            for (Map.Entry<Character, Node> entry : curr.next.entrySet()) {
                char c = entry.getKey();
                Node child = entry.getValue();

                // Start from the current node's failure node.
                Node f = curr.fail;

                // Follow failure links until a node with the required character
                // transition is found, or the root is reached.
                while (f != null && !f.next.containsKey(c)) {
                    f = f.fail;
                }

                // Connect the child to the matching transition, if one exists.
                // Otherwise, its failure link points to the root.
                if (f != null && f.next.containsKey(c)) {
                    child.fail = f.next.get(c);
                } else {
                    child.fail = root;
                }

                // Copy patterns from the failure node into this node's output.
                // This allows suffix patterns to be reported as well.
                // Example: when searching "she", both "she" and "he"
                // can be reported if both patterns were inserted.
                if (child.fail != null && !child.fail.output.isEmpty()) {
                    for (String out : child.fail.output) {
                        if (!child.output.contains(out)) {
                            child.output.add(out);
                        }
                    }
                }

                // Process this child and its descendants through BFS.
                queue.add(child);
            }
        }
    }

    /**
     * Searches the given text for all occurrences of the stored patterns.
     * Returns a list containing each matched pattern and its text positions.
     */
    public List<Match> searchAll(String text) {
        List<Match> results = new ArrayList<>();

        // Return an empty result if the text is null, empty,
        // or the automaton has not been initialized.
        if (text == null || text.isEmpty() || root == null) {
            return results;
        }

        // Convert the text to lowercase to match the Trie construction.
        String txt = text.toLowerCase();
        Node curr = root;

        // Scan the text one character at a time.
        for (int i = 0; i < txt.length(); i++) {
            char c = txt.charAt(i);

            // If the current node has no matching transition,
            // follow failure links to find another possible matching state.
            while (curr != null && !curr.next.containsKey(c) && curr != root) {
                curr = curr.fail;
            }

            // Move to the matching child node if the transition exists.
            // Otherwise, restart from the root node.
            if (curr != null && curr.next.containsKey(c)) {
                curr = curr.next.get(c);
            } else {
                curr = root;
            }

            // Check whether any stored pattern ends at the current position.
            if (curr != null && !curr.output.isEmpty()) {
                for (String matchedPattern : curr.output) {
                    // Calculate the match boundaries.
                    // start is inclusive; i + 1 is the exclusive end position.
                    int start = i - matchedPattern.length() + 1;
                    results.add(new Match(matchedPattern, start, i + 1));
                }
            }
        }

        // Return all matches found during the scan.
        return results;
    }

    /**
     * Checks whether the text contains at least one of the given patterns.
     * Returns true if a match is found, or if the pattern array is empty/null.
     */
    public static boolean search(String text, String... patterns) {
        if (patterns == null || patterns.length == 0) return true;
        AhoCorasick ac = new AhoCorasick(patterns);
        return !ac.searchAll(text).isEmpty();
    }

    /**
     * Collection-based version of search().
     * Returns true if at least one pattern is found.
     */
    public static boolean search(String text, Collection<String> patterns) {
        if (patterns == null || patterns.isEmpty()) return true;
        AhoCorasick ac = new AhoCorasick(patterns);
        return !ac.searchAll(text).isEmpty();
    }
}
