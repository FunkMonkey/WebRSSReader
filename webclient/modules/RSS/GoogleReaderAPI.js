define(function() {

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
			var deferred = Q.defer();

			var xmlhttp = new XMLHttpRequest();
			xmlhttp.open("POST", "/greader/login", true);
			xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xmlhttp.onreadystatechange = function(){
					if(xmlhttp.readyState === 4)
						deferred.resolve();
				};
			xmlhttp.send( "username=" + encodeURIComponent(username) + 
			              "&password=" + encodeURIComponent(password));

			return deferred.promise;
		}

	};
	
	return GoogleReaderAPI;
});