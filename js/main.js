window.onload= function(){

	document.addEventListener('keydown', documentKeyDownHandler, false);
	document.addEventListener('keyup', documentKeyUpHandler, false);

	var canvas = document.getElementById("linerunner"),
		ctx = canvas.getContext("2d"),
		W = canvas.width;
		H = canvas.height,
		Y = 100,
		change = 0,
		running = false,
		startHover = false,
		active = 1;

	canvas.addEventListener('mouseover', hoverCanvas, false);
	function hoverCanvas(event){
		canvas.addEventListener('mousemove', function(event2){
			if(event2.offsetX <= 150 && event2.offsetX >= 50 &&
				event2.offsetY >= 20 && event2.offsetY <= 40){
				startHover = true;

				canvas.addEventListener('click', function(ev){
					if(ev.offsetX <= 150 && ev.offsetX >= 50 &&
						ev.offsetY >= 20 && ev.offsetY <= 40){
						running = true;
					}
				}, false);
			}else{
				startHover = false;
			}

			if(startHover){
				var img = new Image();
				img.onload = function(){
					ctx.drawImage(img,20,20,100,20);
				};
				img.src = 'js/starthover.png';
			}else{
				var img = new Image();
				img.onload = function(){
					ctx.drawImage(img,20,20,100,20);
				};
				img.src = 'js/start.png';
			}
		}, false);
	}

	function documentKeyDownHandler(event){
		if(event.keyCode == 38){
			change = -10;
			event.preventDefault();
		}else if(event.keyCode == 40){
			change = +10;
			event.preventDefault();
		}
	}
	function documentKeyUpHandler(event){
		if(event.keyCode == 38){
			change = 0;
			event.preventDefault();
		}else if(event.keyCode == 40){
			change = 0;
			event.preventDefault();
		}
	}

	var mp = 10,
		particles = [],
		columns = [];

	//tworzenie losowe początkowych

	for(var i = 0; i < mp; i++){
		var column = Math.floor((Math.random()*W)/10);
		while(columns[column] == true){
			column = Math.floor((Math.random()*W)/10);
		}
		columns[column] = true;
		var xwidth = column*10;
		particles.push({
			x: xwidth+400,
			y: 200-10
		});
	}
	
	ctx.clearRect(0,0,W,H);
			
		var img = new Image();
		img.onload = function(){
			ctx.drawImage(img,20,20,100,20);
		};
		img.src = 'js/start.png';

	setInterval(draw,15);
	setInterval(activea,30);

	function activea(){
		if(running){
			active += 1;
			if(active>6){
				active = active%6;
			}
			console.log(active);
		}
	}


	// drawing and update

	function draw(){
		createPlayer();

		for(var i = 0; i < mp; i++){
			var p = particles[i];
			ctx.fillRect(p.x,p.y,10,10);
		}
		ctx.fillRect(0,200,500,100);

		if(running){


			update();

			ctx.clearRect(0,190,W,10);
			for(var i = 0; i < mp; i++){
				var p = particles[i];
				ctx.fillRect(p.x,p.y,10,10);
			}
		}
	}

	function update(){

		// player move
		

		var img = new Image();
		img.onload = function(){
			ctx.clearRect(20,167,30,33)
			ctx.drawImage(img,20,167);
		};
		img.src ='sprites/sprite'+active+'.png';

		for(var i = 0; i < mp; i++){

			var column = Math.floor(particles[i].x/10);

			if(particles[i].x >= 0){
				particles[i].x -= 2;
			}else{
				column = Math.floor((Math.random()*W)/10);
				particles[i].x = column*10 + 500;
			}
		}


	}

	// player

	function createPlayer(){
		var img = new Image();
		img.onload = function(){
			ctx.drawImage(img,20,167);
		};
		img.src ='sprites/sprite1.png';
	}

}