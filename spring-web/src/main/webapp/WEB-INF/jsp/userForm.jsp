<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page language="java" pageEncoding="UTF-8" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>Spring Activity - User Form</title>
</head>
<body>
	<jsp:include page="headers.jsp"/>
	<h1>User Form</h1>
	<form:form method="POST" accept-charset="UTF-8" modelAttribute="user">
		Username: <form:input path="username"/><br>
		Password: <form:input path="password"/><br>
		Enabled: <form:radiobutton path="enabled" value="true" label="True" id="rdbEn"/>
		<form:radiobutton path="enabled" value="false" label="False" id="rdbEn"/><br>
		Role: <form:radiobutton path="role" value="ROLE_USER" label="User" id="rdbRole"/>
		<form:radiobutton path="role" value="ROLE_ADMIN" label="Admin" id="rdbRole"/><br>
		<button id="create" type="submit">Submit</button>
		<button type="reset" value="submit">Reset</button>
	</form:form>
</body>
</html>