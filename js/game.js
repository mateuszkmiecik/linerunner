window.onload = function(){

	var game = (function(){
                var self = {};
		var canvas,
			ctx,
			W, H;

		var playing = false,
			active = 1;


		//sprites
		var sprites = [];
		for(var i = 1; i <= 6; i++){
			sprites[i] = new Image();
			sprites[i].src = 'sprites/sprite'+i+'.png';
		}


		// init
		self.init = function(){

			//base variables
			canvas = document.getElementsByTagName('canvas')[0];
			ctx = canvas.getContext("2d");
			W = canvas.width; H = canvas.height;

			setInterval(draw, 30);

		}

		function draw(){
			ctx.clearRect(0,0,W,H);
			ctx.drawImage(sprites[active],20,167);
			update();
		}

		function update(){
			active += 1;
			if(active>6){
				active = active%6;
			}
		}
                return self;

	}());

	// run the game!
	game.init();


}