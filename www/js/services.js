angular.module('bucketList.services', [])
    .factory('API', function ($rootScope, $http, $ionicLoading, $window) {
       var base = "https://arvindbucketlistapp.herokuapp.com";
        $rootScope.show = function (text) {
            $rootScope.loading = $ionicLoading.show({
                content: text ? text : 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
        };

        $rootScope.hide = function () {
            $ionicLoading.hide();
        };

        $rootScope.notify =function(text){
            $rootScope.show(text);
            $window.setTimeout(function () {
              $rootScope.hide();
            }, 1999);
        };

        $rootScope.doRefresh = function (tab) {
            if(tab == 1)
                $rootScope.$broadcast('fetchAll');
            else
                $rootScope.$broadcast('fetchCompleted');
            
            $rootScope.$broadcast('scroll.refreshComplete');
        };

        return {
            getAll: function () {
                return $http.get(base+'/api/v1/bucketList/data/list', {
                    method: 'GET'
                });
            },
            getOne: function (id) {
                return $http.get(base+'/api/v1/bucketList/data/item/' + id, {
                    method: 'GET'
                });
            },
            saveItem: function (form) {
                return $http.post(base+'/api/v1/bucketList/data/item', form, {
                    method: 'POST'
                });
            },
            putItem: function (id, form) {
                return $http.put(base+'/api/v1/bucketList/data/item/' + id, form, {
                    method: 'PUT'
                });
            },
            deleteItem: function (id) {
                return $http.delete(base+'/api/v1/bucketList/data/item/' + id, {
                    method: 'DELETE'
                });
            }
        }
    });
