var bodyParser      = require("body-parser"),
expressSanitizer    = require("express-sanitizer"),
mongoose            = require("mongoose"),
express             = require("express"),
app                 = express();

// APP CONFIG
mongoose.connect("mongodb://localhost/space_blog");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());

// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

//SAMPLE BLOG ENTRY

// Blog.create({
//     title: "First Post",
//     image: "https://media.giphy.com/media/BiLePRDuikmYw/giphy.gif",
//     body: "This is the first post for a coding blog to keep for the purpose of tracking my progress."
// })

// RESTful ROUTES
// REDIRECTS TO INDEX ROUTE
app.get("/", function(req, res){
    res.redirect("/blogs");
});

//INDEX ROUTE   
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log("ERROR 🔥ERROR 🔥ERROR 🔥ERROR 🔥ERROR 🔥ERROR 🔥ERROR 🔥");
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});

// LISTENER
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("SERVER INITIATED");
});