window.$first = function $first(selector){
	return document.querySelector(selector);
};

requirejs.config({
	//By default load any module IDs from js/lib
	baseUrl: 'modules',

	//except, if the module ID starts with "app",
	//load it from the js/app directory. paths
	//config is relative to the baseUrl, and
	//never includes a ".js" extension since
	//the paths config could be for a directory.
	paths: {
		libs: 'libs'
	}
});

requirejs(["RSS/GoogleReaderAPI"],
	function(GoogleReaderAPI) {


		$first("#greader_login").addEventListener("click", function(){
				var username = $first("#greader_username").value;
				var password = $first("#greader_password").value;

				console.log(username + " " + password);

				GoogleReaderAPI.login(username, password).then(function(){
						console.log("logged in");
					});
			});

		console.log("start");
		
		/*GoogleFeedAPI.initialize().then(function(){
			console.log("init");


			GoogleFeedAPI.loadFeed("http://fastpshb.appspot.com/feed/1/fastpshb").
				then(function(result){
						var container = document.getElementById("feed");
						for (var i = 0; i < result.feed.entries.length; i++) {
							var entry = result.feed.entries[i];
							var div = document.createElement("div");
							div.appendChild(document.createTextNode(entry.title));
							container.appendChild(div);
						}
					}, function(error){
						console.log("error");
					});

		});*/
	});
