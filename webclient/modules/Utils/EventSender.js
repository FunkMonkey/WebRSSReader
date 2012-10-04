define(function(){
	
	/**
	 * Represents a custom EventSender
	 * @constructor
	 *
	 * @property   {Object<Function[]>}   _customEvents   List of event listeners per event
	 * 
	 */
	function EventSender()
	{
	}

	/**
	 * Initializes the EventSender on the given object
	 * 
	 * @param  {Object} obj Object to init on
	 */
	EventSender.initOn = function initOn(obj){
		obj.addListener = EventSender.prototype.addListener;
		obj.removeListener = EventSender.prototype.removeListener;
		obj.fire = EventSender.prototype.fire;
	};

	EventSender.prototype = {
		
		/**
		 * Adds the given event listener
		 * 
		 * @param   {string}     eventName   Event to be searched
		 * @param   {Function}   listener    Listener to be added
		 */
		addListener: function addListener(eventName, listener)
		{
			if(!this._customEvents)
				//this._customEvents = {};
				Object.defineProperty(this, "_customEvents", {value: {} });
			
			if(!this._customEvents[eventName])
				this._customEvents[eventName] = [];
			
			this._customEvents[eventName].push(listener);
		},
		
		/**
		 * Removes the given event listener
		 * 
		 * @param   {string}     eventName   Event to be searched
		 * @param   {Function}   listener    Listener to be removed
		 */
		removeListener: function removeListener(eventName, listener)
		{
			if(!this._customEvents)
				return;
			
			var currListeners = this._customEvents[eventName];
			if(!currListeners)
				return;
			
			for(var i = 0, len = currListeners.length; i < len; ++i)
			{
				if(currListeners[i] === listener)
				{
					currListeners.splice(i, 1);
					break;
				}
			}
		}, 
		
		/**
		 * Fires the event with the given name
		 * 
		 * @param   {string}  eventName   Event to be searched
		 * @param   {Array}   args        Arguments passed to the listeners
		 */
		fire: function fire(eventName, args)
		{
			if(!this._customEvents)
				return;
			
			var currListeners = this._customEvents[eventName];

			var commonInfo = [this, eventName];
			
			// call all the listeners
			if(currListeners)
			{
				for(var i = 0; i < currListeners.length; ++i)
					currListeners[i].apply(null, (args) ? commonInfo.concat(args) : commonInfo);
			}
		}
	};

	return EventSender;
});