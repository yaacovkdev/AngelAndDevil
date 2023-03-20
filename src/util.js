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