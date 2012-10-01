
var connect = require("connect");

var port = 3000;

var GoogleReaderProxy = require("./GoogleReaderProxy");

var app = connect()
	.use(connect.logger('dev'))
	.use(connect.static('../webclient'))
	.use(connect.bodyParser())
	.use(function(req, res){

		if(req.url.indexOf("/greader/") === 0)
		{
			GoogleReaderProxy.request(req, res);
		}
		else
		{
			res.end('404\n');
		}
	})
	.listen(port);