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
    drawEnt();
    noLoop();
}

function draw(){
    background(240);
    drawObs();
    drawGrid();
    drawEnt();
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

    //Angel UI
    fill(color('lightgray'));
   
    for (var i in surround){
        if(!checkRange(Angel.x + surround[i][0], Angel.y + surround[i][1])) continue;
        
        if(includeSub(Filled, [Angel.gx + surround[i][0], Angel.gy + surround[i][1]])) continue;
        
        //draw around local position of the angel
        var x = ((Angel.x + surround[i][0]) * gridinfo.increment) + gridinfo.increment/2 + 1;
        var y = ((Angel.y - surround[i][1]) * gridinfo.increment) + gridinfo.increment/2 + 1;
        circle(x, y, gridinfo.increment/3);
    }
    pop();
}

function drawObs(){
    push();
    noStroke();
    fill(color('red'));
    
    for(var i in Filled){
        var localpos = toLocal(Filled[i][0], Filled[i][1]);
        rect(gridinfo.increment * (localpos[0]-Offset.x) , gridinfo.increment * (localpos[1]+Offset.y),
         gridinfo.increment, gridinfo.increment);
    }
    pop();
}