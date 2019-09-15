var forest
class SceneForestv1 extends Phaser.Scene {
    constructor(){
        super({ key: 'sceneGameOn' });
    }
    preload() {
        console.log('game preload')
            }
    create() {
        console.log("game create")
        var scene_obj = this;
        forest = new ForestGenerator(scene_obj,'forest_normal').makeForest(1)
    }
    update(time, delta){
        for(var tree in forest){
            forest[tree].startTreeLifeCycle_v1()
        }
    }
}