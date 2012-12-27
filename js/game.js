window.onload = function(){

	var game = (function(){

		var self = {};

		// base canvas elements
		var canvas, ctx, W, H;

		var playing = false;

		// active sprite for stickman moving
		var active = 1;

		// start animation variables
		var startAnimation = false,
			startOffset = 215,
			startAnimationMultiplier = 1;

		//sprites
		var sprites = [];
		for(var i = 1; i <= 6; i++){
			sprites[i] = new Image();
			sprites[i].src = 'sprites/sprite'+i+'.png';
		}

		// init
		self.init = function(){

			// base variables
			canvas = document.getElementsByTagName('canvas')[0];
			ctx = canvas.getContext("2d");
			W = canvas.width; H = canvas.height;

			// start button listener
			startButton.addEventListener('click', events.startClick, false);

			// basement
			ctx.fillRect(0,200,W,100);

			setInterval(draw, 30);

		}

		function draw(){
			ctx.clearRect(0,0,W,H-100);
			ctx.drawImage(sprites[active],20+startOffset,167);
			update();
		}

		function update(){
			active += 1;
			if(active>6){
				active = active%6;
			}

			if(startAnimation){
				if(startOffset-20 > 0){
					startOffset -= startAnimationMultiplier*1,5;
					startAnimationMultiplier++;
					if(startButton.style.opacity > 0){
						startButton.style.opacity = 1 - startAnimationMultiplier*0.1;
					}else{
						startButton.style.opacity = 0;
						startButton.style.display = 'none';
					}
					
				}else{
					startAnimation = false;
					playing = true;
					startOffset = 0;
				}
			}

			// debugging
			self.sa = startAnimation;
			self.pa = playing;
		}

		// startButton
		var startButton = (function(){
			var container = document.getElementById('container');
			var startBtn = document.createElement('button');
			startBtn.setAttribute('class', 'start');
			startBtn.textContent = 'Start';
			startBtn.style.opacity = 1;
			container.appendChild(startBtn);

			return startBtn;
		}());

		var events = {
			startClick : function(){
				startAnimation = true;
			}
		}
		////////////
		return self;

	}());

	// run the game!
	game.init();

	// for debugging
	window.game = game;

}