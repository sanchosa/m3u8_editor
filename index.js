
const express = require(`express`)
const path = require(`path`)
const app = express()

app.use(express.static(path.join(__dirname, `/build/public`)))

app.get(`/`, function (req, res) {
	res.sendFile(path.join(__dirname, `/build/index.html`))
})
app.get(`*`, function (req, res) {
	res.redirect(`/`)
})

app.listen(80, function () {
	console.log(`App listening on port 80!`)
})