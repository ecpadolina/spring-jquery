$(document).ready(function() {
	$("#create").click(function(event){
		event.preventDefault();
		var projectId = $("#projectId").val();
		var ticketDetails = $("#ticketDetails").val();
		var ticketStatus = $("#ticketStatus").val();
		var personId = $("select[name='persons']").val();
		var person = {"id": personId};
		var json = {"ticketDetails":ticketDetails, "ticketStatus":ticketStatus, "person":person};

		$.ajax({
			url: "/project/" + projectId + "/ticket/add",
			type: "PUT",
			data: JSON.stringify(json),
			beforeSend: function(xhr){
	            xhr.setRequestHeader("Accept", "application/json");
	            xhr.setRequestHeader("Content-Type", "application/json");
			},
			success: function(data){
				if(data){
					alert("Ticket successfully added!");
					$('[type="reset"]').trigger("click");
				} else {
					alert("error add");
				}
			},
			error: function(){
				alert("error");
			}
		});

	});
});