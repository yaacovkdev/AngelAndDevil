devilTurn = false;
function mousePressed(){
    if(checkTrapped()){
        print("Game Over");    
        return;
    }
    if(!mouseBound(mouseX, mouseY)) return;

    var gridpos = toPos(mouseX, mouseY);

    if(!moveCondition(gridpos.x, gridpos.y)) return;
    
    //change it's location

    if(devilTurn){
        Filled.push(toGlobal(gridpos.x,gridpos.y));
    } else {
        modifyGlobal(gridpos.x, gridpos.y);
        Offset.x = Angel.gx;
        Offset.y = Angel.gy;
        //Angel.x = gridpos.x;
        //Angel.y = gridpos.y;
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
    //-----------------------------------
    //check this one debug\
    //print('also check this:' , x-10 + Offset.x, 10-y+Offset.y);
    //if(includeSub(Filled, [x-10 + Offset.x, 10-y+Offset.y])){
    //    print('clicked on the devil')
    //}
    //-----------------------------------

    //if clicked on the Angel
    if(x == Angel.x && y == Angel.y) return false;

    //if clicked outside the grid
    if((Math.abs(x-Angel.x) > 1 || Math.abs(y-Angel.y) > 1) && !devilTurn) return false;
    
    //if clicked on the devil locations
    //Note: Probably Needs to have alternative method of searching through
    if(includeSub(Filled, toGlobal(x,y))){
        return false;
    }
    return true;
}

function modifyGlobal(x,y){
    Angel.gx += (x - Angel.x);
    Angel.gy -= (y - Angel.y);
}

//conversion from global position to local (Mostly rendering use)
function toLocal(x,y){
    var centre = int(gridinfo.grids/2);
    
    //0,0 become 10,10 at no displacement
    //-5,5 become 5,5 at no displacement
    //-1,1 become 9,9 at no displacement
    //1,1 become 11,9

    //through vector arithmetic the formula for conversion is x_local = x + 10, y_local = 10 - y (y + 10 - 2y)
    return [x+centre,centre-y];
}

function toGlobal(x,y){
    var centre = int(gridinfo.grids/2);
    return [x-centre+Offset.x,centre-y+Offset.y];
}

function checkTrapped(){
    count = 0;
    for (var i in surround){
        if(includeSub(Filled, [Angel.gx+ surround[i][0], Angel.gy+ surround[i][1]])){
            count++;
        }
    }
    if(count == 8) return true;
    return false;
}