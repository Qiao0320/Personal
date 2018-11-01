[TOC]
## 

### 兼容性
- IE10+，Chrome，FireFox，移动端，NodeJS
- 若不支持可以编译或者转换
    - 在线转换
    - 提前编译
        > 可以使用babel或者引用browser.js（一个东西）
        > 引用browser.js时script标签的type属性为“text/babel”（属于在线转换）

### 变量
##### ES6之前的缺陷
- 没有块级作用域
- var可以重复声明
- 无法限制修改（没有常量定义）
##### 6的改进
- 不能重复声明
- let变量
- const常量
- 增加块级作用域
```javascript
for (var i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log(i);
    }, 1000);
}
输出：5 -> 5 -> 5 -> 5 -> 5
```
```javascript   
for (let i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log(new Date, i);
    }, 1000);
}
输出：0 -> 1 -> 2 -> 3 -> 4
```
也可以使用闭包：
```javascript
for (var i = 0; i < 5; i++) {
    (function(i){
        setTimeout(function() {
            console.log(new Date, i);
        }, 1000);
    })(i)
}
输出：0 -> 1 -> 2 -> 3 -> 4
```

### 函数
##### 箭头函数
- 基本格式：()=>{}
    > 如果只有一个参数，'()'可以省
    > 如果只有一个return，'{}'可以省
        window.onload = ()=>{
            alert(1)
        }
    等价于
        window.onload = function(){
            alert(1)
        }
    ep：数组排序
        let arr = [1,9,78,-8,56];
        arr.sort((a,b)=>{
            return a-b
        });
        console.log(arr)
    输出：-8,1,9,56,78
    ep:简写
        let show = a=>a*2
##### 函数的参数
- 参数的展开/扩展
    > 作用：
    > 1. 收集剩余的参数,其中Rest Parameter（args）只能放在最后
        let show = function(a,b,...args){
            console.log(args)
        }
        show(1,2,3,4,5)
        输出：1,2,3,4,5
    > 2. 展开数组，展开后的效果就跟数组内容直接写出来一样
        let arr1 = [1,2,3];
        let arr2 = [4,5,6];
        let arr3 = [...arr1,...arr2]
        console.log(arr3)
        输出：[1,2,3,4,5,6]
    一起使用：
        function show(...args){
            fn(...args)
        }
        function fn(a,b){
            console.log(a+b)
        }
        show(2,3)
        输出：5
- 默认参数
        function show(a,b=1,c=2){
            console.log(a,b,c)
        }
        show(2,3)
        输出:2,3,2
##### 解构赋值
- 左右两边解构必须一样
- 右边必须是合法的解构
- 声明和赋值不能分开，必须在一句话里完成
    ep:
        let [a,b,c] =  [1,2,3]
        let {a,b,c} = {a:1,b:2,c:3}
        let [{a,b},[n1,n2],num,str] = [{a:3,b:4},[4,5],1,'sss']
### 数组
##### map（映射）
- 一个对一个
        let result = arr.map(function(item){
            return item*2
        })
    > 等价于
        let result = arr.map(item=>item*2)
    > ep:
        let score = [19,85,99,25,90]
        let result = score.map(item=>item>=60?'及格':'不及格')
        console.log(result)
    > 输出：[ "不及格", "及格", "及格", "不及格", "及格" ]
##### reduce（汇总）
- 一堆变一个
    > 求和：
        let arr = [19,85,99,25,90,456]
        let result = arr.reduce(function(tmp,item,index){
            return tmp+item
        })
        console.log(result)
    > 输出：774
    > 参数tmp：中间值
    > 求平均数：
    >   ` const arrayAverage = arr => arr.reduce((acc, val) => acc + val, 0) / arr.length;`
        console.log(arrayAverage([1,2,3]))
    > 输出：2
##### filter（过滤器）
- 留一部分删一部分
    > 保留能被3整除的数
        let result = (arr)=>arr.filter(item=>item%3==0)
        console.log(result([2,89,56,45,111]))
    > 输出：[45,111]
##### forEach（循环、迭代）
### 字符串
##### startsWith
##### endWith
##### 字符串链接（``）
        let title = '标题'
        let str = `<div>
                    <p>{title}</p>
                </div>`
### 面向对象
##### 对象
- 原先的面向对象
        function User(name,pass){
            this.name = name;
            this.pass = pass;
        }
        User.prototype.showName=function(){
            console.log(this.name)
        }
        User.prototype.showPass=function(){
            console.log(this.pass)
        }
        var ul = new User('blue','123456')
        ul.showName();
        ul.showPass();
    > 输出：blue 123456
- 现在的
        class User{
            constructor(name,pass){
                this.name = name;
                this.pass = pass;
            }
            showName(){
                console.log(this.name)
            }
            showPass(){
                console.log(this.pass)
            }
        }
        var ul = new User('blue','123456')
        ul.showName();
        ul.showPass();
    > 输出：blue 123456
- 增加class关键字，构造器和类分开了，class里面直接加方法
##### 继承
- 原先的继承（call）
    > ep：继承User
        function VipUser(name,pass,level){
            User.call(this,name,pass)
            this.level = level
        }
        VipUser.prototype = new User()
        VipUser.prototype.constructor = VipUser
        VipUser.prototype.showLevel = function(){
            console.log(this.level)
        }
        var ul = new VipUser('blue','123456','3')
        ul.showName();
        ul.showPass();
        ul.showLevel();
- 现在（super）
        class VipUser extends User{
            constructor(name,pass,level){
                super(name,pass)
                this.level = level
            }
            showLevel(){
                console.log(this.level)
            }
        }
##### 以React为例
- 组件化
- 以来JSX==babel==browser.js
        <div id="root"></div>
        <script type="text/babel">
        class Item extends React.Component{
            constructor(...args){
                super(...args)
            }
            render(){
                return <li>{this.props.str}</li>
            }
        }
        class List extends React.Component{
            constructor(...args){
                super(...args)
            }
            render(){
                let aItems=[];
                for(let i=0;i<this.props.arr.length;i++){
                    aItems.push(<Item str={this.props.arr[i]}></Item>)
                }
                return <ul>{aItems}</ul>
            }
        }
        ReactDOM.render(
            <List arr={['a123','b123','c123']}></List>,
            document.getElementById('root')
        );
        </script>
> List的render可以改为
        render(){
            let aItems=this.props.arr.map(a=><Item str={a}></Item>)
            return <ul>{aItems}</ul>
        }
    或者
        render(){
            return <ul>{this.props.arr.map(a=><Item str={a}></Item>)}</ul>
        }
### json
##### JSON对象
- json的标准写法：
    - 1.只能用双引号
    - 2.所有的名字(key)都必须用引号包起来
- JSON.stringify
- JSON.parse
##### JSON简写
- 名字一样可以简写
        let a = 3
        let b = 5
        let json = {a,b}
- 函数
        show(){
            console.log(this.a)
        }
### Promise
##### 异步和同步
- 异步：操作之间没有关系，可以同时进行多个操作
    > 使代码更复杂
- 同步：操作之间是相关的，同时只能做一件事
    > 代码简单
##### Promise--消除异步操作
- 用同步的方式，书写异步代码
- Promise.all
        function creatPromise(url){
            let p = new Promise(function (resolve,reject){
                $.ajax({
                    url:url,
                    dataType:'json',
                    succecc(arr){
                        resolve(arr)
                    },
                    erroe(err){
                        reject(err)
                    }
                })
            })
        }
        Promise.all([
            creatPromise('./test1.text'),'./test2.text'].then(function(arr){
            let [res1,res2]=arr
            alert('成功')
        },function(){
            alert('失败')
        }))
- Promise.race
        Promise.race([
            $.ajax({url:'ddd'}),
            $.ajax({url:'aaa'}),
            ])
### yield（generator）
- generator(生成器)
- 普通函数一路执行到底，generator函数中间可以停下来
        function *show(){
            alert('a')
            //这里停止
            yield
            alert('b')
        }
        let genObj = show()
        //执行到第一个yield即停
        genObj.next()
        genObj.next()
- yield(放弃)：既可以传参，又可以返回
        function *show(){
            alert('a')
            let a = yield
            alert('b')
            alert(a)
        }
        let gen = show()
        gen.next(12)
        gen.next(5)
    > 输出json对象{"done":false,"value":12},{"done":false,"value":12}
        function *炒菜(新鲜的菜){
            洗菜-->洗好的菜
            let 干净的菜 = yield 洗好的菜
            干净的菜--> 切-->丝
            let 切好的菜 = yield 丝
            切好的菜-->炒--> 熟菜
            return 熟菜
        }
- 异步操作
    - 回调
    - Promise
    - generator
    - Promise和generator的比较
    > 带逻辑的Promise
        Promise.all([
            $.ajax({url:'getUserData',dataType:'json'})
        ]).then(result=>{
            let userData = result[0]
            if(userData.type=='VIP'){
                Promise.all([
                    $.ajax({url:'getVipItems',dataType:'jaon'})
                ]).then(result=>{
                    let vipItems = result[0]
                    //数据处理，显示等等
                },err=>{
                    alert('错了')
                })
            }
        },err=>{
            alert('错了')
        })
    > 带逻辑的generator
        runner(function *(){
            let userData = yield $.ajax({url:'getUserData',dataType:'json'})
            if(userData.type=='VIP'){
                let vipItems = yield $.ajax({url:'getVipItems',dataType:'jaon'})
            }
        })
    > 很明显generator更简单，Promise更适合一次性发出许多请求，generator更适合处理带逻辑的请求
### 复习



