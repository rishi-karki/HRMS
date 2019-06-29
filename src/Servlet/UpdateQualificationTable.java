package Servlet;

import Model.Qualification;
import static database.Database.*;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "UpdateQualificationTable")
public class UpdateQualificationTable extends HttpServlet {
    Qualification qualification=new Qualification();
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        int id=Integer.parseInt(request.getParameter("id"));
        qualification.setLevel(request.getParameter("level"));
        qualification.setCourse(request.getParameter("course"));
        qualification.setUniversity(request.getParameter("university"));
        qualification.setGrade(Float.parseFloat(request.getParameter("grade")));
        qualification.setStartDate(request.getParameter("startDate"));
        qualification.setEndDate(request.getParameter("endDate"));

        SQL="UPDATE qualifications SET course=?, university=?, grade=?, start_date=?, end_date=?, level=? WHERE id=?";
        getConnection();

        if(con!=null){
            try{
                pstmt=con.prepareStatement(SQL);

                pstmt.setString(1,qualification.getCourse());
                pstmt.setString(2, qualification.getUniversity());
                pstmt.setFloat(3, qualification.getGrade());
                pstmt.setString(4, qualification.getStartDate());
                pstmt.setString(5, qualification.getEndDate());
                pstmt.setString(6, qualification.getLevel());
                pstmt.setInt(7,id);

                pstmt.executeUpdate();
                response.setContentType("text/html");
                response.getWriter().write("Successs");
            }catch(Exception e){
                System.err.println("Error in database connection or SQL query on UpdateQualificationTable.java");
            }
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
