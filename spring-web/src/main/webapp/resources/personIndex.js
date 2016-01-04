$(document).ready(function() {

    $("#search").click(function(event){
      event.preventDefault();	
      var role = $("#role").val();
      var column = $("#column").val();
      var order = $("#order").val();
      var ajaxCall = $.ajax({
        url: "/",
        dataType: "json",
        data:{
            "role": role,
            "column": column,
            "order": order
        }
      });
      ajaxCall.done(function(persons){
          $("#table").children().remove();
          $.each(persons, function(i, person){
            $("#table").append("<tr><td>" + person.id + "</td>" + 
              "<td>" + person.firstName + " " + person.lastName + "</td>" +
              "<td>" + new Date(person.birthday).toISOString().slice(0,10) + "</td>" +
              "<td>" + person.gwa + "</td>" +
              "<td><button onclick=\"location.href=\'/person/edit/" + person.id + "\'\">Edit</button>" + 
              ((userRole == "ROLE_ADMIN") ? "<button class=\"delete\" value=\"" + person.id + "\">Delete</button>" : "") + "</td></tr>");
          });

        $(".delete").click(function(e){
        	var id = $(this).val();
        	console.log(id);
			if(confirm("Delete person?")){
				var ajaxCall = $.ajax({
					url: "person/delete/" + id,
					type: "DELETE",
					beforeSend: function(xhr) {
						xhr.setRequestHeader("Accept", "application/json");
						xhr.setRequestHeader("Content-Type", "application/json");
					}
				});

				ajaxCall.done(function(data){
					if(data){
						var tr = $(e.target).closest("tr");
						tr.remove();
						alert("Person successfully deleted!");
					} else
						alert("Unable to delete!");
				});

        		ajaxCall.fail(function(){
        			alert("Unable to delete!");
        		});

			} else {
				return;
			}
		});	
    });

});
	$("#search").trigger("click");
});