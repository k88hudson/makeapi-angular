var module = angular.module('wmMakeApiAngular', []);
module.constant('Make', window.Make);
module.constant('makeApiAngularTemplates', window.makeApiAngularTemplates);
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

module.directive('make', [ 'makeApi', 'makeApiAngularTemplates',
  function (makeApi, templates) {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        id: '@',
        make: '@'
      },
      template: templates['make.html'],
      link: function (scope, element, attrs) {
        ['id', 'makeId'].forEach(function (attr) {
          scope.$watch(attr, function (val) {
            if (!val) {
              return;
            }
            // Ignore ID if makeId is set
            if (scope.make && scope.make !== val) {
              return;
            }
            makeApi
              .id(val)
              .get()
              .success(function (data) {
                scope.make = data.makes[0] || {};
              });
          });
        });
      }
    };
}]);

module.directive('makeData', [ 'makeApiAngularTemplates',
  function (templates) {
    return {
      restrict: 'A',
      require: '^makeGallery',
      replace: true,
      template: templates['make.html'],
      link: function (scope, element, attrs, ctrl) {
        //
      }
    };
}]);

module.directive('makeGallery', ['makeApiAngularTemplates',
  function (templates) {
    return {
      restrict: 'EA',
      transclude: true,
      template: templates['make-gallery.html'],
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
}]);
