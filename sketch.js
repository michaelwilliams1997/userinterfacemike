 var particles = [];		// Particle object array
	var abstract; //background abstract image 
	var icon = []; //images used for the mouse dragged function
	var slider;  //slider element controls ellipse size
	var video; //  video content
	var button;	//button element controls ellipse color
	var circleColor = 250;	// color of the circle
  var input;  // the input box
  var typeTexts;  // the text that reflects the content inside the input box


function preload() {
  // Loaded four different images with two varaibles, the "icon" variable was put into an array.
	abstract = loadImage('image.png');
  icon[0] = loadImage('purp.png'); 
  icon[1] = loadImage('blue.png');
  icon[2] = loadImage('cherry.png');
	}

function setup() { 
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  //   Slider changes the size of the circle
  slider = createSlider(0, 255, 100);
  slider.position(1200, 100);
  slider.size(150);
  
  //  Input variable is a type holder for what will be visible when typed
  input = createInput('Say Something Here');
  input.position(1200, 150);
  
  //   CreateP allows for the function to write words
  typeTexts = createP('Typing...');
  stroke(255);
  typeTexts.position(1200, 100);
  
  //   Video was created in After Effects, it is the squares moving from right to left.
  video = createVideo('video1.mov');
  video.loop();
  // hide the origianl video image
  video.hide();
    
  // Button when pressed allows for the ellipse to change colors
  button = createButton('Color');
  button.position(1200, 70);
  button.size(150);
  button.mousePressed(change);
	} 
  // Circle color changes with this function and has different hues at random
  function change() {
  circleColor = color(random(255), random(255), random(255));
	}

function draw() { 
  background(0);
  //Background Image being displayed and the video's of the two squares going forwards and back are original creations
  image(video, 1200, 800, 800, 500);
  image(video, 1000/2, 800/2, 800, 500);
  // Background Image was designed on illustrator
  image(abstract, 600, 600, 800, 800);
  
  // Ellipse scaled by slider
  noStroke();
  fill(circleColor);
  ellipse(1290, 390,  slider.value(), slider.value());
  // Smaller ellipse on top of big circle, meant to create the shape of a cat eye with both ellipses
  fill(0);
  ellipse(1290, 390, 50, 100, 20);
  
  //Text size and font for the "Type Something Here" input
  fill(255);
  textFont('TREBUCHET MS');
  textSize(20);
  // Allows for the text to be seen from the input rectangle
  text(input.value(), 1200, 220);
  typeTexts.html(input.value());

  // For loop that displays the objects
  for (var i = particles.length-1; i >= 0; i--) {
	particles[i].show();
 	// particles[i].shake();
  particles[i].drop();      
  // when the object moves out of the canvas, delete the object 
  // from the array
  if (particles[i].y > height) {
	particles.splice(i,5);
  }
  // Amount of particles
  if (particles.length > 30) {
  particles.shift();
  }
  }
  }

function mouseDragged() {
  // Array object displayed at random through this variables
	var newParticle = new Particle(icon[round(random(0,2))], mouseX, mouseY, random(20,50), random(1, 10));
	particles.push(newParticle);
	}
  // object declaration for particles - constructor function
  function Particle(t, x, y, si, sp) {
  this.content = t;
	this.x = x; 
  this.y = y;
  this.size = si;
  this.speed = sp;
	}
  // object methods
	Particle.prototype = {
	constructor: Particle,
  
  // Display image object
  show: function() {
  image(this.content, this.x, this.y, this.size * 8, this.size * 8);
  },
  
  // Icons drop and float at random
  drop: function() {
  this.y += this.speed / 2;
  this.y += (-5, -3);
  },   
  }