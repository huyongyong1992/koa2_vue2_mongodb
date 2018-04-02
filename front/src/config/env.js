/**
 * 配置编译环境和线上环境之间的切换
 * apiUrl: 接口地址

 * routerMode: 路由模式
 */
let apiUrl;
let routerMode;
if (process.env.NODE_ENV === 'production') { //生产环境配置
    apiUrl = 'https://api.pdabc.com';

    routerMode = 'hash'
} else { //开发环境、测试环境地址
    apiUrl = 'http://127.0.0.1:4000';

    routerMode = 'hash';
}

export {
    apiUrl
}