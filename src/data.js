//the memory of map
//x for local pos gx for global x pos

let Offset = {
    x: 0,
    y: 0
}

let Angel = {
    x: 0,
    y: 0,
    gx: 0,
    gy: 0
}

let Devil = {
    x: 0,
    y: 0,
    gx: 0,
    gy: 0
}

let Filled = [
    [5,5]
];

function modifyGlobal(x,y){
    Angel.gx += (x - Angel.x);
    Angel.gy += (y - Angel.y);
}