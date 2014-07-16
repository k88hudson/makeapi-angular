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
      template: templates['make.html'],
      scope: {
        makeId: '@'
      },
      link: function (scope, element, attrs) {
        scope.$watch('makeId', function (val) {
          if (!val) {
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

module.directive('makeGallery', [ 'makeApi',
  function (wmMakeApi) {
    return {
      restrict: 'EA',
      transclude: true,
      template: '<div ng-transclude></div>',
      scope: {
        tags: '=',
        makeList: '@getList',
        ids: '=',
        limit: '@'
      },
      link: function (scope, element, attrs, ctrl, transclude) {
        function watch(attr) {
          scope.test = 'test';
          scope.$watch(attr, function (val) {
            if (!val) {
              return;
            }
            wmMakeApi[attr](val)
              .limit(scope.limit || 20)
              .get()
              .success(function (data) {
                scope.makes = data.makes;
              });
          });
        }
        ['tags', 'getList', 'ids'].forEach(watch);
      }
    };
}]);
