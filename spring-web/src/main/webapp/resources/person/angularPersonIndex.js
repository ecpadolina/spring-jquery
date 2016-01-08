app.controller("PersonController", [
	"$scope", "$http", "$window",
	function($scope, $http, $window){
		$scope.column = "id";
		$scope.order = 1;
		$scope.role = 0;
		$scope.listPerson = function(){
			$scope.persons = [];

			$http.get("/", {params:{
				"order": $scope.order,
				"column": $scope.column,
				"role": $scope.role
			}})
				.then(function(result){
					$scope.persons = result.data;
				}, function(error){
					$window.alert("Error!");
				});
		};
		$scope.listPerson();
		$scope.order = $scope.order[0];

		$scope.isAdmin = function(){
			return userRole === "[ROLE_ADMIN]";
		}

		$scope.deletePerson = function(personId){
			if($window.confirm("Delete person?")){
				$http.delete("person/delete/" + personId)
					.then(function(data){
						if(data){
							alert("Person successfully deleted!");
							$scope.listPerson();
						} else {
							alert("Error!");
						}
					},
						function(error){
							alert("Error!");
					});
			} else {
				return;
			}
		}
}]);