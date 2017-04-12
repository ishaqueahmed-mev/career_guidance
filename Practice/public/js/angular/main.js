(function() {
var myApp = angular.module('myApp', ['ui.router', 'ngResource', 'ngSanitize']);

myApp.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  
  $stateProvider
		
		.state('home', {
           url: '/',
			templateUrl: '/views/partials/home.html',
			controller: 'myController',
			access: {restricted: false}
        })
		.state('sample', {
			url: '/sample',
			templateUrl: 'views/partials/sample.html',
			access: {restricted: true}
			})
		.state('register', {
			url: '/register',
			templateUrl: '/views/partials/register.html',
			controller: 'registerController',
			access: {restricted: false}
		})
		.state('login', {
			url: '/login',
			templateUrl: '/views/partials/login.html',
			controller: 'loginController',
			access: {restricted: false}
		})
		.state('logout', {
			url: '/logout',
			templateUrl: '',
			controller:'logoutController',
			access: {restricted: true}
		})
		.state('readMore', {
			url: '/readMore',
			templateUrl: '/views/partials/readMore.html',
			access: {restricted: false}
		})
		.state('about', {
			url: '/about',
			templateUrl: '/views/partials/about.html',
			access: {restricted: false}
		})
		
		.state('contact', {
			url: '/contact',
			templateUrl: '/views/partials/contact.html',
			access: {restricted: false}
		})
		
		.state('portfolio', {
			url: '/portfolio',
			templateUrl: '/views/partials/portfolio.html',
			access: {restricted: false}
		})
		
		.state('blog', {
			url: '/blog',
			templateUrl: '/views/partials/blog.html',
			access: {restricted: false}
		})
		.state('stream', {
			url: '/stream/:streamId',
			views: {
				'': {templateUrl: '/views/partials/stream.html',
					 controller: 'defaultController'
					},
				'columnOne@stream': {
					template: 'This is column one',
					controller: 'defaultController'
				},
				'columnTwo@stream': {
					url: '/stream-list/:streamId',
					templateUrl: '/views/partials/relSubstream.html',
					controller: 'substreamController'
				}
			},
			//templateUrl: '/views/partials/stream.html',
			//controller: 'defaultController',
			access: {restricted: false}
		})
		// .state('stream.list', {
			// url: '/stream-list',
			// templateUrl: '/views/partials/relSubstream.html',
			// controller: 'substreamController'
		// })
		.state('stream.paragraph', {
			url: '/paragraph',
			template: 'I could sure use a drink right now.'
		})

    // nested list with just some random string data
    
		// .state('relSubstream', {
			// url: '/stream-list/:streamId',
			// templateUrl: '/views/partials/relSubstream.html',
			// controller: 'substreamController',
			// access: {restricted: false}
		// })
});

myApp.run(function($rootScope, $state, $location, AuthService){
	$rootScope.$on("$stateChangeStart",
		function (event, toState, toParams, fromState, fromParams, $scope) {
			AuthService.getUserStatus()
			.then(function(){
				if (toState.access.restricted && !AuthService.isLoggedIn()){
					event.preventDefault();
					$state.go('login');
				}
				else if (toState.name == 'login' && AuthService.isLoggedIn()) {
					event.preventDefault();
					$location.path('/sample');
				}
				else if (toState.name == 'register' && AuthService.isLoggedIn()) {
					event.preventDefault();
					$location.path('/sample');
				}
			});	
	});
});

}) ();