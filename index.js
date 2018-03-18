
const express = require('express')
const app = express()

app.use(express.static(__dirname + '/build/public'))

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/build/index.html')
})

app.listen(80, function () {
	console.log('Example app listening on port 80!')
})