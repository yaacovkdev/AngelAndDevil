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
        Angel.x = gridpos.x;
        Angel.y = gridpos.y;
    }
    devilTurn = !devilTurn;
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

    if((Math.abs(x-Angel.x) > 1 || Math.abs(y-Angel.y) > 1) && !devilTurn) return false;
    if(includeSub(Filled, [x,y])) return false;
    return true;
}