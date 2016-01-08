app.controller("PersonSaveController", [
	"$scope", "$http", "$window", 
	function($scope, $http, $window){

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
		$scope.toggleSelection = function(item){
			var idx = $scope.selectedRoles.indexOf(item);
			if(idx > -1){
				$scope.selectedRoles.splice(idx, 1);
			} else {
				$scope.selectedRoles.push(item);
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

        $scope.test = function(){
        	console.log($scope.contacts);
        } 

		$scope.save = function () {
			if($window.confirm("Add Person?")){
				$http.put("/person/add", {
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
					"roles": $scope.selectedRoles,
					"contacts":  $scope.contacts
				})
				.then(function(result){
					if(result.data === true){
						alert("Person successfully added!");
						$('[type="reset"]').trigger("click");
						$scope.contacts = [];
					} else {
						alert("Error!");
					}
					console.log(result);
				},
					function(error){
						alert("ERROR!");
					});
			} else 
				return;
		}
}]);