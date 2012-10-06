define(["Utils/DOMUtils"], function(DOMUtils){

	function TagListView(tagList)
	{
		this.tagList = tagList;
	}
	
	TagListView.prototype = { 

		init: function init(){
			var domFrag = document.createDocumentFragment();
			var domContainer = DOMUtils.createNodeOn(domFrag, "div", {"class": "taglist-view"});
			domContainer.view = this;
			this.domContainer = domContainer;

			this.tagList.addListener("taglist-update", this.updateElements.bind(this));

			return domFrag;
		},

		updateElements: function updateElements(){
			var domFrag = document.createDocumentFragment();
			
			for (var i = 0; i < this.tagList.tags.length; i++) {
				var tag = this.tagList.tags[i];
				var domTag = DOMUtils.createNodeOn(domFrag, "div", {"class": "taglist-view-tag"});
				domTag.innerHTML = tag.label;
			}

			DOMUtils.removeAllChildren(this.domContainer);
			this.domContainer.appendChild(domFrag);
		}
	};
	
	Object.defineProperty(TagListView.prototype, "constructor", {value: TagListView});
	
	return TagListView;
});