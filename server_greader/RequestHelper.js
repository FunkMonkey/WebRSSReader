
exports.get = function(httpModule, options, callback){
	return httpModule.get(options, function(res) {
			var data = '';
			res.on('data', function(chunk) {
				// append chunk to your data
				data += chunk;
			});

			res.on('end', function() {
				res.data = data;
				callback(res);
			});
		});
};