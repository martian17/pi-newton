var field = BODY.add("div",);
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
    this.OneByOneDelay = 20;
    var that = this;
    
    var queue = [];
    var popQueue = function(){
        var q = queue[0];
        queue = queue.splice(1);
        return q;
    };
    this.sub = function(x,y,content){
        var arr = [];
        queue.push([x,y,content,that.fontSize,that.fontFamily,that.appearance,that.OneByOneDelay,arr]);
        if(queue.length === 1){
            console.log("hi there");
            setTimeout(executionLoop,0);
        }
        return arr;
    };
    var executionLoop = function(){
        if(queue.length === 0){
            that.resolveWait();
            that.resolveWait = ()=>{};
            return false;
        }
        var [x,y,content,fontSize,fontFamily,appearance,OneByOneDelay,arr] = popQueue();
        //console.log([x,y,content,fontSize,fontFamily,appearance]);
        executeSub(x,y,content,fontSize,fontFamily,appearance,OneByOneDelay,arr);
        setTimeout(executionLoop,that.delay);
    };
    
    var subs = [];
    
    var executeSub = async function(x,y,content,fontSize,fontFamily,appearance,OneByOneDelay,arr){
        
        var sub = field.add(
            "div",
            "class:sub",false,
            "font-size:"+fontSize+"px;"+
            "font-family:"+fontFamily+";"+
            "left:"+x+"px;"+
            "top:"+y+"px;"
        );
        subs.push(sub);
        arr[0] = sub;
        if(appearance === "one-by-one"){
            for(var i = 0; i < content.length; i++){
                sub.add("span","class:one-by-one",content[i]);
                await pause(OneByOneDelay);
            }
        }else if(appearance === "fade-in"){
            sub.add("span","class:one-by-one",content);
        }else if(appearance === "direct"){
            sub.add("span",false,content);//too lazy reusing code haha
        }
    };
    
    this.fadeAll = function(){
        subs.map((sub)=>{
            sub.e.classList.add("fade-out");
            setTimeout(()=>{
                sub.remove();
            },1000);
        });
    };
    this.fade = function(sub){
        sub = sub[0]
        console.log(sub);
        sub.e.classList.add("fade-out");
        setTimeout(()=>{
            sub.remove();
        },1000);
    }
    
    this.resolveWait = ()=>{};
    
    this.wait = function(){
        return new Promise((res,rej)=>{
            that.resolveWait = res;
        });
    }
};

var ct = new AnimationContext(field);


var main = async function(){
    //first do the taytay's series
    ct.appearance = "one-by-one";
    ct.fontSize = 3*vw;
    ct.OneByOneDelay = 5;
    ct.sub(0,0,"First use the Taylor series around x=0 to approximate sin");
    ct.appearance = "fade-in";
    ct.delay = 50;//100ms
    await pause(1500);
    ct.sub(0,10 *vw,"sin(x) = sin(x)");
    ct.sub(0,15*vw,"sin'(x) = cos(x)");
    ct.sub(0,20*vw,"sin''(x) = -sin(x)");
    ct.sub(0,25*vw,"sin'''(x) = -cos(x)");
    ct.sub(0,30*vw,"sin''''(x) = sin(x)");
    
    ct.sub(30*vw,10 *vw,"sin(0) = 0");
    ct.sub(30*vw,15*vw,"sin'(0) = 1");
    ct.sub(30*vw,20*vw,"sin''(0) = 0");
    ct.sub(30*vw,25*vw,"sin'''(0) = -1");//20 height
    ct.sub(30*vw,30*vw,"sin''''(0) = 0");
    await ct.wait();
    await pause(1000);
    ct.fontSize = 23*vw;
    ct.sub(50*vw,5*vw,"}");
    ct.fontSize = 4*vw;
    ct.sub(60*vw,17*vw,"period: 4");
    console.log("before pause");
    await pause(1000);
    console.log("after pause");
    var s = ct.sub(0,40*vw,
        "sin(x) = 0*<div class=\"divide\"><div><div class=\"power\"><div>x</div><div>0</div></div></div><div>0!</div></div>"+
        "+1*<div class=\"divide\"><div><div class=\"power\"><div>x</div><div>1</div></div></div><div>1!</div></div>"+
        "+0*<div class=\"divide\"><div><div class=\"power\"><div>x</div><div>2</div></div></div><div>2!</div></div>"+
        "-1*<div class=\"divide\"><div><div class=\"power\"><div>x</div><div>3</div></div></div><div>3!</div></div>"+
        "+0*<div class=\"divide\"><div><div class=\"power\"><div>x</div><div>4</div></div></div><div>4!</div></div> ..."
    );
    ct.fontSize = 3*vw;
    ct.appearance = "one-by-one";
    ct.OneByOneDelay = 100;
    ct.sub(0,50*vw,"simplifying...")
    ct.OneByOneDelay = 5;
    ct.appearance = "fade-in";
    ct.fontSize = 4*vw;
    await ct.wait();
    await pause(3000);
    ct.fade(s);
    var s = ct.sub(6,40*vw,
        "sin(x) = <div class=\"divide\"><div><div class=\"power\"><div>x</div><div>1</div></div></div><div>1!</div></div>"+
        "-<div class=\"divide\"><div><div class=\"power\"><div>x</div><div>3</div></div></div><div>3!</div></div>"+
        "+<div class=\"divide\"><div><div class=\"power\"><div>x</div><div>5</div></div></div><div>5!</div></div>"+
        "-<div class=\"divide\"><div><div class=\"power\"><div>x</div><div>7</div></div></div><div>7!</div></div>"+
        "+<div class=\"divide\"><div><div class=\"power\"><div>x</div><div>9</div></div></div><div>9!</div></div> ..."
    );
    await ct.wait();
    await pause(3000);
    ct.fadeAll();
    var s = ct.sub(6,5*vw,
        "sin(x) = <div class=\"divide\"><div><div class=\"power\"><div>x</div><div>1</div></div></div><div>1!</div></div>"+
        "-<div class=\"divide\"><div><div class=\"power\"><div>x</div><div>3</div></div></div><div>3!</div></div>"+
        "+<div class=\"divide\"><div><div class=\"power\"><div>x</div><div>5</div></div></div><div>5!</div></div>"+
        "-<div class=\"divide\"><div><div class=\"power\"><div>x</div><div>7</div></div></div><div>7!</div></div>"+
        "+<div class=\"divide\"><div><div class=\"power\"><div>x</div><div>9</div></div></div><div>9!</div></div> ..."
    );
    await pause(2000);
    ct.appearance = "one-by-one";
    ct.fontSize = 3*vw;
    ct.sub(0,15*vw,"also do the same with cosine");
    await ct.wait();
    ct.appearance = "fade-in";
    ct.fontSize = 4*vw;
    var s = ct.sub(6,20*vw,
        "cos(x) = 1"+
        "-<div class=\"divide\"><div><div class=\"power\"><div>x</div><div>2</div></div></div><div>2!</div></div>"+
        "+<div class=\"divide\"><div><div class=\"power\"><div>x</div><div>4</div></div></div><div>4!</div></div>"+
        "-<div class=\"divide\"><div><div class=\"power\"><div>x</div><div>6</div></div></div><div>6!</div></div>"+
        "+<div class=\"divide\"><div><div class=\"power\"><div>x</div><div>8</div></div></div><div>8!</div></div> ..."
    );
    ct.appearance = "one-by-one";
    ct.fontSize = 3*vw;
    ct.delay = 2000;
    await ct.wait();
    ct.sub(0,30*vw,"Now use this formula as an approximation of sin to calculate pi.");
    ct.sub(0,35*vw,"We'll use the Newton's approximation method here");
    ct.sub(0,40*vw,"For the target point, I choose sin(pi/6)=1/2");
    ct.sub(0,45*vw,"Instead of the simpler sin(pi)=0");
    ct.sub(0,50*vw,"Because the closer to the origin,");
    ct.sub(0,55*vw,"the more accurate is the Tayolor approximation");
    
    //show the canvas with the sin formula
    ct.delay = 1000;
    await ct.wait();
    ct.fontSize = 3*vw;
    ct.appearance = "fade-in";
    var x = 0;
    for(var i = 0; i < 5; i++){
        var s = ct.sub(10*vw,(60+5*i)*vw,"(itr "+i+")PI=<div id=\"display\" style=\"display:inline-block;\">"+x*6+"</div>");
        x = newtonSin(x,1/2);
        await ct.wait();
        //ct.fade(s);
    }
    ct.sub(10*vw,85*vw,"(itr 5)PI=<div id=\"display\" style=\"display:inline-block;\">"+x*6+"</div>");
    
    ct.delay = 1000;
    await ct.wait();
    ct.sub(10*vw,90*vw,"wow 5 iterations in and ran out of the float point range");
    ct.sub(10*vw,95*vw,"This is so blazingly fast!");
    
};

main();

var pow = function(x,p){//inefficient but also a part of the challenge
    //could do a log(n) improvement but nor reasonable with lower constants
    var o = 1;
    for(var i = 0; i < p; i++){
        o *= x;
    }
    return o;
};

var sin = function(x){
    var fact = 1;
    var result = 0;
    for(var i = 0; i < 20; i++){
        result += -((i&1)*2-1)*pow(x,i*2+1)/fact;
        fact*=((i*2)+2)*((i*2)+3);
    }
    return result;
};

var cos = function(x){
    var fact = 2;
    var result = 1;
    for(var i = 0; i < 20; i++){
        result += ((i&1)*2-1)*pow(x,i*2+2)/fact;
        console.log(fact);
        fact*=((i*2)+3)*((i*2)+4);
    }
    return result;
};

var newtonSin = function(x,destination){//destination is the reference y value, in this case 0.5
    return x-(sin(x)-destination)/cos(x);
};