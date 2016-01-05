$(document).ready(function() {

    $("#contactNumber").on("click",".delete", function(){ 
        $(this).parent('div').remove();
    });

    $("#email").click(function(){ 
            $("#contactNumber").append('<div><input type="hidden" name="contactType" value="Email"/>E-mail: ' +
                                       '<input type="text" name="contactInfo"/>'+
                                       '<button class="delete">Remove</button></div>');
    });
   
    $("#mobile").click(function(){ 
            $("#contactNumber").append('<div id="hey"><input type="hidden" name="contactType" value="Mobile"/>Mobile: '+
                                       '<input type="text" name="contactInfo"/>'+
                                       '<button class="delete">Remove</button></div>');
    });

    $("#landline").click(function(){ 
            $("#contactNumber").append('<div id="hey"><input type="hidden" name="contactType" value="Landline"/>Landline: '+
                                       '<input type="text" name="contactInfo"/>'+
                                       '<button class="delete">Remove</button></div>');
    });
    
    $("#create").click(function(event){
      event.preventDefault();
      var id = $("#id").val();
      var action = $("#action").val();
      var method = $("#method").val();
      var command = (action == "add") ? "Add" : "Update";
      if(confirm(command + " person?")){
        var firstName = $("#firstName").val();
        var middleName = $("#middleName").val();
        var lastName = $("#lastName").val();
        var name = {firstName: firstName, lastName:lastName, middleName:middleName};

        var birthday = $("#birthday").val();

        var houseNo = $("#houseNo").val();
        var street = $("#street").val();
        var barangay = $("#barangay").val();
        var subdivision = $("#subdivision").val();
        var municipality = $("#municipality").val();
        var province = $("#province").val();
        var zipcode = $("#zipcode").val();

        var address = {houseNo: houseNo, 
                       street:street, 
                       barangay:barangay, 
                       subdivision:subdivision, 
                       municipality:municipality,
                       province:province,
                       zipcode:zipcode}

        var gwa = $("#gwa").val();
        var employmentStatus = $("#rdb").val();

        var contactInfo = "";
        var contactType = "";

        var contacts = [];

        $("[name='contactInfo'").each(function(index1){
          contactInfo = $(this).val();
          $("[name='contactType'").each(function(index2){
            if(index1==index2)
              contactType = $(this).val();
              return;
          });
        contacts.push({"contactInfo":contactInfo, "contactType":contactType});
        });

        var roles = [];
        $("[name='personRoles']:checked").each(function(index){
          roles.push({"roleId":$(this).val()});
        });

        var json = {"name": name, "birthday":birthday, "address":address,
                    "gwa":gwa, "employmentStatus":employmentStatus, "contacts":contacts, "roles":roles};

        if (id !== null) {
            json['id'] = id;
        }   

        var ajaxCallAdd = $.ajax({
          url: "/person/" + action,
          type: method,
          data: JSON.stringify(json),
          beforeSend: function(xhr) {
              xhr.setRequestHeader("Accept", "application/json");
              xhr.setRequestHeader("Content-Type", "application/json");
          }
        });

        ajaxCallAdd.done(function(data){
          if(data){
            if(action == "add"){
              alert("Person successfully added!");
              $('[type="reset"]').trigger("click");
            } else {
              alert("Person successfully updated!")
            }
          }
        });
      } else
        return;
    });

});