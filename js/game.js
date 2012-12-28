window.onload = function(){

	var game = (function(){

		var self = {};

		// base canvas elements
		var canvas, ctx, W, H;

		// main states of game
		var playing = false,
			dead = false;

		// stickman moving
		var active = 1, // active sprite
			jumping = false,
			rolling = false; 


		// start button and animation variables
		var startButton,
			startAnimation = false,
			startOffset = 215,
			startAnimationMultiplier = 1;

		//sprites
		var sprites = [];
		for(var i = 1; i <= 6; i++){
			sprites[i] = new Image();
			sprites[i].src = 'sprites/sprite'+i+'.png';
		}
		sprites[7] = new Image();
		sprites[7].src="sprites/rolling.png";

		// init
		self.init = function(){

			// base variables
			canvas = document.getElementsByTagName('canvas')[0];
			ctx = canvas.getContext("2d");
			W = canvas.width; H = canvas.height;

			// start button listener
			startButton.addEventListener('click', events.startClick, false);
			document.addEventListener('keydown', events.keydown, false);
			document.addEventListener('keyup', events.keyup, false);

			// basement
			ctx.fillRect(0,200,W,100);

			setInterval(draw, 30);

		}

		function draw(){
			ctx.clearRect(0,0,W,H-100); // clear
			ctx.save();

			// stickman
			if(rolling){

				ctx.translate(20+20,177+25/2);
				ctx.rotate(Math.PI/6*active);
				ctx.drawImage(sprites[7],-25/2,-25/2);
				ctx.restore();

			}else{
				ctx.drawImage(sprites[active],20+startOffset,168);
			}

			// next frame
			update();
		}

		function update(){
			// active sprite of stickman
			active += 1;
			if(active>6){
				active = active%6;
			}


			// startAnimation
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
			self.pa = playing;
		}

		// startButton
		startButton = (function(){
			var container = document.getElementById('container');
			var startBtn = document.createElement('button');
			startBtn.setAttribute('class', 'start');
			startBtn.textContent = 'Start';
			startBtn.style.opacity = 1;
			container.appendChild(startBtn);

			return startBtn;
		}());


		// events 
		var events = {
			startClick : function(){
				startAnimation = true;
			},
			keydown : function(event){
				switch(event.keyCode){
					case 38: // arrow up
						if(playing){
							event.preventDefault();
							console.log('skaczemy!');
						}
					break;
					case 40: // arrow down
						if(playing){
							event.preventDefault();
							rolling = true;
						}
					break;
				}
			},
			keyup : function(event){
				switch(event.keyCode){
					case 40:
						if(rolling) rolling = false;
					break;
				}
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