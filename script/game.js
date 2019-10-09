
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 25;
canvas.height = window.innerHeight - 25;

let colSize = {
	height: 25,
	width: 25
}
let objectArray = [],
	objectColArray = [];

let x,
	y,
	mass,
	dx,
	dy,
	distanceCoef = 1,
	clickCheck = false,
	globalCoef = 1.058,
	initVal,
	dif,
	coef = 1,
	x1 = 0,
	y1 = canvas.height - colSize.height;
let secBoolCheck = true;
let objIsClicked = false;
let shadowArray = [];
let intervalMax = canvas.width;
let intervalMin = 0;

let mouse = {
	x: undefined,
	y: undefined
}
let size = {
	height: 25,
	width: 25
}
let move_right = 0;
let move_left = 0;
let jump = 0;

let player_pos = {};

function object(x, y, size, mass, dy, dx)
{
	this.size = size;
	this.x = x;
	this.y = y;
	this.mass = mass;
	this.dy = dy;
	this.dx = dx;
	let stop_falling = false;
	let stop_moving = false;
	let store_dy = this.dy;
	let a;
	
	this.update = function()
	{
		this.movement();
		this.collision();
		//this.mouseColCheck();
		this.draw();
	}
	
	this.movement = function()
	{
		if(!stop_moving)
			this.x += move_left + move_right;

		if(!stop_falling || jump)
		{
			if(jump && stop_falling)
			{
				this.y -= 100;
				//stop_falling = false;
			}
		// else if(this.dy < 0)
			//this.dy = -this.dy;

			this.dy *= globalCoef;
			this.y += this.dy * globalCoef;
			a = this.dy;
		}

		if(stop_falling) this.dy = store_dy;
		
		//Check movement of player on the server
		movement(this.x, this.y);
	}
	
	this.draw = function()
	{
		ctx.fillRect(this.x, this.y, this.size.width, this.size.height);
	}
	
	this.collision = function()
	{
		for(let i = 0; i < objectColArray.length; i++)
		{
			if(this.x <= objectColArray[i].x && this.x + this.size.width >= objectColArray[i].x
			|| this.x >= objectColArray[i].x && this.x <= objectColArray[i].x + objectColArray[i].size.width)
			{
				if(this.y < objectColArray[i].y + objectColArray[i].size.height)
				{
					if(this.y + this.size.height >= objectColArray[i].y - objectColArray[i].size.height)
					{
						this.y = objectColArray[i].y - this.size.height - distanceCoef;
						stop_falling = true;
						break;
					}
					stop_falling = false;
				}
			}
		}
	}
		
	this.mouseColCheck = function()
	{

	}
}

function drawEach(x, y, mass, dy, dx){
	objectArray.push(new object(x, y ,size, mass, dy, dx));
}

function remove(x, y){
	console.log('==========================');
	objectArray.forEach(function(elem)
	{	
		console.log(elem.x, "=", x, " --- ", elem.y, "=", y);
		if(elem.x == x && elem.y == y)
		{
			objectArray.splice(objectArray.indexOf(elem), 1);
		}
	});
}

window.onload = function()
{
	canvas.addEventListener("mousemove", function(evt){
		mouse.x = evt.x;
		mouse.y = evt.y;
	});

	function createMap(){
		require_map(canvas.width, x1, y1, colSize, canvas.height);
	}
	function animate(){
		requestAnimationFrame(animate);
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		objectColArray.forEach(function(elem){ 
			ctx.save();
			ctx.fillStyle = "red";
			ctx.fillRect(elem.x, elem.y, elem.size.width, elem.size.height);
			ctx.restore();
		})
		objectArray.forEach(function(elem){
			elem.update();
		});

		keepEmit();
	}

	createMap();
	//drawEach(x, y, mass, dy, dx);
	animate();
}
