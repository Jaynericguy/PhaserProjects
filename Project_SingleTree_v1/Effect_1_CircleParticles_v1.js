//////
//EFFECT ONE START
//////
var sprite_circle = new Phaser.Geom.Circle(0,0,3);
var graphics_store = {};
var effect_one_count = 50;
var outer_circle_radius = 100;
function graphicsEffectOne_pt_Init(scene_obj, sprite){
        for(var i = effect_one_count; i > 0; i--){
            var name_it = 'particle_'+i.toString();
            graphics_store[name_it] = scene_obj.add.graphics({ fillStyle: { color: 0xff0000 } });
            graphics_store[name_it].fillCircleShape(sprite_circle);
            graphics_store[name_it].x = sprite.x
            graphics_store[name_it].y = sprite.y
            scene_obj.children.bringToTop(sprite);
            graphicsEffectOne_pt_Target(sprite, graphics_store[name_it])
            //Point the object at random point on the outer circle
            var dx = graphics_store[name_it].target.x - graphics_store[name_it].x;
            var dy = graphics_store[name_it].target.y - graphics_store[name_it].y;
            var angle = Math.atan2(dy, dx);
            graphics_store[name_it].rotation = angle
            //calculate the distance to the target
            var hyp = Math.sqrt((dx*dx)+(dy*dy))
            graphics_store[name_it].x = graphics_store[name_it].x+Math.cos(graphics_store[name_it].rotation)*(outer_circle_radius*Math.random())
            graphics_store[name_it].y = graphics_store[name_it].y+Math.sin(graphics_store[name_it].rotation)*(outer_circle_radius*Math.random())
        }
    }
    function graphicsEffectOne_pt_Update(sprite, delta){
        for(var particle in graphics_store){
            //Point the particle at random point on the outer circle
            var dx = graphics_store[particle].target.x - graphics_store[particle].x;
            var dy = graphics_store[particle].target.y - graphics_store[particle].y;
            var angle = Math.atan2(dy, dx);
            graphics_store[particle].rotation = angle
            //calculate the distance to the target
            var hyp = Math.sqrt((dx*dx)+(dy*dy))
            //if the hyp is less then 5 pixels pick a new target
            if (hyp < 5){
                graphics_store[particle].x = sprite.x;
                graphics_store[particle].y = sprite.y;
                graphicsEffectOne_pt_Target(sprite, graphics_store[particle])
            }else{//move the object in the direction its facing
                var speed = 5+Math.random()*8
            graphics_store[particle].x = graphics_store[particle].x+Math.cos(graphics_store[particle].rotation)*delta/speed
            graphics_store[particle].y = graphics_store[particle].y+Math.sin(graphics_store[particle].rotation)*delta/speed
            } 
        }
    }
    function graphicsEffectOne_pt_Target(sprite, particle){
        var random_angle = Math.random()*Math.PI*2;
        var outer_circle_x = sprite.x + Math.cos(random_angle)*outer_circle_radius;
        var outer_circle_y = sprite.y + Math.sin(random_angle)*outer_circle_radius;
        var point = new Point(outer_circle_x, outer_circle_y);
        particle.target = point;
    }  
    //////
    //EFFECT ONE END
    //////