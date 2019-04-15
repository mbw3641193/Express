//使用Express来创建服务
let express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    session = require('express-session');
let { readFile, writeFile } = require('./utils/fs-promise');


let port = 8686;

app.listen(port, () => {
    console.log('server is success,listen on---' + port);
});

/********************* 中间件 **********************/
//body-parser   req.body获取
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//express-session   req.session获取
app.use(session({
    secret: 'mbw',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 }
}))

//自定义中间件：读取json数据
app.use(async (req, res, next) => {
    let userData = await readFile('./public/companylist.json'); //await返回的是readFile处理完成的结果，即是一个string字符串
    req.userData = JSON.parse(userData);

    next();
})

/********************* API处理 **********************/
//登录
app.post('/login', (req, res) => {
    let success_login = { code: 1, size: '登录成功' };  //成功返回的字段
    let fail_login = { code: 0, size: '登录失败' };  //失败返回的字段

    let { name = '', password = '' } = req.body;

    password.substr(4, 24).split('').reverse().join(''); //对password进行二次加密，删除前4位与后4位，再翻转顺序

    let result = req.userData.find(item => {     //验证密码是否存在 ,找不到返回undefined
        return (item.name == name || item.phone == name) && item.password == password;
    });
    console.log('result----------' + result);

    if (result) { //登陆成功, 并且 种下并记录session(是否登录、登录用户的id)
        req.session.isLogin = true;
        req.session.userID = result.index;

        res.send(success_login);
        console.log(success_login);
        return;

    } else {
        res.send(fail_login);
        console.log(fail_login);
    }

});


//检测是否登录
app.get('/checkLogin', (req, res) => {
    let success_isLogin = { code: 1, size: '已登录' };  //成功返回的字段
    let fail_isLogin = { code: 0, size: '未登录' };  //失败返回的字段

    let isLogin = req.session.isLogin;
    if (isLogin) {
        res.send(success_isLogin);
        return;
    }
    res.send(fail_isLogin);
});


//退出登录
app.get('/exitLogin', (req, res) => {
    let exitLogin = { code: 0, size: '成功删除' };

    req.session.isLogin = false;
    req.session.userID = null;

    res.send(exitLogin);
});


//获取用户信息：没有传递用户id就获取当前登录用户的信息
app.get('/getUser', (req, res) => {
    let fail_getUser = { code: 0, size: '获取失败',data:null  };  //失败返回的字段

    let {userID=req.session.userID} = req.query;  //query : get请求下问号传参的参数。如果是空，那么默认传session里面存储的userID
    
    let result = req.userData.find(item => {
        return item.index === userID;
    });

    if(result){
        res.send({          //成功返回的字段
            code: 1, 
            size: '获取成功', 
            data:{...result,password:null}  //返回用户信息，但是不显示登录密码
        });
        return;
    }
    res.send(fail_getUser);
})




/********************* 静态资源文件处理 **********************/
app.use(express.static('./public'));
app.use((req, res, next) => {
    res.status(404);
    res.redirect('/404.html');
})






