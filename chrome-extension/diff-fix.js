
;(function(){

	var search = location.search.length
		? location.search.replace('?', '').split('&')
		: []
	;

	var tsParam	= 'ts=4';
	var tsIndex	= search.indexOf(tsParam);
	var wsParam	= 'w=1';
	var wsIndex	= search.indexOf(wsParam);

	var searchChanged = false;

	if (tsIndex == -1) {
		search.push(tsParam);
		searchChanged = true;
	}

	if (wsIndex == -1) {
		search.push(wsParam);
		searchChanged = true;
	}

	if (searchChanged == true) {
		location.href = location.pathname + '?' + search.join('&');
	}
	
})();
