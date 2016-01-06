$(document).ready(function() {
	$("#create").click(function(event){
		event.preventDefault();
		var action = $("#action").val();
		var command = (action == "add") ? "Add" : "Update";
		if(confirm(command + " ticket?")){
			var projectId = $("#projectId").val();
			var ticketId = $("#ticketId").val();
			var ticketDetails = $("#ticketDetails").val();
			var ticketStatus = $("#ticketStatus").val();
			var personId = $("select[name='persons']").val();
			var person = {"id": personId};
			var json = {"ticketDetails":ticketDetails, "ticketStatus":ticketStatus, "person":person};
			if(ticketId != null){
				json['id'] = ticketId;
			}
			$.ajax({
				url: "/project/" + projectId + "/ticket/" + action,
				type: "PUT",
				data: JSON.stringify(json),
				beforeSend: function(xhr){
		            xhr.setRequestHeader("Accept", "application/json");
		            xhr.setRequestHeader("Content-Type", "application/json");
				},
				success: function(data){
					if(data){
						if(action == "add"){
							alert("Ticket successfully added!");
							$('[type="reset"]').trigger("click");
						} else {
							alert("Ticket successfully updated!");
						}
					} else {
						alert("Error!");
					}
				},
				error: function(){
					alert("Error!");
				}
			});
		} else {
			return;
		}

	});
});