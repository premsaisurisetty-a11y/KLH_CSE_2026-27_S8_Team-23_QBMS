
public class RabinKarp {

    // Number of possible character values used in the hash calculation
    private static final int d = 256;

    // Prime number used to keep the hash values small
    private static final int q = 101;

    // Searches for the pattern inside the given text using the Rabin-Karp algorithm
    public static boolean search(String text, String pattern) {

        // If the pattern is null or empty, consider it a match
        if (pattern == null || pattern.isEmpty()) {
            return true;
        }

        // If the text is null or empty, the pattern cannot be found
        if (text == null || text.isEmpty()) {
            return false;
        }

        // Convert both strings to lowercase so the search is case-insensitive
        String txt = text.toLowerCase();
        String pat = pattern.toLowerCase();

        // M represents the pattern length and N represents the text length
        int M = pat.length();
        int N = txt.length();

        // If the pattern is longer than the text, no match is possible
        if (N < M) {
            return false;
        }

        int i, j;

        // p stores the hash value of the pattern
        int p = 0;

        // t stores the hash value of the current text window
        int t = 0;

        // h is used to remove the leading character from a window's hash
        // It calculates (d^(M-1)) % q
        int h = 1;

        // Calculate h = (d^(M-1)) % q
        for (i = 0; i < M - 1; i++) {
            h = (h * d) % q;
        }

        // Calculate the initial hash values for the pattern and
        // the first window of text, which has the same length as the pattern
        for (i = 0; i < M; i++) {
            p = (d * p + pat.charAt(i)) % q;
            t = (d * t + txt.charAt(i)) % q;
        }

        // Slide the pattern-sized window across the text one position at a time
        for (i = 0; i <= N - M; i++) {

            // If the hash values match, the characters still need to be checked
            // because different strings can have the same hash value
            if (p == t) {

                // Compare each character in the current text window with the pattern
                for (j = 0; j < M; j++) {
                    if (txt.charAt(i + j) != pat.charAt(j)) {
                        // Stop comparing when a character does not match
                        break;
                    }
                }

                // If all M characters matched, the pattern was found
                if (j == M) {
                    return true;
                }
            }

            // If another window exists, calculate its hash value
            if (i < N - M) {

                // Remove the leading character's contribution,
                // shift the remaining hash values, and add the next character
                t = (d * (t - txt.charAt(i) * h) + txt.charAt(i + M)) % q;

                // The modulo operation can produce a negative result in Java.
                // Add q to make the hash value non-negative
                if (t < 0) {
                    t = (t + q);
                }
            }
        }

        // Return false if the pattern was not found anywhere in the text
        return false;
    }
}
