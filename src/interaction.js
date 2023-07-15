devilTurn = false;
function mousePressed(){

    if(!mouseBound(mouseX, mouseY)) return;

    var gridpos = toPos(mouseX, mouseY);

    if(!moveCondition(gridpos.x, gridpos.y)) return;
    
    //change it's location

    if(devilTurn){
        Filled.push([gridpos.x-Offset.x, gridpos.y-Offset.y]);
    } else {
        modifyGlobal(gridpos.x, gridpos.y);
        //Angel.x = gridpos.x;
        //Angel.y = gridpos.y;
        Offset.x = gridpos.x - Angel.x;
        Offset.y = gridpos.y - Angel.y;
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

    //if clicked on the Angel
    if(x == Angel.x && y == Angel.y) return false;


    if((Math.abs(x-Angel.x) > 1 || Math.abs(y-Angel.y) > 1) && !devilTurn) return false;
    
    //if clicked on the devil locations
    if(includeSub(Filled, [x+Offset.x,y+Offset.y])) return false;

    return true;
}