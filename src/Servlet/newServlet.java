package Servlet;

import Model.Users;
import com.google.gson.Gson;

import static database.Database.*;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import javax.servlet.*;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;


/**
 * Created by Rishi on 6/19/2017.
 */
public class newServlet extends HttpServlet {

    private String SQL;
    private String u_name = null;
    private String p_word = null;
    private String uname = null;
    private String pword = null;


    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, java.io.IOException {
        HttpSession session = request.getSession();
        uname = request.getParameter("uname");
        pword = request.getParameter("pword");
        getConnection();
        this.SQL = "SELECT * FROM users WHERE user_name='" + uname + "'AND password='" + pword + "'";
        PrintWriter pw = response.getWriter();
        if (con != null) {
            try {
                stmt = con.createStatement();
                rs = stmt.executeQuery(SQL);
                Users user = new Users();
                Gson gson = new Gson();
                if (rs != null) {
                    while (rs.next()) {
                        user.setUserId(rs.getInt(1));
                        user.setUserName(rs.getString(2));
                        user.setPassword(rs.getString(3));
                        user.setRoleId(rs.getInt(4));

                    }
                    String userJson = gson.toJson(user);
                    response.setContentType("application/json");
                    response.getWriter().write(userJson);
                }

            } catch (SQLException e) {
                e.printStackTrace();
                System.err.println("Error In Login");
            }
        }
    }
}
