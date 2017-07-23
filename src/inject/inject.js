chrome.extension.sendMessage({}, function(response) {
  let readyStateCheckInterval = setInterval(function() {
    //runAutoScripts();
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);

      getAutoScripts();
    }
  }, 10);
});

function runAutoScripts(scripts) {
  for (script in scripts) {
    let url = scripts[script].url;
    let code = scripts[script].code;

    if (location.href.indexOf(url) > -1) {
      eval(code);
    }
  }
}

function getAutoScripts() {
  let autoRunScripts = [];

  new Promise(resolve => {
    // Retrieve codes that needs to be auto ran
    chrome.storage.local.get("scripts", result => {
      let scripts = result.scripts;

      // Get auto run codes and push them into autoRunScripts array formatted {url: 'http', code: '//code'}
      for (script in scripts) {
        if (scripts[script].url) {
          autoRunScripts.push({
            url: scripts[script].url,
            code: scripts[script].code
          });
        }
      }
      resolve(runAutoScripts(autoRunScripts));
    });
  });
}
// http://unbill.us/assets/images/subpage-bg-q2.jpg
