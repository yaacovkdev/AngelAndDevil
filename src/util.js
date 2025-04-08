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

function arrayEqual(A, B){
    if(A == null || B == null) return false;
    if(A.length != B.length) return false;
    for(var i in A){
        if(A[i] != B[i]){
            return false;
        }
    }
    return true;
}

function indexOfTuple(Arr, tuple){
    for(var i  = 0; i < Arr.length; i++){
        if(Arr[i][0] == tuple[0] && Arr[i][1] == tuple[1]){
            return i;
        }
    }
    return -1;
}