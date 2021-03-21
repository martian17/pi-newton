var field = BODY.add("div");
var canvas = BODY.add("canvas").e;

var pause = function(t){
    return new Promise((res,rej)=>{
        setTimeout(()=>{
            res();
        },t);
    });
}

var Subtitle = function(){
    
}


/*
Ok here's the script for the tutorial
//first slide

First use the Taylor series around x=0 to approximate sin
(fade in to right animation from top to bottom)
sin(x) = sin(x)     sin(0) = 0     \
sin'(x) = cos(x)    sin'(0) = 1    | period: 4
sin''(x) = -sin(x)  sin''(0) = 0   |
sin'''(x) = -cos(x) sin'''(0) = -1 /
sin''''(x) = sin(x) sin''''(0) = 0 

(numbers move to form the taylor series)
sin(x) = 0*x^0/0!+1*x^1/1!+0*x^2/2!-1*x^3/3!+0*x^4/4! ...
(simplify animation) 
sin(x) = x^1/1!-x^3/3!+x^5/5!+x^7/7! ...

(draw a graph of approximated sin down there meanwhile)
(progressively approximating to approach sin)

Then use Newton's approximation to estimate pi
Closer to the origin the better the approximation
That's why I didn't use sin(pi) = 0
Instead I'm using sin(pi/6) = 1/2

(do an animation on screen starting from x=0)
(meanwhile down in the screen pi is ticking)

then finally show the gui to calculate pi


//second slide


*/


var vw = window.innerWidth/100;
var vh = window.innerHeight/100;

var context = {
    fontSize:4*vw,
    fontFamily:"Arial"
};

var AnimationContext = function(field){
    this.fontSize = 4*vw;
    this.fontFamily = "Arial";
    this.appearance = "one-by-one";
    this.delay = 100;//100ms
    var that = this;
    
    var queue = [];
    var popQueue = function(){
        var q = queue[0];
        queue = queue.splice(1);
        return q;
    };
    this.sub = function(x,y,content){
        if(queue.length === 0){
            executionLoop();
        }
        queue.push([x,y,content]);
    };
    var executionLoop = function(){
        if(queue.length === 0){
            return false;
        }
        var [x,y,content] = popQueue();
        executeSub(x,y,content);
        setTimeout(executionLoop,that.delay);
    };
    
    var executeSub = function(x,y,content){
        field.add("div",false,"class:sub");
        if(that.appearance === "one-by-one"){
            field
        }else if(that.appearance === "fade-in"){
            
        }
    };
    
    
    this.wait = function(){
        
    }
};

var ct = new AnimationContext(field);


var main = async function(){
    //first do the taytay's series
    ct.appearance = "one-by-one";
    ct.fontSize = 4*vw;sin''''(0) = 0
    ct.sub(0,0,"First use the Taylor series around x=0 to approximate sin");
    ct.appearance = "fade-in";
    ct.delay = 100;//100ms
    ct.sub(0,5 *vw,"sin(x) = sin(x)");
    ct.sub(0,10*vw,"sin'(x) = cos(x)");
    ct.sub(0,15*vw,"sin''(x) = -sin(x)");
    ct.sub(0,20*vw,"sin'''(x) = -cos(x)");
    ct.sub(0,25*vw,"sin''''(x) = sin(x)");
    
    ct.sub(40*vw,5 *vw,"sin(0) = 0");
    ct.sub(40*vw,10*vw,"sin'(0) = 1");
    ct.sub(40*vw,15*vw,"sin''(0) = 0");
    ct.sub(40*vw,20*vw,"sin'''(0) = -1");
    ct.sub(40*vw,25*vw,"sin''''(0) = 0");
    await ct.wait();
    
}