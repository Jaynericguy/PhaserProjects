class SceneGameOver extends Phaser.Scene {
            constructor(){
                super({ key: 'sceneGameOver' });
                }
            preload(){
                }
            create(){
                var scene_obj = this;
                reds = new J_Sprite(scene_obj, 'red').addMe(1);
                reds.red_1.x = 25
                reds.red_1.y = 25
                reds.red_1.setInteractive();
                reds.red_1.on('pointerup', function (event) {
                    this.input.manager.enabled = true;
                    this.scene.start('sceneGameOn');
                        }, this);
                }
            } 