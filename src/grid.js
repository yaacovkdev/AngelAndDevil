//default canvas size
let CANVSIZEX = 960, CANVSIZEY = 960, MENU = 0;

let gridinfo = {
    size: 2,
    grids: 25,
    increment: 0,
};

let surround = [[-1,1], [0,1], [1,1],
                [-1,0],      , [1,0],
                [-1,-1],[0,-1],[1,-1]];

//CANVSIZEX and CANVSIZEY may have been altered during setup stage in render.js
function initGrid(){
    gridinfo.increment = int(CANVSIZEX/gridinfo.grids);
    CANVSIZEX = gridinfo.increment * gridinfo.grids+gridinfo.size;
    CANVSIZEY = gridinfo.increment * gridinfo.grids+gridinfo.size;
    MENU = int(CANVSIZEY / 8);
}

function toPos(x, y){
    x = int(x / gridinfo.increment);
    y = int(y / gridinfo.increment);
    return {x,y};
}

function checkRange(x,y){
    if (x >= gridinfo.grids || x < 0 || y >= gridinfo.grids || y < 0){
        return false;
    }
    return true;
}

function sizeMode(){
    if(windowWidth < 960*1.25 || windowHeight < 960*1.25){
        CANVSIZEX = 800, CANVSIZEY = 800;
    } else {
        CANVSIZEX = Math.min(windowWidth, windowHeight)-250;
        CANVSIZEY = CANVSIZEX;
    }
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