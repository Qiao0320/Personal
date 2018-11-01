[TOC]
****
#### JS基础知识
##### JS基本数据类型
- 基本：number string boolean null undefined
- Object func...
- Symbol(es6)
##### 对象、数组的操作方法
- 操作数组的方法：
  > - 能改变原数组（数组的变异）： pop push unshift shift  splice reverse sort
  > - 不改变原数组：indexOf lastIndexOf concat slice
  > - es5：forEach filter map some every reduce 
  > - ea6：includes find 
- forEach,for in,for,for of的区别
  > - forEach ：不支持return
  > - for in ：for(let key in arr)key会变成string类型，也可以遍历数组的私有属性
  > - for of ：for(let val of arr)支持return，不能遍历对象
  > - Object.keys会将对象的key作为新的数组
- filter
  > - 不操作原数组
  > - 返回结果：返回过滤后的新数组
  > - 回调函数的返回结果：若true表示放在新数组中，若false则不放
- map
  > - 将原有数组映射成新数组，不操作原数组
  > - 返回结果：返回映射后的新数组
  > - 回调函数的返回结果：这一项映射后的值
- 模板字符串
  > - "``",遇到变量用${}取值
- includes
  > - 返回结果：返回布尔类型
- find
  > - 不改变原数组，返回到的那一项
  > - 回调函数中返回处表示找到了，找到后停止循环
  > - 找不到返回undefined
- some
  > - 找到true后停止，返回true，找不到返回false
- every
  > - 找到false后停止，返回false
- reduce（收敛）
  > - 4个参数(prev-上一个,next-下一个,index-索引,item-原数组)，原数组不发生变化
  > - 返回结果：返回叠加后的结果，本次的返回值会作为下一次的prev，可默认指定第一次的prev
- 闭包
  > 函数执行的一瞬间，不销毁的作用域
  > 当执行后返回的结果必须是应用数据类型，被外界变量接受，此时这个函数不会被销毁（模块化）
  > 在vue中很多时候不能用箭头函数
#### vue
##### vue是一个框架
- 框架
  > - 拥有完整的解决方案  写好之后被调用
  > - vue是一个渐进式增强框架，通过组合完成一个完整的框架
  > - vue全家桶：vue + vue-router + vuex + axios
- 库
  > - 主动去调用
  > - jquery underscore zepto animate.ss
- vue特点
  - 核心只关注视图层，易学、轻量、灵活，适用于移动端项目
  - 渐进式框架
    > 声明式渲染（无需关心如何实现）
    > 组件系统
    > 客户端路由(vue-router)
    > 大规模状态管理(vuex)
    > 构建工具(vue-cli)
  - mvvm框架（双向）：angular，vue，MVC是单向的
  - 不支持IE8以下版本浏览器，使用了Object.defineProperty(es5)，没有替代方案
##### 安装
- npm init 产生一个package.json文件，描述项目的依赖
- moustache语法，“{{}}”取变量，可以赋值取值和三元
##### 使用
- vue指令
  > directive，即dom上的行间属性，vue给这类属性赋予一定的意义来实现特殊的功能，所有指令都以v-开头，后面的值都是变量
  - v-model双向绑定数据，value selected checked 都没有意义
    > 如果CheckBox、select多选是数组，提供一个value属性
  - v-text防止{{}}出现在页面上
  - v-once只渲染一次，数据发生变化时不会导致页面更新
  - v-html把HTML字符串当做HTML渲染
  - v-cloak 解决块级闪烁问题`[v-clock]{display:none}`后期不采用
  - v-for循环 v-on绑定事件@取代
  - v-if操纵的是dom，v-show操作的是样式
##### created钩子函数
- 专门用来发送ajax方法，在数据初始化之后会调用
- 生命周期
  - beforeCreate created
  - beforeMount mounted挂载，dom渲染完毕
  - beforeUpdate updated数据更新时（使用时可用watch代替）
  - beforeDestroy destroyed
##### axios
- axios：基于promise的ajax库
  > 封装ajax方法
  ```js
  function ajax({url='',type='get',dataType='json'})  {
    return new Promise((resolve,reject)=>{
        let xhr = new XMLHttpRequest();
        xhr.open(type,url,true);
        xhr.responseType = dataType;
        xhr.onload = function () {
            resolve(xhr.response);
        }
        xhr.onerror = function (err) {
            reject(err);
        }
        xhr.send();
    })
  }
  ```
  > 调用
  ```js
  ajax({url:'./data.json'}).then((res)=>{
      console.log(res);
  },(err)=>{
      console.log(err);
  });
  ```
- fetch
- async await 异步的终极解决方案
- vue的ui框架：iview，mintui，elementui
- 修饰符：
  - .number让输入框的值变成数字类型
  - .lazy是输入框的值不实时更新而是失去焦点的时候更新
  - @事件.stop停止事件传播`stopPropagation cancelBubble`的解决方法
  - @事件.capture捕获，子元素的事件会被有capture的父元素捕获先执行
  - @事件.prevent不要执行与事件关联的默认行为
  - @事件.self只绑定在事件源上
  - .sync
- filters过滤器，使用时用管道符调用
- 动画库：animate
##### computed计算“属性”不是方法
> 方法不会有缓存，computed会根据依赖（归vue管理的书籍，可以响应式变化的）的属性进行缓存
- 两部分组成有get和set（不能只写set）一般情况下通过js赋值影响其他人或者表单元素设置值的时候会用到set
- 默认调用get方法，必须有return，不支持异步
##### watch
  > 观察对象（newVal,oldVal）{}
  - watch的属性名字要和观察的名字一致
  - 默认只监控一层的对象
  > 深度监控
  ```js
    watch:{
      todos:{
        handler(){
          //执行的操作
        },deep:true
      }
    }
  ```
  - 单页面开发
  - 通过hash记录跳转的路径（可以产生历史管理）
  - 浏览器自带的历史管理的方法（history.pushState）
  - 定义指令directives：{}
  > 名字要驼峰
  ```js
  directives:{
    color(el,bings){
      el.style.background = bindings.value
    }
  }
  ```
  - localstorage
  > 默认存的是字符串
  - window.location
  `console.log(window.location)`
  >
  ```js
  hash:"#en/zh/era"
  host:"www.baidu.com"
  hostname:"www.baidu.com"
  href:"http://www.baidu.com/s?wd=era&ie=utf-8&rsv_op=fJJW065J21MJX78N1Q0J33Ye7ZWOMXTbQ73PN1TR04e7STQhPLhNPN8S8hUgacYQR1M7IJZO9R8g04cfOYWShVMRIT0O7Rgd&tn=78040160_26_pg&ch=11&rsv_su=700bPdJI5NgJ5g9efZTR2I8TbW28456VdbfUdc8O8bZSLhhNNgcTJQ5K0W63PW9a8VT427h5806LT8UN5YbOcMVTMY2XOLWh"
  origin:"http://www.baidu.com"
  pathname:"/s"
  port:""
  protocol:"http:"
  ```
##### mounted
- this.$data vue实例上的数据
- this.$watch 监控
- this.$el 当前el元素
- this.$set 后加的属性实现响应式变化
- this.$options vue实例上的一些属性
- this.$nextTick 异步方法，dom渲染完成后执行 
 > dom渲染是异步的，如果数据变化之后想要获取真实dom中的内容，需要等待页面渲染完毕之后再去获取，所有的dom操作，最好在nextTick中
- this.$refs 所有赋予ref属性的dom元素的集合 

##### 组件
- 全局组件
  > 可以一次声明在任何地方使用，一般写插件的时候用的多一些
  - 组件名不要带有大写 多个单词用短线连接
  - 只要组件名和定义名字相同是可以的（首字母可以大写）
  - html采用短横线隔开命名法，js中转驼峰也是可以的
  - 组件中的数据必须是函数类型，返回一个实例作为组件的数据
- 局部组件
  > 必须告诉这个组件属于谁
  - 使用三部曲
   > 1.创建组件
   > 2.注册组件
   > 3.引用组件
  - 组件是相互独立的，不能直接跨作用域，实例也是一个组件，组件中拥有生命周期函数
  - 如果组件共用数据，会导致同时更新（独立性）
  - 子组件不能直接使用父组件的数据（组件之间的数据交互）
  - 组件理论上可以无限嵌套
  - 如果要在一个组件中使用另一个组件，先保证这个组件是真实存在的，在需要应用的实例上通过component注册这个组件，组件需要在父级的模板中通过标签的形式引用
  ```js
  let component1 = {
    template:'<div>组件1</div>'
  };
  let component2 = {
    template:'<div>组件2</div>'
  };
  let vm = new Vue({
    el:'#app',
    components:{
      component1,component2
    }
  })
  ```
  - 属性传递
    - 父传子
    ```html
    <div id="app">
      父亲：{{money}}
      <child :m="money"></child>
    </div>
    ```
    ```js
    let vm = new Vue({
        el:'#app',
        data:{
            money:100
        },
        components:{
            child:{
                props:{
                    m:{//校验属性的类型
                        type:[String,Boolean,Function,Object,Array]
                    }
                },
                template:'<div>儿子</div>'
            }
        }
    })
    ```
  ##### 发布emit(触发事件)订阅on（绑定事件）
  ```js
  function Girl() {
    this._events = {}
  }
  Girl.prototype.on = function (eventName,callback){
    if(this._events[eventName]){
      this._events[eventName].push(callback);
    }else{
      this._events[eventName] = [callback];
    }
  }
  Girl.prototype.emit = function (eventName){
    if(this._events[eventName]){
      this._events[eventName].forEach(cb=>cb());
    }
  }
  let girl = new Girl();
  let cry = () => {
    console.log('哭')
  }
  let shopping = () => {
    console.log('购物')
  }
  let eat = () => {
    console.log('吃')
  }
  girl.on('失恋',cry);
  girl.on('失恋',shopping);
  girl.on('失恋',eat);
  girl.emit('失恋')
  ```