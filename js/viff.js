function ViffCtrl ($scope, $http) {
  
  $http.get("report.json").success(function(data){
    $scope.caseCount = data.caseCount;
    $scope.pages = []
    $scope.browsers = []

    angular.forEach(data.compares, function(urls, browser){
      $scope.browsers.push(browser);
      angular.forEach(urls, function(properties, url){
        var viffCase = {};
        viffCase.browser = browser;
        viffCase.url = url;
        viffCase.envs = [];

        angular.forEach(properties.images, function(filePath, env) {
          if(env != 'diff')
            viffCase.envs.push({ name: env, filePath : filePath });
        });

        viffCase.viff = properties.images['diff'];
        viffCase.isSameDimensions = properties.isSameDimensions;
        viffCase.misMatchPercentage = properties.misMatchPercentage;
        viffCase.analysisTime = properties.analysisTime
        $scope.pages.push(viffCase);
      });
    });

    $scope.currentBrowser = $scope.browsers[0];

    $scope.$watch('currentBrowser', function () {
      angular.forEach($scope.pages, function(page){
        if(page.browser == $scope.currentBrowser) {
          $scope.currentPage = page;
          return;
        }
      })
    });

    $scope.currentPage = $scope.pages[0];

    $scope.viffPages = function(){
      var pages = []
      angular.forEach($scope.pages, function(page){
        if(!page.isSameDimensions) pages.push(page);
      });
      return pages;
    }

    $scope.acceptDiff = function(){
      $scope.currentPage.isSameDimensions = true;
    }

    $scope.setCurrentPage = function(url){
      angular.forEach($scope.pages, function(page){
        if(page.url == url && page.browser == $scope.currentBrowser) $scope.currentPage = page;
      })
    }
    
  });


  // body...
}
