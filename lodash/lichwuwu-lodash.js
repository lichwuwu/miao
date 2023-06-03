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
  difference : function (array,val){

  },
  drop : function(array,n = 1){
    for(var i = 0;i< n;i++){
      array.shift()
    }
    return array
  },
  fill : function(array,val,start = 0,end = array.length){
    for(start;start<end;start++){
      array[start] = val
    }
    return array
  },
  flatten: function(array){
    var result = []
    for(var item of array){
      if(Array.isArray(item)){
        for(var i = 0 ;i<item.length;i++){
          result.push(item[i])
        }
      }else{
        result.push(item)
      }
    }
    return result
  },
  flattenDeep : function(array){
    var result=[]
    for(var item of array){
      if(Array.isArray(item)){
        var flattenItem = this.flattenDeep(item)
        for(var key of flattenItem){
          result.push(key)
        }
      }else{
        result.push(item)
      }
    }
    return result
  },
  flattenDepth : function(array,depth = 1){
    if(depth == 0){
      return array.slice()
    }
    var result=[]
    for(var item of array){
      if(Array.isArray(item)){
        var flattenItem = this.flattenDepth(item ,depth -1)
        for(var key of flattenItem){
          result.push(key)
        }
      }else{
        result.push(item)
      }
    }
    return result
  },
  head : function(array){
    return array[0]
  },
  fromPairs : function(array){
    var map = {}
    for(var i= 0;i<array.length;i++){

        map[array[i][0]] = array[i][1]
    }
    return map
  },
  indexOf : function(array,value, fromIndex = 0){
    for(var i=0;i < array.length;i++){
      if(fromIndex <= 0 || fromIndex > array.length -1){
        if(array[i] == value){
          return i
        }
      }
      if(array[i] == value){
            return array[i] + array[fromIndex]

        }
    }
    return -1
  },


}
