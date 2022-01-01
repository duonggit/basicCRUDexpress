const express = require('express');
// Khoi dong app 
const app = express()
// Khoi dong middleware
app.use(express.json())
// Connect Database
const connectDB = require('./config/db');
connectDB();
// Handlebars
const { engine } = require('express-handlebars');
// Khoi dong middleware handlebars
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
// Khoi dong bodyparser middleware
app.use(bodyParser.urlencoded({ extended:false}))
app.use(bodyParser.json())
// Khoi dong method override middleware
app.use(methodOverride('_method'))
// Routes handlebars
// Hiển thị tất cả các bài viết
const Post = require('./models/Post')
app.get('/', async (req,res) =>  {
        const posts = await Post.find().lean().sort({ date: -1 })
        res.render('index', {posts})
})
app.get('/about',(req,res)=> res.render('about'))
// ket noi router posts 
const posts = require('./routes/posts')
// Mang routes vao de su dung
app.use('/posts',posts)
// Thu muc style 
app.use(express.static('public'))
// Tao Port 
const PORT = 5000; 
app.listen(PORT, () => console.log(`Server khoi dong tai port ${PORT}`))
