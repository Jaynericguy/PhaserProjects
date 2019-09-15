class Point {
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}
function newTarget(sprite){
    sprite.target = new Point(Math.random()*500, Math.random()*500);
}; 
function updateMe(sprite, delta){
    //Point the object at its target
    var dx = sprite.target.x - sprite.x;
    var dy = sprite.target.y - sprite.y;
    var angle = Math.atan2(dy, dx);
    sprite.rotation = angle
    //move the object in the direction its facing
    sprite.x = sprite.x+Math.cos(sprite.rotation)*delta/8
    sprite.y = sprite.y+Math.sin(sprite.rotation)*delta/8
    //calculate the distance to the target
    var hyp = Math.sqrt((dx*dx)+(dy*dy))
    //if the hyp is less then 5 pixels pick a new target
    if (hyp < 5){
        newTarget(sprite)
    }
}
function mouseTarget(scene_obj, sprite){
    scene_obj.input.manager.enabled = true;
    scene_obj.input.once('pointerdown', function (event) {
        sprite.target = new Point(game.input.mousePointer.x,game.input.mousePointer.y)
    }, this);    
}
function moveToMouse(sprite, delta){
    //Point the object at its target
    var dx =  sprite.target.x - sprite.x;
    var dy = sprite.target.y - sprite.y;
    var angle = Math.atan2(dy, dx);
    sprite.rotation = angle
    //move the object in the direction its facing
    //calculate the distance to the target
    var hyp = Math.sqrt((dx*dx)+(dy*dy))
    //if the hyp is less then 5 pixels pick a new target
    if (hyp > 5){
        sprite.x = sprite.x+Math.cos(sprite.rotation)*delta/8
        sprite.y = sprite.y+Math.sin(sprite.rotation)*delta/8
    }
    
};
function toDegrees (angle) {
  return angle * (180 / Math.PI);
}

function toRadians (angle) {
  return angle * (Math.PI / 180);
}

function pointOnCircle(center_x, center_y, angle_degrees, radius) {
    var x = center_x + Math.cos(toRadians(angle_degrees)) * radius;
    var y = center_y + Math.sin(toRadians(angle_degrees)) * radius;
    var point = new Point(x,y)
    return point
}

function positionInCircle(elements_obj, x, y, radius) {
    //elements_obj in an js object full of objects
    var length_elements_obj = Object.keys(elements_obj).length
    var angle_interval = 360/length_elements_obj
    for(var element in elements_obj){
        var index = Object.keys(elements_obj).indexOf(element);
        //every element in elements_obj has a rotation now
        pointOnCircle(x,y,index*angle_interval,radius)
    }
}
function newRandomColour(){
    return parseInt('0x' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6))
}
