app.controller("PersonSaveController", [
	"$scope", "$http", "$window", 
	function($scope, $http, $window){

		$scope.person = {
			"id": 0
		}

		if(action == "edit"){
			$http.get("/person/"+id)
				 .then(function(result){
				 	$scope.person = result.data;
				 	$scope.contacts = result.data.contacts;
				 	$scope.selectedRoles = result.data.roles;
				 	angular.forEach($scope.selectedRoles, function(value, key){
				 		$scope.selectedRoleIds.push(value.roleId);
				 	});
				 	$scope.person.birthday = new Date(result.data.birthday);
				 },
				 	function(error){
				 		alert("Person not found!");
				 	});
		}
		
		$scope.roles = [];
		$scope.listRoles = function(){
			$http.get("/role", {params: {
				"order": 1,
				"column": "id"
			}})
				.then(function(result){
					$scope.roles = result.data;
				}, function(error){
					$window.alert(error);
				});
		};
		$scope.listRoles();

		$scope.selectedRoles = [];
		$scope.selectedRoleIds = [];
		$scope.toggleSelection = function(item){
			var idx = $scope.selectedRoleIds.indexOf(item);

			if(idx > -1){
				$scope.selectedRoleIds.splice(idx, 1);
			} else {
				$scope.selectedRoleIds.push(item);
			}
		};

		$scope.contacts = [];

		$scope.landline = function(event) {
			$scope.contacts.push({
				contactType: "Landline",
				contactInfo: ""
			});
		};

		$scope.email = function(){
			$scope.contacts.push({
				contactType: "Email",
				contactInfo: ""
			});
		}

		$scope.mobile = function(){
			$scope.contacts.push({
				contactType: "Mobile",
				contactInfo: ""
			});
		};

		$scope.remove = function(index){
          $scope.contacts.splice(index, 1);
        };

        $scope.isNew = function(){
        	return ($scope.person.id === 0);
        }

		$scope.save = function () {
			var command = (action == "add") ? "Add" : "Update";
			if($window.confirm(command + " person?")){
				$http.put("/person/"+action, {
					"id": $scope.person.id,
					"name": {
						"firstName": $scope.person.name.firstName,
						"middleName": $scope.person.name.middleName,
						"lastName": $scope.person.name.lastName
					},
					"birthday": $scope.person.birthday,
					"address": {
						"houseNo": $scope.person.address.houseNo,
						"street": $scope.person.address.street,
						"barangay": $scope.person.address.barangay,
						"subdivision": $scope.person.address.subdivision,
						"municipality": $scope.person.address.municipality,
						"province": $scope.person.address.province,
						"zipcode": $scope.person.address.zipcode
					},
					"gwa": $scope.person.gwa,
					"employmentStatus": $scope.person.employmentStatus,
					"contacts":  $scope.contacts
				}, {params: {"roles" : $scope.selectedRoleIds}})
				.then(function(result){
					if(result.data === true){
						if(action == "add"){
							alert("Person successfully added!");
							$('[type="reset"]').trigger("click");
							$scope.contacts = [];
							$scope.selectedRoles = [];
							$scope.selectedRoleIds = [];
						} else {
							alert("Person successfully updated!");
						};
					} else {
						alert("Error!");
					}
				},
					function(error){
						alert("ERROR!");
					});
			} else 
				return;
		}
}]);