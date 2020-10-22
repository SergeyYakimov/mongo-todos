const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const Handlebars = require('handlebars');
const expresshbs = require('express-handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const todoRoutes = require('./routes/todos')

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(todoRoutes)


const hbs = expresshbs.create({
  defaultLayout: 'main',
  handlebars: allowInsecurePrototypeAccess(Handlebars),
  extname: 'hbs'
})

app.engine('hbs', hbs.engine) // регистрация
app.set('view engine', 'hbs')
app.set('views', 'views')

async function start() {
  try {
    await mongoose.connect('mongodb+srv://sergey:1a2b3c4d@cluster0.i4soj.mongodb.net/todos', {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false
    })

    app.listen(PORT, () => {
      console.log('Server has been started')
    })

  } catch(e) {
    console.log(e)
  }
}

start()

