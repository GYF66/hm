<template>
<div class="login-container">
<el-card class="login-box">
    <img src="../../assets/images/logo_index.png">
    <!-- d登录表单 -->
    <el-form ref="loginForm" :status-icon="true" :model="loginForm" :rules="loginRules">
        <el-form-item prop="mobile">
            <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
            <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:240px"></el-input>
            <el-button style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item>
            <el-checkbox v-model="loginForm.checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
    <el-form-item>
        <el-button style="width:100%" type="primary" @click="login()">登录</el-button>
    </el-form-item>
    </el-form>

</el-card>
</div>

</template>

<script>
export default {
  data () {
    const checkMobile = (rule, value, callback) => {
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机号格式不正确'))
      }
    }
    return {
      loginForm: {
        mobile: '',
        code: '',
        checked: true
      },
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '请输入6个数字', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      //
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // axios 是基于primise封装的，post() 返回一个primise对象
          this.$http.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.loginForm)
            .then(res => {
              // res是响应对象，包含后台返回数据 res.datares.data
            //   console.log(res.data)
              // 跳转到首页
              // 保存用户信息 用来判断登录的状态
              // sessionStorage  提供四个api  bom对象 全局对象 作用保存数据
              // 有有效期 ，关闭浏览器失效 .setitem（key value）value字符串  存储
              // .getitem(key) 获取
              // .removeitem（key） 删除
              // .clear() 清空所有数据 清空所有
              window.sessionStorage.setItem('hm', JSON.stringify(res.data.data))
              this.$router.push('/')
            })
            .catch(() => {
              // 提示
              this.$message.error('手机号或验证码错误')
            })
        }
      })
    }
  }

}
</script>

<style scoped lang="less">
.login-container{
width: 100%;
height: 100%;
position: absolute;
left: 0;
top: 0;
//cover 铺满容器 多余裁剪  contain 在容器内完全显示图片
// 背景图定位/背景入尺寸
background:url(../../assets/images/login_bg.jpg) no-repeat center /cover;

.login-box{
    width: 400px;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    img{
        display: block;
        width: 200px;
        margin: 10px auto;
    }

}
}

</style>
