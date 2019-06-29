package Servlet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import Model.Department;
import static database.Database.*;
import static database.Database.SQL;
/**
 * Created by Rishi on 20/07/2017.
 */

public class UpdateDepartmentTable extends HttpServlet {
    Department dept=new Department();
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        dept.setId(Integer.parseInt(request.getParameter("id")));
        dept.setDepartment_name(request.getParameter("deptName"));

        dept.setManager(Integer.parseInt(request.getParameter("manager")));
        dept.setStatus_id(Integer.parseInt(request.getParameter("status")));
        dept.setDepartmentStatusName(request.getParameter("deptStatus"));


        SQL="UPDATE department SET department_name=?, manager=?, status_id=?  where id=?";
        getConnection();

        if(con!=null){
            try{
                pstmt = con.prepareStatement(SQL);

                pstmt.setString(1,dept.getDepartment_name());
                pstmt.setInt(2,dept.getManager());
                pstmt.setInt(4,dept.getId());

                if(dept.getDepartmentStatusName().equalsIgnoreCase("Active")) {
                    dept.setStatus_id(2);
                    pstmt.setInt(3, dept.getStatus_id());
                }else{
                    dept.setStatus_id(1);
                    pstmt.setInt(3, dept.getStatus_id());
                }


                pstmt.executeUpdate();
                response.setContentType("text/html");
                response.getWriter().write("Successs");
            }catch(Exception e){
                System.err.println("Unable to connect to database in update");
            }
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
