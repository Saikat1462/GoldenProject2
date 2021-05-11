var back_img
var boyimage,boyanimation,enemy1,enemy2,ground,arrowImage,arrow,enemy
var invisiblesprite,sheildimage,sheild
var score = 0
var lives = 3
var earrowimage,earrow
var invisiblewall,resetimage,bg
var play=1
var end=0
var gameState=1
var restart

function preload(){
  back_img=loadImage("images/backimage.jpg")
  boyanimation=loadAnimation("images/boy1.png","images/boy2.png","images/boy3.png","images/boy4.png")
  boyimage=loadAnimation("images/boy1.png")
  enemy1=loadImage("images/enemy1.png")
  enemy2=loadImage("images/enemy2.png")
  arrowImage=loadImage("images/arrow3.png")
  sheildimage=loadImage("images/sheild.png")
  earrowimage=loadImage("images/a2.png")
  resetimage=loadImage("images/reset.png")
}
 function setup(){
   canvas=createCanvas(1530,760)

   boy=createSprite(90,550,100,100)
   boy.addAnimation("standing",boyimage)
   boy.addAnimation("shooting",boyanimation)

   ground=createSprite(90,620,1300,10)
   ground.visible=false

   invisiblesprite=createSprite(500,500,2130,1060)
   invisiblesprite.visible=false

   invisiblewall=createSprite(100,400,20,500)
   invisiblewall.visible=false

   restart=createSprite(715,220)
   restart.addImage(resetimage)
   restart.scale=0.9
   
   enemyGroup=new Group()
   arrowGroup=new Group()
   sheildGroup=new Group()
   earrowGroup=new Group()
}

function draw() {
  background(back_img);

  if(gameState===play){

    restart.visible=false
  
  textSize(25)
  fill("black")
  text("Score:"+score,1200,100)

  textSize(25)
  fill("black")
  text("Lives:"+lives,1200,150)

  text(mouseX+","+mouseY,1200,180)

  if(keyWentDown("space")){
    boy.changeAnimation("shooting",boyanimation)
    boy.velocityY=-10
  }

  if(keyWentUp("space")){
    boy.changeAnimation("standing",boyimage)
    boy.velocityY=-10
  }

  if(mousePressedOver(invisiblesprite)){
    createArrow();
  }

  boy.velocityY=boy.velocityY+0.8

  boy.collide(ground)

  for(var i = 0; i<enemyGroup.length; i++){
    if(enemyGroup.get(i).isTouching(arrowGroup)){
        enemyGroup.get(i).destroy()
        score=score+1
    }
  }

  if(earrowGroup.isTouching(sheildGroup)){
      earrowGroup.destroyEach()
  }

  if(keyWentDown("s")){
    createSheild()
  }

  if(keyWentUp("s")){
    sheild.destroy()
  }

  if(earrowGroup.isTouching(boy) || enemyGroup.isTouching(boy)){
    earrowGroup.destroyEach()
    lives=lives-1
  }

  for(var i = 0; i<enemyGroup.length; i++){
    if(enemyGroup.get(i).isTouching(boy)){
        enemyGroup.get(i).destroy()
    }
  }

  for(var i = 0; i<enemyGroup.length; i++){
    if(enemyGroup.get(i).isTouching(invisiblewall)){
        enemyGroup.get(i).destroy()
        lives=lives-1
    }
  }

  spawnenemy();
  createEnemyArrow()

  if(lives===0){
    gameState=end
    
  }
}
else if(gameState===end){
  reset()
  restart.visible=true
  invisiblesprite.destroy()
  enemyGroup.setVelocityXEach(0)
  enemyGroup.destroyEach()  
  earrowGroup.destroyEach()
  boy.velocityY=0
  if(mousePressedOver(restart)){
    gameState=play
    score=0
    lives=3
  }
  
}

  drawSprites();
}

function spawnenemy(){
  if(frameCount % 80===0){
    enemy=createSprite(1400,500,100,100)
    enemy.x=Math.round(random(1200,1400))
    enemy.y=Math.round(random(300,500))
    enemy.velocityX=-5

    var rand=Math.round(random(1,2))
  if(rand===1){
    enemy.addImage(enemy1)
  }else{
    enemy.addImage(enemy2)
  }
  enemyGroup.add(enemy)
  }
  
}

function createArrow(){
  if(frameCount%10===0){
    arrow=createSprite(200,100,10,10)
  arrow.y=boy.y-23
  arrow.addImage(arrowImage)
  arrow.scale=1.3
  arrow.velocityX=+30
  arrowGroup.add(arrow)
  arrow.lifetime=51
  }
}

function createEnemyArrow(){
  if(frameCount%100===0){
    earrow=createSprite(1090,215,10,10)
  //earrow.y=boy.y-23
  earrow.addImage(earrowimage)
  earrow.scale=1.3
  earrow.velocityX=-30
  earrow.velocityY=+10
  earrow.lifetime=51
  earrowGroup.add(earrow)
  }
}

function createSheild(){
    sheild=createSprite(150,530,10,10)
  sheild.addImage(sheildimage)
  sheild.scale=0.7
  sheildGroup.add(sheild)
}

function reset(){
  //bg=createSprite(500,500,2130,1060)
  //bg.shapeColor="#82e9f5"
    textSize(35)
    fill("red")
    text("Game Over",650,85)
}