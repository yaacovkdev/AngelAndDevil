let lostcondition = false;
function mousePressed(){
    if(!mouseBound(mouseX, mouseY)) return;
    
    var gridpos = toPos(mouseX, mouseY);

    if(!moveCondition(gridpos.x, gridpos.y)) return;
    
    //change it's location
    Filled.push([gridpos.x, gridpos.y]);
    basicSearchMove();
    redraw();
}

function mouseBound(x,y){
    if(x < 0 || y < 0 || x >= CANVSIZEX-2 || y >= CANVSIZEY-2){
        return false;
    }
    return true;
}


function moveBound(x,y){
    if(x < 0 || y < 0 || x >= gridinfo.grids || y >= gridinfo.grids) return false;
    return true;
}

function moveCondition(x,y){
    if(x == Angel.x && y == Angel.y) return false;

    if(includeSub(Filled, [x,y])) return false;
    return true;
}