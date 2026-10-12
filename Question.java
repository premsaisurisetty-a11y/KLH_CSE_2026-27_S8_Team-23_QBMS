
/**
 * Represents a single question in the Question Bank Management System (QBMS).
 *
 * Each question stores its ID, question text, subject, unit, difficulty level,
 * and year. The class also provides a method to display these details.
 */
public class Question {

    // Unique identifier used to distinguish this question from others.
    public int id;

    // Stores the actual text of the question.
    public String question;

    // Subject to which the question belongs, such as DSA or DBMS.
    public String subject;

    // Unit number in which the question is categorized.
    public int unit;

    // Difficulty level of the question: Easy, Medium, or Hard.
    public String difficulty;

    // Academic year associated with the question.
    public int year;

    /**
     * Constructor used to create a Question object.
     *
     * Receives all question details as parameters and assigns them
     * to the corresponding instance variables.
     */
    public Question(int id, String question, String subject, int unit, String difficulty, int year) {
        this.id = id;
        this.question = question;
        this.subject = subject;
        this.unit = unit;
        this.difficulty = difficulty;
        this.year = year;
    }

    /**
     * Displays all details of the question in the console.
     *
     * This method is used when viewing questions or displaying
     * a question selected during an operation.
     */
    public void display() {

        // Display the unique question ID.
        System.out.println("ID: " + id);

        // Display the question text.
        System.out.println("Question: " + question);

        // Display the subject associated with the question.
        System.out.println("Subject: " + subject);

        // Display the unit number.
        System.out.println("Unit: " + unit);

        // Display the difficulty level.
        System.out.println("Difficulty: " + difficulty);

        // Display the associated year.
        System.out.println("Year: " + year);

        // Print a separator to distinguish this question from the next one.
        System.out.println("------------------------------------");
    }
}
