var lichwuwu = {
  chunk: function (array, size) {
    var result = []

    for(var i = 0;i<array.length;i += size){
      result.push(array.slice(i,i+size))
    }
    return result
  },
  compact : function (array){
    var result = []
    for(var i = 0 ;i<array.length;i++){
      if(array[i] != 0 && array[i] != undefined && isNaN(array[i]) == false && array[i] !== null){
        result.push(array[i])
      }
    }
    return result
  },
  concat : function (array,...val){
    var result = array
    for(var i = 0;i<val.length;i++){
      if(Array.isArray(val[i])){
        for(var j = 0;j<val[i].length;j++){
          result.push(val[i][j])
        }
      }else{
        result.push(val[i])
      }
    }
    return result
  },
}
