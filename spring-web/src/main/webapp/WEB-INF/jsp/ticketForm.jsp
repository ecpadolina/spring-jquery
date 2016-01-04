<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page language="java" pageEncoding="UTF-8" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html>
<html lang="en">
<head>
	<title>Spring Activity - Ticket Management</title>
</head>
<body>
	<jsp:include page="headers.jsp"/>
	<h1> Ticket Form </h1>
	<form:form method="POST" modelAttribute="ticket">
	<form:input type="hidden" path="id"/>
	Ticket Details: <form:input path="ticketDetails"/><br>
	Ticket Status: <form:input path="ticketStatus"/><br>
	Assign to: 
	<select name="persons">
	<c:forEach items="${persons}" var="p">
		<c:set var="selected" value=""/>
		<c:forEach items="${project.persons}" var="projectPerson">
			<c:if test="${projectPerson.id == p.id}">
				<c:set var="selected" value=" selected"/>
			</c:if>
		</c:forEach>
		<option value="${p.id}" ${selected}> ${p.name.firstName} ${p.name.lastName} </option>
	</c:forEach>
	</select>
	<br>
	<br>
	<input type="submit" value="Submit"/>
	<input type="reset"/>
</form:form>
</body>
</html>