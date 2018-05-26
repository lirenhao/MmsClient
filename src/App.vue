<template>
  <div id="app" style="position:absolute;width:100%;height:100%;">
    <loading :show="isLoading"></loading>
    <view-box :body-padding-top="isShowNav ? '46px' : '0'">
      <router-view></router-view>
    </view-box>
  </div>
</template>

<script>
  import {XHeader, Loading} from 'vux'
  import {mapState} from 'vuex'

  export default {
    name: 'app',
    components: {
      XHeader,
      Loading
    },
    computed: {
      ...mapState({
        isLoading: state => state.isLoading
      }),
      isShowNav() {
        return this.$route.name !== 'login'
      },
      title() {
        return this.$route.meta.title
      },
      leftOptions: function () {
        return {
          showBack: this.$route.meta.showBack
        }
      }
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';

  body {
    background-color: #fbf9fe;
  }
</style>
