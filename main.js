myImage=localStorage.getItem("image");
objects=[];
status_object="";

function preload(){
display_image=loadImage(myImage); 
}
function setup() {
  canvas=createCanvas(640,420);
  canvas.center();
  detector=ml5.objectDetector("cocossd",modelLoaded);
}
function draw() {
  image(display_image,0,0,640,420);
  
if(status_object=="true"){
 for(var i=0;i<objects.length; i++){
  //object_x=Math.floor(objects[i].normalized.x*1000);
  //object_y=Math.floor(objects[i].normalized.y*1000);
 // object_height=Math.floor(objects[i].normalized.height*1000);
  //object_width=Math.floor(objects[i].normalized.width*1000);
  object_x=Math.floor(objects[i].x);
  object_y=Math.floor(objects[i].y);
 object_height=Math.floor(objects[i].height);
  object_width=Math.floor(objects[i].width);
  object_name=objects[i].label;
  object_confidence=Math.floor(objects[i].confidence*100)+"%";
  noFill();
  rect(object_x,object_y,object_width,object_height);
  fill("red");
  text(object_name+","+object_confidence,object_x,object_y);
 }
  
}
}
function modelLoaded() {
  console.log("model is loaded");
  detector.detect(display_image,gotResult);
  status_object="true";
  document.getElementById("status").innerHTML="Status : objects are being detected";

}

function gotResult(error,results){
  
  if(error){
    console.error(error);
  }
  else {
    console.log(results);
    objects=results;
  }
  
}

