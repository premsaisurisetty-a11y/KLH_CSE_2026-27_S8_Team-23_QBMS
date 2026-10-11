
/**
 * Levenshtein Distance Algorithm.
 *
 * Calculates the minimum number of single-character operations required
 * to transform one string into another.
 *
 * The allowed operations are:
 * 1. Insertion: Add a character.
 * 2. Deletion: Remove a character.
 * 3. Substitution: Replace one character with another.
 *
 * Dynamic Programming is used to store intermediate results and avoid
 * recalculating the same subproblems.
 */
public class Levenshtein {

    /**
     * Calculates the Levenshtein distance between two strings.
     *
     * A distance of 0 means the strings are identical.
     * A larger distance means more character operations are required.
     */
    public static int distance(String s1, String s2) {

        // If both strings are null, treat them as having no difference.
        if (s1 == null && s2 == null) {
            return 0;
        }

        // If the first string is null, all characters in the second
        // string would need to be inserted.
        if (s1 == null) {
            return s2.length();
        }

        // If the second string is null, all characters in the first
        // string would need to be deleted.
        if (s2 == null) {
            return s1.length();
        }

        // Convert both strings to lowercase so uppercase and lowercase
        // letters are treated as equivalent.
        s1 = s1.toLowerCase();
        s2 = s2.toLowerCase();

        // Create a DP table where dp[i][j] stores the minimum edit distance
        // between the first i characters of s1 and the first j characters of s2.
        // Extra rows and columns represent empty prefixes.
        int[][] dp = new int[s1.length() + 1][s2.length() + 1];

        // Base case: converting the first i characters of s1 into an
        // empty string requires i deletion operations.
        for (int i = 0; i <= s1.length(); i++) {
            dp[i][0] = i;
        }

        // Base case: converting an empty string into the first j
        // characters of s2 requires j insertion operations.
        for (int j = 0; j <= s2.length(); j++) {
            dp[0][j] = j;
        }

        // Fill the DP table by comparing every character pair.
        for (int i = 1; i <= s1.length(); i++) {
            for (int j = 1; j <= s2.length(); j++) {

                // If the current characters match, no additional operation
                // is needed. Use the result for the previous character pair.
                if (s1.charAt(i - 1) == s2.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {

                    // If the characters differ, choose the cheapest operation:
                    // Substitution: dp[i - 1][j - 1]
                    // Deletion:     dp[i - 1][j]
                    // Insertion:    dp[i][j - 1]
                    // Add 1 for the operation performed.
                    dp[i][j] = 1 + Math.min(dp[i - 1][j - 1],
                            Math.min(dp[i - 1][j], dp[i][j - 1]));
                }
            }
        }

        // The bottom-right cell contains the distance between both complete strings.
        return dp[s1.length()][s2.length()];
    }

    /**
     * Calculates the percentage similarity between two strings
     * using their Levenshtein distance.
     *
     * A higher percentage indicates greater similarity.
     * The result ranges from 0 to 100 for ordinary non-null inputs.
     */
    public static double similarity(String s1, String s2) {

        // If either string is null, return zero similarity.
        if (s1 == null || s2 == null) {
            return 0.0;
        }

        // Two empty strings are considered completely similar.
        if (s1.isEmpty() && s2.isEmpty()) {
            return 100.0;
        }

        // Calculate the minimum edit distance between the strings.
        int dist = distance(s1, s2);

        // Use the length of the longer string to normalize the distance.
        int maxLen = Math.max(s1.length(), s2.length());

        // Convert the normalized edit distance into a similarity percentage.
        // A distance of zero gives 100% similarity.
        return (1.0 - (double) dist / maxLen) * 100.0;
    }
}
