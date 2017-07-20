chrome.extension.sendMessage({}, function(response) {
	let readyStateCheckInterval = setInterval(function() {
		//runAutoScripts();
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------

		runAutoScripts();

	}
	}, 10);
});

function runAutoScripts () {

	// Retrieve codes that needs to be auto ran
	chrome.storage.local.get("scripts", (result) => {
				console.log('get from storage result this is the inject script:', result.scripts)
	})
}
// http://unbill.us/assets/images/subpage-bg-q2.jpg