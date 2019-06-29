package Servlet;

import Model.InterviewData;
import com.google.gson.Gson;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.*;
import java.util.ArrayList;

import static database.Database.*;



public class RetrieveInterview extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
//        DateFormat df2 = new SimpleDateFormat("HH:mm:ss");
//        Calendar calobj = Calendar.getInstance();
//        String date=df.format(calobj.getTime());
//        String time=df2.format(calobj.getTime());
//        System.out.println(date+time);


        getConnection();
        SQL="SELECT * FROM interview_schedule i INNER JOIN status s ON s.id=i.status_id ORDER BY status_id";

        if(con!=null){
            try {
                stmt = con.createStatement();
                rs = stmt.executeQuery(SQL);
                ArrayList<InterviewData> interviewData = new ArrayList<InterviewData>();
                if(rs!=null){
                    while(rs.next()) {
                        InterviewData interview = new InterviewData();
                        interview.setId(rs.getInt(1));
                        interview.setIntervieweeName(rs.getString(2));
                        interview.setInterviewerName(rs.getString(3));
                        interview.setDate(rs.getString(4));
                        interview.setTime(rs.getString(5));
                        interview.setPurpose(rs.getString(6));
                        interview.setEmail(rs.getString(7));
                        interview.setPhone(rs.getString(8));
                        interview.setStatus_id(rs.getInt(9));
                        interview.setStatus(rs.getString(11));

                        interviewData.add(interview);
                    }
                }
                Gson gson = new Gson();
                String interviewJson = gson.toJson(interviewData);
                response.setContentType("application/json");
                response.getWriter().write(interviewJson);
            } catch (SQLException e) {
                System.err.println("Unable to connect to database in retrieve");
            }
        }
    }
}
