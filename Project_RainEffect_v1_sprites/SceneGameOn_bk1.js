var raindrops = {}
var rainripples = {}
class SceneGameOn extends Phaser.Scene {
    constructor(){
        super({ key: 'sceneGameOn' });
    }
    preload() {
        console.log('game is loading')
                // Load body shapes from images
                this.load.image('raindrop', 'rain-clipart-rain_drop_2_CROP.png');
                this.load.image('rainripple', 'Blue_circle_for_diabetes_svg_CROP.jpg');
            }
            create() {
                console.log("game has loaded")
                var scene_obj = this;
                var graphics = this.add.graphics({ fillStyle: { color: 0x153CE2 } });
                graphics.fillRect(0,HEIGHT-HEIGHT*0.33,WIDTH,HEIGHT*0.33);
                for(var i=100; i>0; i--){
                    var name_it = 'raindrop'+i.toString();
                    var name_it_2 = 'ripple'+i.toString();
                    raindrops[name_it] = scene_obj.add.sprite(WIDTH*Math.random(), HEIGHT*Math.random(), 'raindrop');
                    raindrops[name_it].size_me = 0.1+0.4*Math.random()
                    raindrops[name_it].setScale(raindrops[name_it].size_me)
                    if(raindrops[name_it].size_me>0.3){
                        rainripples[name_it_2] = scene_obj.add.sprite(raindrops[name_it].x, -50, 'rainripple');
                    }
                    //s.rotation = -0.33;   
                }
                console.log(raindrops)
                console.log(rainripples)
            }
            update(time, delta){
                var scene_obj = this;  
                for (var obj in raindrops){
                    var extra_travel_distance = (HEIGHT-HEIGHT*0.33)+(HEIGHT*0.33)*(raindrops[obj].size_me*2)
                    if(raindrops[obj].y>extra_travel_distance){
                        var index = Object.keys(raindrops).indexOf(obj)+1;
                        console.log(index)
                        var name_it_2 = 'ripple'+index.toString()
                        if(rainripples[name_it_2]!=null){
                            rainripples[name_it_2].y = raindrops[obj].y
                        }
                        raindrops[obj].y = 0
                    }
                    raindrops[obj].y+=40/delta*(raindrops[obj].size_me)
                }
            }
        }