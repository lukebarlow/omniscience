omniscience
===========

Watch for changes in arbitrary javascript data structures. 

```
var data = [
	{ value : 22},
	{ value : 19}
];

data = omniscience.watch(data);
data.on('change', function(){
	console.log('something changed in the data');
})

// now make arbitrary changes to the data and detect changes
data.push({value : 1});
data.shift();
data[0].value++;
...etc
```

Changes will be seen in any descendant of the originally watched object. All
descendants of the originally watched object are watchable (i.e. you can set
a 'change' handler on them).

See the web apps in the examples directory for other examples.

This module relies on the Proxy object, which at the time of writing is
supported on the latest Firefox and Chrome, and the just released node 6.0. 
In Safari, it works in the Safari Technology Preview version, but not yet in 
the main public version.

For the reader familiar with the d3-dispatch object, note that omniscience
automatically makes the handler types unique, so, unlike d3-dispatch, if you
set data.on('change', handler1) then data.on('change', handler2), the second
handler will not clobber the first - instead they will both be fired. It is
not necessary to write data.on('change.h1', handler1) and 
data.on('change.h2', handler2)