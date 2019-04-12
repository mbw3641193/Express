//使用Express来创建服务
let express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    session = require('express-session');


let port = 8686;

app.listen(port,()=>{       //从创建服务到监听端口，两件事同时完成，并且以后有请求过来执行的是app这个方法(通过源码可以看出app本身是个方法，但其本身也可作为对象使用)；
    console.log('server is success,listen on---' + port);
});  

//静态资源文件处理
app.use(express.static('./public'));
//静态资源处理完成


//body-parser
//如果是POST请求，会把基于请求主体传递的信息预先截获,并把转换后的结果挂载到req.body属性上
app.use(bodyParser.json());                         //如果传递的是JSON格式的字符串，基于bodyParser.json()会把它转换为JSON格式的对象
app.use(bodyParser.urlencoded({extended:false}));   //如果传递的是urlencoded格式的字符串，基于bodyParser.urlencoded()会把它转换为键值对方式的对象

//express-session
//供我们后续操作session的中间件，基于这个中间件，我们可以设置客户端cookie的过期时间(也理解为session在服务器端存储的时间)
app.use(session({
    secret: 'keyboard cat',                             //秘钥
    resave: false,                                      //resave是指每次请求都重新设置session cookie，假设你的cookie是10分钟过期，每次请求都会再设置10分钟
    saveUninitialized: false,                           // 是否保存未初始化的会话
    cookie: { maxAge : 1000 * 60 * 60 *24 * 30 }        // 设置 session 的有效时间，单位毫秒
}))


//API处理
app.get('/getUser',(req,res)=>{
    /**
     * 当客户端向服务器端发送请求，如果请求方式是GET，请求路径是'/getUser'，就会把回调函数触发执行
     * 回调函数有3个参数：req、res、next
     * get请求，接受问号传参的信息，可以使用: req.query / req.param()
     */
    req.session.xxx = 'xxx'             //设置session
    console.log(req.session.xxx)        //获取session

    res.send({
        code:1,
        message:'ok'
    });
});

app.post('/register',(req,res)=>{
    /**
     * 回调函数有3个参数：req、res、next
     * get请求，接受问号传参的信息，可以使用: req.query / req.param()
     * 接收请求出体传递的信息，此时我们需要使用一个中间件(body-parser)
     */
    console.log(req.body)   //获取的是请求主体内容(已通过body-parser中间件解析)
})
