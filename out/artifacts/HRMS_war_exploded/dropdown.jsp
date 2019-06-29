<%--
  Created by IntelliJ IDEA.
  User: Madhav
  Date: 013 Jul 13
  Time: 5:08 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%--
  Created by IntelliJ IDEA.
  User: Madhav
  Date: 002 Jul 2
  Time: 12:30 PM
  To change this template use File | Settings | File Templates.
--%>
<style>
    .glyphicon-tasks{
        color:black;
    }
    .glyphicon-tasks:hover{
        color:green;
    }
</style>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<style>
</style>
<ul class="list-unstyled">
    <li class="dropdown">
        <a href="#" class="dropdown-toggle" data-toggle="dropdown"><span class="glyphicon glyphicon-tasks"></span></a>
        <ul class="dropdown-menu dropdown-menu-right">
            <li><a href="#"><span class="glyphicon glyphicon-menu-hamburger"></span> View full details</a></li>
            <li><a href="#"><span class="glyphicon glyphicon-edit"></span> Edit details</a></li>
            <li><a href="#"><span class="glyphicon glyphicon-plane"></span> Assign leave</a></li>
            <li class="divider"></li>
            <li><a href="#"><span class="glyphicon glyphicon-erase"></span> Terminate</a></li>
        </ul>
    </li>
</ul>