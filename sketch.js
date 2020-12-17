//Create variables here
var dog, dogImg,happyDogImg,database,foods,foodStock,milk,milk1,milk2,milk3,fedTime,lastFed,foodObj;
function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png")
  milkImg = loadImage("images/Milk.png")
}

function setup() {
  createCanvas(800, 700);
  
  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value",readStock);
  //foodStock.add(20);

  feed=createButton("FEED THE DOG");
  feed.position(200,95);
  feed.mousePressed(feedDog);

  addFood=createButton("ADD FOOD");
  addFood.position(315,95);
  addFood.mousePressed(addFoods)
  

  dog = createSprite(350,350,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  milk = createSprite(120,200,10,10);
  milk.addImage(milkImg);
  milk.scale = 0.1;
  
  milk1 = createSprite(150,200,10,10);
  milk1.addImage(milkImg);
  milk1.scale = 0.1;

  milk2 = createSprite(180,200,10,10);
  milk2.addImage(milkImg);
  milk2.scale = 0.1;

  milk3 = createSprite(90,200,10,10);
  milk3.addImage(milkImg);
  milk3.scale = 0.1;
}


function draw() {  
  background("green");
  
    textSize(20);
    fill(255);
    text("Note: Last Feed",150,50);
    text(": 5 PM",300,50);
  

  //if(keyWentDown(UP_ARROW)){
    //writeStock(foods);
    //dog.addImage(happyDogImg);
  //}

 //if(keyWentUp(UP_ARROW)){
   // dog.addImage(dogImg);
 // }

 

  drawSprites();
  //add styles here

}



function readStock(data){
  foods = data.val();

}

function writeStock(x){
  
  database.ref("/").update({
    foods:x
  });
}

function feedDog(){
  dog.addImage(happyDogImg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodStock++;
  database.ref('/').update({
    Food:foodStock
  })
}
