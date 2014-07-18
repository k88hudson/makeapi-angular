var module = angular.module('wmMakeApiAngular', ['templates-makeApiAngular']);
module.constant('Make', window.Make);
module.provider('makeApi', function makeapiProvider() {
  this.options = {
    apiURL: 'https://makeapi.webmaker.org'
  };
  this.$get = ['$http', 'Make', function ($http, Make) {
    var make = new Make(this.options);
    make.get = function get() {
      var querystring = this.queryPairs.join( "&" )
      this.queryPairs = [];
      return $http.get(this.apiURL + this.searchPath + '?' + querystring);
    };
    return make;
  }];
});

module.directive('make', [ 'makeApi',
  function (makeApi) {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        makeId: '@'
      },
      templateUrl: 'make.html',
      link: function (scope, element, attrs) {
        scope.$watch('makeId', function (val) {
          if (!val) {
            return;
          }
          // Ignore ID if makeId is set
          if (scope.makeId && scope.makeId !== val) {
            return;
          }
          makeApi
            .id(val)
            .get()
            .success(function (data) {
              scope.make = data.makes[0] || {};
            });

        });
      }
    };
}]);

module.directive('makeData', function () {
  return {
    restrict: 'A',
    require: '^makeGallery',
    replace: true,
    templateUrl: 'make.html',
    link: function (scope, element, attrs, ctrl) {
      //
    }
  };
});

module.directive('makeGallery', function () {
    return {
      restrict: 'EA',
      transclude: true,
      templateUrl: 'make-gallery.html',
      scope: {
        tags: '=',
        ids: '=',
        limit: '@',
        makeList: '@getList',
        containerClass: '@'
      },
      controller: ['$scope', 'makeApi', function ($scope, makeApi) {
        // Watch and update
        ['tags', 'getList', 'ids'].forEach(function (attr) {
          $scope.$watch(attr, function (val) {
            if (!val) {
              return;
            }
            makeApi[attr](val)
              .limit($scope.limit || 20)
              .get()
              .success(function (data) {
                $scope.makes = data.makes;
              });
          });
        });

      }]
    };
});
