[TOC]
****
### 基础知识
#### MVVM与MVC
- MVC:Model-View-Controller
  > - Model——即模型。模型一般都有很好的可复用性，统一管理一些我们需要使用的数据。
  View——就是存放视图使用的。
  Controller——控制器它负责处理View和Model的事件。
  > - MVC模式，需要服务器端配合，JavaScript可以在前端修改服务器渲染后的数据。
- MVVM:Model-View-ViewMode
  > - 在前端页面中，把Model用纯JavaScript对象表示，View负责显示，两者做到了最大限度的分离
  > - 把Model和View关联起来的就是ViewModel
  > - ViewModel负责把Model的数据同步到View显示出来，还负责把View的修改同步回Model。
#### webpack
##### 什么是webpack
- WebPack可以看做是模块打包机：它做的事情是，分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript等），并将其转换和打包为合适的格式供浏览器使用。
##### webpack、Grunt以及Gulp
- 其实Webpack和另外两个并没有太多的可比性，Gulp/Grunt是一种能够优化前端的开发流程的工具，而WebPack是一种模块化的解决方案，不过Webpack的优点使得Webpack在很多场景下可以替代Gulp/Grunt类的工具。
- Grunt和Gulp的工作方式是：在一个配置文件中，指明对某些文件进行类似编译，组合，压缩等任务的具体步骤，工具之后可以自动替你完成这些任务。
- Webpack的工作方式是：把你的项目当做一个整体，通过一个给定的主文件（如：index.js），Webpack将从这个文件开始找到你的项目的所有依赖文件，使用loaders处理它们，最后打包为一个（或多个）浏览器可识别的JavaScript文件。
- 如果实在要把二者进行比较，Webpack的处理速度更快更直接，能打包更多不同类型的文件。
#### js
##### 基础
- 判断类型
  typeof(obj) === "string"
  typeof obj === "string"
  obj.constructor === String
- 判断类型
  去除所有空格: str = str.replace(/\s*/g,""); 
  去除两头空格: str = str.replace(/^\s*|\s*$/g,"");
  去除左空格： str = str.replace( /^\s*/, "");
  去除右空格： str = str.replace(/(\s*$)/g, "");
- 浏览器的内核分别是什么
  > IE: trident内核
    Firefox：gecko内核
    Safari：webkit内核
    Opera：以前是presto内核，Opera现已改用Google Chrome的Blink内核
    Chrome：Blink(基于webkit，Google与Opera Software共同开发)
- sessionStorage 、localStorage 和 cookie 之间的区别
  > 共同点：用于浏览器端存储的缓存数据
    不同点：
    (1)、存储内容是否发送到服务器端：当设置了Cookie后，数据会发送到服务器端，造成一定的宽带浪费；
    web storage,会将数据保存到本地，不会造成宽带浪费；
    (2)、数据存储大小不同：Cookie数据不能超过4K,适用于会话标识；web storage数据存储可以达到5M;
    (3)、数据存储的有效期限不同：cookie只在设置了Cookid过期时间之前一直有效，即使关闭窗口或者浏览器；
    sessionStorage,仅在关闭浏览器之前有效；localStorage,数据存储永久有效；
    (4)、作用域不同：cookie和localStorage是在同源同窗口中都是共享的；sess ionStorage不在不同的浏览器窗口中共享，即使是同一个页面；
- Web Storage与Cookie相比存在的优势
  > (1)、存储空间更大：IE8下每个独立的存储空间为10M，其他浏览器实现略有不同，但都比Cookie要大很多。
  (2)、存储内容不会发送到服务器：当设置了Cookie后，Cookie的内容会随着请求一并发送的服务器，这对于本地存储的数据是一种带宽浪费。而Web Storage中的数据则仅仅是存在本地，不会与服务器发生任何交互。
  (3)、更多丰富易用的接口：Web Storage提供了一套更为丰富的接口，如setItem,getItem,removeItem,clear等,使得数据操作更为简便。cookie需要自己封装。
  (4)、独立的存储空间：每个域（包括子域）有独立的存储空间，各个存储空间是完全独立的，因此不会造成数据混乱。
- 请指出document load和document ready的区别
  > 共同点：这两种事件都代表的是页面文档加载时触发。
    异同点：
    ready 事件的触发，表示文档结构已经加载完成（不包含图片等非文字媒体文件）。
    onload 事件的触发，表示页面包含图片等文件在内的所有元素都加载完成。
- let，const，var 区别
  > var：函数作用域，存在变量提升 
    let：块作用域，不存在变量提升 
    const：不能修改的是栈内存在的值和地址。声明一个基本类型的时候为常量，不可修改；声明对象可以修改
- 4、请说说get和post请求的区别，什么时候用post？ 
    > 1、GET：一般用于信息获取，使用URL传递参数，对所发送信息的数量也有限制，一般在2000个字符，安全性很低 
    2、POST：一般用于修改服务器上的资源，通过提交表单来传值，对所发送的信息没有限制，安全性比GET高 
    3、在以下情况中，使用 POST 请求： 
    无法使用缓存文件（更新服务器上的文件或数据库） 
    向服务器发送大量数据（POST 没有数据量限制） 
    发送包含未知字符的用户输入时，POST 比 GET 更稳定也更可靠 
    需要修改服务器上的资源的时候
#### jQuery
-  jQuery 库中的 $() 是什么？
  > \$() 函数是 jQuery() 函数的别称。\$() 函数用于将任何对象包裹成 jQuery 对象，接着你就被允许调用定义在 jQuery 对象上的多个不同方法。你可以将一个选择器字符串传入 $() 函数，它会返回一个包含所有匹配的 DOM 元素数组的 jQuery 对象。
- jquery中$.get()提交和$.post()提交有区别吗?
  > 相同点：都是异步请求的方式来获取服务端的数据；
  > 异同点：
   > - 请求方式不同：$.get() 方法使用GET方法来进行异步请求的。$.post() 方法使用POST方法来进行异步请求的。
   > - 参数传递方式不同：get请求会将参数跟在URL后进行传递，而POST请求则是作为HTTP消息的实体内容发送给Web服务器的，这种传递是对用户不可见的
   > - 数据传输大小不同：get方式传输的数据大小不能超过2KB 而POST要大的多
   > - 安全问题： GET 方式请求的数据会被浏览器缓存起来，因此有安全问题。
- 简述一下src与href的区别
  > href 是指向网络资源所在位置，建立和当前元素（锚点）或当前文档（链接）之间的链接，用于超链接。
  src是指向外部资源的位置，指向的内容将会嵌入到文档中当前标签所在位置；在请求src资源时会将其指向的资源下载并应用到文档内，例如js脚本，img图片和frame等元素。
  当浏览器解析到该元素时，会暂停其他资源的下载和处理，直到将该资源加载、编译、执行完毕，图片和框架等元素也如此，类似于将所指向资源嵌入当前标签内。这也是为什么将js脚本放在底部而不是头部。
- 简述同步和异步的区别
  > 同步是阻塞模式，异步是非阻塞模式。
    同步就是指一个进程在执行某个请求的时候，若该请求需要一段时间才能返回信息，那么这个进程将会一直等待下去，直到收到返回信息才继续执行下去；
    异步是指进程不需要一直等下去，而是继续执行下面的操作，不管其他进程的状态。当有消息返回时系统会通知进程进行处理，这样可以提高执行的效率
- 一次完整的HTTP事务是怎样的一个过程
  > 基本流程：
    a. 域名解析
    b. 发起TCP的3次握手
    c. 建立TCP连接后发起http请求
    d. 服务器端响应http请求，浏览器得到html代码
    e. 浏览器解析html代码，并请求html代码中的资源
    f. 浏览器对页面进行渲染呈现给用户
#### ajax
##### 定义和用法
> AJAX = Asynchronous JavaScript and XML（异步的 JavaScript 和 XML）。Ajax 是一种用于创建快速动态网页的技术。Ajax 是一种在无需重新加载整个网页的情况下，能够更新部分网页的技术。
传统的网页（不使用 Ajax）如果需要更新内容，必须重载整个网页页面。
##### 优点
1.减轻服务器的负担,按需取数据,最大程度的减少冗余请求
2.局部刷新页面,减少用户心理和实际的等待时间,带来更好的用户体验
3.基于xml标准化,并被广泛支持,不需安装插件等,进一步促进页面和数据的分离
##### 缺点：
1.AJAX大量的使用了javascript和ajax引擎,这些取决于浏览器的支持.在编写的时候考虑对浏览器的兼容性.
2.AJAX只是局部刷新,所以页面的后退按钮是没有用的.
3.对流媒体还有移动设备的支持不是太好等
##### AJAX的工作原理
1.创建ajax对象（XMLHttpRequest/ActiveXObject(Microsoft.XMLHttp)）
2.判断数据传输方式(GET/POST)
3.打开链接 open(
4.发送 send()
5.当ajax对象完成第四步（onreadystatechange）数据接收完成，判断http响应状态（status）200-300之间或者304（缓存）执行回调函数
#### 跨域
- 由于浏览器同源策略，凡是发送请求url的协议、域名、端口三者之间任意一与当前页面地址不同即为跨域。存在跨域的情况： 
  > 网络协议不同，如http协议访问https协议。 
  端口不同，如80端口访问8080端口。 
  域名不同，如qianduanblog.com访问baidu.com。 
  子域名不同，如abc.qianduanblog.com访问def.qianduanblog.com。 
  域名和域名对应ip,如www.a.com访问20.205.28.90.
- 跨域请求资源的方法： 
  (1)、porxy代理 
  定义和用法：proxy代理用于将请求发送给后台服务器，通过服务器来发送请求，然后将请求的结果传递给前端。
  实现方法：通过nginx代理；
  注意点：1、如果你代理的是https协议的请求，那么你的proxy首先需要信任该证书（尤其是自定义证书）或者忽略证书检查，否则你的请求无法成功。
  (2)、CORS 【Cross-Origin Resource Sharing】
  定义和用法：是现代浏览器支持跨域资源请求的一种最常用的方式。
  使用方法：一般需要后端人员在处理请求数据的时候，添加允许跨域的相关操作。如下：
  ```js
  res.writeHead(200, {
      "Content-Type": "text/html; charset=UTF-8",
      "Access-Control-Allow-Origin":'http://localhost',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type'
  });
  ```
(3)、jsonp
  - 定义和用法：通过动态插入一个script标签。浏览器对script的资源引用没有同源限制，同时资源加载到页面后会立即执行（没有阻塞的情况下）。
  - 特点：通过情况下，通过动态创建script来读取他域的动态资源，获取的数据一般为json格式。
#### 开发及性能优化
- 规避javascript多人开发函数重名问题
  > 命名空间
  封闭空间
  js模块化mvc（数据层、表现层、控制层）
  seajs
  变量转换成对象的属性
  对象化
- 请说出三种减低页面加载时间的方法
  > 压缩css、js文件
  合并js、css文件，减少http请求
  外部js、css文件放在最底下
  减少dom操作，尽可能用变量替代不必要的dom操作
- 你所了解到的Web攻击技术
  >（1）XSS（Cross-Site Scripting，跨站脚本攻击）：指通过存在安全漏洞的Web网站注册用户的浏览器内运行非法的HTML标签或者JavaScript进行的一种攻击。
（2）SQL注入攻击
（3）CSRF（Cross-Site Request Forgeries，跨站点请求伪造）：指攻击者通过设置好的陷阱，强制对已完成的认证用户进行非预期的个人信息或设定信息等某些状态更新。
##### web前端开发，如何提高页面性能优化？
- 内容方面：
1.减少 HTTP 请求 (Make Fewer HTTP Requests)
2.减少 DOM 元素数量 (Reduce the Number of DOM Elements)
3.使得 Ajax 可缓存 (Make Ajax Cacheable)
- 针对CSS：
1.把 CSS 放到代码页上端 (Put Stylesheets at the Top)
2.从页面中剥离 JavaScript 与 CSS (Make JavaScript and CSS External)
3.精简 JavaScript 与 CSS (Minify JavaScript and CSS)
4.避免 CSS 表达式 (Avoid CSS Expressions)
- 针对JavaScript ：
1. 脚本放到 HTML 代码页底部 (Put Scripts at the Bottom)
2. 从页面中剥离 JavaScript 与 CSS (Make JavaScript and CSS External)
3. 精简 JavaScript 与 CSS (Minify JavaScript and CSS)
4. 移除重复脚本 (Remove Duplicate Scripts)
- 你有哪些性能优化的方法？ 
  1. 减少 HTTP 请求 
  2. 减少 DNS 查找 
  3. 避免重定向 
  4. 使用 Ajax 缓存 
  5. 延迟载入组件 
  6. 预先载入组件 
  7. 减少 DOM 元素数量 
  8. 切分组件到多个域 
  9. 最小化 iframe 的数量 
  10. 不要出现http 404 错误
#### 其他
- 对前端工程师这个职位你是怎么样理解的
  > a. 前端是最贴近用户的程序员，前端的能力就是能让产品从 90分进化到 100 分，甚至更好
  b. 参与项目，快速高质量完成实现效果图，精确到1px；
  c. 与团队成员，UI设计，产品经理的沟通；
  d. 做好的页面结构，页面重构和用户体验；
  e. 处理hack，兼容、写出优美的代码格式；
  f. 针对服务器的优化、拥抱最新前端技术。