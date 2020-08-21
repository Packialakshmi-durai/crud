var express=require('express')
var app=express()
var mysql=require('mysql')
var bodyParser=require('body-parser');
const { query } = require('express');
var Client = require('node-rest-client').Client;
var client = new Client();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.set("view engine","ejs")
app.use(express.static(__dirname+'/public'))

//mysql connection 

var connection=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'packia19',
    database: 'task'
})

connection.connect(function(err){
    if(!err){
        console.log("database connected successfully")
    }
})

//Inserting Data

app.post('/push',function(req,res){
  
    var query_insert= "INSERT INTO usertable(UserName, Password) VALUES('"+req.body.UserNameNew+"',"+"MD5('"+req.body.PasswordNew+"'))"
   
    connection.query(query_insert, function (err, rows, fields) {
    
      if (!err) {
        console.log("Pushed")
        res.send("Pushed");
      }
      else
        console.log('Error while performing Query.');
    });
  })


  // updating data

  app.post('/update',function(req,res){
    console.log(req.body)
  
    var query_update= "update usertable set UserName='"+req.body.UserNameNew+"'where UserName='"+req.body.UserNameOld+"'"
    console.log(query_update)
    connection.query(query_update, function (err, rows, fields) {
    
      if (!err) {
        console.log("updated")
        res.send("updated");
      }
      else
        console.log('Error while performing Query.');
    });
  })
  
//delete username in db
  app.post('/delete',function(req,res){
    console.log(req.body)
  
    var query_delete= "delete from usertable where UserName='"+req.body.UserNameNew+"'"
    console.log(query_delete)
    connection.query(query_delete, function (err, rows, fields) {
    
      if (!err) {
        console.log("deleted")
        res.send("deleted");
      }
      else
        console.log('Error while performing Query.');
    });
  })

  //Getting data from db for particular username 
app.get("/data/:name/:password",function(req,res){

    var qry="select * from usertable where  UserName='"+req.params.name+"' "+"and password=MD5('"+req.params.password+"')"
    connection.query(qry, function (err, rows, fields) {
        if (!err) {
          console.log("j")
          if(rows.length!=0){
            res.send("data_present")
            }
          else{
              res.send("not_present")
          }  
        }
        else
          console.log('Error while performing Query.');
      });
})  

//merging three tables usertable,categorytable,product table using left join

app.get("/username/:name", function (req, res) {
   
    query1="select usertable.UserName,cattable.catname,projecttable.project_title from usertable inner join projecttable on usertable.UserId=projecttable.user_id left join cattable on cattable.catid=projecttable.cat_id where usertable.UserName='"+req.params.name+"'";
connection.query(query1, function (err, rows, fields) {
  
    if (!err) {
      console.log("Pushed")
      var resultArray = Object.values(JSON.parse(JSON.stringify(rows)))
      console.log(resultArray)
      res.send(rows);
    }
    else
      console.log('Error while performing Query.');
  });
});

//Rendering pages

app.get("/update_account", function(req,res){
  res.render("update_login", {});
})
app.get("/delete_account", function(req,res){
  res.render("delete_user", {});
})
app.get("/create_account", function(req,res){
    res.render("create_login", {});
})
app.get("/tableboard", function(req,res){
    res.render("index", {});
})
app.get("/frontpage", function(req,res){
    res.render("frontpage", {});
})
app.get("/", function(req,res){
    res.render("display", {});
})


app.listen(4000,console.log("sever running"))