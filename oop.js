class Vector {
  constructor (x,y){
    this.x = x
    this.y = y
  }
  plus(Vector){
    var x = this.x + Vector.x
    var y = this.y + Vector.y
    return new Vector.constructor(x,y)
  }
  minus(Vector){
    var x = this.x - Vector.x
    var y = this.y - Vector.y
    return new Vector.constructor(x,y)
  }
  get length (){
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

}
class Stack{
  constructor(){
    this.head = null
    this.nodeCount = 0
  }
  push(val){
    var node = {
      val : val ,next: null
    }
    this.nodeCount++
    if(this.head == null){
      this.head = node
    }else{
      node.next = this.head
      this.head = node
    }
  }
  pop(){
    if(this.head == null){
      return undefined
    }
    this.nodeCount--
    var result = this.head.val
    this.head = this.head.next
    return result
  }
  get size(){
    return this.nodeCount
  }
}
class Queue{
  constructor(){
    this._vals = []
  }
  add(val){
    this._vals.push(val)
  }
  pop(){
    return this._vals.shift()
  }
  get size(){
    return this._vals.length
  }
}
class LinkedList{
  constructor(...initVals){
    this.head = null
    this.tail = null
  }
  append(val){
    var node = {
      val , next : null
    }
    if(this.head == null){
      this.head = this.tail = node
      return
    }else{
      this.tail.next = node
      this.tail = node
      return
    }
  }
  prepend(val){
    var node = {
      val, next: null
    }
    if (this.head == null) {
      this.head = this.tail = node
      return
    } else {
      node.next = this.head
      this.head = node
      return
    }
  }
  at(idx){
    var p = this.head
    var count = 0
    while (count < idx) {
      p = p.next
      count++
    }
    return p.val
  }
  get size(){
    var p = this.head
    var l = 0
    while(p) {
      l++
      p = p.next
    }
    return l
    }
}
class MyMap {
  constructor (){
    this._capacity = 16
    this._size = 0
    this._maxLoadFactor = 0.98
    this._lists = new Array(this._capacity).fill(null)
  }
  hashKey(key){
    var seed = 13131
    var hash = 0
    for(var char of key){
      var code = char.charCodeAt(0)
      hash = (hash * seed + code) >>> 0
    }
    return hash % this._capacity
  }
  set(key,val){
    var index = this.hashKey(key)
    var list = this._lists[index]
    var p = list
    while(p){
      if(p.key == key){
        p.val = val
        return this
      }
      p = p.next
    }
    var node = {
      key,val,next:null,
    }
    node.next = list
    this._lists[index] = node
    this._size++
    if(this._size / this._capacity > this._maxLoadFactor){
      this.扩容()
    }
    return this
  }
  get(key){
    var index = this.hashKey(key)
    var p = this._lists[index]
    while(p){
      if(p.key === key){
        return p.val
      }
      p = p.next
    }
  }
  has(key){
    var index = this.hashKey(key)
    var p = this._lists[index]
    while(p){
      if(p.key === key){
        return true
      }
      p = p.next
    }
    return false
  }
  delete (key){
    var index = this.hashKey(key)
    var dummy = {
      key : '',val : 0 ,next : this._lists[index]
    }
    var p = dummy
    while(p.next){
      if(p.next.key === key){
        p.next = p.next.next
        this._lists[index] = dummy.next
        this._size--
        if(this._size / this._capacity < this._capacity /4){
          this.缩容()
        }
        return true
      }
      p = p.next
    }
    return false
  }
  get size(){
    return this._size
  }
  缩容(){
    if(this._capacity === 16 ){
      return
    }
    this.搬运(this._capacity / 2)
  }
  扩容(){
    this.搬运(this._capacity * 2)
  }
  搬运(targetCapacity){
    var oldList = this._lists
    this._capacity = targetCapacity
    this._size = 0
    this._lists = new Array(this._capacity).fill
    for (var list of oldList){
      var p = list
      while(p){
        this.set(p.key,p.val)
        p = p.next
      }
    }
  }
}
class Complex {
  constructor(real, imag){

    this.real = real
    this.imag = imag
  }
  plus(c) {
    var real = this.real + c.real
    var imag = this.imag + c.imag
    return new Complex(real, imag)
  }
  minus(c) {
    var real = this.real - c.real
    var imag = this.imag - c.imag
    return new Complex(real, imag)
  }
  mul(c) {
    var real = this.real * c.real - this.imag * c.imag
    var imag = this.real * c.imag + this.imag * c.real
    return new Complex(real, imag)
  }
  div(c) {
    var helper = new Complex(c.real, -c.imag)
    var up = this.mul(helper)
    var down = c.mul(helper) // down的虚部应该是0
    var real = up.real / down.real
    var imag = up.imag / down.real
    return new Complex(real, imag)
  }
}

class MySet{
  constructor(){
    this._elements = []
  }
  add(val) {
    if (!this.has(val)) {
      this._elements.push(val)
    }
  }
  delete (val) {
    if (this.has(val)) {
      var idx = this._elements.indexOf(val)
      this._elements.splice(idx, 1)
    }
  }
  has (val) {
    return this._elements.includes(val)
  }
  get size () {
    return this._elements.length
  }
}
function heapify(array){
  var start = (array.length - 1) >> 1
  for(var i= start ;i >= 0 ;i--){
    heapDown(array,i)
  }
  return array
}
class PriorityQueue{
  constructor(initials = [], predicate = it => it){
    if(typeof predicate !== 'function'){
      throw new TypeError('predicate must be a function, got: ' + predicate)
    }
    this._elements = []
    this._predicate = predicate
    for(var val of initials){
      this.push(val)
    }
  }
  heapUp( pos){
    if(pos == 0){
      return
    }
    var predicate = this._predicate
    var parentPos = (pos - 1) >> 1
    if(predicate(this._elements[pos]) > predicate(this._elements[parentPos])){
      swap(this._elements,pos,parentPos)
      this.heapUp(parentPos)
    }

  }
  heapDown(pos){
    var leftPos = 2 * pos + 1
    var rightPos = 2 * pos + 2
    var maxIndex = pos
    var predicate = this._predicate
    if(leftPos < this._elements.length && predicate(this._elements[leftPos]) > predicate(this._elements[maxIndex])){
      maxIndex = leftPos
    }
    if(rightPos < this._elements.length && predicate(this._elements[rightPos]) > predicate(this._elements[maxIndex])){
      maxIndex = rightPos
    }
    if(maxIndex != pos){
      swap(this._elements,maxIndex,pos)
      this.heapDown(maxIndex)
    }
  }
  pop(){
    if(this._elements.length == 0){
      return undefined
    }
    if(this._elements.length == 1){
      return this._elements.pop()
    }

    var last = this._elements.pop()
    var result = this._elements[0]
    this._elements[0] = last
    this.heapDown(0)
    return result
  }
  push(val){
    this._elements.push(val)
    this.heapUp(this._elements.length -1)
    return this
  }
  peek(){
    return this._elements[0]
  }
  get size (){
   return this._elements.length
  }
}
function heapSort(array){
  var start = (array.length - 1) >> 1
  for(var i= start ;i >= 0 ;i--){
    heapDown(array,i)
  }

  for(var i = array.length -1;i>0;i--){
    swap(array,i,0)
    heapDown(array,0,i)
  }
  return array
}
function heapDown(heap,pos,stop = heap.length){
  var leftPos = 2 * pos + 1
  var rightPos = 2 * pos + 2
  var maxIndex = pos
  if(leftPos < stop && heap[leftPos] > heap[maxIndex]){
    maxIndex = leftPos
  }
  if(rightPos < stop && heap[rightPos] > heap[maxIndex]){
    maxIndex = rightPos
  }
  if(maxIndex != pos){
    swap(heap,maxIndex,pos)
    heapDown(heap,maxIndex,stop)
  }
}
function swap(array,i,j){
  var t = array[i]
  array[i] = array[j]
  array[j] = t
}
String.prototype.mysearch = function mysearch(re){
  re = new RegExp(re)
  if(re.exec(this) != null){
    return  re.exec(this).index
  }
  return -1
}
String.prototype.mymatch = function mymatch(re){
  var result = []
  var m
  if(!re){
    return result = /^/.exec(this)
  }
  if(typeof re == 'string'){
    re = new RegExp(re)
  }
  while(m = re.exec(this)){
    if(!re.global){
      result = m
      break
    }
    result.push(m[0])
  }
  return result
}
RegExp.prototype.mytest = function mytest(str){
  if(this.exec(str) != null){
    return true
  }else{
    return false
  }
}
String.prototype.myreplace = function(regexp , replace){
  regexp.lastIndex = 0
  var result = ''
  var match
  var lastLastindex = 0
  while(match = regexp.exec(this)){
    result += this.slice(lastLastindex,match.index)
    if(typeof replace == 'function'){
      result += replace(...match,match.index,match.input)
    }else{
      var replacement = replace.myreplace(/\$([1-9\&])/g, (_,idx) =>{
        if(idx == '&'){
          return match[0]
        }else{
          return match[idx]
        }
      })
      result +=replacement
    }
    lastLastindex = regexp.lastIndex
    if(!regexp.global){
      lastLastindex = match.index + match[0].length
      break
    }
  }
  result += this.slice(lastLastindex)
  return result

}
String.prototype.mysplit = function (re){
  var result = []
   if(typeof re == 'string'){
    re = new RegExp(re,'g')
   }else{
    if(!re.global){
      re = new RegExp(re.source,'g' +re.flags)
    }
  }
  re.lastindex = 0
  var match
  var lastLastindex = 0
  while(match = re.exec(this)){
    result.push(this.slice(lastLastindex,match.index))
    result.push(...match.slice(1))
    lastLastindex =re.lastIndex
  }
  result.push(this.slice(lastLastindex))
  return result
}
