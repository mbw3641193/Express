# EXPRESS

[Express 中文API文档](http://www.expressjs.com.cn)

#### 安装express
```
npm install express body-parser express-session --save

//body-parser与express-session是中间件
```

### express 中的重要属性跟方法

* req:request的缩写，并不是源生node中的req，而是express框架封装处理的，也是存储了很多客户端传递信息的对象
* 
* - req.params :            存储的是路径参数
* - req.path :              请求的路径名称
* - req.query :             请求的问号传参信息(是一个对象)
* - req.body :              当请求的方式是POST，我们基于body-parser中间件处理后，会把客户端请求主体中传递的内容存放到body属性上
* - req.session :           当我们基于express-session 中间件处理后，会把session操作放到这个属性上，基于这个属性可以操作session信息
* req.cookies :            当我们基于cookie-parser 中间件处理后，会把客户端传递的cookie信息存放到这个属性上
* req.get :                获取指定的请求头信息
* req.param :              基于这个方法可以把url-encoded格式字符串(或者路径参数)某个属性名对应的信息获取到
* ...
* 
* 
* res:response的缩写，并不是源生node中的res，而是express框架封装处理的，为了提供一些属性和方法，供服务器端向客户端返回内容
* 
* - res.cookie()            通过此方法可以设置一些cookie信息，通过响应头set-cookie返回给客户端。客户端把返回的cookie信息种到本地
* res.type()               设置响应内容的MIME类型
* - res.status()            设置返回的状态码(一般都用这个,自己设置响应主体内容)
* res.sendStatus()         设置返回的状态码(执行此方法会结束响应。把状态码对应的信息当做主体返回)
* res.json()               向客户端返回json格式的字符串，但是允许我们传递json格式对象，方法会帮我们转化为字符串再返回(执行此方法后会自动结束响应,也就是自动执行end)
* res.sendFile(path)       首先把path指定的文件中内容得到，然后把内容返回给客户端浏览器(完成了读取和响应两个操作),也会自动结束响应
* - res.send()              随便返回什么(json跟sendFile的综合体，这个比较常用)
* res.set()                设置响应头
* 
* - res.redirect()          响应是重定向的(状态码302)
* res.render()             页面需要服务器渲染的时候我们才会用这个方法(基本没用了)