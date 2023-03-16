function mousePressed(){
    if(!mouseBound(mouseX, mouseY)) return;

    var gridpos = toPos(mouseX, mouseY);

    if(!moveCondition(gridpos.x, gridpos.y)) return;

    
    //change it's location
    modifyGlobal(gridpos.x, gridpos.y);
    Angel.x = gridpos.x;
    Angel.y = gridpos.y;
    fillRandomGrid();
    redraw();
}

function mouseBound(x,y){
    if(x < 0 || y < 0 || x > CANVSIZEX || y > CANVSIZEY){
        return false;
    }
    return true;
}

function moveCondition(x,y){
    if(x == Angel.x && y == Angel.y) return false;
    if(Math.abs(x-Angel.x) > 1 || Math.abs(y-Angel.y) > 1) return false;
    return true;
}

function fillRandomGrid(){
    var x = int(Math.random() * gridinfo.grids);
    var y = int(Math.random() * gridinfo.grids);
    Filled.push([x,y]);
}