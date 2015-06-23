/***
Metronic AngularJS App Main Script
***/

/* Metronic App */
var MetronicApp = angular.module("MetronicApp", [
    "ui.router", 
    "ui.bootstrap", 
    "oc.lazyLoad",  
    "ngSanitize"
]); 

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
MetronicApp.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        // global configs go here
    });
}]);

/********************************************
 BEGIN: BREAKING CHANGE in AngularJS v1.3.x:
*********************************************/
/**
`$controller` will no longer look for controllers on `window`.
The old behavior of looking on `window` for controllers was originally intended
for use in examples, demos, and toy apps. We found that allowing global controller
functions encouraged poor practices, so we resolved to disable this behavior by
default.

To migrate, register your controllers with modules rather than exposing them
as globals:

Before:

```javascript
function MyController() {
  // ...
}
```

After:

```javascript
angular.module('myApp', []).controller('MyController', [function() {
  // ...
}]);

Although it's not recommended, you can re-enable the old behavior like this:

```javascript
angular.module('myModule').config(['$controllerProvider', function($controllerProvider) {
  // this option might be handy for migrating old apps, but please don't use it
  // in new ones!
  $controllerProvider.allowGlobals();
}]);
**/

//AngularJS v1.3.x workaround for old style controller declarition in HTML
MetronicApp.config(['$controllerProvider', function($controllerProvider) {
  // this option might be handy for migrating old apps, but please don't use it
  // in new ones!
  $controllerProvider.allowGlobals();
}]);

/********************************************
 END: BREAKING CHANGE in AngularJS v1.3.x:
*********************************************/

/* Setup global settings */
MetronicApp.factory('settings', ['$rootScope', function($rootScope) {
    // supported languages
    var settings = {
        layout: {
            pageSidebarClosed: false, // sidebar menu state
            pageBodySolid: false, // solid body color state
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
        },
        layoutImgPath: Metronic.getAssetsPath() + 'admin/layout/img/',
        layoutCssPath: Metronic.getAssetsPath() + 'admin/layout/css/'
    };

    $rootScope.settings = settings;

    return settings;
}]);

/* Setup App Main Controller */
MetronicApp.controller('AppController', ['$scope', '$rootScope', function($scope, $rootScope) {
    $scope.$on('$viewContentLoaded', function() {
        Metronic.initComponents(); // init core components
        //Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive 
    });
}]);

/***
Layout Partials.
By default the partials are loaded through AngularJS ng-include directive. In case they loaded in server side(e.g: PHP include function) then below partial 
initialization can be disabled and Layout.init() should be called on page load complete as explained above.
***/

/* Setup Layout Part - Header */
MetronicApp.controller('HeaderController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initHeader(); // init header
    });
}]);

/* Setup Layout Part - Sidebar */
MetronicApp.controller('SidebarController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initSidebar(); // init sidebar
    });
}]);

/* Setup Layout Part - Quick Sidebar */
MetronicApp.controller('QuickSidebarController', ['$scope', function($scope) {    
    $scope.$on('$includeContentLoaded', function() {
        setTimeout(function(){
            QuickSidebar.init(); // init quick sidebar        
        }, 2000)
    });
}]);

/* Setup Layout Part - Theme Panel */
MetronicApp.controller('ThemePanelController', ['$scope', function($scope) {    
    $scope.$on('$includeContentLoaded', function() {
        Demo.init(); // init theme panel
    });
}]);

/* Setup Layout Part - Footer */
MetronicApp.controller('FooterController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initFooter(); // init footer
    });
}]);





/* Setup Rounting For All Pages */
MetronicApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    

    // $urlRouterProvider.when("", "/test1");

    $urlRouterProvider.otherwise("/test1.html");  

    $stateProvider
        .state('test1',{
            url: "/test1.html",
            templateUrl: "page/test1.html",
            data: {pageTitle: 'this is test1'}  
        })
        .state("test1.a", {
            url:"/a",
            templateUrl: "right-content/a.html"
        })
        .state("test1.b", {
            url:"/b",
            templateUrl: "right-content/b.html"
        })
        .state("test1.c", {
            url:"/c",
            templateUrl: "right-content/c.html"
        })
        .state('test2', {
            url: "/test2.html",
            templateUrl: "page/test2.html",
            data: {
                pageTitle: 'this is test2'
            }
        })
        .state('test3', {
            url: "/test3.html",
            templateUrl: "page/test3.html",
            data: {
                pageTitle: 'this is test3'
            }
        });


    // // Redirect any unmatched url
    // $urlRouterProvider.otherwise("/test1.html");  
    
    // $stateProvider

    //     // test1.html
    //     .state('test1',{
    //         url: "/test1.html",
    //         templateUrl: "page/test1.html",
    //         data: {pageTitle: 'this is test1'}  
    //     })

    //     // test2.html
    //     .state('test2',{
    //         url: "/test2.html",
    //         templateUrl: "page/test2.html",
    //         data: {pageTitle: 'this is test2'}  
    //     })

    //     // test3.html
    //     .state('test3',{
    //         url: "/test3.html",
    //         templateUrl: "page/test3.html",
    //         data: {pageTitle: 'this is test3'}  
    //     })  


    //     // Dashboard
    //     .state('dashboard', {
    //         url: "/dashboard.html",
    //         templateUrl: "views/dashboard.html",            
    //         data: {pageTitle: 'Admin Dashboard Template'},
    //         controller: "DashboardController",
    //         resolve: {
    //             deps: ['$ocLazyLoad', function($ocLazyLoad) {
    //                 return $ocLazyLoad.load({
    //                     name: 'MetronicApp',
    //                     insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
    //                     files: [
    //                         '../../../assets/global/plugins/morris/morris.css',
    //                         '../../../assets/admin/pages/css/tasks.css',
                            
    //                         '../../../assets/global/plugins/morris/morris.min.js',
    //                         '../../../assets/global/plugins/morris/raphael-min.js',
    //                         '../../../assets/global/plugins/jquery.sparkline.min.js',

    //                         '../../../assets/admin/pages/scripts/index3.js',
    //                         '../../../assets/admin/pages/scripts/tasks.js',

    //                          'js/controllers/DashboardController.js'
    //                     ] 
    //                 });
    //             }]
    //         }
    //     })

     


    //     // User Profile Help
    //     .state("profile.help", {
    //         url: "/help",
    //         templateUrl: "views/profile/help.html",
    //         data: {pageTitle: 'User Help'}      
    //     })

}]);

/* Init global settings and run the app */
MetronicApp.run(["$rootScope", "settings", "$state", function($rootScope, settings, $state) {
    $rootScope.$state = $state; // state to be accessed from view
}]);