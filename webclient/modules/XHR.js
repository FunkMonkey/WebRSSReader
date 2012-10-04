
// source: https://gist.github.com/3099268

define(function() {

	function xhr(options) {
		var deferred = Q.defer(),
		         req = new XMLHttpRequest();

		req.open(options.method || 'GET', options.url, true);

		// Set request headers if provided.
		Object.keys(options.headers || {}).forEach(function (key) {
			req.setRequestHeader(key, options.headers[key]);
		});

		req.onreadystatechange = function(e) {
			if(req.readyState !== 4) {
				return;
			}

			if([200,304].indexOf(req.status) === -1) {
				deferred.reject(new Error('Server responded with a status of ' + req.status));
			} else {
				if(options.json)
				{
					var jsonRes = JSON.parse(req.responseText);
					deferred.resolve((options.jsonFilter) ? options.jsonFilter(jsonRes)  : jsonRes);
				}
				else
				{
					deferred.resolve(req.responseText);
				}
				
			}
		};

		req.send(options.data || void 0);

		return deferred.promise;
	}

	return xhr;
});