package Servlet;

import Model.Department;
import com.mysql.jdbc.Statement;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;

import static database.Database.*;

/**
 * Created by Rishi on 18/07/2017.
 */

public class InsertDepartment extends HttpServlet {
    private Department department = new Department();

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String deptname = request.getParameter("deptName");
        int manager = Integer.parseInt(request.getParameter("manager"));
        int status_id = Integer.parseInt(request.getParameter("status"));

        System.out.println(deptname + manager);
        this.department.setDepartment_name(deptname);
        this.department.setManager(manager);
        this.department.setStatus_id(status_id);
        getConnection();
        if (con != null) {
            SQL = "INSERT INTO department(department_name,manager,status_id) VALUES(?,?,?)";
            try {
                pstmt = con.prepareStatement(SQL);
                pstmt.setString(1, department.getDepartment_name());
                pstmt.setInt(2, department.getManager());
                pstmt.setInt(3, department.getStatus_id());
                pstmt.executeUpdate();
            } catch (SQLException e) {
                e.printStackTrace();
                System.err.println("Invalid query \n" + e);
            }
        } else {
            System.out.println("Connection not established");
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    }
}
