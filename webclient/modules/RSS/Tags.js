define(["Utils/EventSender"], function(EventSender){
	

	/**
	 * Represents a tag (folder)
	 * @constructor
	 *
	 * @param {FeedProvider} provider
	 * @param {String}       label    Label of the tag
	 * @param {String}       type     Type of the tag
	 * @param {Object}       data     Additional data from the FeedProvider
	 */
	function Tag(provider, label, type, data)
	{
		this._provider = provider;
		this.label = label;
		this.type = type;
		this.data = data;
	}
	
	Tag.prototype = { 
		
	};
	
	Object.defineProperty(Tag.prototype, "constructor", {value: Tag});



	// =======================================================================



	/**
	 * Represents a list of tags
	 * @constructor
	 * 
	 * @param {FeedProvider} provider FeedProvider for retrieving the data
	 */
	function TagList(provider)
	{
		this._provider = provider;
		this.tags = [];
		this.tagsByLabel = Object.create(null);
	}
	
	TagList.prototype = { 

		/**
		 * Adds the given tag to the list
		 *
		 * @param {Tag} tag Tag to add
		 */
		addTag: function addTag(tag){
			this.tags.push(tag);
			this.tagsByLabel[tag.label] = tag;
		},
		
		/**
		 * Updates the list of tags
		 */
		updateTagList: function updateTagList(){
			var self = this;
			return this._provider.getTags().then(function(result){

					console.log(result);

					for (var i = result.length - 1; i >= 0; i--) {
						var tagData = result[i];
						if(!self.tagsByLabel[tagData.label])
							self.addTag(new Tag(self._provider, tagData.label, tagData.type, tagData.data));
					}

					console.log(self.tags);

					self.fire("taglist-update");
					return result;
				});
		}
	};
	
	Object.defineProperty(TagList.prototype, "constructor", {value: TagList});
	EventSender.initOn(TagList.prototype);

	// exports
	return {
			TagList: TagList,
			Tag: Tag
		};
});