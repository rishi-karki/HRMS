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

@WebServlet(name = "RetrieveRecentQualification")
public class RetrieveRecentQualification extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Qualification qualification=new Qualification();

        int id=Integer.parseInt(request.getParameter("id"));
        String SQL2="SELECT course,start_date,end_date FROM `qualifications` WHERE employee_id="+id+" ORDER BY end_date DESC LIMIT 1";
        getConnection();

        if(con!=null){
            try{
                stmt=con.createStatement();
                rs=stmt.executeQuery(SQL2);
                while(rs.next()){
                    qualification.setCourse(rs.getString(1));
                    qualification.setStartDate(rs.getString(2));
                    qualification.setEndDate(rs.getString(3));
                }
                Gson gson = new Gson();
                String qualificationJson = gson.toJson(qualification);
                response.setContentType("application/json");
                response.getWriter().write(qualificationJson);
            }catch(Exception e){
                System.out.println("Unable to connect on RetrieveRecentQualification ->"+e);
            }
        }
    }
}
