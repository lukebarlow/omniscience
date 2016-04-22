omniscience
===========

Watch for changes in arbitrary javascript data structures. Similar to the 
discontinued Object.observe()

In a world where unidirectional data flow is becoming popular, this is an
experiment in moving in the opposite direction. Any JavaScript data structure,
(provided it is non circular) can become a watchable model object in one line
of code.


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

See the web apps in the examples directory for other examples.

This module relies on the Proxy object, which at the time of writing is
supported on the latest Firefox and Chrome. In Safari, it works in the
Safari Technology Preview version, but not yet in the main public version.