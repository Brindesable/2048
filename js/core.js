function CoreManager(){
	this.events = {};
	this.size = 0;
  	this.grid = null;

	this.process();
}

CoreManager.prototype.on = function (event, callback) {
  if (!this.events[event]) {
    	this.events[event] = [];
  }
  this.events[event].push(callback);
};

CoreManager.prototype.emit = function (event, data) {
  var callbacks = this.events[event];
  if (callbacks) {
    	callbacks.forEach(function (callback) {
      	callback(data);
    });
  }
};

CoreManager.prototype.process = function() {
	var i = 0;
	var self = this;
	var prevGrid = null;
	var right = false;
	var left = false;

	// Respond to button presses
  	this.bindButtonPress(".retry-button", this.restart);
  	this.bindButtonPress(".restart-button", this.restart);
  	this.bindButtonPress(".keep-playing-button", this.keepPlaying);

	window.setInterval(function(){

		if(prevGrid != self.grid){
			prevGrid = self.grid;	
			self.emit("move", 2);
			left = right = false;
		}else if(!left){
			self.emit("move", 3);
			left = true;
		}else if(!right){
			self.emit("move", 1);
			right = true;
			left = false;
		}else{
			self.emit("move", 0);
			left = right = false;
		}

	}, 50);
};

CoreManager.prototype.restart = function (event) {
  event.preventDefault();
  this.emit("restart");
};

CoreManager.prototype.keepPlaying = function (event) {
  event.preventDefault();
  this.emit("keepPlaying");
};

CoreManager.prototype.bindButtonPress = function (selector, fn) {
  var button = document.querySelector(selector);
  button.addEventListener("click", fn.bind(this));
  button.addEventListener(this.eventTouchend, fn.bind(this));
};

CoreManager.prototype.actuate = function(size, grid){
	this.size = size;
	this.grid = grid;
};