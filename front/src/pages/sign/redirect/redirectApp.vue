<template>
	<div >
    登入成功！欢迎<span>{{name}}</span>来到重定向页面
   
	</div>
</template>

<script>
  import Lib from '../../../assets/js/Lib';
  import { getInfos } from '../../../service/getData';
  export default {
    data() {
      return {
        name:null,
        password:null
      }
    },
    
    created() {
      this.name = window.localStorage.getItem('name');
    },
    //相关操作事件
    methods: {
      
    }
  }
</script>

<style lang="less">
  body{
    padding:0 10px;
  }
  p{
    font-size:20px;
    margin-left:10px;
    margin-top:10px !important;
    color:#f00;
  }
  .sign{
    display: flex;
    flex-wrap: wrap;
  }
	li{
    padding:5px 10px !important;
    font-size:16px;
    line-height:20px;
    list-style: none;
  }

</style>
