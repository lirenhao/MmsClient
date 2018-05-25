<template>
  <div>
    <x-header style="background-color:#D41919;width:100%;position:absolute;left:0;top:0;z-index:100;"
              title="首页" :left-options="{showBack: false}">
      <div slot="right" @click="logout">退出</div>
    </x-header>
    <div class="home-page">
      <div class="menu">
        <div class="menu-half" @click="refresh">
          <div class="menu-round green-bg">
            <x-icon size="48" slot="icon" type="android-refresh"/>
          </div>
          <div class="menu-name">参数更新</div>
        </div>

        <div class="menu-half" @click="downReceipt">
          <div class="menu-round">
            <x-icon size="50" slot="icon" type="ios-cloud-download"/>
          </div>
          <div class="menu-name">任务下载</div>
        </div>

        <div class="menu-half" @click="goLink('/reList')">
          <div class="menu-round purple-bg">
            <x-icon size="50" slot="icon" type="code-working"/>
          </div>
          <div class="menu-name">工单回执</div>
        </div>

        <div class="menu-half" @click="goLink('/loList')">
          <div class="menu-round orange-bg">
            <x-icon size="50" slot="icon" type="ios-cloud-upload"/>
          </div>
          <div class="menu-name">任务上传</div>
        </div>

        <div class="menu-half" @click="goLink('/list')">
          <div class="menu-round blue-bg">
          <x-icon size="50" slot="icon" type="code-download"/>
        </div>
          <div class="menu-name">工单派发</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {} from 'vue-router'
  import {XHeader, Group, Cell} from 'vux'
  import api from '../../api'

  export default {
    name: "home",
    components: {
      XHeader,
      Group,
      Cell
    },
    created: function () {
      if (!window.localStorage.token) {
        this.$router.push({name: 'login', params: {isClear: false}})
      } else {
        // TODO 权限判断
      }
    },
    methods: {
      logout() {
        this.$router.push({name: 'login'})
      },
      refresh() {
        api.getParams()
      },
      downReceipt() {
        api.getWorkReList()
      },
      goLink(path) {
        this.$router.push(path)
      }
    }
  }
</script>

<style scoped>
  /*登陆大背景*/
  .home-page {
    position: absolute;
    width: 100%;
    height: calc(100% - 46px);
    background: url("../../assets/home-bg.jpg") no-repeat;
    background-size: cover;

  }
  .menu {
    float: left;
    width: 70%;
    margin-left: 15%;
    margin-top: 66px;
  }
  .menu-half {
    float: left;
    width: 50%;
    text-align: center;
    margin: 10px 0;
  }
  .menu-round {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: #ffa93a;
    text-align: center;
    margin-left: 20%;
    line-height: 120px;
  }
  .vux-x-icon {
    fill: #Ffff;
  }
  .green-bg {
    background: #81c440 !important;
  }
  .purple-bg {
    background: #b87ef6 !important;
  }
  .orange-bg {
    background: #fb793d !important;
  }
  .blue-bg {
    background: #3fafef !important;
  }
  .menu-name {
    color: #aa7d60;
    margin-top: 8px;
  }

</style>
