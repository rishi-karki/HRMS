package Servlet;

import Model.EmergencyContactInfo;
import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;

import static database.Database.*;

/**
 * Created by Rishi on 7/18/17.
 */

public class RetrieveEmergencyContactInfo extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        EmergencyContactInfo contactInfo = new EmergencyContactInfo();
        int id = Integer.parseInt(request.getParameter("emergencyContactId"));

        String SQL1 = "SELECT name,relation,contact_number,email_id FROM `emergency_contact` WHERE id =" + id;
        getConnection();
        if (con != null) {
            try {
                pstmt = con.prepareStatement(SQL1);
                rs = pstmt.executeQuery();
                if (rs != null) {
                    while (rs.next()) {
                        contactInfo.setName(rs.getString(1));
                        contactInfo.setRelation(rs.getString(2));
                        contactInfo.setContactNumber(rs.getString(3));
                        contactInfo.setEmail(rs.getString(4));
                    }
                    Gson gson = new Gson();
                    String contactJson = gson.toJson(contactInfo);
                    response.setContentType("application/json");
                    response.getWriter().write(contactJson);
                } else {
                    System.out.println("No data retrieved");
                }

            } catch (SQLException e) {
                e.printStackTrace();
                System.err.println("SQL Error"+e);
            }

        }
    }
}