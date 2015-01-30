var fullyLoadedCheckInterval = 300;

function setLocationWhenPageFullyLoaded(newLocation) {
	var pullRequestLoaded = !!document.getElementById("pullrequest-diff");

	if (pullRequestLoaded == true)
		location.href = newLocation;
	else
		setTimeout(function(){ setLocationWhenPageFullyLoaded(newLocation); }, fullyLoadedCheckInterval);
}
	
var queryParameters = location.search.length
	? location.search.replace('?', '').split('&')
	: []
;

var tabsParameter = 'ts=4';
var tabsIndex = queryParameters.indexOf(tabsParameter);
var whiteSpaceParameter	= 'w=1';
var whiteSpaceIndex = queryParameters.indexOf(whiteSpaceParameter);

var parametersChanged = false;

if (tabsIndex == -1) {
	queryParameters.push(tabsParameter);
	parametersChanged = true;
}

if (whiteSpaceIndex == -1) {
	queryParameters.push(whiteSpaceParameter);
	parametersChanged = true;
}

if (parametersChanged == true) {
	var newLocation = location.pathname + '?' + queryParameters.join('&') + location.hash;		
	setTimeout(function(){ setLocationWhenPageFullyLoaded(newLocation); }, fullyLoadedCheckInterval);
}	
