
import java.util.*;

/**
 * Main class of the Question Bank Management System (QBMS).
 *
 * This class provides a menu-driven console application for managing
 * questions and demonstrating different string-matching algorithms.
 *
 * Features include adding, viewing, editing, deleting, searching,
 * checking question similarity, and detecting duplicate questions.
 */
public class Main {

    // Stores all questions currently available in the application.
    static ArrayList<Question> questions = new ArrayList<>();

    // Reads user input from the console.
    static Scanner sc = new Scanner(System.in);

    // Generates a unique ID for each newly added question.
    static int nextId = 1;

    public static void main(String[] args) {

        // Load predefined sample questions when the application starts.
        addSampleQuestions();

        // Keep displaying the main menu until the user chooses to exit.
        while (true) {

            System.out.println("\n====================================");
            System.out.println(" QUESTION BANK MANAGEMENT SYSTEM");
            System.out.println("====================================");

            System.out.println("1. Add Question");
            System.out.println("2. View Questions");
            System.out.println("3. Edit Question");
            System.out.println("4. Delete Question");
            System.out.println("5. KMP Search");
            System.out.println("6. Rabin-Karp Search");
            System.out.println("7. Aho-Corasick Multi-Pattern Search");
            System.out.println("8. Fuzzy Search");
            System.out.println("9. Question Similarity");
            System.out.println("10. Duplicate Detection");
            System.out.println("11. Exit");

            // Read the menu choice as a string before converting it to an integer.
            System.out.print("\nEnter choice: ");
            String choiceLine = sc.nextLine().trim();
            int choice = -1;
            try {
                choice = Integer.parseInt(choiceLine);
            } catch (NumberFormatException e) {
                // choice will remain -1 and hit default
            }

            // Execute the operation selected by the user.
            switch (choice) {

                case 1:
                    addQuestion();
                    break;

                case 2:
                    viewQuestions();
                    break;

                case 3:
                    editQuestion();
                    break;

                case 4:
                    deleteQuestion();
                    break;

                case 5:
                    kmpSearch();
                    break;

                case 6:
                    rabinKarpSearch();
                    break;

                case 7:
                    ahoCorasickSearch();
                    break;

                case 8:
                    fuzzySearch();
                    break;

                case 9:
                    similarityCheck();
                    break;

                case 10:
                    duplicateDetection();
                    break;

                case 11:
                    // End the application when the user selects Exit.
                    System.out.println("Exiting...");
                    return;

                default:
                    // Handle invalid menu choices.
                    System.out.println("Invalid choice. Please enter a number between 1 and 11.");
            }
        }
    }

    /**
     * Adds predefined questions from different subjects.
     * The nextId value is incremented for every inserted question.
     */
    static void addSampleQuestions() {
        // DSA Questions
        questions.add(new Question(nextId++, "Explain the working of Binary Search.", "DSA", 1, "Easy", 2024));
        questions.add(new Question(nextId++, "Explain Binary Search Tree and its operations.", "DSA", 2, "Medium", 2025));
        questions.add(new Question(nextId++, "Explain the working of Bubble Sort.", "DSA", 3, "Easy", 2023));
        questions.add(new Question(nextId++, "What is the time complexity of Merge Sort?", "DSA", 4, "Medium", 2024));
        questions.add(new Question(nextId++, "Describe how Binary Search works.", "DSA", 1, "Easy", 2026));

        // Operating Systems Questions
        questions.add(new Question(nextId++, "Explain Process Control Block (PCB) and process state transition diagram.", "Operating Systems", 1, "Easy", 2026));
        questions.add(new Question(nextId++, "Explain Peterson's algorithm for critical section problem and verify mutual exclusion.", "Operating Systems", 2, "Hard", 2025));
        questions.add(new Question(nextId++, "Explain Banker's Algorithm for deadlock avoidance with safety algorithm steps.", "Operating Systems", 3, "Hard", 2026));

        // DBMS Questions
        questions.add(new Question(nextId++, "Explain Three-Schema Architecture and Physical/Logical Data Independence.", "DBMS", 1, "Easy", 2026));
        questions.add(new Question(nextId++, "Discuss Normalization forms (1NF, 2NF, 3NF, BCNF) and Lossless Join Decomposition.", "DBMS", 3, "Hard", 2025));
        questions.add(new Question(nextId++, "Construct a B+ Tree of order 4 and explain why B+ trees are preferred for indexing.", "DBMS", 5, "Hard", 2026));

        // Computer Networks Questions
        questions.add(new Question(nextId++, "Compare 7-Layer OSI Reference Model with 4-Layer TCP/IP Protocol Suite.", "Computer Networks", 1, "Easy", 2026));
        questions.add(new Question(nextId++, "Explain Sliding Window Flow Control: Stop-and-Wait, Go-Back-N, and Selective Repeat ARQ.", "Computer Networks", 2, "Hard", 2026));
        questions.add(new Question(nextId++, "Explain Distance Vector Routing Algorithm using Bellman-Ford and Count-to-Infinity problem.", "Computer Networks", 3, "Hard", 2025));
    }

    /**
     * Displays all questions stored in the current application's list.
     */
    static void viewQuestions() {
        System.out.println("\n----------- QUESTIONS -----------");

        // Avoid iterating through the list when it contains no questions.
        if (questions.isEmpty()) {
            System.out.println("No questions in the database.");
            return;
        }

        // Display each question using the display method of Question.
        for (Question q : questions) {
            q.display();
        }
    }

    /**
     * Collects question details from the user and adds a new question.
     */
    static void addQuestion() {
        System.out.println("\n------- ADD QUESTION -------");

        // Read and validate each field before creating the Question object.
        String text = readString("Enter question: ");
        String subject = readString("Enter subject: ");
        int unit = readUnit("Enter unit: ");
        String difficulty = readDifficulty("Enter difficulty (Easy/Medium/Hard): ");
        int year = readYear("Enter year: ");

        // Assign the next available ID and add the question to the list.
        questions.add(new Question(nextId++, text, subject, unit, difficulty, year));
        System.out.println("\nQuestion added successfully with ID: " + (nextId - 1));
    }

    /**
     * Finds a question by ID and allows the user to update its fields.
     */
    static void editQuestion() {
        System.out.println("\n------- EDIT QUESTION -------");

        // Locate the question that the user wants to edit.
        int id = readInt("Enter question ID to edit: ");
        Question q = findQuestion(id);

        // Stop if the supplied ID does not exist.
        if (q == null) {
            System.out.println("Question with ID " + id + " not found.");
            return;
        }

        System.out.println("Editing Question ID: " + id);
        System.out.println("Press Enter to keep the current value.");

        // Update each field, preserving its existing value when Enter is pressed.
        q.question = readStringOrKeep("Enter question", q.question);
        q.subject = readStringOrKeep("Enter subject", q.subject);
        q.unit = readUnitOrKeep("Enter unit", q.unit);
        q.difficulty = readDifficultyOrKeep("Enter difficulty (Easy/Medium/Hard)", q.difficulty);
        q.year = readYearOrKeep("Enter year", q.year);

        System.out.println("\nQuestion updated successfully.");
    }

    /**
     * Removes a question after asking the user for confirmation.
     */
    static void deleteQuestion() {
        System.out.println("\n------- DELETE QUESTION -------");

        // Find the question that matches the entered ID.
        int id = readInt("Enter question ID to delete: ");
        Question q = findQuestion(id);

        // Stop if the question does not exist.
        if (q == null) {
            System.out.println("Question with ID " + id + " not found.");
            return;
        }

        // Display the selected question so the user can confirm the deletion.
        System.out.println("\nAre you sure you want to delete the following question? (Y/N)");
        q.display();

        System.out.print("Choice: ");
        String choice = sc.nextLine().trim();

        // Remove the question only when the user enters Y.
        if (choice.equalsIgnoreCase("Y")) {
            questions.remove(q);
            System.out.println("Question deleted successfully.");
        } else {
            // Keep the question when deletion is not confirmed.
            System.out.println("Deletion cancelled.");
        }
    }

    /**
     * Searches every question using the Knuth-Morris-Pratt algorithm.
     */
    static void kmpSearch() {
        System.out.print("\nEnter keyword to search (KMP): ");
        String keyword = sc.nextLine();

        boolean found = false;
        System.out.println("\n----------- KMP RESULTS -----------");

        // Test the keyword against every question using KMP.
        for (Question q : questions) {
            if (KMP.search(q.question, keyword)) {
                q.display();
                found = true;
            }
        }

        // Display a message when no question matches the keyword.
        if (!found) {
            System.out.println("No exact match found.");
        }
    }

    /**
     * Searches every question using the Rabin-Karp algorithm.
     */
    static void rabinKarpSearch() {
        System.out.print("\nEnter keyword to search (Rabin-Karp): ");
        String keyword = sc.nextLine();

        boolean found = false;
        System.out.println("\n------- RABIN-KARP RESULTS -------");

        // Check each question and display those containing the keyword.
        for (Question q : questions) {
            if (RabinKarp.search(q.question, keyword)) {
                q.display();
                found = true;
            }
        }

        if (!found) {
            System.out.println("No exact match found.");
        }
    }

    /**
     * Searches all stored questions for multiple patterns using Aho-Corasick.
     * Patterns are entered as comma-separated keywords.
     */
    static void ahoCorasickSearch() {
        System.out.print("\nEnter keyword(s) to search (comma-separated for multi-pattern): ");
        String input = sc.nextLine().trim();

        // Reject an empty search query.
        if (input.isEmpty()) {
            System.out.println("No keywords provided.");
            return;
        }

        // Split the input into separate patterns using commas.
        String[] rawPatterns = input.split(",");
        List<String> patterns = new ArrayList<>();

        // Trim each pattern and ignore empty entries.
        for (String p : rawPatterns) {
            String trimmed = p.trim();
            if (!trimmed.isEmpty()) {
                patterns.add(trimmed);
            }
        }

        // Stop if no usable patterns remain after trimming.
        if (patterns.isEmpty()) {
            System.out.println("No valid keywords provided.");
            return;
        }

        // Build the automaton once so multiple patterns can be searched together.
        AhoCorasick ac = new AhoCorasick(patterns);
        boolean found = false;

        System.out.println("\n------- AHO-CORASICK MULTI-PATTERN RESULTS -------");
        System.out.println("Searching dictionary patterns: " + patterns);

        // Search each question using the same constructed automaton.
        for (Question q : questions) {
            List<AhoCorasick.Match> matches = ac.searchAll(q.question);

            // Display a question only when at least one pattern matches.
            if (!matches.isEmpty()) {
                q.display();
                System.out.print("   ↳ Matched Patterns: ");

                // Use a LinkedHashSet to remove duplicate displayed entries
                // while preserving their insertion order.
                Set<String> matchedSet = new LinkedHashSet<>();
                for (AhoCorasick.Match m : matches) {
                    matchedSet.add(m.pattern + " @" + m.startIndex);
                }

                // Print all distinct matched-pattern and starting-position entries.
                System.out.println(String.join(", ", matchedSet));
                found = true;
            }
        }

        if (!found) {
            System.out.println("No matching questions found across the repository.");
        }
    }

    /**
     * Performs fuzzy searching using Levenshtein distance and substring matching.
     */
    static void fuzzySearch() {
        System.out.print("\nEnter search query: ");
        String query = sc.nextLine();

        // Maximum edit distance accepted for the fuzzy-search condition.
        int threshold = 5;
        System.out.println("\n----------- FUZZY SEARCH -----------");
        boolean found = false;

        // Compare the query with every question in the list.
        for (Question q : questions) {
            String question = q.question;
            int distance = Levenshtein.distance(query, question);

            // Show a suggestion if the edit distance is small enough
            // or if the question contains the query, ignoring letter case.
            if (distance <= threshold || question.toLowerCase().contains(query.toLowerCase())) {
                double similarity = Levenshtein.similarity(query, question);
                System.out.println("\nSuggestion (ID: " + q.id + "):");
                System.out.println(question);
                System.out.printf("Similarity: %.2f%% (Edit Distance: %d)%n", similarity, distance);
                found = true;
            }
        }

        if (!found) {
            System.out.println("No similar questions found.");
        }
    }

    /**
     * Lets the user select a question using either its ID or a text search.
     * Used by the question-similarity checker.
     */
    static Question selectQuestionOrSearch(String prompt) {
        while (true) {
            System.out.print(prompt);
            String input = sc.nextLine().trim();

            // Ignore blank input and ask the user again.
            if (input.isEmpty()) continue;

            try {
                // First, attempt to interpret the input as a question ID.
                int id = Integer.parseInt(input);
                Question q = findQuestion(id);

                if (q != null) return q;
                System.out.println("Question with ID " + id + " not found.");
            } catch (NumberFormatException e) {
                // If the input is not an integer, search by keyword or subject.
                ArrayList<Question> matches = new ArrayList<>();
                String lower = input.toLowerCase();

                // Collect questions whose text or subject contains the input.
                for (Question q : questions) {
                    if (q.question.toLowerCase().contains(lower) || q.subject.toLowerCase().contains(lower)) {
                        matches.add(q);
                    }
                }

                if (matches.isEmpty()) {
                    System.out.println("No questions found matching '" + input + "'. Try again.");
                } else if (matches.size() == 1) {
                    // Automatically select the question if exactly one result exists.
                    System.out.println("Selected Q#" + matches.get(0).id + ": " + matches.get(0).question);
                    return matches.get(0);
                } else {
                    // Show all matching questions when multiple results are found.
                    System.out.println("\nMatching questions (" + matches.size() + "):");
                    for (Question m : matches) {
                        System.out.println("  [" + m.id + "] (" + m.subject + " U" + m.unit + ") " + m.question);
                    }

                    // Ask the user to choose one of the displayed question IDs.
                    int chosenId = readInt("Enter Question ID from above list: ");
                    Question chosen = findQuestion(chosenId);

                    if (chosen != null) return chosen;
                    System.out.println("Invalid selection.");
                }
            }
        }
    }

    /**
     * Calculates the similarity percentage between two selected questions
     * and classifies them using an 80% threshold.
     */
    static void similarityCheck() {
        System.out.println("\n------- QUESTION SIMILARITY CHECKER -------");

        // Select the first and second questions using an ID or search term.
        Question q1 = selectQuestionOrSearch("Enter first question ID or search keyword: ");
        Question q2 = selectQuestionOrSearch("Enter second question ID or search keyword: ");

        // Stop if either selection is invalid.
        if (q1 == null || q2 == null) {
            System.out.println("Invalid question selection.");
            return;
        }

        // Compute similarity using the Levenshtein-based percentage.
        double similarity = Levenshtein.similarity(q1.question, q2.question);

        // Display both questions and their calculated similarity.
        System.out.println("\n----------- SIMILARITY -----------");
        System.out.println("Question 1 (Q#" + q1.id + " - " + q1.subject + "):");
        System.out.println(q1.question);
        System.out.println("\nQuestion 2 (Q#" + q2.id + " - " + q2.subject + "):");
        System.out.println(q2.question);
        System.out.printf("\nSimilarity: %.2f%%%n", similarity);

        // Classify the pair as a possible duplicate when similarity is at least 80%.
        if (similarity >= 80) {
            System.out.println("Status: Possible Duplicate");
        } else {
            System.out.println("Status: Different Questions");
        }
    }

    /**
     * Compares each unique pair of questions to detect potential duplicates.
     */
    static void duplicateDetection() {
        System.out.println("\n------- DUPLICATE DETECTION -------");
        double threshold = -1;

        // Keep asking until the user enters a valid percentage from 0 to 100.
        while (true) {
            System.out.print("Enter similarity threshold percentage (0-100): ");
            String line = sc.nextLine().trim();

            try {
                threshold = Double.parseDouble(line);
                if (threshold >= 0 && threshold <= 100) {
                    break;
                }
            } catch (NumberFormatException e) {
                // Try again
            }

            System.out.println("Invalid input. Please enter a value between 0 and 100.");
        }

        boolean duplicateFound = false;

        // Use nested loops to compare pairs of questions.
        // Starting j at i + 1 prevents comparing a question with itself
        // and avoids checking the same pair twice.
        for (int i = 0; i < questions.size(); i++) {
            for (int j = i + 1; j < questions.size(); j++) {

                // Calculate the similarity of the current pair of questions.
                double similarity = Levenshtein.similarity(
                        questions.get(i).question,
                        questions.get(j).question);

                // Report pairs whose similarity meets the chosen threshold.
                if (similarity >= threshold) {
                    System.out.println("\nPossible Duplicate:");
                    System.out.println("Q" + questions.get(i).id + ": " + questions.get(i).question);
                    System.out.println("Q" + questions.get(j).id + ": " + questions.get(j).question);
                    System.out.printf("Similarity: %.2f%%%n", similarity);
                    duplicateFound = true;
                }
            }
        }

        // Report when no pair meets the specified threshold.
        if (!duplicateFound) {
            System.out.println("No duplicate questions detected above the " + threshold + "% threshold.");
        }
    }

    /**
     * Finds and returns the question with the specified ID.
     * Returns null when no question has that ID.
     */
    static Question findQuestion(int id) {
        // Perform a linear search through the question list.
        for (Question q : questions) {
            if (q.id == id) {
                return q;
            }
        }
        return null;
    }

    // Input Validation Helpers

    /**
     * Reads an integer from the user and repeats until the input is valid.
     */
    static int readInt(String prompt) {
        while (true) {
            System.out.print(prompt);
            String line = sc.nextLine().trim();

            try {
                return Integer.parseInt(line);
            } catch (NumberFormatException e) {
                System.out.println("Invalid input. Please enter a valid integer.");
            }
        }
    }

    /**
     * Reads an integer or keeps the current value when the user presses Enter.
     */
    static int readIntOrKeep(String prompt, int currentValue) {
        while (true) {
            System.out.print(prompt + " [" + currentValue + "]: ");
            String line = sc.nextLine().trim();

            // Preserve the existing value when no replacement is entered.
            if (line.isEmpty()) {
                return currentValue;
            }

            try {
                return Integer.parseInt(line);
            } catch (NumberFormatException e) {
                System.out.println("Invalid input. Please enter an integer or press Enter to keep current.");
            }
        }
    }

    /**
     * Reads a non-empty string from the user.
     */
    static String readString(String prompt) {
        while (true) {
            System.out.print(prompt);
            String line = sc.nextLine().trim();

            // Accept the input only when it contains non-whitespace characters.
            if (!line.isEmpty()) {
                return line;
            }

            System.out.println("Input cannot be empty.");
        }
    }

    /**
     * Reads a string or retains the current value when Enter is pressed.
     */
    static String readStringOrKeep(String prompt, String currentValue) {
        System.out.print(prompt + " [" + currentValue + "]: ");
        String line = sc.nextLine().trim();

        if (line.isEmpty()) {
            return currentValue;
        }
        return line;
    }

    /**
     * Reads a difficulty level and accepts only Easy, Medium, or Hard.
     */
    static String readDifficulty(String prompt) {
        while (true) {
            System.out.print(prompt);
            String val = sc.nextLine().trim();

            // Accept the three supported difficulty values regardless of case.
            if (val.equalsIgnoreCase("Easy") || val.equalsIgnoreCase("Medium") || val.equalsIgnoreCase("Hard")) {
                // Normalize the accepted value to title case.
                return val.substring(0, 1).toUpperCase() + val.substring(1).toLowerCase();
            }

            System.out.println("Invalid difficulty. Please enter Easy, Medium, or Hard.");
        }
    }

    /**
     * Reads a difficulty level or preserves the existing value when Enter is pressed.
     */
    static String readDifficultyOrKeep(String prompt, String currentValue) {
        while (true) {
            System.out.print(prompt + " [" + currentValue + "]: ");
            String val = sc.nextLine().trim();

            if (val.isEmpty()) {
                return currentValue;
            }

            // Validate and normalize a newly entered difficulty level.
            if (val.equalsIgnoreCase("Easy") || val.equalsIgnoreCase("Medium") || val.equalsIgnoreCase("Hard")) {
                return val.substring(0, 1).toUpperCase() + val.substring(1).toLowerCase();
            }

            System.out.println("Invalid difficulty. Please enter Easy, Medium, or Hard.");
        }
    }

    /**
     * Reads a positive unit number.
     */
    static int readUnit(String prompt) {
        while (true) {
            int unit = readInt(prompt);

            // Units must start from 1.
            if (unit >= 1) {
                return unit;
            }

            System.out.println("Unit must be a positive integer (>= 1).");
        }
    }

    /**
     * Reads a positive unit number or keeps the current unit.
     */
    static int readUnitOrKeep(String prompt, int currentValue) {
        while (true) {
            int unit = readIntOrKeep(prompt, currentValue);

            if (unit >= 1) {
                return unit;
            }

            System.out.println("Unit must be a positive integer (>= 1).");
        }
    }

    /**
     * Reads a year within the accepted range of 1900 to 2100.
     */
    static int readYear(String prompt) {
        while (true) {
            int year = readInt(prompt);

            if (year >= 1900 && year <= 2100) {
                return year;
            }

            System.out.println("Year must be between 1900 and 2100.");
        }
    }

    /**
     * Reads a year or keeps the existing year when Enter is pressed.
     */
    static int readYearOrKeep(String prompt, int currentValue) {
        while (true) {
            int year = readIntOrKeep(prompt, currentValue);

            if (year >= 1900 && year <= 2100) {
                return year;
            }

            System.out.println("Year must be between 1900 and 2100.");
        }
    }
}
