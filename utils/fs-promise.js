let fs = require('fs');
let path = require('path');
//一般都会把传递的pathName进行处理；只需要传递相对路径，程序自动生成绝对目录地址
//__dirname是创建模块的路径，path.resolve()是使用模块的路径
let resolveName = path.resolve();

// mkdir/rmdir  2个参数 无result

// readdir  2个参数 有result

// readFile  3个参数 有result

// writeFile/appendFile  4个参数 无result

// copyFile

//1. 封装mkdir与rmdir  
//readdir封装到这个方法里面：result判断一下，如果有result则传result，没有则是空
//readFile封装到这个方法里面：把fs回调放到数组中，这样就可以增加第三个参数
//copyFile封装到这个方法里面：增加copyPath，默认是空
['mkdir','rmdir','readdir','readFile','copyFile','unlink'].forEach((item)=>{
    module.exports[item] = (pathName,copyPath = '') => {
        pathName = path.resolve(resolveName,pathName);
        copyPath = path.resolve(resolveName,copyPath); //为copyFile增加
        return new Promise((resolve,reject)=>{
            let arg = [(err,result)=>{
                if(err){
                    reject(err);
                    return;
                }
                resolve(result || '');
            }]
            if(item === 'readFile'){
                if( !/(JPG|JPEG|PNG|GIF|SVG|ICO|BMP|EOT|TTF|WOFF|MP3|MP4|OGG|WAV|M4A|WMV|AVI)$/i.test(pathName) ){
                   arg.unshift('utf8');
                }
            };
            item === 'copyFile' ? arg.unshift(copyPath) : null;
            fs[item](pathName,...arg);
        })
    }
});

//2. 封装writeFile/appendFile
['writeFile','appendFile'].forEach((item)=>{
    module.exports[item] = (pathName,content) => {
        path = path.resolve(resolveName,pathName);

        if(typeof content !== 'string'){
            content = JSON.stringify(content); //content必须是字符串
        }

        return new Promise((resolve,reject)=>{
            fs[item](path,content,'utf8',(err)=>{
                if(err){
                    reject(err);
                    return;
                }
                resolve();
            });
        })
    }
})
