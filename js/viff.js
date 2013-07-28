function ViffCtrl ($scope, $http) {
	$scope.pages = [
		{browser: "chrome", url: "index.html", production: "production.png", local: "local.png", hasDiff: true},
		{browser: "chrome", url: "home.html", production: "production.png", local: "local.png", hasDiff: false},
		{browser: "chrome", url: "detail.html", production: "production.png", local: "local.png", hasDiff: true},
		{browser: "chrome", url: "contact.html", production: "production.png", local: "local.png", hasDiff: true},
		{browser: "firefox", url: "home.html", production: "production.png", local: "local.png", hasDiff: true},
		{browser: "firefox", url: "detail.html", production: "production.png", local: "local.png", hasDiff: false},
		{browser: "firefox", url: "contact.html", production: "production.png", local: "local.png", hasDiff: true},
		{browser: "IE", url: "detail.html", production: "production.png", local: "local.png", hasDiff: true},
		{browser: "IE", url: "index.html", production: "production.png", local: "local.png", hasDiff: true}]

	$scope.viffPages = function(){
		var pages = []
		angular.forEach($scope.pages, function(page){
			if(page.hasDiff) pages.push(page);
		});
		return pages;
	}
	 
	$scope.acceptDiff = function(currentPath){
		console.log()
		angular.forEach($scope.pages, function(page){
			if(page.url == $scope.currentPath && page.browser == $scope.defaultBrowser ) page.hasDiff = false;
		});
	}

	$scope.defaultBrowser = "chrome"
	$scope.currentPath = "index.html"
	resetImage();

	$scope.changePath = function(url){
		$scope.currentPath = url;
		resetImage();
	}

	function resetImage(){
		$scope.local = "reports/"+$scope.defaultBrowser+"/"+ $scope.currentPath.split('.')[0] +"/local.png"
		$scope.production = "reports/"+$scope.defaultBrowser+"/"+ $scope.currentPath.split('.')[0] +"/production.png"
		$scope.viff = "reports/"+$scope.defaultBrowser+"/"+ $scope.currentPath.split('.')[0] +"/viff.png"	
	}
	// body...
}
