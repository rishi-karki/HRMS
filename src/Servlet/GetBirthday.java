package Servlet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

import static database.Database.*;

import Model.EmployeeDetails;
import com.google.gson.Gson;

//servlet to show whose birthday is today
@WebServlet(name = "GetBirthday")
public class GetBirthday extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        SQL="SELECT first_name,last_name FROM employee_details WHERE DAY(dob) = DAY(CURRENT_DATE) AND MONTH(dob)=MONTH(CURRENT_DATE)";
        try{
            ArrayList<EmployeeDetails> employeeBirthday = new ArrayList<EmployeeDetails>();
            if(con!=null){
                pstmt=con.prepareStatement(SQL);
                rs=pstmt.executeQuery();
                while(rs.next()){
                    EmployeeDetails employeeDetails=new EmployeeDetails();
                    employeeDetails.setFirstName(rs.getString("first_name"));
                    employeeDetails.setLastName(rs.getString("last_name"));
                    employeeBirthday.add(employeeDetails);
                }
            }
            Gson gson = new Gson();
            String birthdayJson = gson.toJson(employeeBirthday);
            response.setContentType("application/json");
            response.getWriter().write(birthdayJson);

        }catch(Exception e){
            System.err.println("Error in GetBirthday.java\n"+e);
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    }
}
