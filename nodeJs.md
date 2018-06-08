[TOC]
### NodeJS
---

#### 基本了解
1. 优势
  - 性能高
  > js是前台，NodeJS是后台
  > 后台：PHP，Java，Python
  - 跟前台js配合方便
  - NodeJS更便于前端学习
##### NodeJS-服务器（HTTP模块）
- http.createServer建立服务器
  > 接受两个参数，request（输入：请求信息）response（输出：响应）
    ```javascript
    //node的系统模块
    const http = require('http');
    var server = http.createServer(function(req,res){
      //根据请求链接作出处理
      switch(req.url){
        case '1.html':
          res.write('qiao1');//向前端输出内容
          break;
        default:
          res.write('404');
          break;
      }
      res.end();//响应结束
    });
    //监听
    //端口
    server.listen(8080);
    ```
##### 文件操作（fs模块）
- 异步vs同步
  > 异步：多个操作同时进行，即使前一个的操作没结束，下一次也能开始
  > 同步：一次一个
    ```javascript
    const fs = require('fs');
    //读取文件readFile（文件名，回调函数）
    fs.readFile('fsTest.txt',function(err,data){
      if(err){
        console.log('读取失败')
      }else{
        console.log(data.toString())
      }
    })
    //写入文件writeFile（文件名，内容，回调函数）
    fs.writeFile('fsTest.txt','哦我知道了',function(err){
      if(err){
        console.log('写入失败')
      }
    })
    ```
  > 与服务器配合
    ```javascript
    const http = require('http');
    const fs = require('fs');
    var server = http.createServer(function(req,res){
      var file_name = './www'+ req.url
      fs.readFile(file_name,function(err,data){
        if(err){
          console.log('读取失败')
        }else{
          res.write(data)
        }
        res.end();
      })
    });
    server.listen(8080);
    ```
##### 数据请求
- 前台：form、ajax、jsonp
- 对于后台都是一样的，收到http请求
  > http请求
  > - header头
  > - content内容

  - GET：数据在url中
    > form表单提交
      ```html
      <form action="http://localhost:8080/qiao" method="get">
      用户：<input type="text" name="user" value=""><br>
      密码：<input type="password" name="pass" value=""><br>
      <input type="submit" value="提交">
      </form>
      ```
    > querystring
      ```javascript
      const querystring = require('querystring')
      let json = querystring.parse("user=qiao&pass=123456&age=18")
      console.log(json)
      ```
      > 输出：{ user: 'qiao', pass: '123456', age: '18' }
      > url
      ```javascript
      const urlLib = require('url')
      var obj = urlLib.parse("http://www.baidu.com/index?a=12&b=15")
      //加一个参数true可将返回值query解析成json字符串
      //var obj = urlLib.parse("http://www.baidu.com/index?a=12&b=15",true)
      console.log(obj)
      ```
      > 输出：
      ```json
        Url {
          protocol: 'http:',
          slashes: true,
          auth: null,
          host: 'www.baidu.com',
          port: null,
          hostname: 'www.baidu.com',
          hash: null,
          search: '?a=12&b=15',
          query: 'a=12&b=15',
          //加true之后的query输出
          //query: { a: '12', b: '15' },
          pathname: '/index',
          path: '/index?a=12&b=15',
          href: 'http://www.baidu.com/index?a=12&b=15' }
      ```
    > 简单的GET请求处理实例
      ```javascript
      const http=require('http');
      const urlLib = require('url')
      http.createServer(function (req, res){
        let obj = urlLib.parse(req.url,true)
        let GET = obj.query
        let url = obj.pathname
        console.log(url,GET)
        res.write('qiao');
        res.end();
      }).listen(8080);
      ```
  - POST：数据在content里
    > POST的数据比GET大得多
    > 简单的POST请求处理实例
    ```javascript
    const http=require('http');
    const querystring = require('querystring')
    http.createServer(function (req, res){
      let str = ''
      let i = 0
      //有一段数据到达的时候就会发生
      req.on('data',function(data){
        console.log(`第${i++}次收到数据`)
        str += data
      })
      //数据全部到达的时候发生
      req.on('end',function(){
        let POST = querystring.parse(str)
        console.log(POST)
      })
    }).listen(8080);
    ```
  - 整合
  ```javascript
  const http=require('http');
  const querystring = require('querystring')
  const urlLib = require('url')
  const fs = require('fs')
  http.createServer(function (req, res){
    //GET
    let obj = urlLib.parse(req.url,true)
    let url = obj.pathname
    const GET = obj.query
    console.log(GET)
    //POST
    let str = ''
    req.on('data',function(data){
      str += data
    })
    req.on('end',function(){
      const POST = querystring.parse(str)
      console.log(POST)
    })
    
    
    console.log(url)
    //文件
    const file_name = "./www" + url
    fs.readFile(file_name,function(err,data){
      if(err){
        res.write('404')
      }else{
        res.write(data)
      }
      res.end()
    })
  }).listen(8080);
  ```
#### 模块化
##### 系统模块
  > 常用系统模块
  > - path 处理文件路径
  > - Event 事件
  > - Net 网络操作
  > - OS 操作系统信息
  > - Crypto 加密
  > - Stream 流操作
  > - Timers 定时操作
  > - ZLIB 压缩
##### 自定义模块
  > - 模块组成
      > 自己的模块：require，module，exports
      > 引入自己的模块--./，后缀可省
      > 模块对外输出exports、module.exports
      > NodeJs没有全局变量
  > - NPM：NodeJs Package Manager（NodeJs包管理器）
    > - 提供一个统一的下载路径
    > - 自动下载依赖
  > - 发布模块
    > - npm init
    > - npm publish
    > - npm --force unpublish
#### Express框架
  ##### 安装 
    > npm install express
    > 保留了原生功能，并在此基础上增强（非破坏式）
    > 依赖中间件
  ##### 接受请求
  > 处理GET请求： `get('./',function(req,res){})`
  > 处理POST请求：`post('./',function(req,res){})`
  > 都可以处理：`use('./',function(req,res){})`
  ```javascript
  const express = req uire('express')
  let server = express()
  //处理请求
  server.use('/a.html',function(req,res){
    res.send("abc")
    res.end()
  })
  server.listen(8080)
  ```
  ##### 响应数据
  - 处理GET请求
      ```javascript
      server.use('/', function (req, res){
        console.log(req.query); //GET
      });
      ```
  - 处理静态文件
    > `const expressStatic = require('express-static')`
    > `server.use(expressStatic('./www'));`
  ##### 中间件
  - 处理POST请求：body-parser
    ```javascript
    server.use(bodyParser.urlencoded({
      extended: false,                 //扩展模式
      limit:    2*1024*1024           //限制-2M
    }));
    server.use('/', function (req, res){
      console.log(req.body); //POST
    });
    ```
  - 链式操作
    > - `server.use(function (req, res, next){});`
    > - `server.get('/', function (req, res, next){});`
    > - `server.post(function (req, res, next){});`
    > - next——下一个步骤
    > - next();
  - 自己写中间件
      ```javascript
      const express = require('express')
      const bodyParser=require('body-parser');
      let server = express()
      server.listen(8080)
      server.use(function(req,res,next){
        var str = ''
        req.on('data',function(data){
          str += data
        })
        req.on('end',function(){
          req.body=querystring.parse(str);
          next()
        })
      })
      server.use('./',function(req,res){
        console.log(req.body)
      })
      ```
  ##### cookie、session
  - 比较
    - http是无状态的
    - cookie：
      > 在浏览器保存一些数据，并且每次向服务器发送请求的时候都会带过来
      > 用户可以轻松的看到并修改所有cookie，因此不安全并且有限，最大4k
    - session：
      > 也是保存数据，但是保存在服务端，安全并且无限
      > session不能独立存在，是基于cookie实现的
      > cookie中会有一个session的ID，服务器利用sessionId找到session文件进行读取和写入的操作
      > 隐患：session劫持
  - cookie
    > cookie控件非常小，安全性很差
    > 因此需要精打细算，并校验cookie是否被篡改过
    - 写入
      ```javascript
      server.use('/aaa/a.html', function (req, res){
        res.cookie('user', 'blue', {path: '/aaa', maxAge: 30*24*3600*1000});
      });
      ```
    - 读取（cookie-parser）
      > `const cookieParser=require('cookie-parser');`
      > `server.use(cookieParser('wesdfw4r34tf'))`
      > ` console.log(req.cookies);`
    - 签名
      > ```javascript
      >   req.secret='wesdfw4r34tf';//签名
      >   res.cookie('user', 'blue', {signed: true});
      >   console.log('签名cookie：', req.signedCookies)
      >   console.log('无签名cookie：', req.cookies);
      > ```
      ```

      ```
    > 删除cookie `clearCookie('user')`
    > 加密cookie-encrypter
  - session（cookie-session）
    - 写入
    ```javascript
    const express=require('express');
    const cookieParser=require('cookie-parser');
    const cookieSession=require('cookie-session');
    var server=express();
    server.use(cookieParser());
    var arr=[];

    for(var i=0;i<100000;i++){
      arr.push('sig_'+Math.random());
    }

    server.use(cookieParser());
    server.use(cookieSession({
      name: 'sess',
      keys: arr,
      maxAge: 2*3600*1000
    }));

    server.use('/', function (req, res){
      if(req.session['count']==null){
        req.session['count']=1;
      }else{
        req.session['count']++;
      }
      console.log(req.session['count']);
      res.send('ok');
    });
    server.listen(8080);
    ```
    - 删除`delete res.session`
#### 模板引擎
##### jade和ejs简单比较
- jade
  > - 破坏式、侵入式、强依赖
- ejs
  > 温和、非侵入式、弱依赖
##### jade
> - 根据缩进确定层级,属性用（）表示，用逗号分割，内容直接空格后跟上
> - 语法

  ```jade
    html
    head
      style
      script
    body
      a(href="http://www.zhinengshe.com/") 官网
      a(href="http://www.baidu.com/") 百度
  ```
>
```javascript
  div(style="width:200px;height:200px;background:red")
  //等于
  div(style= {width: '200px', height: '200px', background: 'red'})
  div(class="aaa left-warp active")
  //等于
  div(class= ['aaa', 'left-warp', 'active'])
  div(title="aaa",id="div1")
  //等于
  div&attributes({title: 'aaa', id: 'div1'})
```
> - 读取`var str=jade.renderFile('./views/2.jade', {pretty: true});`
> - 识别单双标签
> - `|`代表原样输出内容，标签后加点也表示后面的内容原样输出
>
  ```jade
    html
      head
        script
          |window.onload=function (){
          | var oBtn=document.getElementById('btn1');
          | oBtn.onclick=function (){
          |   alert('aaaa');
          | };
          |};
      body
        |abc
        |ddd
        |213
  ```
  > 等于
  ```jade
    html
      head
        script.
          window.onload=function (){
            var oBtn=document.getElementById('btn1');
            oBtn.onclick=function (){
              alert('aaaa');
            };
          };
      body
        |abc
        |ddd
        |213
  ```
  > - 或者直接`include a.js`
  > - 变量：`div 我的名字：#{name}`
  > - `-`表示代码
  ```jade
  -var a=12;
  -var b=5;
  div 结果是：#{a+b}
  ```
  `console.log(jade.renderFile('./views/7.jade', {pretty: true, a: 12, b: 5}));`
  > - 循环遍历
  >   `console.log(jade.renderFile('./views/11.jade', {pretty: true,arr: ['aaa', 'sfasdf', '3423', 'asdfasdf']}));`
  ```jade
  -for(var i=0;i<arr.length;i++)
      div=arr[i]
  ```
  - 注入式攻击
  - 非转义输出html，`div!=content`
  ```jade
  -var a=19;
    if(a%2==0)
      div(style={background:'red'}) 偶数
    else
      div(style={background:'green'}) 奇数
  ```
  ```jade
  -var a=1;
    case a
      when 0
        div aaa
      when 1
        div bbb
      when 2
        div ccc
      default
        |不靠谱
  ```
  > 例子
  ```jade
  doctype
  html
    head
      meta(charset="utf-8")
      title jade测试页面
      style.
        div {width:100px;height:100px;background:#CCC;text-align:center;line-height:100px;float:left;margin:10px auto}
        div.last {clear:left}
    body
      -var a=0;
      while a<12
        if a%4==0 && a!=0
          div.last=a++
        else
          div=a++
  ```
##### ejs
- 循环
```javascript
ejs.renderFile('./views/2.ejs', {json: {arr: [
  {user: 'blue', pass: '123456'},
  {user: 'zhangsan', pass: '654321'},
  {user: 'xiaoming', pass: '999999'},
]}}, function (err, data){
  console.log(data);
});
```
```js
    <% for(var i=0;i<json.arr.length;i++){ %>
    <div>用户名：<%=json.arr[i].user%> 密码：<%=json.arr[i].pass%></div>
    <% } %>
```
- 等号是转义输出，减号是不转义输出
- 引入
```js
  <body>
    <% if(type=='admin'){ %>
    <% include ../style/admin.css %>
    <%}else{%>
    <% include ../style/user.css %>
    <% } %>
  </body>
```
#### Express+jade+ejs
##### multer
- body-parser只能处理数值不能处理文件，multer可以
- path解析文件路径
  > base：文件名部分
  ext：扩展名部分
  dir：路径
  name：文件名部分
```js
const express=require('express');
const bodyParser=require('body-parser');
const multer=require('multer');
const fs=require('fs');
const pathLib=require('path');

var objMulter=multer({dest: './www/upload/'});

var server=express();

//错误
//server.use(bodyParser.urlencoded({extended: false}));
server.use(objMulter.any());

server.post('/', function (req, res){
  //新文件名
  //'./www/upload/dfb33662df86c75cf4ea8197f9d419f9' + '.png'
  var newName=req.files[0].path+pathLib.parse(req.files[0].originalname).ext;

  fs.rename(req.files[0].path, newName, function (err){
    if(err)
      res.send('上传失败');
    else
      res.send('成功');
  });

  //1.获取原始文件扩展名
  //2.重命名临时文件
});

server.listen(8082);

```
```html
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <form action="http://localhost:8082" method="post" enctype="multipart/form-data">
    文件：<input type="file" name="f1">
    <input type="submit" value="上传">
  </form>
</body>
</html>
```
##### consolidate-模板引擎适配
- 模板引擎整合，帮助express适配各种不同的模板引擎
```js
const consolidate=require('consolidate');
//配置模板引擎
//输出什么东西
server.set('view engine', 'html');
//模板文件放在哪儿
server.set('views', './views');
//哪种模板引擎
server.engine('html', consolidate.ejs);

//接收用户请求
server.get('/index', function (req, res){
  res.render('1.ejs', {name: 'blue'});
});
```
##### router-路由
- 把不同的目录，对应到不同的模块
```js
const express=require('express');

var server=express();

//目录1：/user/
var routeUser=express.Router();

routeUser.get('/1.html', function (req, res){   //http://xxx.com/user/1.html
  res.send('user1');
});
routeUser.get('/2.html', function (req, res){   //http://xxx.com/user/2.html
  res.send('user22222');
});

server.use('/user', routeUser);

//目录2：/article/
var articleRouter=express.Router();
server.use('/article', articleRouter);

articleRouter.get('/10001.html', function (req, res){   //http://xxxx.com/article/10001.html
  res.send('asdfasdfasdf');
});

server.listen(8080);

```
##### 数据库-MySQL
- 关系型数据库：MySQL、Oracle、SQLServer、Access、db2、fox、pro
- 比较
  - MySQL
    > 免费，中小网站首选
    优点：性能非常不错
    缺点：集群、容灾相对弱一些
  - Oracle
    > 挺贵，适合大型应用，银行金融级别的，一般大公司或者数据中心用的都是Oracle
    有点：性能非常不错，集群、容灾非常强
- 数据存在Server端，管理工具Navicat、Node存在Client端
- 数据库基本概念
  - 两种单位
    - 库：文件夹--用于管理，本身没法存数据
    - 表：文件--存储数据
    > - 行：一条数据
    > - 列（字段/域）：一个数据项
  - 主键：唯一标识符
    > 必须是唯一的
    > 性能最高
  - NodeJS默认不支持MySQL，需install
  ##### SQL：结构化查询语句
  - 标准写法
    > 关键字大写
    > 库、表、字段需要加上`反单引号即"``"`
  - 增-INSERT
    > INSERT INTO 表（字段列表） VALUES（值列表）=
    ```sql
    INSERT INTO `user_table`(`ID`,`username`,`password`) VALUES(0,'blues','123456')
    ```
  - 删-DELETE
    > DELETE FROM 表 WHERE 条件
  - 改-UPDATE
    > UPDATE 表 SET 字段=值，字段=值，字段=值... WHERE 条件
  - 查-SELECT
    > SELECT 什么 FROM 表
    ```sql
    SELECT * FROM `user_table`
    ```
    ```js
    const mysql = require('mysql')
    //连接到服务器
    //createConnection(哪台服务器，用户名，密码，库)
    let db = mysql.createConnection({host:'localhost',user:'root',password:'1q2w3e4r',database:'20180529'})
    //查询
    //query(操作类型，回调)
    db.query("SELECT * FROM `user_table`;",function(err,data){
      if(err){
        console.log(JSON.stringify(err))
      }else{
        console.log(JSON.stringify(data))
      }
    })
    ```
  - 子句
    - WHERE 条件
      > `WHERE age>18 AND score<60 OR cach>10000`
    - ORDER 排序
      > `ORDER BY age ASC/DESC,sales DESC `
    - GROUP 聚类--合并相同
      > - 计数： 
      `SELECT COUNT(*) FROM datatables`
      > - 按照班级合并：
        `SELECT class,COUNT(class) FROM student_table GROUP BY class`
      > - 获取班级平均分：
      `SELECT class,AVG(score) FROM sttudent_table GROUP BY class`
      > - 每个班级的最高分和最低分：
      `SELECT class,MAX(score),MIN(score) FROM sttudent_table GROUP BY class`
      > - 按照消费总额排序
      `SELECT name SUM(peice) FROM sales_table GROUP BY name ORDER BY SUM(price) DESC`
    - LIMIT 限制输出
      > - 常在分页中使用
      `LIMIT 10` 前十条数据
      `LIMIT 5,8` 从第五要八条数据
      > - 子句顺序： `WHERE -> GROUP -> ORDER -> LIMIT`
  ##### 项目实例
  - 检查登录状态
    ```js
    router.use((req, res, next)=>{
      if(!req.session['admin_id'] && req.url!='/login'){ //没有登录
        //页面重定向
        res.redirect('/admin/login');
      }else{
        next();
      }
    });
    ```
  - 加密
    ```js
    const crypto=require('crypto');

    var obj=crypto.createHash('md5');
    //对数据加密
    obj.update('123456');
    //获取16进制的返回结果
    var str=obj.digest('hex');

    console.log(str);

    ```
    > 写成可引用的模块
    ```js
    const crypto=require('crypto');

    module.exports={
      //加密后缀
      MD5_SUFFIX: 'FDSW$t34tregt5tO&$(#RHuyoyiUYE*&OI$HRLuy87odlfh是个风格热腾腾)',
      md5: function (str){
        var obj=crypto.createHash('md5');

        obj.update(str);

        return obj.digest('hex');
      }
    };

    ```
    > 引用
    ```js
    const common=require('./libs/common');

    var str='123456';
    var str=common.md5(str+'FDSW$t34tregt5tO&$(#RHuyoyiUYE*&OI$HRLuy87odlfh是个风格热腾腾)');

    console.log(str);

    ```
    
