<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>

	<div><a href="/">Person</a> <a href="/person/add">Add Person</a> <a href="/person/upload">Upload File</a> </div>
	<div> <a href="/role"> Roles </a> <a href="/role/add"> Add Role </a>
	</div>
	<div>
		<a href="/project"> Projects </a> <a href="/project/add"> Add Project </a>
	</div>
	<sec:authorize access="hasRole('ROLE_ADMIN')">
		<div>
			<a href="/users"> Users </a> <a href="/users/add"> Add User </a>
		</div>
	</sec:authorize>
	<div>
		<a href="/?lang=fil">Tagalog</a>
		<a href="/?lang=en">English</a>
	</div>
	<div>
		<a href="/logout">Log Out</a>
	</div>