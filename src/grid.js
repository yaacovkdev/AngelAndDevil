//default canvas size
const CANVSIZEX = 800, CANVSIZEY = 800;

const gridinfo = {
    linesize: 2,
    grids: 21,
    cellsize: 0,
};

//init increment
function initGrid(){
    gridinfo.cellsize = int(CANVSIZEX/gridinfo.grids);
}

function toPos(x, y){
    x = int(x / gridinfo.cellsize);
    y = int(y / gridinfo.cellsize);
    return {x,y};
}

function checkRange(x,y){
    if (x > gridinfo.grids-1 || x < 0 || y > gridinfo.grids-1 || y < 0){
        return false;
    }
    return true;
}

function isClear(x,y){
    if(x == Angel.x && y == Angel.y) return false;
    if(includeSub(Filled, [x,y])) return false;
    return true;
}

function inPerimiter(pos){
    for(var i = 0; i < gridinfo.grids-1; i++){
        if(arrayEqual(pos, [i,0]) || arrayEqual(pos, [i,gridinfo.grids-1]) 
        || arrayEqual(pos, [0,i]) || arrayEqual(pos, [gridinfo.grids-1,i])){
            return true;
        }
    }
    return false;
}

AngelPosMode = {
    topleft: 0,
    middle: 1
};

function initAngel(mode){
    switch(mode){
        case AngelPosMode.topleft:
            Angel.x = 0;
            Angel.y = 0;
            Angel.gx = -int(gridinfo.grids/2);
            Angel.gy = -int(gridinfo.grids/2);
            break;
        case AngelPosMode.middle:
            Angel.x = int(gridinfo.grids/2);
            Angel.y = int(gridinfo.grids/2);
            Angel.gx = 0;
            Angel.gy = 0;
            Offset.x = -int(gridinfo.grids/2);
            Offset.y = -int(gridinfo.grids/2);
            break;
    }
}