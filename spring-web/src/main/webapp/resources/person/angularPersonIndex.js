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
					$window.alert(error);
				});
		};
		$scope.listPerson();

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

		$scope.items = ['a','b','c'];
		$scope.selectedItems = [];

		$scope.toggleSelection = function(item){
			var idx = $scope.selectedItems.indexOf(item);
			if(idx > -1){
				$scope.selectedItems.splice(idx, 1);
			} else {
				$scope.selectedItems.push(item);
			}
		};

		$scope.test = function(){
			console.log($scope.selectedItems);
		};
}]);