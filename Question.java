public class Question {
    public int id;
    public String question;
    public String subject;
    public int unit;
    public String difficulty;
    public int year;

    public Question(int id, String question, String subject, int unit, String difficulty, int year) {
        this.id = id;
        this.question = question;
        this.subject = subject;
        this.unit = unit;
        this.difficulty = difficulty;
        this.year = year;
    }

    public void display() {
        System.out.println("ID: " + id);
        System.out.println("Question: " + question);
        System.out.println("Subject: " + subject);
        System.out.println("Unit: " + unit);
        System.out.println("Difficulty: " + difficulty);
        System.out.println("Year: " + year);
        System.out.println("------------------------------------");
    }
}
