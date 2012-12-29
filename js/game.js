window.onload = function(){

	var game = (function(){

		// debug mode?
		var DEBUG = DEBUG ? false : window.location.search.split('?')[1] == 'debug';

		var self = {};

		// base canvas elements
		var canvas, ctx, W, H;

		// main states of game
		var playing = true, // TODO: change to [false] after debugging
			dead = false;

		// stickman moving
		var active = 1, // active sprite
			rolling = false,
			stickmanState = 0, // 0 - ground, 1 - moving up, 2 - moving down
			offsetY = 0 // distance from ground
			; 

		// keyboard jumping button boaleans
		var upPressing = false,
			jumping = false;



		// start button and animation variables
		var startButton,
			startAnimation = true, // TODO: change to [false] after debugging
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

			// start button & keyboard listeners
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
				
				ctx.translate(20+20,175+25/2);

				if(DEBUG){
					ctx.fillStyle = 'rgba(0,255,0,0.5)';
					ctx.fillRect(-25/2,-25/2,25,25);
				}

				ctx.rotate(Math.PI/6*active);
				ctx.drawImage(sprites[7],-25/2,-25/2);
				ctx.restore();

			}else{

				if(DEBUG){
					ctx.fillStyle = 'rgba(0,255,0,0.5)';
					ctx.fillRect(20+startOffset,167-offsetY*2,33,33);
				}
				
				ctx.drawImage(sprites[active],20+startOffset,167-offsetY*2);
					
			}

			// console.logs
			console.log(offsetY);
			

			// next frame
			update();
		}

		function update(){
			// active sprite of stickman
			active += 1;
			if(active>6){
				active = active%6;
			}


			// jumping

			// jumping ver.2 ---------------
			if(stickmanState == 1){ // up

				if(offsetY < 10){
					offsetY += 2;
				}else if(offsetY >= 10 && offsetY < 16){
					if(upPressing){
						offsetY += 1;
					}else{
						offsetY += 2;
					}
				}else if(offsetY >= 16){
					stickmanState = 2;
				}

			}else if(stickmanState == 2){ // down

				if(offsetY > 10){
					if(upPressing){
						offsetY --;
					}else{
						offsetY -= 2;
					}
				}else{
					if(offsetY - 2 < 0){
						
						offsetY = 0;
						if(!upPressing){
							stickmanState = 0;
						}

					}else{
						offsetY -= 2;
					}
				}

			}
			
			// jumping ver.1 ---------------

			/*if(stickmanState == 1){

				if(offsetY < 16){
					offsetY += 2;
				}else{
					stickmanState = 2;
				}

			}else if(stickmanState == 2){

				if(offsetY - 2 > 0){
					if(upPressing){
						if(offsetY > 8){
							offsetY -= 0.75;
						}else{
							offsetY -= 2;
						}
					}else{
						offsetY -= 2;
					}
					
				}else{
					offsetY = 0;

					if(!upPressing){
						stickmanState = 0;
					}
				}

			}*/



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

							if(stickmanState == 0){

								upPressing = true;
								jumping = true;
								stickmanState = 1;

							}




						}
					break;
					case 40: // arrow down
						if(playing){
							event.preventDefault();
							//rolling = true;
						}
					break;
				}
			},
			keyup : function(event){
				switch(event.keyCode){
					case 38:

						jumping = false;
						upPressing = false;

					break;
					case 40: // arrow down
						//rolling = false;

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