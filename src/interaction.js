devilTurn = false;
function mousePressed(){

    if(!mouseBound(mouseX, mouseY)) return;

    var gridpos = toPos(mouseX, mouseY);

    if(!moveCondition(gridpos.x, gridpos.y)) return;
    
    //change it's location

    if(devilTurn){
        Filled.push([gridpos.x, gridpos.y]);
    } else {
        modifyGlobal(gridpos.x, gridpos.y);
        Offset.x = -Angel.gx;
        Offset.y = Angel.gy;
        //Angel.x = gridpos.x;
        //Angel.y = gridpos.y;
        
    }
    //devilTurn = !devilTurn;
    redraw();
}

function mouseBound(x,y){
    if(x < 0 || y < 0 || x > CANVSIZEX || y > CANVSIZEY){
        return false;
    }
    return true;
}

function moveCondition(x,y){

    //if clicked on the Angel
    if(x == Angel.x && y == Angel.y) return false;

    //if clicked outside the grid
    if((Math.abs(x-Angel.x) > 1 || Math.abs(y-Angel.y) > 1) && !devilTurn) return false;
    
    //if clicked on the devil locations
    //BROKEN
    if(includeSub(Filled, [x-Offset.x, y-Offset.y])) return false;

    return true;
}

function modifyGlobal(x,y){
    Angel.gx += (x - Angel.x);
    Angel.gy -= (y - Angel.y);
}