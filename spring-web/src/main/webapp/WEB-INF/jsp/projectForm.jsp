<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page language="java" pageEncoding="UTF-8" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html>
<html lang="en">
<head>
	<script type='text/javascript' src="/dwr/engine.js"></script>
    <script type='text/javascript' src="/dwr/util.js"></script>
    <script type="text/javascript" src="/dwr/interface/DWRService.js"></script>
	<title>Spring Activity - Project Management</title>
</head>
<body>
	<jsp:include page="headers.jsp"/>
	<h1>Project Form</h1>
	<form:form method="POST" accept-charset="UTF-8" modelAttribute="project">
		<form:input type="hidden" path="id"/>
		<input id="projectId" type="hidden" value="${id}"/>
		<div>Project Name: <form:input path="name"/><form:errors class="error" path="name"/></div>
		<div>Start Date: <form:input type="date" path="startDate"/></div>
		<div>End Date: <form:input type="date" path="endDate"/><form:errors path="endDate"/></div>
		<br>
		<div>
		Select Members:<br>
		<c:if test="${not empty persons}">
		<select name="members" multiple>
		<c:forEach items="${persons}" var="p">
			<c:set var="selected" value=""/>
			<c:forEach items="${project.persons}" var="projectPerson">
				<c:if test="${projectPerson.id == p.id}">
					<c:set var="selected" value=" selected"/>
				</c:if>
			</c:forEach>
			<option value="${p.id}" ${selected}> ${p.firstName} ${p.lastName} </option>
		</c:forEach>
		</select>
		</c:if>
		<br><br>
		<c:if test="${not empty id}">
			<a href="/project/edit/${id}/addTicket">Add Ticket</a>
		</c:if>
		<c:if test="${not empty project.tickets}">
		<table>
			<thead>
				<th> Ticket Id </th>
				<th> Ticket Details </tH>
				<th> Ticket Status </th>
				<th> Assigned Person </th>
				<th> Actions </th>
			</thead>
			<tbody id="tickets">
			</tbody>
		</table>
		Delete Ticket: <input id="ticketId" placeholder="Enter Ticket Id"/> <button id="ticketDel" onclick="deleteTicket()">Delete</button>
		</c:if>
		<br>
		<br>
		</div>
		<div>
		<input type="submit" value="Submit"/>
		<input type="reset"/>
		</div>
	</form:form>
	<script>
		window.onload = function(){
			listTicket();
		}

		function listTicket(){
			var projectId = dwr.util.getValue("projectId");
			DWRService.listProjectTicket(projectId, {
				callback: function(data){
					var cellFuncs = [
						function(data) { return data.id; },
						function(data) { return data.ticketDetails; },
						function(data) { return data.ticketStatus; },
						function(data) { return (data.person.name.lastName + ", " + data.person.name.firstName); },
						function(data) { return "<a href=\"/project/edit/${id}/editTicket/" + data.id + "\">Edit Ticket</a>" }
					];
					dwr.util.removeAllRows("tickets");
					dwr.util.addRows("tickets", data, cellFuncs, { escapeHtml:false });
				},
				errorHandler: function(){
				}
			});
		}

		function deleteTicket(){
			if(confirm("Delete ticket?")){
				event.preventDefault();
				var projectId = dwr.util.getValue("projectId");
				var ticketId = dwr.util.getValue("ticketId");

				DWRService.deleteTicket(projectId, ticketId, {
					callback : function(data){
						if(data){
							alert("Ticket successfully deleted!");
							listTicket();
							dwr.util.setValue("ticketId", "");
						} else {
							alert("Ticket not found");
							dwr.util.setValue("ticketId", "");
						}
					}
				});
			} else {
				event.preventDefault();
			}
		}
	</script>
</body>
</html>