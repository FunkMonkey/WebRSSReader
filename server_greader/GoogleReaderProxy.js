var https = require("https");
var RequestHelper = require("./RequestHelper");

var params = "accountType=GOOGLE&service=reader&output=json&client=WebRSSReader";

function request(req, res){
	
	if(req.url.indexOf("/greader/login") === 0)
	{
		// logging in via ClientLogin
		console.log(req.body);

		var options = {
			host: "www.google.com",
			path: "/accounts/ClientLogin?" + params +
			                          "&ck=" + Date.now() + 
			                          "&Email=" + encodeURIComponent(req.body.username) +
			                          "&Passwd=" + encodeURIComponent(req.body.password)
		};

		RequestHelper.get(https, options, function(loginRes){
			var auth = loginRes.data.substring(loginRes.data.indexOf("Auth=") + 5);
			console.log(auth);
			res.end("sdfsfddsf");
		});

		
	}
	else if(req.url.indexOf("/greader/query/") === 0)
	{
		/*https.get("https://www.google.com/reader/api/0/user-info?output=json", function(get_res) {
			var data = '';
			get_res.on('data', function(chunk) {
				// append chunk to your data
				data += chunk;
			});

			get_res.on('end', function() {
				res.end(data);
			});

		}).on('error', function(e) {
			console.log("Got error: " + e.message);
		});*/
	}
	else
	{
		// TODO
		res.end("404");
	}

	
}

exports.request = request;