var sidebar1 = angular.module("sidebar1", [
	"ui.router",
	"ui.bootstrap",
	"oc.lazyLoad",
	"ngSanitize"
]);


sidebar1.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

	// Redirect any unmatched url
	$urlRouterProvider.otherwise("/test1.html");

	$stateProvider

	// test1.html
	.state('test1', {
		url: "/test1.html",
		templateUrl: "page/test1.html",
		data: {
			pageTitle: 'this is test1'
		}
	})


}]);