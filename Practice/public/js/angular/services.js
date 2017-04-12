angular.module('myApp').factory('AuthService',
  ['$q', '$timeout', '$http', '$stateParams',
  function ($q, $timeout, $http, $stateParams) {
	  
    var user = null;

    return ({
      isLoggedIn: isLoggedIn,
      getUserStatus: getUserStatus,
      login: login,
      logout: logout,
      register: register,
	  getUser: getUser,
	  getComment: getComment
	  //getDetails: getDetails
    });
	
	function getUser() {
		return $http.get('/user/list')
			.then(function(result) {
				return result.data;
			}, function(response) {
				console.log(response.data);
			})
	}
	
    function isLoggedIn() {
      if(user) {
        return true;
      } else {
        return false;
      }
    }
	
	function getUserStatus() {
      return $http.get('/status')
	  .then(function(response) {
		 if(response.data.status){
			console.log(response.data);
          user = true;
        } else {
			console.log(response.data);
          user = false;
        }
	  }, function(response) {
		  user = false
	  });
    }
	
	function login(username, password) {
		var deferred = $q.defer();
		
		$http.post('/login',
			{username: username, password: password})
			.then(function(response) {
				if(response.status === 200 && response.data.status) {
					user = true;
					deferred.resolve();
				} else {
					user = false;
					deferred.reject();
				}
			}, function(response) {
				user = false;
				deferred.reject();
			});
			return deferred.promise;
	}
	
	function register(username, password) {
		var deferred = $q.defer();

		$http.post('/register',
			{username: username, password: password})
			.then(function(response) {
				if(response.status === 200 && response.data.status){
					deferred.resolve();
				} else {
					deferred.reject();
				}
			}, function(response) {
				deferred.reject();
			});
		
		// return promise object
		return deferred.promise;
	}
	
	function getComment(comment, stream) {
		var deferred = $q.defer();
		
		$http.post('/comment/create',
			{comment: comment, stream: $stateParams.streamId})
			.then(function(response) {
				if(response.status === 200 && response.data.status){
					deferred.resolve();
				} else {
					deferred.reject();
				}
			}, function(response) {
				deferred.reject();
			});
		return deferred.promise;
	}
	
	function logout() {
		var deferred = $q.defer();

		$http.get('/logout')
		.then(function(response) {
			user = false;
			deferred.resolve();
		}, function(response) {
			user = false;
			deferred.reject();
		});
		// return promise object
		return deferred.promise;
	}
	
	 return {
		data: $q.all([getDetails])
	}
	

}]);

angular.module('myApp').factory('MyService', 
	['$rootScope', 'AuthService',
	function($rootScope, AuthService) {
		return({
			served: served
		});
		function served() {
		$rootScope.loggedIn = false;
		AuthService.getUserStatus()
			.then(function(response) {
				if(AuthService.isLoggedIn()) {
				 $rootScope.loggedIn = true
				 }
			}, function(response) {
				console.log('error:' + response.data);
			});
		}
	}]);
	
// angular.module('myApp').filter('unsafe', function($sce) {
	// return function(val) {
		// return $sce.trustAsHtml(val);
	// };
// });

angular.module('myApp').filter('unsafe', ['$sce', function($sce){
        return function(val) {
            return $sce.trustAsHtml(val);
        };
}]);