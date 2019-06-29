package Servlet;

import Model.EmployeeDetails;
import Model.EmployeeDetailsDTO;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;

import com.google.gson.Gson;

import static database.Database.*;

/**
 * Created by Rishi on 7/12/17.
 */

public class RetrieveEmployee extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        getConnection();
        System.out.println("inside Get");
        SQL = "SELECT\n" +
                " emp.id, emp.first_name, emp.last_name, emp.phone_number, emp.email_address, emp.gender, emp.dob, emp.blood_group  \n" +
                ",\n" +
                "\n" +
                "  (SELECT\n" +
                "         CONCAT(VALUE,',',display_name)\n" +
                "   FROM address\n" +
                "   WHERE id = ad.permanent_address_id) AS permanent,\n" +
                "  (SELECT\n" +
                "     CONCAT(VALUE,',',display_name)\n" +
                "   FROM address\n" +
                "   WHERE id = ad.temporary_address_id) AS TEMPORARY,\n" +
                "emp.address_id, emp.emergency_contact_id, emp.position_id, emp.work_shift_id, emp.hire_date, emp.termination_date, emp.status_id \n" +
                "FROM hrms.employee_details emp,\n" +
                "  hrms.employee_address ad\n" +
                "WHERE emp.address_id =ad.id";
        if (con != null) {
            System.out.println("Inside connection not null");
            try {
                System.out.println("inside try of conneciton not null");
                stmt = con.createStatement();
                rs = stmt.executeQuery(SQL);
                ArrayList<EmployeeDetailsDTO> employeeDetailsDTOs = new ArrayList<EmployeeDetailsDTO>();
                if (rs != null) {
                    while (rs.next()) {
                        EmployeeDetailsDTO eddto = new EmployeeDetailsDTO();
                        eddto.setId(rs.getInt(1));
                        eddto.setFname(rs.getString(2));
                        eddto.setLname(rs.getString(3));
                        eddto.setPhNumber(rs.getString(4));
                        eddto.setEmail(rs.getString(5));
                        eddto.setGender(rs.getString(6));
                        eddto.setDob(rs.getString(7));
                        eddto.setBloodGroup(rs.getString(8));
                        eddto.setPermanentAddress(rs.getString(9));
                        eddto.setTempAddress(rs.getString(10));
                        eddto.setAddress_id(rs.getInt(11));
                        eddto.setEmergencyContactId(rs.getInt(12));
                        eddto.setPositionId(rs.getInt(13));
                        eddto.setWorkShiftId(rs.getInt(14));
                        eddto.setHireDate(rs.getString(15));
                        eddto.setTerminationDate(rs.getString(16));
                        eddto.setStatusId(rs.getInt(17));

                        employeeDetailsDTOs.add(eddto);
                    }

                    Gson gson = new Gson();
                    String employeeJSon = gson.toJson(employeeDetailsDTOs);
                    System.out.println(employeeJSon);
                    response.setContentType("application/json");
                    response.getWriter().write(employeeJSon);
                    System.out.println(employeeJSon);
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}