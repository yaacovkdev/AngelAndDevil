function setup(){
    var Canv;
    initGrid();
    Canv = createCanvas(CANVSIZEX, CANVSIZEY);
    Canv.parent("canvdiv0");
    background(240);
    smooth();
    
    initAngel(AngelPosMode.middle);
    
    drawGrid();
    drawEnt();
    noLoop();
}

function draw(){
    background(240);
    drawObs();
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
    strokeWeight(gridinfo.linesize);
    stroke(color(60));
    
    //vertical lines
    for(var i = 1; i < CANVSIZEX; i+= gridinfo.cellsize){
        line(i, 0, i, CANVSIZEX-1);
    }
    //line(CANVSIZEX-1, 0, CANVSIZEX, CANVSIZEX);
    //horiz lines
    for(var i = 1; i < CANVSIZEY; i+= gridinfo.cellsize){
        line(0, i, CANVSIZEY-1, i);
    }
    pop();
}

function drawEnt(){
    push();
    noStroke();

    //Angel
    fill(color('gold'));
    var cx = (Angel.x * gridinfo.cellsize) + gridinfo.cellsize/2 +1;
    var cy = (Angel.y * gridinfo.cellsize) + gridinfo.cellsize/2 +1;
    circle(cx, cy, gridinfo.cellsize-2);

    pop();
}

function drawObs(){
    push();
    noStroke();
    fill(color('red'));
    for(var i in Filled){
        rect(gridinfo.cellsize * Filled[i][0] , gridinfo.cellsize * Filled[i][1],
         gridinfo.cellsize, gridinfo.cellsize);
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