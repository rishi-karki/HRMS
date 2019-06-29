package Servlet;

/**
 * Created by Rishi on 7/18/17.
 */

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;

import Model.EmployeeDetailsDTO;
import com.google.gson.Gson;

import static database.Database.*;


public class RetrieveEmp extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        getConnection();
        SQL = "SELECT id, CONCAT (first_name, ' ', last_name) AS fullName FROM employee_details";
        if (con != null) {
            System.out.println("Inside connection not null");
            try {
                System.out.println("inside try of conneciton not null");
                stmt = con.createStatement();
                rs = stmt.executeQuery(SQL);
                ArrayList<EmployeeDetailsDTO> employeeFullName = new ArrayList<EmployeeDetailsDTO>();
                if (rs != null) {
                    while (rs.next()) {
                        EmployeeDetailsDTO eddto = new EmployeeDetailsDTO();
                        eddto.setId(rs.getInt(1));
                        eddto.setFullName(rs.getString(2));

                        employeeFullName.add(eddto);
                    }
                    Gson gson = new Gson();
                    String employeeJSon = gson.toJson(employeeFullName);
                    System.out.println(employeeJSon);
                    response.setContentType("application/json");
                    response.getWriter().write(employeeJSon);
                    System.out.println(employeeJSon);
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}