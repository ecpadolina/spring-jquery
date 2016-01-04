$(document).ready(function() {

    $("#create").click(function(event){
      event.preventDefault();
      if(confirm("Add person?")){
        var firstName = $("#firstName").val();
        var middleName = $("#middleName").val();
        var lastName = $("#lastName").val();
        var name = {firstName: firstName, lastName:lastName, middleName:middleName};

        var birthday = $("#birthday").val();

        var houseNo = $("#houseNo").val();
        var street = $("#street").val();
        var barangay = $("#barangay").val();
        var subdivision = $("#subvidision").val();
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

        var ajaxCallAdd = $.ajax({
          url: "/person/add",
          type: "PUT",
          data: JSON.stringify(json),
          beforeSend: function(xhr) {
              xhr.setRequestHeader("Accept", "application/json");
              xhr.setRequestHeader("Content-Type", "application/json");
          }
        });

        ajaxCallAdd.done(function(data){
          if(data){
            alert("Person successfully added!")
            $('[type="reset"]').trigger("click");
          }
        });
      } else
        return;
    });

});