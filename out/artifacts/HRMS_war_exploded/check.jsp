<%--
  Created by IntelliJ IDEA.
  User: Madhav
  Date: 013 Jul 13
  Time: 5:06 PM
  To change this template use File | Settings | File Templates.
--%>
<%@page import="static database.Database.*"%>
<%
    getConnection();
    int i = 0;
    String name = request.getParameter("val");
    if (name == null || name.equals("")) {
    } else {
        try {
            stmt = con.createStatement();
            SQL = "SELECT * FROM employee_details WHERE employee_details.first_name LIKE '" + name + "%' OR employee_details.last_name LIKE '" + name + "%' OR employee_details.gender LIKE '" + name+"' OR employee_details.hire_date LIKE '" + name+"%' OR employee_details.id LIKE '" + name+"'";
            rs = stmt.executeQuery(SQL);
            if (!rs.isBeforeFirst()) {
                out.print("<p><h4 style='color:red;'>No Record Found for " + name + "</h4></p>");
            } else {
                out.print("<table class='table table-striped'>");
                out.print("<tr><th>Id</th><th colspan='2'>Name</th><th>Gender</th><th>Phone</th><th>Hired Date</th><th>Action</th></tr>");
                while (rs.next()) {
                    out.print("<tr><td>esewa-" + rs.getString(1) + "</td><td colspan='2'>" + rs.getString(2) + " " + rs.getString(3) + "</td><td>" + rs.getString(4) + "</td><td>" + rs.getString(7) + "</td><td>" + rs.getString(13) + "</td>");
%><td><%@include file="dropdown.jsp" %></td></tr><%
        i++;
    }
%><%
    if (rs != null) {
        if (i > 1) {
%>
<h4 style="margin-left: 15px;"><i><%=name%>
</i> has <%=i%> entries</h4>
<%} else {%>
<h4 style="margin-left: 15px;"><i><%=name%>
</i> has <%=i%> entry</h4>
<%
        }
    }
%><%
                out.print("</table>");
            }
        } catch (Exception e) {
            out.print("<h4 style=\"color:red;\">Unable to connect to the server</h4>");
        }
    }
%>