import java.util.*;

public class Main {

    static ArrayList<Question> questions = new ArrayList<>();
    static Scanner sc = new Scanner(System.in);
    static int nextId = 1;

    public static void main(String[] args) {

        addSampleQuestions();

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
            System.out.println("7. Fuzzy Search");
            System.out.println("8. Question Similarity");
            System.out.println("9. Duplicate Detection");
            System.out.println("10. Exit");

            System.out.print("\nEnter choice: ");
            String choiceLine = sc.nextLine().trim();
            int choice = -1;
            try {
                choice = Integer.parseInt(choiceLine);
            } catch (NumberFormatException e) {
                // choice will remain -1 and hit default
            }

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
                    fuzzySearch();
                    break;

                case 8:
                    similarityCheck();
                    break;

                case 9:
                    duplicateDetection();
                    break;

                case 10:
                    System.out.println("Exiting...");
                    return;

                default:
                    System.out.println("Invalid choice. Please enter a number between 1 and 10.");
            }
        }
    }

    static void addSampleQuestions() {
        questions.add(new Question(nextId++, "Explain the working of Binary Search.", "DSA", 1, "Easy", 2024));
        questions.add(new Question(nextId++, "Explain Binary Search Tree and its operations.", "DSA", 2, "Medium", 2025));
        questions.add(new Question(nextId++, "Explain the working of Bubble Sort.", "DSA", 3, "Easy", 2023));
        questions.add(new Question(nextId++, "What is the time complexity of Merge Sort?", "DSA", 4, "Medium", 2024));
        questions.add(new Question(nextId++, "Describe how Binary Search works.", "DSA", 1, "Easy", 2026));
    }

    static void viewQuestions() {
        System.out.println("\n----------- QUESTIONS -----------");
        if (questions.isEmpty()) {
            System.out.println("No questions in the database.");
            return;
        }
        for (Question q : questions) {
            q.display();
        }
    }

    static void addQuestion() {
        System.out.println("\n------- ADD QUESTION -------");
        String text = readString("Enter question: ");
        String subject = readString("Enter subject: ");
        int unit = readUnit("Enter unit: ");
        String difficulty = readDifficulty("Enter difficulty (Easy/Medium/Hard): ");
        int year = readYear("Enter year: ");

        questions.add(new Question(nextId++, text, subject, unit, difficulty, year));
        System.out.println("\nQuestion added successfully with ID: " + (nextId - 1));
    }

    static void editQuestion() {
        System.out.println("\n------- EDIT QUESTION -------");
        int id = readInt("Enter question ID to edit: ");
        Question q = findQuestion(id);
        if (q == null) {
            System.out.println("Question with ID " + id + " not found.");
            return;
        }

        System.out.println("Editing Question ID: " + id);
        System.out.println("Press Enter to keep the current value.");

        q.question = readStringOrKeep("Enter question", q.question);
        q.subject = readStringOrKeep("Enter subject", q.subject);
        q.unit = readUnitOrKeep("Enter unit", q.unit);
        q.difficulty = readDifficultyOrKeep("Enter difficulty (Easy/Medium/Hard)", q.difficulty);
        q.year = readYearOrKeep("Enter year", q.year);

        System.out.println("\nQuestion updated successfully.");
    }

    static void deleteQuestion() {
        System.out.println("\n------- DELETE QUESTION -------");
        int id = readInt("Enter question ID to delete: ");
        Question q = findQuestion(id);
        if (q == null) {
            System.out.println("Question with ID " + id + " not found.");
            return;
        }

        System.out.println("\nAre you sure you want to delete the following question? (Y/N)");
        q.display();

        System.out.print("Choice: ");
        String choice = sc.nextLine().trim();
        if (choice.equalsIgnoreCase("Y")) {
            questions.remove(q);
            System.out.println("Question deleted successfully.");
        } else {
            System.out.println("Deletion cancelled.");
        }
    }

    static void kmpSearch() {
        System.out.print("\nEnter keyword to search (KMP): ");
        String keyword = sc.nextLine();

        boolean found = false;
        System.out.println("\n----------- KMP RESULTS -----------");

        for (Question q : questions) {
            if (KMP.search(q.question, keyword)) {
                q.display();
                found = true;
            }
        }

        if (!found) {
            System.out.println("No exact match found.");
        }
    }

    static void rabinKarpSearch() {
        System.out.print("\nEnter keyword to search (Rabin-Karp): ");
        String keyword = sc.nextLine();

        boolean found = false;
        System.out.println("\n------- RABIN-KARP RESULTS -------");

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

    static void fuzzySearch() {
        System.out.print("\nEnter search query: ");
        String query = sc.nextLine();

        int threshold = 5;
        System.out.println("\n----------- FUZZY SEARCH -----------");
        boolean found = false;

        for (Question q : questions) {
            String question = q.question;
            int distance = Levenshtein.distance(query, question);

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

    static void similarityCheck() {
        int id1 = readInt("Enter first question ID: ");
        int id2 = readInt("Enter second question ID: ");

        Question q1 = findQuestion(id1);
        Question q2 = findQuestion(id2);

        if (q1 == null || q2 == null) {
            System.out.println("Invalid question ID.");
            return;
        }

        double similarity = Levenshtein.similarity(q1.question, q2.question);

        System.out.println("\n----------- SIMILARITY -----------");
        System.out.println("Question 1:");
        System.out.println(q1.question);
        System.out.println("\nQuestion 2:");
        System.out.println(q2.question);
        System.out.printf("\nSimilarity: %.2f%%%n", similarity);

        if (similarity >= 80) {
            System.out.println("Status: Possible Duplicate");
        } else {
            System.out.println("Status: Different Questions");
        }
    }

    static void duplicateDetection() {
        System.out.println("\n------- DUPLICATE DETECTION -------");
        double threshold = -1;
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

        for (int i = 0; i < questions.size(); i++) {
            for (int j = i + 1; j < questions.size(); j++) {
                double similarity = Levenshtein.similarity(
                        questions.get(i).question,
                        questions.get(j).question);

                if (similarity >= threshold) {
                    System.out.println("\nPossible Duplicate:");
                    System.out.println("Q" + questions.get(i).id + ": " + questions.get(i).question);
                    System.out.println("Q" + questions.get(j).id + ": " + questions.get(j).question);
                    System.out.printf("Similarity: %.2f%%%n", similarity);
                    duplicateFound = true;
                }
            }
        }

        if (!duplicateFound) {
            System.out.println("No duplicate questions detected above the " + threshold + "% threshold.");
        }
    }

    static Question findQuestion(int id) {
        for (Question q : questions) {
            if (q.id == id) {
                return q;
            }
        }
        return null;
    }

    // Input Validation Helpers
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

    static int readIntOrKeep(String prompt, int currentValue) {
        while (true) {
            System.out.print(prompt + " [" + currentValue + "]: ");
            String line = sc.nextLine().trim();
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

    static String readString(String prompt) {
        while (true) {
            System.out.print(prompt);
            String line = sc.nextLine().trim();
            if (!line.isEmpty()) {
                return line;
            }
            System.out.println("Input cannot be empty.");
        }
    }

    static String readStringOrKeep(String prompt, String currentValue) {
        System.out.print(prompt + " [" + currentValue + "]: ");
        String line = sc.nextLine().trim();
        if (line.isEmpty()) {
            return currentValue;
        }
        return line;
    }

    static String readDifficulty(String prompt) {
        while (true) {
            System.out.print(prompt);
            String val = sc.nextLine().trim();
            if (val.equalsIgnoreCase("Easy") || val.equalsIgnoreCase("Medium") || val.equalsIgnoreCase("Hard")) {
                return val.substring(0, 1).toUpperCase() + val.substring(1).toLowerCase();
            }
            System.out.println("Invalid difficulty. Please enter Easy, Medium, or Hard.");
        }
    }

    static String readDifficultyOrKeep(String prompt, String currentValue) {
        while (true) {
            System.out.print(prompt + " [" + currentValue + "]: ");
            String val = sc.nextLine().trim();
            if (val.isEmpty()) {
                return currentValue;
            }
            if (val.equalsIgnoreCase("Easy") || val.equalsIgnoreCase("Medium") || val.equalsIgnoreCase("Hard")) {
                return val.substring(0, 1).toUpperCase() + val.substring(1).toLowerCase();
            }
            System.out.println("Invalid difficulty. Please enter Easy, Medium, or Hard.");
        }
    }

    static int readUnit(String prompt) {
        while (true) {
            int unit = readInt(prompt);
            if (unit >= 1) {
                return unit;
            }
            System.out.println("Unit must be a positive integer (>= 1).");
        }
    }

    static int readUnitOrKeep(String prompt, int currentValue) {
        while (true) {
            int unit = readIntOrKeep(prompt, currentValue);
            if (unit >= 1) {
                return unit;
            }
            System.out.println("Unit must be a positive integer (>= 1).");
        }
    }

    static int readYear(String prompt) {
        while (true) {
            int year = readInt(prompt);
            if (year >= 1900 && year <= 2100) {
                return year;
            }
            System.out.println("Year must be between 1900 and 2100.");
        }
    }

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