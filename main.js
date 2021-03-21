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

var main = async function(){
    //first do the taytay's series
    context.fontSize = 4*vw;
    sub(0,0,"First use the Taylor series around x=0 to approximate sin");
    context.style = "fade-in"
    sub(0,5 *vw,"sin(x) = sin(x)");
    sub(0,10*vw,"sin'(x) = cos(x)");
    sub(0,15*vw,"sin''(x) = -sin(x)");
    sub(0,20*vw,"sin'''(x) = -cos(x)");
    sub(0,25*vw,"sin''''(x) = sin(x)");
    
    sub(40*vw,5 *vw,"sin(0) = 0");
    sub(40*vw,10*vw,"sin'(0) = 1");
    sub(40*vw,15*vw,"sin''(0) = 0");
    sub(40*vw,20*vw,"sin'''(0) = -1");
    sub(40*vw,25*vw,"sin''''(0) = 0");
}