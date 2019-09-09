var forest
class SceneGameOn extends Phaser.Scene {
    constructor(){
        super({ key: 'sceneGameOn' });
    }
    preload() {
        console.log('game is loading')
                // Load sprite sheet generated with TexturePacker
                this.load.atlas('sprites', 'avoid_sprites.png', 'avoid_sprites.json');
                // Load body shapes from JSON file generated using PhysicsEditor
                this.load.json('hitboxes', 'avoid_hitboxes.json');
            }
            create() {
                console.log("game has loaded")
                var scene_obj = this;
                this.matter.world.setBounds(0, 0, game.config.width, game.config.height);
                forest = new ForestGenerator(scene_obj,'forest_normal').makeForest(1)
            }
            update(time, delta){
                for(var tree in forest){
                    forest[tree].startTreeLifeCycle_v1()
                }
                var scene_obj = this;
            }
        }