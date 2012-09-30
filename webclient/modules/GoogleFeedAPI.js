define(function() {

	var GoogleFeedAPI = {
		initialize: function initialize()
		{
			var deferred = Q.defer();

			google.setOnLoadCallback(function(){
				deferred.resolve();
			});

			return deferred.promise;
		},

		loadFeed: function loadFeed(feedName){
			var feed = new google.feeds.Feed(feedName);

			var deferred = Q.defer();

			feed.load(function(result) {
				if (result.error)
					deferred.reject(result.error);
				else
					deferred.resolve(result);
			});

			return deferred.promise;
		},

	};
	
	return GoogleFeedAPI;
});