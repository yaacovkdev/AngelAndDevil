function randomAngelMove(){
    var i = int(Math.random() * 8);
    
    var direction = angelFindCirc(surround[i], i);
    if(arrayEqual(direction, [0,0])){
        lostcondition = true;
        return;
    }
    
    Angel.x += direction[0];
    Angel.y += direction[1];
}

function orderedSearchMove(){
    var i = 1;
    
    var direction = angelFindCirc(surround[i], i);
    if(arrayEqual(direction, [0,0])){
        lostcondition = true;
        return;
    }
    
    Angel.x += direction[0];
    Angel.y += direction[1];
}

function basicSearchMove(){
    var testgoal = [Angel.x,0];
    var direction = [0,0];

    

    direction = angelFindCirc(direction,0);
    if(arrayEqual(direction, [0,0])){
        lostcondition = true;
        return;
    }
    Angel.x += direction[0];
    Angel.y += direction[1];
}

let surround = [[-1,1] ,[0, 1],[1,1],
                [-1,0]       ,[1,0],
                [-1,-1],[0,-1],[1,-1]];

//searches for avalible paths in a circular order
function angelFindCirc(direction, i){
    
    var count = 0;
    while(!inField(Angel.x + direction[0], Angel.y + direction[1]) || 
    !isObstacle(Angel.x + direction[0], Angel.y + direction[1])){
        i++;
        if(i == 8) i = 0;
        if(count == 8){
            return [0,0];
        }
        direction = surround[i];
        count++;
        print('debug', direction);
    }
    print('end debug, count:', count, Filled);
    return direction;
}

function angelFindClosest(direction, i, goal){


    //look
    if(Angel.x < testgoal[0]) direction[0]++;
    else if(Angel.x > testgoal[0]) direction[0]--;

    //look
    if(Angel.y < testgoal[1]) direction[1]++;
    else if(Angel.y > testgoal[1]) direction[1]--;
}