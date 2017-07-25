
customScriptsApp.controller("mainCtrl", ($scope, dataService) => {
    
    dataService.getScripts((response, autoRunScripts) => {
      if (response) {
        $scope.scripts = response;
        $scope.$apply();
      }
    });

    $scope.addScript = () => {
      let script = {name: "Title", code: "console.log('Custom Code')"}
      if($scope.scripts) {
        $scope.scripts.unshift(script);
      }
      else {
        $scope.scripts = [script];
      }
    };

    $scope.deleteScript = (script, $index) => {
      $scope.scripts.splice($index, 1);
    }
    
    $scope.saveScript = (script) => {
      dataService.saveScript($scope.scripts, script, (response) => {
        $scope.scripts = response;
      })
    }

    $scope.runCommand = (code) => {
      chrome.tabs.executeScript({
        code: code
      });
    }

  })
