$(document).ready(function() {
    
    $("#roleSearch").click(function(event){
      var column = $("#column").val();
      var order = $("#order").val();
      $.ajax({
        url: "/role",
        dataType: "json",
        data:{
            "column": column,
            "order": order
        },

        success:function(roles){
          $("#roleTable").children().remove();
          $.each(roles, function(i, role){
            $("#roleTable").append("<tr><td>" + role.roleId + "</td>" +
              "<td>" + role.roleType + "</td>" +
              "<td><form method=\"POST\"><input type=\"hidden\" name=\"id\" value=\"" + role.roleId + "\"/><input type=\"submit\" value=\"Delete\"/></form>"+
              "<button onclick=\"location.href=\'/role/edit/" + role.roleId + "\'\">Edit</button></td></tr>");
          });
        },
        error:function(){ console.log("error") 
        },
      });
      event.preventDefault();
    });

});