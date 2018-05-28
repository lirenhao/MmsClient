<template>
  <div style="height:100%;">
    <x-header style="width:100%;position:absolute;left:0;top:0;z-index:100;" title="工单列表"/>
    <view-box>
      <search slot="header" placeholder="搜索" :auto-fixed="false"
              @on-cancel="searchClear" @on-change="searchChange" @on-clear="searchClear"/>
      <div v-for="item in results">
        <work-info :item="item" :clicks="getButtons(item)"/>
      </div>
    </view-box>
  </div>
</template>

<script>
  import {XHeader, Search} from 'vux'
  import WorkInfo from '../../components/WorkInfo'
  import api from '../../api'

  export default {
    name: "alList",
    components: {
      XHeader, Search, WorkInfo
    },
    created: function () {
      api.getWorkInfoList()
        .then(data => {
          this.list = data
          this.results = this.list
        })
    },
    data: function () {
      return {
        list: [],
        results: []
      }
    },
    methods: {
      searchClear: function () {
        this.results = this.list
      },
      searchChange: function (value) {
        this.results = this.list
          .filter(item => (item.merNo).indexOf(value) !== -1)
      },
      getButtons: function (item) {
        return [
          {
            style: 'primary',
            text: '派发',
            onButtonClick: () => {
              api.getAlTermList(item.workId)
                .then(data => {
                  this.$router.push({
                    name: 'allocate', params: {
                      info: item,
                      list: data,
                      type: 'allocate'
                    }
                  })
                })
            }
          }
        ]
      }
    }
  }
</script>

<style scoped>
  .vux-demo-header-box {
    z-index: 100;
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
  }
</style>
