define(["XHR"], function(XHR) {

	var BASE_URL_API = "/reader/api/0/";

	var GoogleReaderAPI = {

		/**
		 * Logs into Google Reader
		 * 
		 * @param  {String} username Username to log in
		 * @param  {String} password Password to log in
		 * @return {Q.Promise}
		 */
		login: function login(username, password)
		{
			return XHR({
					url:     "/reader/login",
					method:  "POST",
					headers: {"Content-Type": "application/x-www-form-urlencoded"},
					data:    "username=" + encodeURIComponent(username) + 
					         "&password=" + encodeURIComponent(password)
				});

		},

		/**
		 * Returns a list of subscriptions
		 * 
		 * @return {Q.Promise} Promise, resolves with parsed JSON response
		 */
		getSubscriptions: function getSubscriptions(){
			return XHR({
					url:     BASE_URL_API + "subscription/list?output=json",
					json:    true,
					jsonFilter: function(jsonRes){return jsonRes.subscriptions;}
				});
		},

		/**
		 * Returns a list of tags
		 * 
		 * @return {Q.Promise} Promise, resolves with parsed JSON response
		 */
		getTags: function getTags(){
			return XHR({
					url:     BASE_URL_API + "tag/list?output=json",
					json:    true,
					jsonFilter: function(jsonRes){return jsonRes.tags;}
				});
		},


	};
	
	return GoogleReaderAPI;
});