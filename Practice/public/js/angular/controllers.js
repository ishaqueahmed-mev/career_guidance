angular.module('myApp').controller('myController' ,
	['$scope', '$resource', '$state', '$http', '$rootScope', 'AuthService', 'MyService', 
	function($scope,  $resource, $state, $http, $rootScope, AuthService, MyService) {
		$scope.$state = $state;
		//$rootScope.loggedIn = false;
		MyService.served();
		
		$scope.users = [];
		$http.get('/stream/list').then(function(d) {
			console.log(d);
			$scope.users = d.data;
		}, function(err) {
			console.log(err);            
			}
		);
}]);



angular.module('myApp').controller('loginController',
  ['$scope', '$location', 'AuthService', 'MyService',
  function ($scope, $location, AuthService, MyService) {
	  MyService.served();
    $scope.login = function () {
		
      // initial values
      $scope.error = false;
      $scope.disabled = true;
		
      // call login from service
      AuthService.login($scope.loginForm.username, $scope.loginForm.password)
        // handle success
        .then(function () {
          $location.path('/');
          $scope.disabled = false;
          $scope.loginForm = {};
        })
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = false;
          $scope.loginForm = {};
        });
		
    };
}]);

angular.module('myApp').controller('logoutController',
  ['$scope', '$location', 'AuthService', 'MyService',
  function ($scope, $location, AuthService, MyService) {
	  MyService.served();
    $scope.logout = function () {
		
      // call logout from service
      AuthService.logout()
        .then(function () {
          $location.path('/login');
        });
    };
}]);

angular.module('myApp').controller('commentCtrl',
	['$scope', 'AuthService',
		function($scope, AuthService) {
			$scope.comment = function() {
				AuthService.getComment($scope.commentForm.comment)
					.then(function() {
						$scope.commentForm = {};
					})
					.catch(function() {
						$scope.commentForm = {};
					});
			};
}]);

angular.module('myApp').controller('registerController',
  ['$scope', '$location', 'AuthService', 'MyService',
  function ($scope, $location, AuthService, MyService) {
	  MyService.served();
    $scope.register = function () {
      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call register from service
      AuthService.register($scope.registerForm.username, $scope.registerForm.password)
        // handle success
        .then(function () {
          $location.path('/');
          $scope.disabled = false;
          $scope.registerForm = {};
        })
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Something went wrong!";
          $scope.disabled = false;
          $scope.registerForm = {};
        });
    };
}]);

angular.module('myApp').controller('meetupsController', ['$scope', '$resource', function($scope, $resource) {
	MyService.served();
	$scope.meet = 10;
		var Meetup = $resource('/api/meetups');
		//var Meetup = $resource('/meetup/list');
		
		Meetup.query(function(results) {
			$scope.meetups = results;
		});
		
		$scope.meetups = [];
		$scope.createMeetup = function() {
		//$scope.meetups.push({ name: $scope.meetupName });
		
		var meetup = new Meetup();
		meetup.name = $scope.meetupName;
		meetup.$save(function(result) {
		$scope.meetups.push(result);
		$scope.meetupName = '';
		});
	}	
}]);

angular.module('myApp').controller('homeController', ['$scope',
function($scope) {
	$scope.meetups = 'There are <br /> 10 meetups <br />in all <br /> there';
}]);



angular.module('myApp').controller('sidebarCtrl', ['$scope', function($scope) {
	this.contents = gems;
	this.box1 = box1;
	this.box2 = box2
}]);

var gems = [
	{
		para: 'What should you do after your SSC. <br /> NO THOUGHTS!!!<br /> Go through and we will guide you...',
		images: [{ full: 'img/home/10th.png' }],
		//a: '/views/index.html'
		a: 'default'
		//ui-sref='/default'
	},
	{
		para: 'What after 11th and 12th. <br/ > Commerce, Science or something else ??? Choose carefully...',
		images: [{ full: 'img/home/11th-12th.png' } ],
		//a: 'http://www.facebook.com'
	},
	{
		para: 'Oh \"Blimmey\", I\'m ending my Graduation, still don\'t know what lies ahead. <strong> Your ways lies here... </strong>',
		images: [{ full: 'img/home/Graduate.png'} ],
		//a: 'http://www.gtu.ac.in'
	},
	{
		para: 'I\'m\ undergraduate in a college, where should I go ??? <br /> Here you go... ',
		images: [{ full: 'img/home/Under-G.png'} ],
		//a: 'http://www.youtube.com'
	}
];

var box1 = ['On the same boat', 'Sing me a song', 'Third one this', 'The final chapter'];
var box2 = ['The lying Detective', 'This is the second', 'Something to fear', 'Last day on Earth'];

angular.module('myApp').controller('defaultController', ['$scope', '$http', 'AuthService', '$state', '$stateParams',
	function($scope, $http, AuthService, $state, $stateParams) {
		$scope.page = 'This is it';
		$scope.comments = [];
		$http.get('/stream/' + $stateParams.streamId)
		.then(function(d)
		{
            console.log(d);
            $scope.users = d.data;
        },function(err)
		{
            console.log(err);            
		}
		);
	
		$http.get('/comment/' + $stateParams.streamId)
			.then(function(d)
			{
				console.log(d);
				$scope.comments = d.data;
			}, function(err) {
				console.log(err);
			}
		);
	
	$scope.comment = function() {
		
		$http.get('/comment/' + $stateParams.streamId)
			.then(function(d)
			{
				console.log(d);
				$scope.comments = d.data;
			}, function(err) {
				console.log(err);
			}
		);
		
		AuthService.getComment($scope.commentForm.comment, $scope.commentForm.stream)
			.then(function() {
				$scope.commentForm = {};
			})
			.catch(function() {
				$scope.commentForm = {};
			});
	};
	
}]);

angular.module('myApp').controller('substreamController', ['$scope', '$http', '$state', '$stateParams', '$rootScope',
	function($scope, $http, $state, $stateParams, $rootScope) {
		$scope.post = 'Substreams will be shown here';
		$scope.subs = [];
		$rootScope.$state = $state;
		$http.get('/stream-list/' + $stateParams.streamId)
			.then(function(d) {
				console.log(d);
				$scope.subs = d.data;
			}, function(err) {
				console.log(err);
			}
		);
}]);