let express = require('express')
let bodyParser = require('body-parser')
let api_routes = require('./routes/api.js')
let path = require('path')

let app = express() 

let vueClientDirectory = path.join(__dirname, 'student-client', 'dist')
let vueApp = express.static(vueClientDirectory)
app.use('/', vueApp)

app.use(bodyParser.json())

app.use('/api', api_routes)

// Error handler - for route not found
app.use(function(req, res, next){
    res.status(404).send('Not found')
})

// Error handler for server errors 
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Server error')
})


// Start server running 
let server = app.listen(process.env.PORT || 3000, function() {
    console.log('Express server running on port', server.address().port)
})

 