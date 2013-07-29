function ViffCtrl ($scope, $http) {
  // $scope.pages = [
  //  {browser: "chrome", url: "index.html", production: "production.png", local: "local.png", hasDiff: true},
  //  {browser: "chrome", url: "home.html", production: "production.png", local: "local.png", hasDiff: false},
  //  {browser: "chrome", url: "detail.html", production: "production.png", local: "local.png", hasDiff: true},
  //  {browser: "chrome", url: "contact.html", production: "production.png", local: "local.png", hasDiff: true},
  //  {browser: "firefox", url: "home.html", production: "production.png", local: "local.png", hasDiff: true},
  //  {browser: "firefox", url: "detail.html", production: "production.png", local: "local.png", hasDiff: false},
  //  {browser: "firefox", url: "contact.html", production: "production.png", local: "local.png", hasDiff: true},
  //  {browser: "IE", url: "detail.html", production: "production.png", local: "local.png", hasDiff: true},
  //  {browser: "IE", url: "index.html", production: "production.png", local: "local.png", hasDiff: true}]

  
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


  $scope.currentBrowser = $scope.browsers[0];

  $scope.currentPage = $scope.pages[0];
  resetImage();

  $scope.changePath = function(url){
    angular.forEach($scope.pages, function(page){
      if(page.url == url && page.browser == $scope.currentBrowser) $scope.currentPage = page;
    })
    resetImage();
  }

  function resetImage(){
    $scope.evn1Shot = encodeURIComponent($scope.currentPage.envs[0]["filePath"])
    $scope.evn2Shot = encodeURIComponent($scope.currentPage.envs[1]["filePath"])
    $scope.viffShot = encodeURIComponent($scope.currentPage.viff)
  }
    
    
  });

  
  // body...
}
