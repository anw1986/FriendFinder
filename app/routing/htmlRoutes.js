var path = require("path");

module.exports = function(app){

  // Basic route that sends the user first to the AJAX Page
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./../public/home.html"));
  });

  app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "./../public/survey.html"));
  });
  
  app.get("/images/ahmed.jpg",function(req,res){
    res.sendFile(path.join(__dirname, "../../public/images/ahmed.jpg"));
  })  

  app.get("/images/mickey.jpg",function(req,res){
    res.sendFile(path.join(__dirname, "../../public/images/mickey.jpg"));
  })  

  app.get("/images/ryan.jpg",function(req,res){
    res.sendFile(path.join(__dirname, "../../public/images/ryan.jpg"));
  })  

  app.get("*",function(req,res){
    res.sendFile(path.join(__dirname, "./../public/home.html"));
  })

}