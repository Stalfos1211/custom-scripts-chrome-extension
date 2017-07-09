
customScriptsApp.controller("mainCtrl", ($scope, dataService) => {
    
    dataService.getScripts(response => {
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
      dataService.deleteScript(script)
      $scope.scripts.splice($index, 1);
      dataService.saveScript($scope.scripts, (response) => {
        $scope.scripts = response;
      })
    }
    
    $scope.saveScript = (script) => {
      //dataService.saveScript(script)
      console.log('Saving:', script)
      dataService.saveScript($scope.scripts, script, (response) => {
        $scope.scripts = response;
      })

      // List scripts with url to determine which ones to auto-run
      /*let savedScripts = $scope.scripts;
      for (let i = 0; i < savedScripts.length; i++) {
        if (savedScripts[i].url) {
          scriptsWithUrl.push(savedScripts[i])
        }
      }*/
    }

    $scope.runCommand = (code) => {
      chrome.tabs.executeScript({
        code: code
      });
    }

    /*chrome.storage.onChanged.addListener(function() {
      dataService.getScripts(response => {
        $scope.scripts = response;
      });
    })*/

  })
