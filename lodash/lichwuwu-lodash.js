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
  difference : function (array,...val){
    val = this.flattenDeep(val)
    for(var i=0;i<val.length ;i++){
      var a = array.filter(it => it !== val[i])
      array = a
    }
     return a
  },
  drop : function(array,n = 1){
    for(var i = 0;i< n;i++){
      array.shift()
    }
    return array
  },
  dropRight : function(array,n =1){
    for(var i = 0;i< n;i++){
      array.pop()
    }
    return array
  },
  fill : function(array,val,start = 0,end = array.length){
    for(start;start<end;start++){
      array[start] = val
    }
    return array
  },
  findIndex : function(array,){

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
  initial : function (array){
     array.pop()
     return array

  },
  intersection : function (...arrays){
    var result = []
    var map = {}

    for(var array in arrays){

    }
  },
  join : function(array,separator =','){
    var result = ''
    for(var i = 0;i<array.length;i++){
      result += array[i]
      result += separator
    }
    return result.slice(0,result.length -1)
  },
  last : function(array){
    return array[array.length-1]
  },
  lastIndexOf : function(array,value,fromIndex = array.length-1){
    if(value > array.length){
      return -1
    }
    if(value < 0 || fromIndex < 0){
      return -1
    }
    if(value == fromIndex){
      return array[array.length - value]
    }
    var val = array.length - value
    var sum = 0
    if(fromIndex != array.length -1){
      fromIndex = array.length - fromIndex
    }
    for(;val <= fromIndex ;val++){
      sum += array[val]
    }
    return sum

  },
  nth : function(array,n=0){
    if(n < 0){
      return array[array.length + n]
    }else{
     return array[n]
    }
  },
  pull : function(array,...val){
    for(var i = 0;i<val.length;i++){
      for(var j = 0;j<array.length;j++){
        if(val[i] == array[j]){
          array.splice(j,1)
        }
      }
    }
    return array
  },
  pullAll : function(array,values){
    for(var i = 0;i<values.length;i++){
      for(var j = 0;j<array.length;j++){
        if(values[i] == array[j]){
          array.splice(j,1)
        }
      }
    }
    return array
  },
  remove : function(array,predicate){
    var result = []
    for(var i = 0;i<array.length;i++){
      if(predicate(array[i])){
        result.push(array[i])
        array.splice(i,1)
      }
    }
    return result
  },
  reverse : function(array){
    var left = 0
    var right = array.length -1
    while(left !== right){
      this.swap(array,left,right)
      left++
      right--
    }
    return array

  },
  slice : function(array, start =0 ,end = array.length){
    var result = []
    for(;start < end;start++){
      result.push(array[start])
    }
    return result
  },
  sortedIndex : function(array, value){
    for(var i =0 ;i<array.length;i++){
      if(value <= array[i]){
        return i
      }
    }
    return i
  },















  swap : function(array,i,j){
    var t = array[i]
    array[i] = array[j]
    array[j] = t
  }

}
