app.controller("PersonController", [
	"$scope", "$http", "$window", "personService",
	function($scope, $http, $window, personService){
		$scope.column = "id";
		$scope.orderOptions = [{id: "1", name:"Ascending"},
						{id: "2", name:"Descending"}];
		$scope.order = 1;
		$scope.roleOptions = [];
		$scope.role = 0;
		$scope.persons = [];


		$scope.listPerson = function(){
			personService.listPersonJSON($scope.order,$scope.column,$scope.role).then(function(data){
				$scope.persons = data;
			});
			personService.listAssociatedRoles().then(function(data){
				$scope.roleOptions = data;
			});
		};
		$scope.listPerson();

		$scope.isAdmin = function(){
			return userRole === "[ROLE_ADMIN]";
		};

		$scope.deletePerson = function(personId){
			if($window.confirm("Delete person?")){
				personService.deletePersonJSON(personId)
					.then(function(data){
						if(data){
							alert("Person successfully deleted!");
							$scope.listPerson($scope.order,$scope.column,$scope.role);
						} else {
							alert("Error!");
						}
					});
			} else {
				return;
			}
		};

}]);