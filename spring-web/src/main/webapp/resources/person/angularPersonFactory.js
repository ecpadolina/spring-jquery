app.factory('personService', function($http){
	return{
		listPersonJSON: function(order,column,role){
			return $http.get("/person/list", {params: {"order":order, "column":column, "role":role}})
						.then(function(result){
							return result.data;
						});
		},
		deletePersonJSON: function(personId){
			return $http.delete("/person/delete/"+personId)
						.then(function(data){
							return data;
						});
		},
		savePersonJSON: function(person,action,roles){
			return $http.put("/person/"+action,{
				"id": person.id,
				"name": {
					"firstName": person.name.firstName,
					"middleName": person.name.middleName,
					"lastName": person.name.lastName
				},
				"birthday": person.birthday,
				"address": {
					"houseNo": person.address.houseNo,
					"street": person.address.street,
					"barangay": person.address.barangay,
					"subdivision": person.address.subdivision,
					"municipality": person.address.municipality,
					"province": person.address.province,
					"zipcode": person.address.zipcode
				},
				"gwa": person.gwa,
				"employmentStatus": person.employmentStatus,
				"contacts": person.contacts
			}, {params: {"roles": roles}})
				.then(function(data){
					return data;
				});
		},
		getPersonJSON: function(personId){
			return $http.get("/person/"+personId)
				.then(function(result){
					return result.data;
				});
		},
		listAssociatedRoles: function(){
			return $http.get("/person/associatedRoles")
					.then(function(result){
						return result.data;
					});
		}
	};
});