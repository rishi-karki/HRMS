package Servlet;

import javax.servlet.ServletException;
import Model.Qualification;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import static database.Database.*;

@WebServlet(name = "InsertQualification")
public class InsertQualification extends HttpServlet {
    Qualification qualification=new Qualification();
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String level=request.getParameter("level");
        String course=request.getParameter("course");
        String university=request.getParameter("university");
        float grade=Float.parseFloat(request.getParameter("grade"));
        String startDate=request.getParameter("startDate");
        String endDate=request.getParameter("endDate");
        int emp_id=Integer.parseInt(request.getParameter("empId"));

        this.qualification.setLevel(level);
        this.qualification.setCourse(course);
        this.qualification.setUniversity(university);
        this.qualification.setGrade(grade);
        this.qualification.setStartDate(startDate);
        this.qualification.setEndDate(endDate);

        getConnection();

        SQL = "INSERT INTO qualifications(level,course,university,grade,start_date,end_date,employee_id) VALUES(?,?,?,?,?,?,?)";

        if(con!=null){
            try{
                pstmt=con.prepareStatement(SQL);

                pstmt.setString(1,qualification.getLevel());
                pstmt.setString(2,qualification.getCourse());
                pstmt.setString(3,qualification.getUniversity());
                pstmt.setFloat(4,qualification.getGrade());
                pstmt.setString(5,qualification.getStartDate());
                pstmt.setString(6,qualification.getEndDate());
                pstmt.setInt(7,emp_id);

                pstmt.executeUpdate();
            }catch(Exception e){
                System.err.println("Unable to connect to database");
            }
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
