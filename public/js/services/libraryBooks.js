angular.module('libraryBooks', []).factory('Books', ['$http',function($http) {
    return {
        get : function() {
            return $http.get('/book');
        },
        delete : function(id) {
            return $http.delete('/book/' + id);
        }, 
        create : function(bookData) {
            return $http.post('/book', bookData);
        }
    }
}]);