$(document).ready(function() {
	window.onload=function(){
		loadTickets();
	}

	function loadTickets(){
		if($("#projectId").val() != 0){
			var projectId = $("#projectId").val();
			var ajaxCall = $.ajax({
				url: "/project/edit/" + projectId + "/tickets",
				dataType: "json"
			});
			ajaxCall.done(function(tickets){
				$("#tickets").children().remove();
					$.each(tickets, function(i,ticket){
						$("#tickets").append("<tr><td>"+ticket.id+"</td>" + 
							"<td>" + ticket.ticketDetails + "</td>" + 
							"<td>" + ticket.ticketStatus + "</td>" +
							"<td>" + ticket.person.name.lastName + ", " + ticket.person.name.firstName + "</td>" +
							"<td>" + "<button type='button' onclick='location.href=\"/project/edit/" + projectId + "/editTicket/" + ticket.id + "\"'>Edit</button> " +
							"<button type='button' value='" + ticket.id + "' class='delete'>Delete</button></td><tr>");
				});

				$(".edit").click(function(e){
					//e.preventDefault();
				});

				$(".delete").click(function(e){
					e.preventDefault();
					if(confirm("Delete ticket?")){
						var ticketId = $(this).val();
						var projectId = $("#projectId").val();

						$.ajax({
							url: "/project/edit/" + projectId + "/deleteTicket",
							data: {"ticketId": ticketId},
							success: function(data){
								if(data){
									var tr = $(e.target).closest("tr");
									tr.remove();
									alert("Ticket successfully removed!");
								} else  {
									alert("Error!");
								}
							},
							error: function(){
								alert("error");
							}
						});
					} else {
						return;
					}
				});
			});
		}
	}
});