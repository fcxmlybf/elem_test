const express = require('express');
const router = express.Router();

// 引入处理路径的模块
// const path = require('path');
const fs = require('fs');

router.all("*",function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    //res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

router.get("/getdata",function(req,res){
     let Data = "./data.json";
     let dataJson = JSON.parse(fs.readFileSync(Data));
    res.send(dataJson);
})


module.exports = router;
