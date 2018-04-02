## 使用前注意事项
1、新建页面，可能需重新`npm run dev`才可以正常访问新建的页面。
2.所有的目录都要求为二级，不能一个目录下为一级，另一个目录下有二级。
3.只需要在`*.vue`里导入`import Lib from 'assets/js/Lib';'`，就可以使用全局模块了。
## 前言
基于vue2+axios+vux+vue-router搭建的多页面项目


### 安装依赖
npm install
### 本地调试环境 `npm run dev`
### 测试环境 （跟生产环境打包方式一样，只是将NODE_ENV 设置为test）`npm run test`
### 生产环境 `npm run build`

本地默认访问端口为8091，如需更改，请到项目目录文件`config/index.js`修改。

## 目录结构
``` 
webpack
 |---build
 |---src
     |---assets    #资源
     |---css/common.css  #css
     |---font/    #字体图标
     |---js/common.js    #自己定义的全局通用事件
     |---js/conf.js    #项目的配置
     |---js/Lib.js    #暴露接口给组件调用
     |---js/vueFilter.js    #注册vue的全局过滤器	
 |---components 组件
     |---Button.vue  按钮组件
     |---hb-head.vue  head组件
|---pages    #各个页面模块，模块名可以自定义哦！
     |---home    #一级目录
        |---list    #二级目录
             |---list.html
             |---list.js
             |---listApp.vue
     |---vuxDemo    #一级目录
        |---button    #二级目录
             |---button.html
             |---button.js
             |---buttonApp.vue	
        |---calendar    #二级目录
             |---calendar.html
             |---calendar.js
             |---calendarApp.vue		 
     
  ```


