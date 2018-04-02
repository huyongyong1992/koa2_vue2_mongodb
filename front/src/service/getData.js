import { getInfo } from '../config/axios';

import { apiUrl } from '../config/env'

/**
 * URL中 不带参数
 * @param { string } accountId
 * @param { string } name
 * @param { array } track
 * @param { string } clientType
 * @param { string } token
 */

export const wechatShareAPI = (params) => getInfo(apiUrl + '/pdabc-common/wx/getShareParam', params, 'post');

export const saveInfo = (params) => getInfo(apiUrl+'/pdabc-common/attach-info',params,'post');

export const getInfos = (params) => getInfo(apiUrl+'/signin',params,'post');

export const register = (params) => getInfo(apiUrl+'/register',params,'post');

export const changePsw = (params) => getInfo(apiUrl+'/change',params,'post');

