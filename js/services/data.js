let scripts;
let autoRunScripts = [];

customScriptsApp.service("dataService", function($http) {

    this.getScripts = callback => {

      //chrome.storage.local.clear();

      // Load scripts from storage
      chrome.storage.local.get("scripts", (result) => {
        console.log('get from storage result:', result.scripts)

        if (result.scripts) {

          // Save a list of auto-run scripts
          let scriptsList = result.scripts;
          for (let i = 0; i < scriptsList.length; i++) {
            if (scriptsList[i].url) {
              autoRunScripts.push(scriptsList[i].code);
            }
          }
          console.log('autoRunScripts: ',autoRunScripts)

          callback(result.scripts, autoRunScripts);
        }
        else {
          /*console.log('loading default')
          chrome.storage.local.set({'scripts': [{
              "name": "First Code",
              "code": "console.log('working1')",
              "url" : "test.com"
            },
            {
              "name": "Second Code",
              "code": "console.log('working2')"
            }]
          })*/
        }
      })

    };

    this.saveScript = (scripts, script, callback) => {
      
      chrome.storage.local.set({'scripts': scripts}, ()=> {
        getStoredScripts().then((res) => {
          callback(res.scripts)
        })
      });

    }
  });

// Returns array contaning list of object scripts
function getStoredScripts () {
  return new Promise ((resolve, reject) => {
    chrome.storage.local.get("scripts", (result) => {
      if (result) {
        resolve(result);
      }
      else {
        reject();
      }
    })
  })
}

function getSavedScripts () {
  chrome.storage.local.get("scripts", (result) => {
    return result;
    })
}

function getAutoRunScripts() {
  console.log('gettingAutoRunScripts')
  return new Promise ((resolve, reject) => {
    let result = []
    getStoredScripts().then((res)=>{
      for (let i = 0; i < res.length; i++) {
        console.log('results from getAutoRunScripts:', res[i])
        result.push(res[i])
      }
      resolve(result)
    })

  })
  
}