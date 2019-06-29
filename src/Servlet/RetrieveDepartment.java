package Servlet;

import Model.Department;
import Model.EmployeeDetailsDTO;
import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import static database.Database.*;
import java.sql.*;
import java.util.ArrayList;

/**
 * Created by Rishi on 19/07/2017.
 */
public class RetrieveDepartment extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        getConnection();
        SQL="SELECT d.id, d.department_name, d.manager, CONCAT( e.first_name, ' ', e.last_name) AS managername, s.id, s.status  FROM employee_details e INNER JOIN department d ON e.id = d.manager INNER JOIN status s ON s.id=d.status_id ORDER BY d.status_id";
        if(con!=null){
            try {
                stmt = con.createStatement();
                rs = stmt.executeQuery(SQL);

                ArrayList<Department> departmentData = new ArrayList<Department>();
                if(rs!=null) {
                    while (rs.next()) {
                        Department dept = new Department();
                        dept.setId(rs.getInt(1));
                        dept.setDepartment_name(rs.getString(2));
                        dept.setManager(rs.getInt(3));
                        dept.setManagerName(rs.getString(4));
                        dept.setStatus_id(rs.getInt(5));
                        dept.setDepartmentStatusName(rs.getString(6));

                        departmentData.add(dept);
                    }
                }
                Gson gson = new Gson();
                String departmentJson = gson.toJson(departmentData);
                response.setContentType("application/json");
                response.getWriter().write(departmentJson);


            } catch (SQLException e) {
                System.err.println("SQL Syntax error");
            }
        }
    }
}