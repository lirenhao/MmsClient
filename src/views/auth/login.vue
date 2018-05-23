<template>
  <div>
    <div>
      <div class="login-input">
        <x-input title="用户" v-model="userName" placeholder="用户名"/>
      </div>
      <div class="login-input">
        <x-input title="密码" v-model="passWord" placeholder="密码" type="password"/>
      </div>
      <x-button @click.native="click" type="primary" text="登 录"/>
    </div>
  </div>
</template>

<script>
  import {XButton, XInput} from 'vux'
  import api from '../../api'

  export default {
    name: "login",
    components: {
      XButton,
      XInput
    },
    data: function () {
      return {
        userName: '',
        passWord: ''
      }
    },
    methods: {
      click: function () {
        const userName = this.$data.userName
        const passWord = this.$data.passWord
        if (userName !== '' && passWord !== '') {
          api.login(userName, passWord)
        } else {
          this.$vux.toast.show({
            type: 'warn',
            position: 'default',
            text: '请输入用户名或密码'
          })
        }
      }
    }
  }
</script>

<style scoped>
  /*登陆大背景*/
  .login-bg {
    position: absolute;
    z-index: -99;
    width: 100%;
    height: 100%;
  }

  /*登陆页logo*/
  .logo {
    width: 38%;
    margin-left: 31%;
    margin-top: 50px;
    margin-bottom: 30px;
  }

  login-input {
    width: 80%;
    margin-left: 10%;
    background: #fff;
    height: 42px;
    margin-top: 20px;
    border-radius: 28px;
  }

  /*登陆页输入框 图标*/
  .login-input .ons-icon {
    position: absolute;
    margin-left: 18px;
    margin-top: 8px;
    font-size: 26px;
    color: #888;
  }

  /*登录页输入框宽度调整*/
  .login-input x-input {
    width: calc(100% - 50px);
    margin-left: 46px;
    border-bottom: 0;
  }
</style>
