class J_Sprite extends Phaser.Physics.Matter.World {
    constructor(object_scene, name_sprite){
        super({
            scene:object_scene
        });
        this.scene = object_scene;
        this.name_it = name_sprite;
        this.sprite_j = {};
        this.world = object_scene.matter.world;
        this.x = game.config.width*0.5;
        this.y = game.config.height*0.5-100;
        this.texture='sprites';
        this.frame= name_sprite.toString()+'.png';
        this.options={shape: hitboxes[name_sprite]};
    }
    addMe(num){
        for(var i=num; i > 0; i--){
            var name_it = this.name_it+'_'+i.toString()
            this.sprite_j[name_it] = this.scene.matter.add.sprite(this.x,this.y,this.texture,this.frame,this.options);
            this.sprite_j[name_it].name = name_it
        }            
        return this.sprite_j;
    }
}