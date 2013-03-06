
var DemoApp = angular.module('DemoApp', ['mobile-navigate']);

DemoApp.config(function($routeProvider) {
  $routeProvider
  .when("/page/:page", { templateUrl: "/partials/page.html", controller: 'PageController'})
  .when("/modal", {
    templateUrl: "/partials/modal.html",
    transition: 'modal'
  })
  .when("/", {
    templateUrl: "/partials/home.html"
  }).otherwise({
    redirectTo: "/"
  });
});

DemoApp.controller('PageController', function($scope, $navigate, $route) {
    // infinite pages
    $scope.page = +($route.current.params.page);
});

DemoApp.controller('MainCtrl', function($scope, $navigate, $route) {
  $scope.$navigate = $navigate;
  $scope.range = 25;
  $scope.clicks = 0;
});

DemoApp.directive('ngTap', function() {
  var isTouchDevice = !!("ontouchstart" in window);
  return function(scope, elm, attrs) {
    if (isTouchDevice) {
      var tapping = false;
      elm.bind('touchstart', function() { tapping = true; });
      elm.bind('touchmove', function() { tapping = false; });
      elm.bind('touchend', function() {
        tapping && scope.$apply(attrs.ngTap);
      });
    } else {
      elm.bind('click', function() {
        scope.$apply(attrs.ngTap);
      });
    }
  };
});
