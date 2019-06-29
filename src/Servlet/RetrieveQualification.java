package Servlet;

import Model.Qualification;
import com.google.gson.Gson;

import static database.Database.*;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;

@WebServlet(name = "RetrieveQualification")
public class RetrieveQualification extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        int id=Integer.parseInt(request.getParameter("id"));
        System.out.println("ID OUTSIDE CON "+id);
        SQL = "SELECT * FROM qualifications q INNER JOIN employee_details e ON q.employee_id=e.id WHERE e.id='"+id+"'";
        getConnection();

        if (con != null) {
            try {
                stmt=con.createStatement();
                rs=stmt.executeQuery(SQL);
                System.out.println("ID "+id);
                System.out.println(stmt);
                ArrayList<Qualification> qualificationList = new ArrayList<Qualification>();
                while (rs.next()) {
                    Qualification qualification = new Qualification();
                    qualification.setId(rs.getInt("id"));
                    qualification.setCourse(rs.getString("course"));
                    qualification.setUniversity(rs.getString("university"));
                    qualification.setGrade(rs.getFloat("grade"));
                    qualification.setStartDate(rs.getString("start_date"));
                    qualification.setEndDate(rs.getString("end_date"));
                    qualification.setLevel(rs.getString("level"));

                    qualificationList.add(qualification);
                }
                Gson gson = new Gson();
                String interviewJson = gson.toJson(qualificationList);
                response.setContentType("application/json");
                response.getWriter().write(interviewJson);
            } catch (SQLException e) {
                System.err.println("Error in Database Connection on RetieveQualification.java");
            }
        }
    }
}
