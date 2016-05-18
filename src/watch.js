try {
  Proxy
} catch (e) {
  throw `Omniscience requires a browser or node.js version which 
    supports the Proxy object. This came into node in version 6.0.0`
}

import d3 from 'd3-dispatch'
import uid from './uid'


function beginsWithUnderscore(s){
  return s.slice(0,1) == '_'
}


function isReserved(s){
  return ['on', 'sort'].indexOf(s) >= 0
}


function watch(o){    
  if (o._watchable){
    return o
  }

  if (!o._id){
    Object.defineProperty(o, '_id', {enumerable : false, value : uid()})
  }

  var dispatch = d3.dispatch('change', 'syncChange')
  var timeout = null

  o._unwatch = function(){
    // hacking the internals of d3.dispatch to just remove all handlers
    dispatch._.change = []
    dispatch._.syncChange = []
    delete o._watchable
  }
  Object.defineProperty(o, '_unwatch', {enumerable : false})

  function fireChangeAtEndOfThread(info){
    dispatch.call('syncChange')
    if (timeout == null){
      timeout = setTimeout(function(){
        timeout = null
        dispatch.call('change')
      }, 0)
    }
  }

  var handler = {
    set: function(target, key, value, receiver){
      var hidden = beginsWithUnderscore(key) || isReserved(key)
      if (hidden){
        target[key] = value
        Object.defineProperty(target, key, {enumerable : false})
        return true
      }
      var changed = (target[key] != value)
      var alreadyExisted = key in target
      var valueIsObject = typeof(value) == 'object'
      // if a new object property is added, then watch that too
      if (value && valueIsObject && !alreadyExisted && !hidden){
        value = watch(value)
        value.on('syncChange.' + o._id, function(){
          fireChangeAtEndOfThread()
        })
      }
      target[key] = value
      if (changed && !hidden){
        fireChangeAtEndOfThread()
      }
      return true
    },

    deleteProperty: function(target, property){
      // do a cleanup on the child object. Make it no
      // longer watchable
      const child = target[property]
      if (child && child._unwatch){
        child._unwatch()
      }
      delete target[property]
      fireChangeAtEndOfThread()
      return true
    }
  }

  var proxy = new Proxy(o, handler)
  proxy.on = function(type, handler){
    dispatch.on(type + '.' + uid(), handler)
  }
  
  Object.keys(o).forEach(function(key){
    if (!beginsWithUnderscore(key) && typeof(o[key]) == 'object'){
      o[key] = watch(o[key])
      o[key].on('syncChange.' + o._id, function(){
        fireChangeAtEndOfThread()
      })
    }
  })

  Object.defineProperty(o, '_watchable', {enumerable : false, configurable: true, value : true})
  return proxy
}

export default watch