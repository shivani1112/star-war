var rocket,fireball,star;
var rocketImg,fireballImg,starImg;
var bg;
var blast;
var starGroup;
var fireballGroup;
var crash;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;

function preload(){
  rocketImg = loadImage("rocket.png");
  fireballImg = loadImage("fireball.png");
  starImg = loadImage("star.png");
  bg = loadImage("backGround.jpg");
  blastImg = loadImage("blast.jpg");
  crash = loadSound("crash.wav");
}

function setup(){
    createCanvas(700,655);

    rocket = createSprite(160,340,20,20);
    rocket.addImage(rocketImg);
    rocket.scale = 0.3;
    starGroup = new Group();
    fireballGroup = new Group();

    blast = createSprite(300,300,25,25);
    blast.scale = 5.02;
    blast.visible = false;
}

function draw(){
  background(bg);


 
  if(gameState === PLAY){
    if(keyDown(UP_ARROW)){
        rocket.velocityY = -5;
     }
     if(keyDown(DOWN_ARROW)){
         rocket.velocityY = 5;
     }
     if(keyDown(RIGHT_ARROW)){
         rocket.velocityX = 5;
     }
     if(keyDown(LEFT_ARROW)){
         rocket.velocityX = -5;
     }

     spawnStar();
     spawnFireball();

     if(starGroup.isTouching(rocket)){
         score = score+1;
         starGroup.destroyEach();
     }

     if(fireballGroup.isTouching(rocket)){
         gameState = END;
     }
  }
    else if(gameState === END){
        background(blastImg);
        fireballGroup.destroyEach();
        crash.play();
        //blast.visible = true;
        //blast.addImage(blastImg);
        starGroup.destroyEach();
        textSize(50);
        fill("blue");
        text("ROCKET BLASTED",150,200);
        rocket.velocityX = 0;
        rocket.velocityY = 0;
        rocket.visible = false;
    }

    textSize(20);
    fill("white");
    text("Score: "+ score, 380,50);


drawSprites();
  
}
function spawnStar(){
    if(frameCount%80 === 0){
        star = createSprite(250,250,10,20);
        var pos = Math.round(random(1,4));
        star.addImage(starImg);
        if(pos === 1){
           star.x = Math.round (random(100,490));
           star.y = 650;
           star.velocityY = -5;
        }
        else if(pos === 2){
            star.y = Math.round(random(50,500));
            star.x = 0;
            star.velocityX = 3;
        }
        else if(pos === 3){
            star.y = Math.round(random(50,500));
            star.x = 650;
            star.velocityX = -3;
        }
        else{
            star.x = Math.round(random(50,500));
            star.y = 0;
            star.velocityY = 3;
        }
        star.scale = 0.1;
        star.lifetime = 800;
        starGroup.add(star);
    }
}

function spawnFireball(){
    if(frameCount%120 === 0){
        fireball = createSprite(600,250,10,20);
        fireball.addImage(fireballImg);
        var pos = Math.round(random(1,4));
        if(pos === 1){
            fireball.x = Math.round (random(100,490));
            fireball.y = 650;
            fireball.velocityY = -5;
            fireball.velocityX = -5;
         }
         else if(pos === 2){
            fireball.y = Math.round(random(50,500));
            fireball.x = 0;
            fireball.velocityX = 3;
            fireball.velocityY = -5;
         }
         else if(pos === 3){
            fireball.y = Math.round(random(50,500));
            fireball.x = 650;
            fireball.velocityX = -3;
         }
         else{
            fireball.x = Math.round(random(50,500));
            fireball.y = 0;
            fireball.velocityY = 3;
         }
        fireball.lifetime = 800;
        fireball.scale = 0.12;
        fireballGroup.add(fireball);


    }
}

 

