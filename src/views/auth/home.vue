<template>
  <div>
    <x-header style="background-color:#F33A55;width:100%;position:absolute;left:0;top:0;z-index:100;"
              title="首页" :left-options="{showBack: false}">
      <div slot="right" @click="logout">退出</div>
    </x-header>
    <group>
      <div @click="refresh" class="weui-cell vux-tap-active weui-cell_access">
        <div class="weui-cell__hd">
          <x-icon slot="icon" style="padding-right:10px;display:block;" type="android-refresh"/>
        </div>
        <div class="vux-cell-bd vux-cell-primary">参数更新</div>
        <div class="weui-cell__ft">
          <slot name="value"></slot>
        </div>
      </div>
      <cell title="工单派发" link="/list">
        <x-icon slot="icon" style="padding-right:10px;display:block;" type="code-download"/>
      </cell>
      <div @click="downReceipt" class="weui-cell vux-tap-active weui-cell_access">
        <div class="weui-cell__hd">
          <x-icon slot="icon" style="padding-right:10px;display:block;" type="ios-cloud-download-outline"/>
        </div>
        <div class="vux-cell-bd vux-cell-primary">任务下载</div>
        <div class="weui-cell__ft">
          <slot name="value"></slot>
        </div>
      </div>
      <cell title="工单回执" link="/reList">
        <x-icon slot="icon" style="padding-right:10px;display:block;" type="code-working"/>
      </cell>
      <cell title="任务上传" link="/loList">
        <x-icon slot="icon" style="padding-right:10px;display:block;" type="ios-cloud-upload-outline"/>
      </cell>
    </group>
  </div>
</template>
<script>
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
    }
  }
</script>

<style scoped>

</style>
