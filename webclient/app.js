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

window.app = {};

requirejs([ "RSS/GoogleReader/API", 
	        "RSS/GoogleReader/FeedProvider",
	        "View/TagListView"],
	
	function( GoogleReaderAPI, 
		      GoogleReaderFeedProvider,
		      TagListView) {

		var app = window.app;

		$first("#greader_login_form").onsubmit = function(){
				var username = $first("#greader_login_username").value;
				var password = $first("#greader_login_password").value;

				console.log(username + " " + password);

				GoogleReaderAPI.login(username, password).then(function(){
						console.log("logged in");
					});

				return false;
			};

		$first("#greader_test").addEventListener("click", function(){
				// GoogleReaderAPI.getTags().then(function(res){
				// 		console.log(res);
				// 	});
				
				var tagList = app.tagList = GoogleReaderFeedProvider.createTagList();
				var domTagList = new TagListView(tagList);
				$first("#sidebar").appendChild(domTagList.init());

				tagList.updateTagList().then(function(res){
						console.log(res);
					});
			});

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

		return app;
	});
