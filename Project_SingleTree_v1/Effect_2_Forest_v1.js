    //////
    //EFFECT TWO START
    //////
    class ForestGenerator{
        constructor(scene_obj, tree_config){
            this.trees = {}
            this.scene_obj = scene_obj 
            this.tree_config = tree_config 
            this.setTreeConfig(tree_config);         
        }
        setTreeConfig(tree_config){
            var this_forest = this;
            switch(tree_config){
                case 'forest_normal':
                this_forest.tree_config = forest_normal
                break;
                case 'another_one':
                //do something
                break
                default:
                this_forest.tree_config = forest_normal
            }
        }
        makeForest(num_trees){
            var this_forest = this;
            for(var i = num_trees; i > 0; i--){
                var name_it = 'tree_'+i.toString();
                this_forest.trees[name_it] = new TreeGenerator(this_forest.scene_obj, this_forest.tree_config)
            }
            return this.trees
        }
    }

    
    class TreeGenerator{
        constructor(scene_obj, config){
        // Initialize the scene_obj
        this.scene_obj = scene_obj 
        this.tree_obj = scene_obj.add.graphics()
        this.alive=false
        // Generation intervals
        this.intervals = {
            generation: null,
            fading: null
        }
        this.loss = config.loss
        this.minSleep= config.minSleep
        this.branchLoss= config.branchLoss
        this.mainLoss= config.mainLoss
        this.speed= config.speed
        this.newBranch= config.newBranch
        this.fastMode= config.fastMode
        this.fadeOut= config.fadeOut
        this.fadeAmount= config.fadeAmount
        this.fadeInterval= config.fadeInterval
        this.initialWidth= config.initialWidth
        this.x = config.x 
        this.y = config.y       
        this.new_colour= config.new_colour
    }
    startTreeLifeCycle_v1(){
        var this_tree = this;
        if(!this_tree.alive){
            this_tree.alive=true
            this_tree.startGeneration(0,250);
            this_tree.stopGeneration(3000);
            if(this_tree.fadeOut){
                this_tree.startFadeOut(6000,250);
                this_tree.clearTree(9000);    
            }   
        }
        
    }
    startGeneration(duration_timeout, duration_interval){
        var this_tree = this;
        setTimeout(function(){
            this_tree.branch(this_tree.x, this_tree.y, 0, -3, this_tree.initialWidth, 0, 0, this_tree.new_colour);
            this_tree.intervals.generation = setInterval(function () {
                this_tree.branch(this_tree.x,this_tree.heigth,0,-Math.random() * 3,this_tree.initialWidth * Math.random(), 30,0,this_tree.new_colour);
            }, duration_interval, this_tree);
        }, duration_timeout, duration_interval, this_tree)
    }
    stopGeneration(duration_timeout){
        var this_tree = this;
        setTimeout(function(){
            clearInterval(this_tree.intervals.generation);
        },duration_timeout,this_tree)   
    }
    startFadeOut(duration_timeout, duration_interval){
        var this_tree = this;
        setTimeout(function(){
            this_tree.intervals.fading = setInterval(function () {
                this_tree.tree_obj.alpha -= this_tree.fadeAmount
            },duration_interval, this_tree);
        }, duration_timeout, duration_interval, this_tree)
    }
    clearTree(duration_timeout){
        var this_tree = this;
        setTimeout(function(){
            clearInterval(this_tree.intervals.fading);
            this_tree.tree_obj.clear(this_tree)
            this_tree.alive = false;
            this_tree.tree_obj.alpha = 1;
        },duration_timeout,this_tree)
    }
    branch(x, y, dx, dy, w, growthRate, lifetime, branchColor){
        var this_tree = this;
        this_tree.tree_obj.lineStyle(w - lifetime * this_tree.loss, this_tree.new_colour);
        this_tree.tree_obj.beginPath();
        this_tree.tree_obj.moveTo(x, y);
        if (this_tree.fastMode) growthRate *= 0.5;
        // Calculate new coords
        x = x + dx;
        y = y + dy;
        // Change dir
        dx = dx + Math.sin(Math.random() + lifetime) * this_tree.speed;
        dy = dy + Math.cos(Math.random() + lifetime) * this_tree.speed;
        // Check if branches are getting too low
        if (w < 6 && y > this_tree.heigth - Math.random() * (0.3 * this_tree.heigth)) w = w * 0.8;
        // Draw the next segment of the branch
        this_tree.tree_obj.strokeStyle = this_tree.treeColor;
        this_tree.tree_obj.lineTo(x, y);
        this_tree.tree_obj.strokePath();
        // Generate new branches
        // they should spawn after a certain lifetime has been met, although depending on the width
        if (lifetime > 5 * w + Math.random() * 100 && Math.random() > this_tree.newBranch) {
            setTimeout(function () {
                // Indicate the birth of a new branch
                if (this_tree.indicateNewBranch) {
                    circle(this_tree.scene_obj, x, y, w, this_tree.treeColor);
                }
                this_tree.branch(x, y, 2 * Math.sin(Math.random() + lifetime), 2 * Math.cos(Math.random() + lifetime), (w - lifetime * this_tree.loss) * this_tree.branchLoss, growthRate + Math.random() * 100, 0, branchColor);
                // When it branches, it looses a bit of width
                w *= this_tree.mainLoss;
            }, 2 * growthRate * Math.random() + this_tree.minSleep);
        }
        // Continue the branch
        if (w - lifetime * this_tree.loss >= 1) setTimeout(function () {
            this_tree.branch(x, y, dx, dy, w, growthRate, ++lifetime, branchColor);
        }, growthRate);
    }
    fade(){
        var this_tree = this;
        this_tree.tree_obj.alpha -= 0.02
        if (this_tree.tree_obj.alpha<0.1) this_tree.tree_obj.clear(this_tree);
    }
}    
var forest_normal = {
    loss:0.03, // Width loss per cycle
    minSleep: 10, // Min sleep time (For the animation)
    branchLoss: 0.8, // % width maintained for branches
    mainLoss: 0.8, // % width maintained after branching
    speed: 0.3, // Movement speed
    newBranch: 0.8, // Chance of not starting a new branch
    fastMode: true, // Fast growth mode
    fadeOut: true, // Fade slowly to black
    fadeAmount: 0.05, // How much per iteration
    fadeInterval: 250, // Fade interval in ms
    initialWidth: 10, // Initial branch width
    x: 200+Math.random()*600, 
    y: 500,      
    new_colour: newRandomColour()
}

//////
//EFFECT TWO END
//////