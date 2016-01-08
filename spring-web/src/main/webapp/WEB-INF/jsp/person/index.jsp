<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page language="java" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<!DOCTYPE html>
<html lang="en">
<head>
	<title>Spring Activity - Person Management</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
	<script src="/resources/angular.min.js"></script>
</head>
<body>
	<div ng-app="person" ng-controller="PersonController">
		<jsp:include page="../headers.jsp"/>
		<h1>Person Management</h1>
		<form>
		Sort By: <select id="column" ng-model="column" name="column">
				<option value="id">Id</option>
				<option value="name.lastName">Last Name</option>
				<option value="gwa">Gwa</option>
			</select>
			<select id="order" ng-model="order" name="order">
				<option value="1">Ascending</option>
				<option value="2">Descending</option>
			</select>
			<select id="role" ng-model="role" name="role">
				<c:forEach var="r" items="${roleList}">
					<option value="${r.roleId}">${r.roleType}</option>
				</c:forEach>
			</select>
			<button id="search" ng-click="listPerson()" type="button">Search</button>
		</form>
		<br>
		<table>
			<thead>
				<tr>	
		            <th>ID</th>
		            <th><spring:message code="label.name"/></th>
		            <th><spring:message code="label.birthday"/></th>
		            <th><spring:message code="label.grade"/></th>
		            <th><spring:message code="label.action"/></th>
				</tr>
			</thead>
			<tbody id="table">
				<tr ng-repeat="person in persons">
					<td>{{person.id}}</td>
					<td>{{person.lastName}}, {{person.firstName}}</td>
					<td>{{person.birthday}}</td>
					<td>{{person.gwa}}</td>
					<td><a href="/person/edit/{{person.id}}"><button>Edit</button></a>
					<button ng-show="isAdmin()" ng-click="deletePerson(person.id)">Delete</button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
	<script>var userRole = $("#userRole").val();</script>
	<script src="/resources/person/angularPerson.js"></script>
	<script src="/resources/person/angularPersonIndex.js"></script>

</body>
</html>