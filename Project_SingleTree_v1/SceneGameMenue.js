class SceneMenue extends Phaser.Scene {
            constructor(){
                super({ key: 'sceneMenue' });
            }
            preload (){
                console.log('menues are loading')
            }
            create ()
            {
                console.log("menues were loaded")
                this.scene.start('sceneGameOn');
            }
        }