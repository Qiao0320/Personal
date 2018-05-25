const express = require('express')
let server = express()
server.listen(8080)
//cookie
server.use('./',function(req,res){
  res.cookie('user','123')
  res.send('ok')
})