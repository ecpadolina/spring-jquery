$(document).ready(function() {
	$("#create").click(function(event){
		event.preventDefault();
		var action = $("#action").val();
		var method = $("#method").val();
		var command = (action == "add") ? "Add" : "Update";
		if(confirm(command + " project?")){
			var projectId = $("#projectId").val();
			var projectName = $("#projectName").val();
			var startDate = $("#startDate").val();
			var endDate = $("#endDate").val();
			var persons = [];
			$("#members :selected").each(function(i,selected){
				persons.push({"id":$(selected).val()});
			});
			var json = {"name":projectName, "startDate":startDate, "endDate":endDate, "persons":persons};
			if (projectId !== null) {
            	json['id'] = projectId;
        	}   
			var ajaxCall = $.ajax({
				url: "/project/" + action ,
				type: method,
				data: JSON.stringify(json),
				beforeSend: function(xhr){
	              xhr.setRequestHeader("Accept", "application/json");
	              xhr.setRequestHeader("Content-Type", "application/json");
	           	}
	         });

	        ajaxCall.done(function(data){
	        	if(data){
	        		if(action == "add"){
	           			alert("Project successfully added");
	           			$('[type="reset"]').trigger("click");
	           		} else {
	           			alert("Project successfully updated");
	           		}
	           	} else
	           		alert("error");
	        });
    	}
	});

});