
var connect = require("connect");

var port = 3000;

var GoogleReaderProxy = require("./GoogleReaderProxy");

var app = connect()
	.use(connect.logger('dev'))
	.use(connect.static('../webclient'))
	.use(connect.bodyParser())
	.use(connect.cookieParser())
	.use(connect.session({ secret: 'keyboard cat rocks'}))
	.use(function(req, res){

		if(req.url.indexOf("/reader/") === 0)
		{
			GoogleReaderProxy.request(req, res);
		}
		else
		{
			res.end('404\n');
		}
	})
	.listen(port);