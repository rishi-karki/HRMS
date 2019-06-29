package database;

import java.sql.*;

/**
 * Created by Rishi on 6/19/2017.
 */
public class Database {
    public static String URL = "jdbc:mysql://localhost:3306/hrms";
    public static Connection con = null;
    public static Statement stmt = null;
    public static PreparedStatement pstmt = null;
    public static ResultSet rs = null;
    public static String SQL = null;
    public static Boolean incorrect = null;
    private static String hostname = "root";

    public static void getConnection() {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            con = DriverManager.getConnection(URL, hostname, "");
            System.out.println("CONNECTED " + con);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            System.err.println("Driver not found");
        } catch (SQLException e) {
            e.printStackTrace();
            System.err.println("Connection unsuccessful");
        }

    }

    public static void main(String[] args) {
        getConnection();
    }
}
