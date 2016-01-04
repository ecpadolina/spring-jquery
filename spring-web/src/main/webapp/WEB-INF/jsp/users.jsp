<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html>
<html lang="en">

<head>
	    <title>Spring Activity - Person Management</title>
</head>
<body>
	<jsp:include page="headers.jsp"/>
	<h1>User Management</h1>
	<table>
		<thead>
			<th>ID</th>
			<th>Username</th>
			<th>Enabled</th>
			<th>Role</th>
		</thead>
		<tbody>
			<c:forEach var="user" items="${userList}">
				<tr>
					<td>${user.id}</td>
					<td>${user.username}</td>
					<td>${user.enabled}</td>
					<td>${user.role}</td>
					<td><form method="post" action ="/users/delete"><input type="hidden" name="id" value="${user.id}"/><button>Delete</button></form><button onclick="location.href='users/edit/${user.id}'">Edit</button></td>
				</tr>
			</c:forEach>
</body>
</html>