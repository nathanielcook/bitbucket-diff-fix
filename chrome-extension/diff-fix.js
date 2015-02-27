var checkInterval = 300;

function setLocationWhenPageFullyLoaded(newLocation) {
	var retry = false;

	if (location.href.indexOf("/pull-request/new") > -1) {
		if (!!document.getElementById("compare-tabs") != true)
			retry = true;
	}
	else if (location.href.indexOf("/pull-request/update/") > -1) { // viewing an existing pull request
		if (!!document.getElementById("diff") != true)
			retry = true;
	}
	else if (location.href.indexOf("/pull-request/") > -1) { // viewing an existing pull request
		if (!!document.getElementById("pullrequest-diff") != true)
			retry = true;
	}
		
	if (retry == true)
		setTimeout(function(){ setLocationWhenPageFullyLoaded(newLocation); }, checkInterval);
	else
		location.href = newLocation;		
}

function addParametersToBitbucketLinks(urlKey) {
    var elems = document.getElementsByTagName('a');
    var count = elems.length;
    for (var i = 0; i < count; i++) {
        if ((' ' + elems[i].className + ' ').indexOf(' execute ') > -1
        || (' ' + elems[i].className + ' ').indexOf(' changeset-hash ') > -1
        || (' ' + elems[i].className + ' ').indexOf(' comments-link ') > -1
        || (' ' + elems[i].className + ' ').indexOf(' likes-link ') > -1) {
			if (elems[i].href.indexOf(urlKey) > -1) {
				var newUrl = getNewUrl(elems[i].href);
				if (newUrl != elems[i].href)
					elems[i].href = newUrl;
			}
        }
    }
}

function addParametersToPullRequestLinks() {
	addParametersToBitbucketLinks("/pull-request/");    
    setTimeout(function(){ addParametersToPullRequestLinks(); }, checkInterval);
}

function addParametersToCommitLinks() {
	addParametersToBitbucketLinks("/commits/");    
    setTimeout(function(){ addParametersToCommitLinks(); }, checkInterval);
}

function getNewUrl(url) {
	var parser = document.createElement('a');
	parser.href = url;

	var queryParameters = parser.search.length ? parser.search.replace('?', '').split('&') : [];
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

	var newUrl = url;

	if (parametersChanged == true)
		newUrl = parser.pathname + '?' + queryParameters.join('&') + parser.hash;		
	
	return newUrl;
}

if (location.href.indexOf("/pull-requests") > -1) {	// if viewing the main pull requests page
	var suffix = "/pull-request/new";
	
	// modify "Create pull request" links
	
	var createPullRequestLink1 = document.getElementById("repo-create-pull-request-link");	
	if (!!createPullRequestLink1 == true) {
		if (createPullRequestLink1.href.indexOf(suffix, this.length - suffix.length) !== -1) // i.e. if (string.endsWith(suffix))
			createPullRequestLink1.href = getNewUrl(createPullRequestLink1.href);
	}
	
	var createPullRequestLink2 = document.getElementById("create-pull-request-contextual");
	if (!!createPullRequestLink2 == true) {
		if (createPullRequestLink2.href.indexOf(suffix, this.length - suffix.length) !== -1) // i.e. if (string.endsWith(suffix))
			createPullRequestLink2.href = getNewUrl(createPullRequestLink2.href);
	}
	
	setTimeout(function(){ addParametersToPullRequestLinks(); }, checkInterval);
}
else { // viewing any other page, pull request diff, new pull request, update pull request or a commit page	
	setTimeout(function(){ addParametersToCommitLinks(); }, checkInterval);

	var newLocation = getNewUrl(location.href);
	
	if (newLocation != location.href)
		setTimeout(function(){ setLocationWhenPageFullyLoaded(newLocation); }, checkInterval);	
}