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
      return $http.get(this.apiURL + this.searchPath + '?' + querystring, { 'headers': {'X-CSRF-Token': undefined} });
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
        makeId: '@',
        userId: '@',
      },
      templateUrl: 'make.html',
      controller: ['$scope', '$http', function($scope, $http) {
        $scope.toggleLike = function() {
          if (!$scope.liked) {
            $http.post('/like', { makeID: $scope.make._id }).success(function(data, status, headers, config) {
              $scope.liked = true;
            }).error(function(data, status, headers, config) {
              $scope.likeError = data;
            });
          } else {
            $http.post('/unlike', { makeID: $scope.make._id }).success(function(data, status, headers, config) {
              $scope.liked = false;
            }).error(function(data, status, headers, config) {
              $scope.likeError = data;
            });
          }
        }


        $scope.$watch('makeId', function (val) {
          if (!val) {
            return;
          }
          // Ignore ID if makeId is set
          if ($scope.makeId && $scope.makeId !== val) {
            return;
          }
          makeApi
            .id(val)
            .get()
            .success(function (data) {
              $scope.make = data.makes[0] || {};

              $scope.liked = +$scope.make.likes.some(function(item){ return item.userId && item.userId == $scope.userId; });
            });
        });
      }]
    };
}]);

module.directive('makeData', function () {
  return {
    restrict: 'A',
    require: '^makeGallery',
    replace: true,
    templateUrl: 'make.html',
    scope: {
      makeData: '@',
      userId: '@',
    },
    controller: ['$scope', '$http', function($scope, $http) {
      $scope.$watch('makeData', function (val) {
        if (!val) {
          return;
        }

        $scope.make = JSON.parse(val);
        $scope.liked = +$scope.make.likes.some(function(item){ return item.userId && item.userId == $scope.userId; });
      });

      $scope.toggleLike = function() {
        if (!$scope.liked) {
          $http.post('/like', { makeID: $scope.make._id }).success(function(data, status, headers, config) {
            $scope.liked = true;
          }).error(function(data, status, headers, config) {
            $scope.likeError = data;
          });
        } else {
          $http.post('/unlike', { makeID: $scope.make._id }).success(function(data, status, headers, config) {
            $scope.liked = false;
          }).error(function(data, status, headers, config) {
            $scope.likeError = data;
          });
        }
      }

    }]
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
        containerClass: '@',
        userId: '@',
        csrfToken: '@',
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

module.directive('heart', ['makeApi', '$http',
  function (makeApi, $http) {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        liked: '@',
      },
      templateUrl: 'heart.html',
      link: function (scope, element, attrs, ctrl) {
      }
    };
}]);
