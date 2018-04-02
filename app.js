// 导入koa
const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const path = require('path');
const fs = require('fs');

// 静态资源
const serve = require('koa-static');
app.use(serve(path.join(__dirname)));

/** koa2 实现 express4 的 res.sendFile() */
router.get('/test',(ctx,next) => {
  // 改写法 记得aysnc  await
  // var htmlFile = await (new Promise(function(resolve,reject) {
  //   fs.readFile('./pages/test.html',(err,data) => {
  //     if(err) {
  //       reject(err)
  //     }else{
  //       resolve(data)
  //     }
  //   })
  // }))
  // ctx.type = 'html';  //不设置type为html就变成下载了
  // ctx.body = htmlFile;
  ctx.type = 'html';
  ctx.body = fs.createReadStream('./pages/test.html');  //返回一个readStream（文件读取流，输入流）对象。（可读流）
})

// 以上用koa-router 实现
router.get('/user/:name',async (ctx,next) => {
  var name = ctx.params.name;
  ctx.response.body = {
    success:true,
      error:false,
      data:{
        name:name,
      }
  };
  await next();
})
const insertData = require('./mongo').insertData;
const searchData = require('./mongo').searchData;
const updateData = require('./mongo').updateData;

/** 登入接口 */
router.post('/signin',async (ctx, next) => {
  let name = ctx.request.body.name || '',
      password = ctx.request.body.password || '';
      const params = {
        name,
        password
      }
      await searchData(params).then(resp => {
        if (resp.length !==0) {
          let res ={
            success:true,
            error:false,
            data:{
              name:name           
            }
          }
          // ctx.response.status = 302;
          // ctx.response.body = {...ctx.request, ...res};
          ctx.response.body = res;
          // ctx.redirect('http://localhost:3003/pages/sign/redirect.html');
        } else {
          ctx.response.body = {message:'用户名或密码错误',success:false};
          ctx.response.status = 200;
        }
      });
});

/** 注册接口 */
router.post('/register',async (ctx,next) => {
  let name = ctx.request.body.name || '',
      password = ctx.request.body.password || '';
      const params = { name, password };
      await insertData(params).then(res => {
        ctx.response.body = {message:'注册成功',success:true};
      }).catch(e => {
        ctx.response.body = {message:'该用户已存在',success:false};
      })
})

/** 修改密码 */
router.post('/change',async (ctx,next) => {
  let name = ctx.request.body.name || '';
  let password = ctx.request.body.password || '';
  const params = { name, password };
  await updateData(params).then(res => {
    ctx.response.body = {message:'修改成功',success:true};
  }).catch(e => {
    ctx.response.body = {message:'用户不存在',success:false};
  })
})

// koa-bodyparser必须在router之前被注册到app对象上。
app.use(bodyParser());
// 必须放到router前面,处理跨域
app.use(cors({
  origin: function (ctx) {
      // if (ctx.url === '/pages') {
      //     return "*"; // 允许来自所有域名请求
      // }
      return '*'; 
  },
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Accept'],
}));

app.use(router.routes());

// 在端口4000监听:
app.listen(4000);
console.log('app started at port 4000...');