//使用Express来创建服务
let express = require('express'),
    app = express(),
    bodyParser = require('body-parser');


let port = 8686;

app.listen(port,()=>{       //从创建服务到监听端口，两件事同时完成，并且以后有请求过来执行的是app这个方法(通过源码可以看出app本身是个方法，但其本身也可作为对象使用)；
    console.log('server is success,listen on---' + port);
});  

//静态资源文件处理
app.use(express.static('./public'));
//静态资源处理完成

//middleware
//一般中间件都写在前面
//中间件执行的顺序是按照书写的先后顺序执行
//比如/admin/user 下面两个中间件都会执行，那么就按照书写顺序执行，但是必须要加next。不执行next是无法走到下一个中间件或者请求中的
app.use('/admin',(req,res,next)=>{
    //请求的path地址中是以'/admin'开头的走这个中间件。例如'/admin','/admin/user'...
    next();
});
app.use(()=>{
    //所有的请求都会走这个中间件。
    next();
});

//body-parser
//如果是POST请求，会把基于请求主体传递的信息预先截获,并把转换后的结果挂载到req.body属性上

app.use(bodyParser.json());                         //如果传递的是JSON格式的字符串，基于bodyParser.json()会把它转换为JSON格式的对象
app.use(bodyParser.urlencoded({extended:false}));   //如果传递的是urlencoded格式的字符串，基于bodyParser.urlencoded()会把它转换为键值对方式的对象


//API处理
app.get('/getUser',(req,res)=>{
    /**
     * 当客户端向服务器端发送请求，如果请求方式是GET，请求路径是'/getUser'，就会把回调函数触发执行
     * 回调函数有3个参数：req、res、next
     * get请求，接受问号传参的信息，可以使用: req.query / req.param()
     */
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
