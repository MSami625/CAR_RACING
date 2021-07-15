var canvas,background;
var gameState=0;
var distance=0;
var health=100;
var speed=0;
var edges;

var car1,car1img;
var Barrelgroup,roadblockgroup;
var track,trackimg;

var  obs1,obs2,obs1img,obs2img,beep,mp;


function preload(){
  obs1img=loadImage("images/barrel.png");
  obs2img= loadImage("images/roadblock.png");
  car1img=loadImage("images/car1.png");
  trackimg=loadImage("images/track.jpg");
  bgimg=loadImage("images/bg.png");
  bimg=loadImage("images/gm.jpg");
  winimg=loadImage("images/win.jpg")

  beep=loadSound("Beep.wav");
  mp=loadSound("Pop.wav");
}


function setup() {
  background("orange");
  canvas=createCanvas(displayWidth,displayHeight);

  car1=createSprite(700,800);
  car1.addImage(car1img);
  car1.scale=0.4;

  edge1=createSprite(200,600,20,10000);
  edge2=createSprite(1200,600,20,10000);
  edge3=createSprite(800,-3750,1000,20)
  

//GAMESTATE #START
  if(gameState===0){
    background(bgimg);

    car1.visible=false;
    edge1.visible=false;
    edge2.visible=false;

    this.title = createElement('h1');
    this.title.html("Car Racing Game");
    this.title.position(displayWidth/2 - 100, 50);
  
    var name = window.prompt("ENTER YOUR NAME:");
     this.Name=createElement('h3');
     this.Name.html("🎗WELCOME🎗 "+ name);
    this.Name.position(600, 150);

    textStyle(BOLDITALIC);
    textSize(15)
    fill("black");
    text("=> Some Important Instructions:",350,400);

    textSize(12)
    fill("BLACK");
    text("GOAL:",350,350);

    textSize(12)
    fill("green");
    text(" REACH END LINE⛳.",350,370);

    textSize(12)
    fill("green");
    text("(1) PLAY IN FULLSCREEN SIZE FOR BETTER EXPERIENCE.",400,420);
    
    textSize(12)
    fill("green");
    text("(2) CONTROL CAR USING ARROW KEYS ALSO 'H' FOR HORN.",400,440); 
    
    this.button = createButton(' 🚕PLAY ');
    this.button.position(670,300);

  
  }

  Barrelgroup=createGroup();
  roadblockgroup=createGroup();
}

function draw() {

//GAMESTATE #PLAY
Barrel();
roadblock();

car1.collide(edge1);
car1.collide(edge2);
car1.collide(edge3);
Barrelgroup.collide(roadblockgroup);

  if(gameState === 1){
    car1.visible=true;
    edge1.visible=true;
    edge2.visible=true;
    edge3.visible=false;

    camera.position.x = displayWidth / 2;
    camera.position.y = car1.y-10;

    background("orange");
    image(trackimg,10,-displayHeight * 5-20, displayWidth,displayHeight * 10);

    if(car1.isTouching(Barrelgroup) ){
      health=health-25;
      obs1.destroy();  
    }
    if(car1.isTouching(roadblockgroup)){
      health=health-25;
      obs2.destroy();
    }


       if(keyDown('H')){
        beep.play();
  
    } 
          car1.velocityY=-10;
          
          if (keyDown(LEFT_ARROW) ) {
          car1.x-=10;
          }
          if (keyDown(RIGHT_ARROW) ) {
            car1.x+=10;
            }
  }


  this.button.mousePressed(()=>{
    this.title.hide();
    this.button.hide();
    this.Name.hide();
    gameState=1;
    mp.play();
  });


  if(health<1){
    background(bimg);
    car1.visible=false;
    obs1.visible=false;
    obs2.visible=false;
    edge1.visible=false;
    edge2.visible=false;
    edge3.visible=false;
    car1.velocityY=0;
   
  }

 //GAMESTATE #END
 
    if(gameState===2){
    background(winimg);
    car1.visible=false;
    obs1.visible=false;
    obs2.visible=false;
    edge1.visible=false;
    edge2.visible=false;
    edge3.visible=false;
    car1.velocityY=0;
   }
   
  
 if (camera.position.y<-3660) {
   obs1.destroy();
   obs2.destroy();
    setTimeout(function(){ gameState=2; },900);
   }


drawSprites();

fill("orange");
textSize(20);
text("Health : " + health, camera.position.x-650,camera.position.y-300);
}


function Barrel(){
  if(frameCount% 70===0 && gameState===1){
     obs1= createSprite(10,40); 
     obs1.addImage(obs1img);
     obs1.scale=0.7;
     Barrelgroup.add(obs1);
     obs1.setCollider("circle",0,0,50);
     obs1.x=Math.round(random(300,1100));
     obs1.y=(camera.position.y-400);
} 

    }

  function roadblock(){
    if(frameCount% 75===0 && gameState===1){
      obs2= createSprite(10,40); 
      obs2.addImage(obs2img);
      obs2.scale=0.7;
      roadblockgroup.add(obs2);
      obs2.x=Math.round(random(300,1100));
      obs2.y=(camera.position.y-450);

  }

    }