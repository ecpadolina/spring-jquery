app.config(['$routeProvider',
	function($routeProvider){
		$routeProvider.
			when('/person/edit/:personIdEdit', {
				templateUrl: '/person/edit/',
				controller: 'PersonSaveController'
			}).
			when('/person/add', {
				templateUrl: '/person/add',
				controller: 'PersonSaveController'
			}).
			otherwise({
				redirectTo: '/'
			});
	}]);