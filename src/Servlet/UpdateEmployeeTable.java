package Servlet;

import Model.EmployeeDetailsDTO;
import static database.Database.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;

/**
 * Created by Rishi on 7/16/17.
 */
public class UpdateEmployeeTable extends HttpServlet {
    EmployeeDetailsDTO employeeTableDetails = new EmployeeDetailsDTO();
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        employeeTableDetails.setId(Integer.parseInt(request.getParameter("id")));
        employeeTableDetails.setFname(request.getParameter("fname"));
        employeeTableDetails.setLname(request.getParameter("lname"));
        employeeTableDetails.setEmail(request.getParameter("email"));
        employeeTableDetails.setPhNumber(request.getParameter("phNumber"));

        SQL = "UPDATE employee_details SET first_name = ?, last_name = ?, email_address = ?, phone_number= ? where id=?";

        getConnection();

        if(con!=null){
            try {
                pstmt = con.prepareStatement(SQL);
                pstmt.setString(1,employeeTableDetails.getFname());
                pstmt.setString(2,employeeTableDetails.getLname());
                pstmt.setString(3,employeeTableDetails.getEmail());
                pstmt.setString(4,employeeTableDetails.getPhNumber());
                pstmt.setInt(5,employeeTableDetails.getId());

                pstmt.executeUpdate();
                response.setContentType("text/html");
                response.getWriter().write("Successs");
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}