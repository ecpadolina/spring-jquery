<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html>
<html lang="en">
<head>
	<title>Spring Activity - Project Management</title>
</head>
<body>
	<jsp:include page="../headers.jsp"/>
	<h1>Project Management</h1>
	Sort By: <select id="column" name="column">
		<option value="id">Id</option>
		<option value="name">Project Name</option>
	</select>
	<select id="order" name="order">
		<option value="1">Ascending</option>
		<option value="2">Descending</option>
	</select>
	<button id="search">Search</button>
	<br>
	<table>
		<thead>
			<tr>
	            <th>ID</th>
	            <th>Name</th>
	            <th>Start Date</th>
	            <th>End Date</th>
	            <th>Actions</th>
			</tr>
		</thead>
		<tbody id="projects">
		</tbody>
	</table>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
	<script src="/resources/project/projectIndex.js"></script>
</body>
</html>
