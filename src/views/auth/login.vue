<template>
  <div class="login-bg">
    <img class="logo" src="../../assets/boc-logo.png">
    <div>
      <div class="login-input">
        <x-input class="text-box" title="用户" v-model="userName" placeholder="请输入用户名">
          <x-icon slot="label" type="person" />
        </x-input>
      </div>
      <div class="login-input">
        <x-input class="text-box" title="密码" v-model="passWord" placeholder="请输入密码" type="password">
          <x-icon slot="label" type="ios-locked" />
        </x-input>
      </div>
      <x-button class="login-btn" @click.native="click" text="登 录"/>
      <div class="close-btn" v-if="isClear">
        <x-icon style="fill: #Ffff; position: fixed; top: 20px; right: 20px; " @click.native="clear" type="close"></x-icon>
      </div>
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
    props: {
      isClear: {
        type: Boolean,
        default: true
      }
    },
    data: function () {
      return {
        userName: '',
        passWord: ''
      }
    },
    methods: {
      click() {
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
      },
      clear() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  /*登陆大背景*/
  .login-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    background: url("../../assets/login-bg.jpg") no-repeat;
    background-size: cover;

  }

  /*登陆页logo*/
  .logo {
    width: 38%;
    margin-left: 31%;
    margin-top: 70px;
    margin-bottom: 30px;
  }

  .login-input {
    width: 80%;
    margin-left: 10%;
    background: #fff;
    height: 42px;
    margin-top: 20px;
    border-radius: 28px;
  }

  /*登录页输入框宽度调整*/
  .text-box {
    font-size: 13px;
    padding: 8px 15px !important;
    text-indent: .3em;
  }
  /*登录按钮*/
  .login-btn {
    width: 66%;
    height: 42px;
    margin-left: 17%;
    background: #dd3623;
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    margin-top: 56px;
    border-radius: 28px;
    text-align: center;
  }
</style>
