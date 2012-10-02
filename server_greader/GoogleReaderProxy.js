var http = require("http");
var https = require("https");
var RequestHelper = require("./RequestHelper");

var url = require("url");

var READER_BASE_PATHNAME = "/reader/api/0/";

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

	console.log("Got request");

	// proxy for logging in
	if(req.url.indexOf("/reader/login") === 0)
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
			console.log(loginRes.statusCode);
			console.log(auth);

			req.session.auth = auth;

			res.end("Finished Login Request: " + loginRes.statusCode + "(" + http.STATUS_CODES[loginRes.statusCode] + ")");
		}).on("error", function(e){console.log("ERROR: " + e.message);});
	}
	// proxy for all reader API requests
	else if(req.url.indexOf("/reader/api/0/") === 0)
	{
		var parsedURL = url.parse(req.url);
		//var pathname = parsedURL.pathname.substring(14);
		var pathAndQueryString = parsedURL.pathname + "?" + toQueryString(params) + ((parsedURL.query.length !== 0) ? "&" : "") + parsedURL.query; 
		console.log(pathAndQueryString);

		options = {
				host: "www.google.com",
				path: pathAndQueryString,
				headers: {
							"Content-type": "application/x-www-form-urlencoded",
							"Authorization": "GoogleLogin auth=" + req.session.auth
						 }
			};

		RequestHelper.get(https, options, function(readerRes){

			if(readerRes.statusCode === 200)
			{
				res.end(readerRes.data);
				console.log(readerRes.data);
			}
			else
			{
				res.statusCode = readerRes.statusCode;
				res.end();
			}
		}).on("error", function(e){console.log("ERROR: " + e.message);}); // TODO: res

	}
	else
	{
		// TODO
		res.end("404");
	}

	
}

exports.request = request;