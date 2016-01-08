<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page language="java" pageEncoding="UTF-8" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html>
<html lang="en">

<head>
<title>Person Management - Person Form</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
	<script src="/resources/angular.min.js"></script>
</head>
<body>
	<jsp:include page="../headers.jsp"/>
	<h1>Person Form</h1>
		<script type="text/javascript">
			var action = "${action}";
			var method = "${method}";
			var id = "${id}";
		</script>
	<div ng-app="person" ng-controller="PersonSaveController">
	<form ng-submit="save()">
		<input type="hidden" id="id" path="id"/>
		<table>
			<tr ng-hide="isNew()">
				<td>ID: </td>
				<td><input ng-model="person.id" type="hidden"> {{person.id}} </td>
			</tr>
			<tr>
				<td>First Name:</td>
				<td><input ng-model="person.name.firstName" required="required"/></td>
			</tr>
			<tr>
				<td>Middle Name:</td>
				<td><input ng-model="person.name.middleName" required="required"/></td>
			</tr>
			<tr>
				<td>Last Name:</td>
				<td><input ng-model="person.name.lastName" required="required"/></td>
			</tr>
			<tr>
				<td>Birthday</td>
				<td><input ng-model="person.birthday" type="date" required="required"/></td>
			</tr>
			<tr>
				<td>House Number:</td>
				<td><input ng-model="person.address.houseNo" required="required"/></td>
			</tr>
			<tr>
				<td>Street:</td>
				<td><input ng-model="person.address.street" required="required"/></td>
			</tr>
			<tr>
				<td>Barangay:</td>
				<td><input ng-model="person.address.barangay" required="required"/></td>
			</tr>
			<tr>
				<td>Subdivision:</td>
				<td><input ng-model="person.address.subdivision" required="required"/></td>
			</tr>
			<tr>
				<td>Municipality</td>
				<td><input ng-model="person.address.municipality" required="required"/></td>
			</tr>
			<tr>
				<td>Province:</td>
				<td><input ng-model="person.address.province" required="required"/></td>
			</tr>
			<tr>
				<td>Zipcode:</td>
				<td><input ng-model="person.address.zipcode" type="number" required="required"/></td>
			</tr>
			<tr>
				<td>Grade:</td>
				<td><input ng-model="person.gwa" type="number" required="required"/></td>
			</tr>
			<tr>
				<td>Employment Status:</td>
				<td><input type="radio" ng-model="person.employmentStatus" value="Intern">Intern</input>
					<input type="radio" ng-model="person.employmentStatus" value="Probationary">Probationary</input>
					<input type="radio" ng-model="person.employmentStatus" value="Regular">Regular</input>
					<input type="radio" ng-model="person.employmentStatus" value="Resigned">Resigned</input></td>
			</tr>
			<tr>
				<td>Add Contact:</td><td><button type="button" ng-click="landline()">Landline</button> <button type="button" ng-click="mobile()">Mobile</button> <button type="button" ng-click="email()">Email</button></td>
			</tr>
			<tr ng-repeat="contact in contacts">
				<td> <input type="hidden" ng-model="contact.contactType"/> {{contact.contactType}}:</td>
				<td> <input ng-model="contact.contactInfo"> <button type="button" ng-click="remove()">Remove</button></td>
			</tr>
			<tr>
				<td>Roles:</td>
				<td>
					<label ng-repeat="role in roles">
					<input type="checkbox" value="{{role}}" ng-checked="selectedRoleIds.indexOf(role.roleId) > -1" ng-click="toggleSelection(role.roleId)">{{role.roleType}}</input>
					</label>
				</td>
			<tr>
				<td colspan="3"> <button type="submit">Submit</button> <button type="reset">Reset</button></td>
			</tr>
		</table>
	</form>
	</div>

	<script src="/resources/person/angularPerson.js"></script>	
	<script src="/resources/person/angularPersonForm.js"></script>
</body>
</html>
