var rain = {}
class SceneGameOn extends Phaser.Scene {
    constructor(){
        super({ key: 'sceneGameOn' });
    }
    preload() {
        console.log('game is loading')
        this.load.image('raindrop', 'rain-clipart-rain_drop_2_CROP.png');
        this.load.image('rainripple', 'Blue_circle_for_diabetes_svg_CROP.png');
    }
    create() {
        console.log("game has loaded")
        var scene_obj = this;
        var graphics = this.add.graphics({ fillStyle: { color: 0x153CE2 } });
        graphics.fillRect(0,HEIGHT-HEIGHT*0.33,WIDTH,HEIGHT*0.33);
        for(var i=100; i>0; i--){
            var name_it_drop = 'raindrop'+i.toString();
            var name_it_ripple = 'ripple'+i.toString();
            rain[name_it_drop] = scene_obj.add.sprite(WIDTH*Math.random(), HEIGHT*Math.random(), 'raindrop');
            rain[name_it_drop].name = name_it_drop
            rain[name_it_drop].size_me = 0.1+0.4*Math.random()
            rain[name_it_drop].setScale(rain[name_it_drop].size_me)
            if(rain[name_it_drop].size_me>0.3){
                rain[name_it_ripple] = scene_obj.add.sprite(rain[name_it_drop].x, 100, 'rainripple');
                rain[name_it_ripple].counter = 0
                rain[name_it_ripple].name = name_it_ripple
                rain[name_it_drop].name_of_ripple = name_it_ripple
                rain[name_it_ripple].name_of_drop = name_it_drop
            }  
        }
        //console.log(rain)
    }
    update(time, delta){
        var scene_obj = this;
        handleRain(delta)
        
    }
}


function handleRain(delta) {
    for (var obj in rain){
        //NEED TO CHECK FOR WHETHER ITS A DROP OR RIPPLE HERE FIRST !!!
        var extra_travel_distance = (HEIGHT-HEIGHT*0.33)+(HEIGHT*0.33)*(rain[obj].size_me*2)
        if(rain[obj].y>extra_travel_distance){
            if(rain[obj].name_of_ripple!=null){
                //rain[rain[obj].name_of_ripple].y = 300
                console.log(rain[rain[obj].name_of_ripple])
            }
            rain[obj].y = 0
        }
        rain[obj].y+=40/delta*(rain[obj].size_me)
    }
}