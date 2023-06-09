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
  differenceBy : function(array, ...values){
    values = this.flattenDepth(values)
    if(typeof values[values.length-1] == 'function'){

      for(var i=0;i<values.length ;i++){
        var a = array.filter(it => values[values.length-1](it) !== values[values.length-1](values[i]))
        array = a
      }
      return a


    }
    if(typeof values[values.length-1] == 'string'){
      var a = array
      for(var i =0;i<values.length -1;i++){
        for(var j =0 ;j< array.length;j++){
          if(values[i][values[values.length-1]] == array[j][values[values.length-1]] ){
            a.splice(j,1)
          }
        }
      }
      return a
    }
    return this.difference(array,values)

  },
  differenceWith : function(array, values, comparator){
    var result = []
    for(var i = 0;i<array.length;i++){
      result.push(array[i])
    }
    for(var i = 0 ;i<values.length;i++){
      for(var j = 0 ;j<result.length;j++){
        if(comparator(values[i],result[j])){
          result.splice(j,1)
        }
      }
    }
    return result
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
  dropRightWhile : function(array, predicate = this.identity(predicate)){
    var result = []
    for(var i = 0 ;i<array.length;i++){
      if(typeof predicate == 'function'){
        if(!predicate(array[i])){

        }
      }
    }
  },
  fill : function(array,val,start = 0,end = array.length){
    for(start;start<end;start++){
      array[start] = val
    }
    return array
  },
  findIndex : function(array,predicate,fromIndex = 0){
    for(;fromIndex<array.length;fromIndex++){
      if(typeof predicate == 'function'){
        for(var key in array[fromIndex]){
          if(predicate(array[fromIndex])){
            return fromIndex
          }
        }
      }
      if(typeof predicate == 'object'){
        if(Array.isArray(predicate)){
          for(var key in array[fromIndex]){
            if(key == predicate[0] && array[fromIndex][key] == predicate[1]){
              return fromIndex
            }
          }
        }else{
          var a = true
          for(var key in array[fromIndex]){

            if(array[fromIndex][key] !== predicate[key]){
              a = false
            }
          }
          if(a == true){
            return fromIndex
          }
        }
      }
      if(typeof predicate == 'string'){
          if(predicate in array[fromIndex] && array[fromIndex][predicate] == true){
            return fromIndex
          }
        }

    }
    return -1
  },
  findLastIndex :function(array, predicate = this.identity(predicate), fromIndex=array.length-1){
    var c = 0
    var j = fromIndex
    for(;fromIndex >=0;fromIndex--){
      if(typeof predicate == 'function'){
        for(var key in array[fromIndex]){
          if(predicate(array[fromIndex])){
            return j - c
          }
        }
      }
      if(typeof predicate == 'object'){
        if(Array.isArray(predicate)){
          for(var key in array[fromIndex]){
            if(key == predicate[0] && array[fromIndex][key] == predicate[1]){
              return j - c
            }
          }
        }else{
          var a = true
          for(var key in array[fromIndex]){

            if(array[fromIndex][key] !== predicate[key]){
              a = false
            }
          }
          if(a == true){
            return j - c
          }
        }
      }
      if(typeof predicate == 'string'){
          if(predicate in array[fromIndex] && array[fromIndex][predicate] == true){
            return j - c
          }
        }
        c++
    }
    return -1
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
  pullAllBy : function(array, values, iteratee = this.identity(iteratee)){
    for(var i = 0; i< values.length; i++){
      for(var j = 0 ;j< array.length;j++){
        if(values[i][iteratee] === array[j][iteratee]){
          array.splice(j,1)
        }
      }
    }
    return array
  },
  pullAllWith : function(array, values, comparator){
    for(var i = 0 ;i< values.length;i++){
      for(var  j= 0;j<array.length ;j++){
        if(comparator(values[i],array[j])){
          array.splice(j,1)
        }
      }
    }
    return array
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
  sortedIndexBy : function(array, value, iteratee=this.identity(iteratee)){
    for(var i = 0;i<array.length; i++){
      if(typeof iteratee == 'function'){
        if(iteratee(value) <= iteratee(array[i])){
          return i
        }
      }
      if(typeof iteratee == 'string'){
        if(value[iteratee] <= array[i][iteratee]){
          return i
        }
      }
    }
  },
  sortedIndexOf : function(array, value){
    for(var i = 0;i< array.length;i++){
      if(array[i] == value){
        return i
      }
    }
    return -1
  },
  sortedLastIndex : function(array, value){
    var index = array.length -1
    for(var i =array.length -1;i >= 0;i++){
      if(value <= array[i]){
        return i
      }
    }
  },
  sortedLastIndexBy : function(array, value, iteratee = this.identity(iteratee)){
    for(var i = 0 ; i < array.length;i++){
      if(typeof iteratee == 'function'){
        if(iteratee(value) < iteratee(array[i])){
          return i
        }
      }
      if(typeof iteratee == 'string'){
        if(value[iteratee] < array[i][iteratee]){
          return i
        }
      }
    }
  },
  sortedLastIndexOf : function(array, value){
    for(var i= array.length -1; i >= 0;i--){
      if(array[i] == value){
        return i
      }
    }
    return -1
  },
  sortedUniq : function(array){
    var result = []
    for(var i = 0 ;i< array.length;i++){
      if(array[i] !== array[i+1]){
        result.push(array[i])
      }
    }
    return result
  },
  sortedUniqBy : function(array, iteratee){
    var result = []
    for(var i = 0 ;i< array.length;i++){
      if(iteratee( array[i]) !== iteratee(array[i+1])){
        result.push(array[i -1])
      }
    }
    return result
  },
  parseJSON : function(str){
    var i = 0
    return parseValue()
    function parseValue(){
      if(str[i] ==='{'){
        return parseObject()
      }
      if(str[i] === '['){
        return parseArray()
      }
      if(str[i] === '"'){
        return parseString()
      }
      if(str[i] === 't'){
        return parseTrue()
      }
      if(str[i] === 'f'){
        return parseFalse()
      }
      if(str[i] === 'n'){
        return parseNull()
      }
      return parseNumber()
    }
    function parseObject(){
      var result ={}
      i++
      while(i < str.length){
        var key = parseString()
        i++
        var val = parseValue()
        result[key] = val
        if(str[i] === ','){
          i++
          continue
        }
        if(str[i] === '}'){
          i++
          break
        }
      }
      return result
    }
    function parseArray(){
      i++
      var result =[]
      while(str[i] != "]"){
        result.push(parseValue())
        if(str[i] === ","){
          i++
        }
      }
      i++
      return result
    }
    function parseString(){
      i++
      var start = i
      while(str[i] !== '"'){
        i++
      }
      var end = i
      i++
      return str.slice(start,end)
    }
    function parseTrue(){

      if(str.slice(i,i+4) == 'true'){
        i += 4
        return true

      }else{
        throw new TypeError("aa")
      }
    }
    function parseFalse(){
      if(str.slice(i,i+5) == 'false'){
        i += 5
        return true

      }else{
        throw new TypeError("aa")
      }
    }
    function parseNumber(){
      var start = i
      while(str[i] >0 &&str[i] < 9){
        i++
      }

      return Number(str.slice(start,i))
    }
    function parseNull(){
      if(str.slice(i,i+4) == 'null'){
        i += 4
        return null
      }else{
        throw new TypeError("aa")
      }
    }
  },



  add : function(augend, addend){
    return augend + addend
  },
  sum : function(arr){
    var result = 0
    for(var i = 0;i<arr.length;i++ ){
      result += arr[i]
    }
    return result
  },
  sumBy : function(array, iteratee = lichwuwu.identity){
    var result = 0
    if(typeof iteratee == "string"){
      for(var i = 0;i<array.length;i++ ){
        result += array[i][iteratee]
      }
    }else{
      for(var i = 0;i<array.length;i++ ){
        result += iteratee(array[i])
      }
    }
    return result
  },
  property :function(name){
    return function(obj){
      return obj[name]
    }
  },
  matchesProperty : function(path, srcValue){
    return function(object){
      return lichwuwu.isMatch(object[path],srcValue)
    }
  },
  matches : function(source){
      return lichwuwu.bind(lichwuwu.isMatch, null, undefined, source)
  },
  bind :function(f,thisArgs,...fixedArgs){
    return function(...args){
      var copy = fixedArgs.slice()
      for(var i = 0 ,j =0 ;i<copy.length;i++){
        if(copy[i] == undefined){
          copy[i] = args[j++]
        }
      }
      while(j<args.length){
        copy.push(args[j++])
      }
      return f.call(thisArgs,...copy)
    }
  },
  isMatch : function(object, source){
    for(var key in source){
      if(typeof source[key] == "object"){
        if(!this.isMatch(object[key],source[key])){
          return false
        }
      }else{
        if(object[key] !== source[key]){
          return false
        }
      }
    }
    return true
  },
  iteratee :function(predicate){
    var func = predicate
    if(typeof func == "string"){
      func = lichwuwu.property(predicate)
    }else if(Array.isArray(predicate)){
      func = function(it){
        return it[predicate[0]] == predicate[1]
      }
    }else if (typeof predicate == "object"){
      func = lichwuwu.matches(predicate)
    }
    return func
  },
  filter : function(array, predicate = lichwuwu.identity){
    var func = lichwuwu.iteratee(predicate)
    var result = []
    for(var i = 0 ;i < array.length;i++){
      if(func(array[i],i,array)){
        result.push(array[i])
      }
    }
    return result
  },
  map : function(array, predicate = lichwuwu.identity) {
    var func = lichwuwu.iteratee(predicate)
    var result = []
    for (var i = 0; i < array.length; i++) {
      result.push(func(array[i], i, array))
    }
    return result
  },
  uniq : function(array){
    return Array.from(new Set(array))
  },
  uniqBy : function(array, iteratee = lichwuwu.identity){
    var iteratee = lichwuwu.iteratee(iteratee)
    var result = []
    var set = new Set()
      for(var item of array){
        var key = iteratee(item)
        if(!set.has(key)){
          result.push(item)
          set.add(key)
        }
      }
    return result

  },
  uniqWith : function(array, comparator){
    var result = []
    for(var item of array){
      var keep = true
      for(var seen of result){
        if(comparator(item,seen)){
          keep = false
          break
        }
      }
      if(keep){
        result.push(item)
      }
    }
    return result
  },
  countBy : function(collection, iteratee = lichwuwu.identity){
    var map = {}
    if(typeof iteratee == "function"){
      for(var key of collection){
        if(map[iteratee(key)]){
          map[iteratee(key)]++
        }else{
          map[iteratee(key)] = 1
        }

      }
    }else{
      for(var key of collection){
        if(map[key.length]){
          map[key.length]++
        }else{
          map[key.length] = 1
        }

      }
    }
    return map
  },
  every : function(collection, predicate = lichwuwu.identity){
    for(var item of collection){
      if(!lichwuwu.iteratee(predicate)(item)){
        return false
      }
    }
    return true
  },
  max : function(array){
    if(array.length == 0){
      return undefined
    }
    var max = -Infinity
    for(var i = 0;i<array.length;i++){
      if(array[i] > max){
        max = array[i]
      }
    }
    return max
  },
  toPath : function(pathString) {
    if (typeof pathString == 'string') {
      var result = pathString.split(/\.|\[|\]\.|\]\[|\]/)
      if (result.at(-1) == '') {
        result.pop()
      }
      if (result.at(0) == '') {
        result.shift()
      }
      return result
    }
    return pathString
  },
  get : function(object, path, defaultValue){
    path = lichwuwu.toPath(path)
    for(var key of path ){
      if(object != undefined){
        object = object[key]
      }else{
        return defaultValue
      }
    }
    return object ?? defaultValue
  },
  isEqual : function(o1, o2) {
    if(o1 === o2 ){
        return true
    }
    if(o1 && o2 && typeof o1 === 'object' && typeof o2 === 'object'){
        if(Array.isArray(o1) === Array.isArray(o2)){
            if(!Array.isArray(o1)){
                var size = 0
                for(var key in o1){
                    size++
                }
                for(var key in o2){
                    size--
                }
                if(size !== 0){
                    return false
                }
            }else{
                if(o1.length !== o2.length){
                    return false
                }
            }
            for(var key in o1){
                if(!lichwuwu.isEqual(o1[key],o2[key])){
                    return false
                }
            }
            return true
        }else{
            return false
        }
    }

    return o1 === o2
  },
  identity : function(value){
    return value
  },
  swap : function(array,i,j){
    var t = array[i]
    array[i] = array[j]
    array[j] = t
  }

}
