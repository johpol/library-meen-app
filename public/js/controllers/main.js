angular.module('libraryController', [])
	.controller('mainController', ['$scope','$http','Books', function($scope, $http, Books) {
		$scope.formData = {};
		$scope.loading = true;
        
		Books.get()
			.success(function(data) {
				$scope.books = data;
				$scope.loading = false;
        });
    }]);
