package Servlet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static database.Database.*;

import Model.InterviewData;

/**
 * Created by Rishi on 014 Jul 14.
 */
@WebServlet(name = "InsertInterviewDetails")
public class InsertInterviewDetails extends HttpServlet {
    private InterviewData interviewData = new InterviewData();

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String interviewee = request.getParameter("interviewee");
        String interviewer = request.getParameter("interviewer");
        String date = request.getParameter("date");
        String time = request.getParameter("time");
        String purpose = request.getParameter("purpose");
        String email = request.getParameter("email");
        String phone = request.getParameter("phone");

        this.interviewData.setIntervieweeName(interviewee);
        this.interviewData.setInterviewerName(interviewer);
        this.interviewData.setDate(date);
        this.interviewData.setTime(time);
        this.interviewData.setPurpose(purpose);
        this.interviewData.setEmail(email);
        this.interviewData.setPhone(phone);
        this.interviewData.setStatus_id(1);

        getConnection();
        SQL = "INSERT INTO interview_schedule(full_name,interviewer_name,interview_date,interview_time,interview_purpose,interview_email,interview_phone, status_id) VALUES(?,?,?,?,?,?,?,?)";
        if (con != null) {
            try {
                pstmt = con.prepareStatement(SQL);

                pstmt.setString(1, interviewData.getIntervieweeName());
                pstmt.setString(2, interviewData.getInterviewerName());
                pstmt.setString(3, interviewData.getDate());
                pstmt.setString(4, interviewData.getTime());
                pstmt.setString(5, interviewData.getPurpose());
                pstmt.setString(6, interviewData.getEmail());
                pstmt.setString(7, interviewData.getPhone());
                pstmt.setInt(8, interviewData.getStatus_id());
                System.out.println(pstmt);
                pstmt.executeUpdate();
            } catch (Exception e) {
                System.err.println("Unable to connect to database");
            }
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}
