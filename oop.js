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
    this._size
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
    return new Complex.constructor(real, imag)
  }
  minus(c) {
    var real = this.real - c.real
    var imag = this.imag - c.imag
    return new Complex.constructor(real, imag)
  }
  mul(c) {
    var real = this.real * c.real - this.imag * c.imag
    var imag = this.real * c.imag + this.imag * c.real
    return new Complex.constructor(real, imag)
  }
  div(c) {
    var helper = new Complex.constructor(c.real, -c.imag)
    var up = this.mul(helper)
    var down = c.mul(helper) // down的虚部应该是0
    var real = up.real / down.real
    var imag = up.imag / down.real
    return new Complex.constructor(real, imag)
  }
}




