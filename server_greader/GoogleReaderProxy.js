var https = require("https");
var RequestHelper = require("./RequestHelper");

var url = require("url");

var commonParams = { 
	accountType: "GOOGLE",
	service: "reader",
	output: "json",
	client:"WebRSSReader"
};

function toQueryString(obj)
{
	var queryString = "";
	for(var paramName in obj)
	{
		if(queryString.length)
			queryString += "&";

		queryString += paramName + "=" + encodeURIComponent(obj[paramName]);
	}
	return queryString;
}

function request(req, res){
	
	var options;
	var params = Object.create(commonParams);

	if(req.url.indexOf("/greader/login") === 0)
	{
		// logging in via ClientLogin
		console.log(req.body);

		params.ck = Date.now();
		params.Email = req.body.username;
		params.Passwd = req.body.password;

		options = {
			host: "www.google.com",
			path: "/accounts/ClientLogin?" + toQueryString(params)
		};

		RequestHelper.get(https, options, function(loginRes){
			var auth = loginRes.data.substring(loginRes.data.indexOf("Auth=") + 5);
			console.log(auth);

			console.log(req.session);
			req.session.auth = auth;

			res.end("sdfsfddsf");
		});
	}
	else if(req.url.indexOf("/greader/query/") === 0)
	{
		var parsedURL = url.parse(req.url);
		var queryString = parsedURL.pathname + "?" + toQueryString(params) + ((parsedURL.query.length !== 0) ? "&" : "") + parsedURL.query; 
		console.log(queryString);
		res.end("sdfsfddsf");

		// options = {
		// 	host: "www.google.com",
		// 	path: "/accounts/ClientLogin?" + params +
		// 	                          "&ck=" + Date.now() + 
		// 	                          "&Email=" + encodeURIComponent(req.body.username) +
		// 	                          "&Passwd=" + encodeURIComponent(req.body.password)
		// };

		// RequestHelper.get(https, options, function(loginRes){
		// 	var auth = loginRes.data.substring(loginRes.data.indexOf("Auth=") + 5);
		// 	console.log(auth);

		// 	console.log(req.session);
		// 	req.session.auth = auth;

		// 	res.end("sdfsfddsf");
		// });
	}
	else
	{
		// TODO
		res.end("404");
	}

	
}

exports.request = request;