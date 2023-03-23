function setup(){
    var Canv;
    sizeMode();
    initGrid();
    Canv = createCanvas(CANVSIZEX, CANVSIZEY+MENU);
    Canv.parent("canvdiv0");
    Canv.style("display:block; position:absolute; left: 0; right: 0; margin: auto; ")
    background(240);
    smooth();
    
    initAngel(AngelPosMode.middle);
    
    drawGrid();
    angelDepthFirst();
    drawEnt();
    noLoop();
}

function draw(){
    background(240);
    drawObs();
    //drawDebug();
    drawGrid();
    drawEnt();

    if(lostcondition){
        drawLost();
    } else if (wincondition){
        drawWin();
    }
}

function drawGrid(){
    push();
    strokeWeight(gridinfo.size);
    stroke(color(60));
    
    //vertical lines
    for(var i = 1; i < CANVSIZEX; i+= gridinfo.increment){
        line(i, 0, i, CANVSIZEX-1);
    }
    //line(CANVSIZEX-1, 0, CANVSIZEX, CANVSIZEX);
    //horiz lines
    for(var i = 1; i < CANVSIZEY; i+= gridinfo.increment){
        line(0, i, CANVSIZEY-1, i);
    }
    pop();
}

function drawEnt(){
    push();
    noStroke();

    //Angel
    fill(color('gold'));
    var cx = (Angel.x * gridinfo.increment) + gridinfo.increment/2 +1;
    var cy = (Angel.y * gridinfo.increment) + gridinfo.increment/2 +1;
    circle(cx, cy, gridinfo.increment-2);


    
    pop();
}

function drawObs(){
    push();
    noStroke();
    fill(color('red'));
    for(var i in Filled){
        rect(gridinfo.increment * Filled[i][0] , gridinfo.increment * Filled[i][1],
         gridinfo.increment, gridinfo.increment);
    }
    pop();
}

function drawLost(){
    push();
    textSize(CANVSIZEX/10);
    fill(color('pink'));
    textAlign(CENTER);
    text('Angel Trapped', CANVSIZEX/2,CANVSIZEY/2);
    pop();
}

function drawWin(){
    push();
    textSize(CANVSIZEX/10);
    fill(color('pink'));
    textAlign(CENTER);
    text('Angel Escaped', CANVSIZEX/2,CANVSIZEY/2);
    pop();
}