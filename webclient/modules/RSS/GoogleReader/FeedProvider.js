define(["./API", "RSS/Tags"], function(API, Tags) {

	/**
	 * Provides feed information from Google Reader
	 *
	 * @type {Object}
	 */
	var FeedProvider = {

		/**
		 * Creates a new TagList based on Google Reader
		 *
		 * @return {TagList} Newly generated list
		 */
		createTagList: function createTagList(){
			return new Tags.TagList(this);
		},

		/**
		 * Returns a list of existing Google Reader tags
		 *
		 * @return {Q.Promise} Promise with tagData
		 *
		 * tagData:
		 *   {String} label Label of the Tag
		 *   {String} type  Type of the label ("label" or "special")
		 *   {Object} data  Provider-specific data
		 */
		getTags: function getTags(){
			
			return API.getTags().then(function(result){

				var tags = [];
				for (var i = result.length - 1; i >= 0; i--) {
					var tag = {};

					var id = result[i].id;

					tag.label = id.substring(id.lastIndexOf("/") + 1);
					tag.type = (id.indexOf("/label/") !== -1) ? "label" : "special";
					tag.data = result[i];
					tags.push(tag);
				}

				return tags;
			});
		}
	};
	
	return FeedProvider;
});