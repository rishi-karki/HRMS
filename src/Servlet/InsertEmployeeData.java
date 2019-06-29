package Servlet;

import Model.EmployeeAddress;
import Model.EmployeeDetails;
import com.mysql.jdbc.Statement;
import com.sun.org.apache.xpath.internal.SourceTree;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;

import static database.Database.*;


/**
 * Created by Rishi on 7/10/17.
 */

public class InsertEmployeeData extends HttpServlet {
    private EmployeeAddress employeeAddress = new EmployeeAddress();
    private EmployeeDetails employeeDetails = new EmployeeDetails();
    private int generatedKeysAddress;

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String fname = request.getParameter("fname");
        String lname = request.getParameter("lname");
        String gender = request.getParameter("gender");
        String dob = request.getParameter("dob");
        String phNumber = request.getParameter("phNumber");
        String email = request.getParameter("email");
        String bloodGroup = request.getParameter("bloodGroup");
        String hireDate = request.getParameter("hireDate");

        int permanentVDC = Integer.parseInt(request.getParameter("permanentVDC"));
        String permanentTole = request.getParameter("permanentTole");

        int temporaryVDC = Integer.parseInt(request.getParameter("temporaryVDC"));
        String temporaryTole = request.getParameter("temporaryTole");

        this.employeeAddress.setPermanentAddressId(permanentVDC);
        this.employeeAddress.setTemporaryAddressID(temporaryVDC);
        this.employeeAddress.setPermanentTole(permanentTole);
        this.employeeAddress.setTemporaryTole(temporaryTole);
        this.employeeDetails.setFirstName(fname);
        this.employeeDetails.setLastName(lname);
        this.employeeDetails.setGender(gender);
        this.employeeDetails.setDob(dob);
        this.employeeDetails.setPhNumber(phNumber);
        this.employeeDetails.setEmail(email);
        this.employeeDetails.setBloodGroup(bloodGroup);
        this.employeeDetails.setHireDate(hireDate);
        this.employeeDetails.setStatusID(1);


        getConnection();
        if (con != null) {
            insertAddress();
            this.employeeDetails.setAddressId(this.generatedKeysAddress);

            insertEmployeeInfo();
            response.setContentType("text/html");
            response.getWriter().write("Success");
        } else {
            System.err.println("Connection not established");
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    }

    public void insertAddress() {
        SQL = "INSERT INTO employee_address(permanent_address_id,temporary_address_id,permanent_tole,temporary_tole) VALUES(?,?,?,?)";
        try {
            pstmt = con.prepareStatement(SQL, Statement.RETURN_GENERATED_KEYS);
            pstmt.setInt(1, employeeAddress.getPermanentAddressId());
            pstmt.setInt(2, employeeAddress.getTemporaryAddressID());
            pstmt.setString(3, employeeAddress.getPermanentTole());
            pstmt.setString(4, employeeAddress.getTemporaryTole());

            pstmt.executeUpdate();

            rs = pstmt.getGeneratedKeys();
            if (rs.next()) {
                this.generatedKeysAddress = rs.getInt(1);
            } else {
                System.err.println("No rows inserted");
            }

        } catch (SQLException e) {
            e.printStackTrace();
            System.err.println("Invalid query \n" + e);
        }
    }

    public void insertEmployeeInfo() {
        SQL = "INSERT INTO employee_details(first_name,last_name,gender,dob,blood_group,phone_number,email_address,address_id,hire_date,status_id) VALUES(?,?,?,?,?,?,?,?,?,?)";
        try {
            pstmt = con.prepareStatement(SQL, Statement.RETURN_GENERATED_KEYS);
            pstmt.setString(1, employeeDetails.getFirstName());
            pstmt.setString(2, employeeDetails.getLastName());
            pstmt.setString(3, employeeDetails.getGender());
            pstmt.setString(4, employeeDetails.getDob());
            pstmt.setString(5, employeeDetails.getBloodGroup());
            pstmt.setString(6, employeeDetails.getPhNumber());
            pstmt.setString(7, employeeDetails.getEmail());
            pstmt.setInt(8, employeeDetails.getAddressId());
            pstmt.setString(9, employeeDetails.getHireDate());
            pstmt.setInt(10, employeeDetails.getStatusID());


            pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            System.err.println("Incorrect query" + e);
        }
    }
}
