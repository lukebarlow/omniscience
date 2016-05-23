if (!Proxy){
  throw "You must be using a browser or node.js version which supports the Proxy object. This came into node in version 6.0.0"
}

import watch from '../watch'


function watchAndSpy(obj){
  let watchedObject = watch(obj)
  let spy = jasmine.createSpy('spy')
  watchedObject.on('change', spy)
  return [watchedObject, spy]
}


describe('watch', () => {

  it('pushing to a watched list calls the change handler once', (done)=>{
    let [list, spy] = watchAndSpy([1,2,3])
    list.push(30)
    setTimeout(() => {
      expect(spy.calls.count()).toEqual(1)
      done()
    }, 1)
  })

  it('changing an existing value of a list triggers the handler once', (done)=>{
    let [list, spy] = watchAndSpy([1,2,3])
    list[1] = 15
    setTimeout(() => {
      expect(spy.calls.count()).toEqual(1)
      done()
    }, 1)
  })

  it('popping the end value from a list triggers the handler once', (done)=>{
    let [list, spy] = watchAndSpy([1,2,3])
    list.pop()
    setTimeout(() => {
      expect(spy.calls.count()).toEqual(1)
      done()
    }, 1)
  })

  it('popping the end value from a list triggers the handler once', (done)=>{
    let [list, spy] = watchAndSpy([1,2,3])
    list.pop()
    setTimeout(() => {
      expect(spy.calls.count()).toEqual(1)
      done()
    }, 1)
  })

  it('shifting the first value from a list triggers the handler once', (done)=>{
    let [list, spy] = watchAndSpy([1,2,3,4,5])
    list.shift()
    setTimeout(() => {
      expect(spy.calls.count()).toEqual(1)
      done()
    }, 1)
  })

  it('setting a new property on a watched object triggers the handler once', (done)=>{
    let [obj, spy] = watchAndSpy({a : 1})
    obj.b = 29
    setTimeout(() => {
      expect(spy.calls.count()).toEqual(1)
      done()
    }, 1)
  })

  it('changing a property on a child object triggers the change handler on the parent', (done)=>{
    let [nested, spy] = watchAndSpy([{a : 1}, {a : 3}, {a : 2}])
    nested[1].a = 29
    setTimeout(() => {
      expect(spy.calls.count()).toEqual(1)
      done()
    }, 1)
  })

  it('adding a property to a child object triggers the change handler on the parent', (done)=>{
    let [nested, spy] = watchAndSpy([{a : 1}, {a : 3}, {a : 2}])
    nested[1].b = 29
    setTimeout(() => {
      expect(spy.calls.count()).toEqual(1)
      done()
    }, 1)
  })

  it(`adding a child then changing it should fire just one change event, as
      it groups all the changes until the end of that thread`, (done)=>{
    let [nested, spy] = watchAndSpy([{a : 1}, {a : 3}, {a : 2}])
    nested.push({a : 19})
    nested.push({a : 22})
    nested[3].a = 70
    setTimeout(() => {
      expect(spy.calls.count()).toEqual(1)
      done()
    }, 1)
  })

  it(`using a sort method on a list should work, and fire just one change event`, (done)=>{
    let [list, spy] = watchAndSpy([1, 5, 4, 2, 3])
    list.sort()
    setTimeout(() => {
      expect(spy.calls.count()).toEqual(1)
      expect(list[1]).toEqual(2)
      done()
    }, 1)
  })

  it(`Using a sort with a compare function works`, (done)=>{
    let [list, spy] = watchAndSpy([{a : 2}, { a : 3}, {a : 1}])

    function compare(a, b){
      return a.a - b.a
    }

    list.sort(compare)
    setTimeout(() => {
      expect(spy.calls.count()).toEqual(1)
      expect(list[0].a).toEqual(1)
      expect(list[1].a).toEqual(2)
      expect(list[2].a).toEqual(3)
      done()
    }, 1)
  })

  it(`Other native methods of the Array still work on lists : map`, (done)=>{
    let [list, spy] = watchAndSpy([{a : 2}, { a : 3}, {a : 1}])
    setTimeout(() => {
      let callsBefore = spy.calls.count()
      list.map(function(d){return d.a})
      setTimeout(() => {
        let additionalCalls = spy.calls.count() - callsBefore
        expect(additionalCalls).toEqual(0)
        done()
      }, 1)
    }, 1)
  })

  it(`Other native methods of the Array still work on lists : pop`, (done)=>{
    let [list, spy] = watchAndSpy([{a : 2}, { a : 3}, {a : 1}])
    setTimeout(() => {
      let callsBefore = spy.calls.count()
      list.pop()
      setTimeout(() => {
        let additionalCalls = spy.calls.count() - callsBefore
        expect(additionalCalls).toEqual(1)
        done()
      }, 1)
    }, 1)
  })

  it(`Other native methods of the Array still work on lists : shift`, (done)=>{
    let [list, spy] = watchAndSpy([{a : 2}, { a : 3}, {a : 1}])
    setTimeout(() => {
      let callsBefore = spy.calls.count()
      list.shift()
      setTimeout(() => {
        let additionalCalls = spy.calls.count() - callsBefore
        expect(additionalCalls).toEqual(1)
        done()
      }, 1)
    }, 1)
  })

  it(`Other native methods of the Array still work on lists : push`, (done)=>{
    let [list, spy] = watchAndSpy([{a : 2}, { a : 3}, {a : 1}])
    setTimeout(() => {
      let callsBefore = spy.calls.count()
      list.push('blah')
      setTimeout(() => {
        let additionalCalls = spy.calls.count() - callsBefore
        expect(additionalCalls).toEqual(1)
        done()
      }, 1)
    }, 1)
  })

  it(`Other native methods of the Array still work on lists : unshift`, (done)=>{
    let [list, spy] = watchAndSpy([{a : 2}, { a : 3}, {a : 1}])
    setTimeout(() => {
      let callsBefore = spy.calls.count()
      list.unshift('blah')
      setTimeout(() => {
        let additionalCalls = spy.calls.count() - callsBefore
        expect(additionalCalls).toEqual(1)
        done()
      }, 1)
    }, 1)
  })

  it(`Other native methods of the Array still work on lists : reverse`, (done)=>{
    let [list, spy] = watchAndSpy([{a : 2}, { a : 3}, {a : 1}])
    setTimeout(() => {
      let callsBefore = spy.calls.count()
      list.reverse()
      setTimeout(() => {
        let additionalCalls = spy.calls.count() - callsBefore
        expect(additionalCalls).toEqual(1)
        done()
      }, 1)
    }, 1)
  })

  it(`Other native methods of the Array still work on lists : splice`, (done)=>{
    let [list, spy] = watchAndSpy([{a : 2}, { a : 3}, {a : 1}])
    setTimeout(() => {
      let callsBefore = spy.calls.count()
      list.splice(1, 2)
      setTimeout(() => {
        let additionalCalls = spy.calls.count() - callsBefore
        expect(additionalCalls).toEqual(1)
        done()
      }, 1)
    }, 1)
  })

  it(`Other native methods of the Array still work on lists : fill`, (done)=>{
    let [list, spy] = watchAndSpy([{a : 2}, { a : 3}, {a : 1}])
    setTimeout(() => {
      let callsBefore = spy.calls.count()
      list.fill('chicken')
      setTimeout(() => {
        let additionalCalls = spy.calls.count() - callsBefore
        expect(additionalCalls).toEqual(1)
        done()
      }, 1)
    }, 1)
  })

  it('Two watchers on the same object are both fired', (done)=>{
    let [obj, spy] = watchAndSpy({a : 1})
    let spy2 = jasmine.createSpy('spy2')
    obj.on('change', spy2)
    obj.a = 29
    setTimeout(() => {
      expect(spy.calls.count()).toEqual(1)
      expect(spy2.calls.count()).toEqual(1)
      done()
    }, 1)
  })

  it('does not break when a property value starts as null', (done)=>{
    let [obj, spy] = watchAndSpy({a : null})
    obj.a = 1
    setTimeout(() => {
      expect(spy.calls.count()).toEqual(1)
      done()
    }, 1)
  })

  it('does not break when a property value is set to null', (done)=>{
    let [obj, spy] = watchAndSpy({a : 1})
    obj.a = null
    setTimeout(() => {
      expect(spy.calls.count()).toEqual(1)
      done()
    }, 1)
  })

})


export default {}