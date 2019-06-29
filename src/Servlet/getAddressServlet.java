package Servlet;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;

import Model.Address;
import com.google.gson.Gson;

import static database.Database.*;

/**
 * Created by Rishi on 7/6/17.
 */

public class getAddressServlet extends HttpServlet {
    private String SQL = null;

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {


        int id = Integer.parseInt(request.getParameter("id"));
        int parent_id = Integer.parseInt(request.getParameter("parent_id"));

        getConnection();

        if (con != null) {
            try {
                stmt = con.createStatement();
                Gson gson = new Gson();
                ArrayList<Address> addressArray = new ArrayList<Address>();
                if (id == 0 && parent_id == -1) {
                    this.SQL = "SELECT * FROM address WHERE geography_type=" + id;
                    rs = stmt.executeQuery(SQL);
                    if (rs != null) {
                        int i = 0;
                        while (rs.next()) {
                            Address tempAdd = new Address();
                            tempAdd.setId(rs.getInt(1));
                            tempAdd.setDisplay_name(rs.getString(2));
                            tempAdd.setGeography_type(rs.getInt(3));
                            tempAdd.setValue(rs.getString(4));
                            tempAdd.setParent_id(rs.getInt(5));
                            tempAdd.setCreated(rs.getString(6));
                            tempAdd.setLast_modified(rs.getString(7));
                            addressArray.add(tempAdd);
                        }
                        String addressJson = gson.toJson(addressArray);
                        response.setContentType("application/json");
                        response.getWriter().write(addressJson);

                    } else {
                        System.err.println("No data found");
                    }
                } else {
                    this.SQL = "SELECT * FROM address WHERE parent_id=" + parent_id;
                    rs = stmt.executeQuery(SQL);
                    if (rs != null) {
                        int i = 0;
                        while (rs.next()) {
                            Address tempAdd = new Address();
                            tempAdd.setId(rs.getInt(1));
                            tempAdd.setDisplay_name(rs.getString(2));
                            tempAdd.setGeography_type(rs.getInt(3));
                            tempAdd.setValue(rs.getString(4));
                            tempAdd.setParent_id(rs.getInt(5));
                            tempAdd.setCreated(rs.getString(6));
                            tempAdd.setLast_modified(rs.getString(7));
                            addressArray.add(tempAdd);
                        }
                        String addressJson = gson.toJson(addressArray);
                        response.setContentType("application/json");
                        response.getWriter().write(addressJson);
                    } else {
                        System.err.println("No data found");
                    }
                }
            } catch (SQLException e) {
                System.err.println("Wrong SQL syntax. " + e);
            }
        }
    }
}

