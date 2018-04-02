<template>
	<div >
    <el-tabs v-model="tabPosition" style="height: 200px;">
      <el-tab-pane label="登录" name="0">
        <el-input v-model="name" placeholder="请输入姓名">
          <template slot="prepend">姓名:</template>
        </el-input>
        <el-input v-model="password" placeholder="请输入密码">
          <template slot="prepend">密码:</template>
        </el-input>
        <el-button @click="submit" type="primary">马上登录未来</el-button>
      </el-tab-pane>
      <el-tab-pane label="注册" name="1">
        <el-input v-model="rName" placeholder="请输入姓名">
          <template slot="prepend">姓名:</template>
        </el-input>
        <el-input v-model="rPassword" placeholder="请输入密码">
          <template slot="prepend">密码:</template>
        </el-input>
        <el-input v-model="cPassword" placeholder="请确认密码">
          <template slot="prepend">确认密码:</template>
        </el-input>
        <el-button @click="registerUser">注册走上人生巅峰</el-button>
      </el-tab-pane>
      <el-tab-pane label="修改密码" name="2">
        <el-input v-model="xName" placeholder="请输入姓名">
          <template slot="prepend">姓名:</template>
        </el-input>
        <el-input v-model="xPassword" placeholder="请输入密码">
          <template slot="prepend">修改密码:</template>
        </el-input>
        <el-input v-model="xcPassword" placeholder="请确认密码">
          <template slot="prepend">确认密码:</template>
        </el-input>
        <el-button @click="changePassword">确定</el-button>
      </el-tab-pane>
    </el-tabs>
		
   
	</div>
</template>

<script>
  import { getInfos,register,changePsw } from '../../../service/getData';
  export default {
    data() {
      return {
        name:null,
        tabPosition:'1',
        password:null,
        rName:null,
        rPassword:null,
        cPassword:null,
        xName:null,
        xPassword:null,
        xcPassword:null
      }
    },
    
    created() {
    
    },
    //相关操作事件
    methods: {
      submit() {
        getInfos({
          name:this.name,
          password:this.password
        }).then(data => {
          if(!data.success) return;
          // console.log(data.data)
          window.localStorage.setItem('name',this.name)
          window.location.href = "./redirect.html";
        })
      },
      registerUser() {
        if(!this.rName || !this.rPassword ) {
          this.$message.error('请输入用户名或密码');
          return ;
        }
        if((this.rPassword !== this.cPassword)) {
          this.$message.error('密码不一致');
          return ;
        }
        register({
          name:this.rName,
          password:this.rPassword
        }).then(res => {
          if(!res.success) return;
          this.$message.success('注册成功');
          this.tabPosition = '0';
        })
      },
      changePassword() {
        if(!this.xName || !this.xPassword ) {
          this.$message.error('请输入用户名或密码');
          return ;
        }
        if((this.xPassword !== this.xcPassword)) {
          this.$message.error('密码不一致');
          return ;
        }
        changePsw({
          name:this.xName,
          password:this.xPassword
        }).then(data => {
          if(!data.success) return;
          this.$message.success('修改成功');
          this.tabPosition = '0';
        })
      }
    }
  }
</script>

<style lang="less">
  body{
    padding:0 10px;
  }
  .el-tab-pane{
    display: flex;
    width:100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .el-input{
    width:60% !important;
    margin-bottom:20px;
  }

</style>
