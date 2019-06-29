package Servlet;

import Model.InterviewData;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static database.Database.SQL;
import static database.Database.*;

/**
 * Created by Rishi on 018 Jul 18.
 */
@WebServlet(name = "UpdateInterviewTable")
public class UpdateInterviewTable extends HttpServlet {
    InterviewData interviewDetails = new InterviewData();

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        interviewDetails.setId(Integer.parseInt(request.getParameter("id")));
        interviewDetails.setIntervieweeName(request.getParameter("iname"));
        interviewDetails.setInterviewerName(request.getParameter("name"));
        interviewDetails.setDate(request.getParameter("date"));
        interviewDetails.setTime(request.getParameter("time"));
        interviewDetails.setPurpose(request.getParameter("purpose"));
        interviewDetails.setEmail(request.getParameter("email"));
        interviewDetails.setPhone(request.getParameter("phone"));
        interviewDetails.setStatus(request.getParameter("status"));

        SQL = "UPDATE interview_schedule SET full_name = ?, interviewer_name = ?, interview_date = ?, interview_time= ?, interview_purpose= ?, interview_email= ?, interview_phone= ?, status_id=? WHERE id=?";

        getConnection();

        if (con != null) {
            try {
                pstmt = con.prepareStatement(SQL);
                pstmt.setString(1, interviewDetails.getIntervieweeName());
                pstmt.setString(2, interviewDetails.getInterviewerName());
                pstmt.setString(3, interviewDetails.getDate());
                pstmt.setString(4, interviewDetails.getTime());
                pstmt.setString(5, interviewDetails.getPurpose());
                pstmt.setString(6, interviewDetails.getEmail());
                pstmt.setString(7, interviewDetails.getPhone());
                pstmt.setInt(9, interviewDetails.getId());

                if (interviewDetails.getStatus().equals("Active")) {
                    interviewDetails.setStatus_id(2);
                    pstmt.setInt(8, interviewDetails.getStatus_id());
                } else {
                    interviewDetails.setStatus_id(1);
                    pstmt.setInt(8, interviewDetails.getStatus_id());
                }
                pstmt.executeUpdate();
                response.setContentType("text/html");
                response.getWriter().write("Successs");
            } catch (Exception e) {
                System.err.println("Unable to connect to database in UpdateInterviewTable.java");
            }
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
