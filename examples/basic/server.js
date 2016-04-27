var express = require('express'),
	app = express();
app.use('/js/', express.static('../../dist/'))
app.use(express.static('./'))
app.listen(3000)
console.log('Basic omniscience example running at localhost:3000');