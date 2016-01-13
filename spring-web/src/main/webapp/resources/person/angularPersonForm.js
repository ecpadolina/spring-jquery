app.controller("PersonSaveController", [
	"$scope", "$http", "$window", 'personService', '$routeParams',
	function($scope, $http, $window, personService, $routeParams){

		$scope.person = {
			"id": 0
		}

		if(action == "edit"){
			personService.getPersonJSON($routeParams.personIdEdit).then(function(result){
			 	$scope.person = result;
			 	$scope.person.contacts = result.contacts;
			 	$scope.selectedRoles = result.roles;
			 	angular.forEach($scope.selectedRoles, function(value, key){
			 		$scope.selectedRoleIds.push(value.roleId);
			 	});
			 	$scope.person.birthday = new Date(result.birthday);
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

		$scope.person.contacts = [];

		$scope.landline = function(event) {
			$scope.person.contacts.push({
				contactType: "Landline",
				contactInfo: ""
			});
		};

		$scope.email = function(){
			$scope.person.contacts.push({
				contactType: "Email",
				contactInfo: ""
			});
		}

		$scope.mobile = function(){
			$scope.person.contacts.push({
				contactType: "Mobile",
				contactInfo: ""
			});
		};

		$scope.remove = function(index){
          $scope.person.contacts.splice(index, 1);
        };

        $scope.isNew = function(){
        	return ($scope.person.id === 0);
        }

		$scope.save = function () {
			var command = (action == "add") ? "Add" : "Update";
			if($window.confirm(command + " person?")){
				personService.savePersonJSON($scope.person,action,$scope.selectedRoleIds)
				.then(function(result){
					if(result.data === true){
						if(action == "add"){
							alert("Person successfully added!");
							$('[type="reset"]').trigger("click");
							$scope.person.contacts = [];
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