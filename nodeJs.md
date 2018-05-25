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
      > 用户可以轻松的看到并修改所有cookie，因此不安全并且有限
    - session：
      > 也是保存数据，但是保存在服务端，安全并且无限
      > session不能独立存在，是基于cookie实现的
      > cookie中会有一个session的ID，服务器利用sessionId找到session文件进行读取和写入的操作
      > 隐患：session劫持
  - cookie
    - 写入
      ```javascript
      server.use('/aaa/a.html', function (req, res){
        res.cookie('user', 'blue', {path: '/aaa', maxAge: 30*24*3600*1000});
      });
      ```
    - 读取（cookie-parser）
      > `const cookieParser=require('cookie-parser');`
      > ` console.log(req.cookies);`
    - 发送（cookie-session）
