let express = require("express");
let app = express();
var port = process.env.PORT || 3000;
var request = require("request");
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("search");
});

/*app.get("/results", function(req, res){
   var search = req.query.search;
   var url = "http://www.omdbapi.com/?s="+search+"&apikey=thewdb";
   request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body);
            res.render("results", {data : data});
        }
        console.log(data);
   });
});*/
app.get("/results", function(req, res) {
    var search = req.query.search;
    var url = "http://www.omdbapi.com/?s="+search+"&apikey=thewdb";
   request(url, function(error, response, body) {
    if(error && response.statusCode != 200) {
        res.render("error");
    } else {
        var data = JSON.parse(body);
        if( data.Response == 'False') {
            return res.render("error");
        }
        res.render("results", {data: data});
    }
   });
});

app.listen(port, function(){
    console.log("START");
});