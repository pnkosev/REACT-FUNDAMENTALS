const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const passport = require('passport')
const localSignupStrategy = require('./passport/local-signup')
const localLoginStrategy = require('./passport/local-login')
const authRoutes = require('./routes/auth')
const hotelsRoutes = require('./routes/hotels')

const app = express()

const port = 5000

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(cors())

passport.use('local-signup', localSignupStrategy)
passport.use('local-login', localLoginStrategy)

// routes
app.use('/auth', authRoutes)
app.use('/hotels', hotelsRoutes)

app.listen(port, () => {
    console.log(`Server running on port ${port}...`)
})