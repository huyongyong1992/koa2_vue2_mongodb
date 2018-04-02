import { wechatShareAPI } from '../service/getData'; //获取微信分享所需的appid等

let CryptoJS = require("crypto-js");
/**
 * AES加密
 * @param {*} value 
 */
export const encryptWithAES = (value) => {
        let str = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value), CryptoJS.enc.Utf8.parse('abcdefgabcdefg12'), {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        }).toString();
        return str;
    }
    /**
     * 获取url上的参数
     * @param {} key 
     */
export const getQuery = (key) => {
    const location = window.location;
    const query = {};
    const params = location.href.split('?')[1] || ''
    if (params) {
        params.split('&').forEach((item) => {
            const queryPair = item.split('=');
            query[queryPair[0]] = queryPair[1];
        });
    }
    const rst = query[key];
    //解码一个编码的 URI。
    return rst ? window.decodeURIComponent(query[key]) : '';
};

/**
 * 获取当前日期
 */
export const getDate = () => {
    let now = new Date(),
        year = now.getFullYear(),
        month = now.getMonth() + 1,
        day = now.getDate();
    month = month < 10 ? ('0' + month) : month;
    day = day < 10 ? ('0' + day) : day;
    return {
        year: year,
        month: month,
        day: day
    }
};

export const wechatShare = (title,desc, imgUrl) => {
    let shareUrl;
    shareUrl = window.location.href
    let wx = window.wx;
    let timestamp = Date.parse(new Date()); //时间戳
    let url = location.href.split('#')[0]; //可把字符串作为URI 组件进行编码
    wechatShareAPI({
        url: url,
    }).then(data => {
        wx.config({
            debug: false,
            appId: data.data.appId,
            timestamp: data.data.timestamp,
            nonceStr: data.data.nonceStr,
            signature: data.data.signature,
            jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareQZone'
            ]
        });
    })
    wx.ready(function() {
        //分享到朋友圈
        wx.onMenuShareTimeline({
            title: title, // 分享标题
            link: shareUrl, // 分享链接
            imgUrl: imgUrl, // 分享图标
        });
        //分享给朋友
        wx.onMenuShareAppMessage({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: shareUrl, // 分享链接
            imgUrl: imgUrl, // 分享图标
        });
        wx.onMenuShareQQ({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: shareUrl, // 分享链接
            imgUrl: imgUrl, // 分享图标
        });
        wx.onMenuShareQZone({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: shareUrl, // 分享链接
            imgUrl: imgUrl, // 分享图标

        });
    });
}
