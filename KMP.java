
/**
 * Knuth-Morris-Pratt (KMP) String Matching Algorithm.
 *
 * Searches for a pattern inside a text without repeatedly comparing
 * characters that have already been matched.
 *
 * It uses an LPS (Longest Proper Prefix which is also a Suffix) array
 * to determine how far the pattern can move after a mismatch.
 *
 * Time Complexity: O(N + M)
 * N = length of the text
 * M = length of the pattern
 */
public class KMP {

    /**
     * Searches for the given pattern in the text.
     * Returns true if the pattern is found, otherwise false.
     */
    public static boolean search(String text, String pattern) {

        // An empty or null pattern is treated as a successful match.
        if (pattern == null || pattern.isEmpty()) {
            return true;
        }

        // A non-empty pattern cannot be found in null or empty text.
        if (text == null || text.isEmpty()) {
            return false;
        }

        // Convert both strings to lowercase to perform case-insensitive matching.
        String txt = text.toLowerCase();
        String pat = pattern.toLowerCase();

        // Store the lengths of the text and the pattern.
        int N = txt.length();
        int M = pat.length();

        // Precompute the LPS array to avoid unnecessary pattern comparisons.
        int[] lps = computeLPSArray(pat);

        int i = 0; // Index for traversing the text.
        int j = 0; // Index for traversing the pattern.

        // Continue searching while there are characters left in the text.
        while (i < N) {

            // If the current characters match, move both pointers forward.
            if (pat.charAt(j) == txt.charAt(i)) {
                j++;
                i++;
            }

            // If j reaches the pattern length, the entire pattern has matched.
            if (j == M) {
                return true; // Match found.
            } else if (i < N && pat.charAt(j) != txt.charAt(i)) {

                // A mismatch occurred. Use the LPS array to avoid
                // rechecking characters that are already known to match.
                if (j != 0) {
                    j = lps[j - 1];
                } else {
                    // No pattern characters matched, so advance in the text.
                    i = i + 1;
                }
            }
        }

        // The entire text was checked without finding the pattern.
        return false;
    }

    /**
     * Computes the LPS (Longest Proper Prefix which is also a Suffix) array.
     *
     * lps[i] stores the length of the longest proper prefix of pat[0..i]
     * that is also a suffix of pat[0..i].
     *
     * This information helps KMP decide where to resume matching after
     * a mismatch instead of restarting from the beginning of the pattern.
     */
    private static int[] computeLPSArray(String pat) {

        // Get the pattern length and create an array to store LPS values.
        int M = pat.length();
        int[] lps = new int[M];

        // len stores the length of the current matching prefix and suffix.
        int len = 0;

        // Start from index 1 because the first character has an LPS value of 0.
        int i = 1;
        lps[0] = 0;

        // Calculate the LPS value for each remaining pattern position.
        while (i < M) {

            // If the current character matches the character at len,
            // extend the matching prefix and suffix by one character.
            if (pat.charAt(i) == pat.charAt(len)) {
                len++;
                lps[i] = len;
                i++;
            } else {

                // On a mismatch, try a shorter prefix using the previous LPS value.
                if (len != 0) {
                    len = lps[len - 1];
                } else {

                    // No matching prefix exists for this position.
                    lps[i] = 0;
                    i++;
                }
            }
        }

        // Return the completed LPS array for use by the search method.
        return lps;
    }
}
