// 引入编写好的api
//const api = require('./api');
// 引入文件模块
//const fs = require('fs');
// 引入处理路径的模块
//const path = require('path');
// 引入处理post数据的模块
//const bodyParser = require('body-parser')
// 引入Express
// 引入编写好的api
const api = require('./api');
const express = require('express');
// 引入处理post数据的模块
const bodyParser = require('body-parser');
// 引入文件模块
//const fs = require('fs');
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(api);

app.listen(9080,function(){
    console.log("server start");
});
