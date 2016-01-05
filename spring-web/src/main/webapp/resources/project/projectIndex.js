$(document).ready(function(){

	$("#search").click(function(){
      var column = $("#column").val();
      var order = $("#order").val();
      var ajaxCall = $.ajax({
      	url: "/project",
      	dataType: "json",
      	data: {
      		"order": order,
      		"column": column
      	}
      });
      ajaxCall.done(function(projects){
      	$("#projects").children().remove();
      	$.each(projects, function(i, project){
      		$("#projects").append("<tr><td>" + project.id + "</td>" + 
      			"<td>" + project.name + "</td>" + 
      			"<td>" + project.startDate + "</td>" +
      			"<td>" + project.endDate + "</td>" +
      			"<td><button onclick=\"location.href=\'/project/edit/" + project.id + "\'\">Edit</button> " +
      			"<button class=\"delete\" value=\"" + project.id + "\">Delete</button></td></tr>");
      	});
      	$(".delete").click(function(e){
      		var id = $(this).val();
      		if(confirm("Delete project?")){
      			$.ajax({
      				url: "project/delete/" + id,
      				success: function(data){
      					if(data){
      						var tr = $(e.target).closest("tr");
      						tr.remove();
      						alert("Project successfully deleted!");
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
	});

	$("#search").trigger("click");
});