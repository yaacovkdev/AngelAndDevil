function includeSub(Arr, valuearr){
    for(var i in Arr){
        checker = true;
        for(var j in valuearr){
            if(Arr[i][j] != valuearr[j]) {
                checker = false;
                break;
            }   
        }
        if(checker) return true;
    }
    return false;
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