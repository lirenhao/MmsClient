<template>
  <div>
    <x-header style="background-color:#F33A55;width:100%;position:absolute;left:0;top:0;z-index:100;" title="回执提交">
      <div slot="right" @click="receiptClick">批量选择</div>
    </x-header>
    <search ref="search" placeholder="搜索" :auto-absolute="false"
            @on-cancel="searchClear" @on-change="searchChange" @on-clear="searchClear"/>
    <group v-for="(item, index) in results" @click.native="showInfo(item)"
           :title="getTitle(item.params.eventsId)" :key="index">
      <cell-form-preview :list="getView(item)"></cell-form-preview>
    </group>
  </div>
</template>

<script>
  import localforage from '../../store/localforage'
  import {XHeader, Search, Group, CellFormPreview} from 'vux'
  import * as consts from '../../constants'

  export default {
    name: "loList",
    components: {
      XHeader, Search, Group, CellFormPreview
    },
    created: function () {
      localforage(window.localStorage.id).getItem('receipt')
        .then(receipt => {
          if (receipt) {
            this.list = Object.values(receipt)
            this.results = this.list
          }
        })
    },
    data: function () {
      return {
        list: [],
        results: []
      }
    },
    methods: {
      getTitle: function (value) {
        return consts.eventType[value]
      },
      getView: function (value) {
        return [
          {label: '商户号', value: value.params.merNo},
          {label: '终端号', value: value.params.termNo},
          {label: '地址', value: value.params.addr}
        ]
      },
      searchClear: function () {
        this.results = this.list
      },
      searchChange: function (value) {
        this.results = this.list
          .filter(item => (item.params.merNo + item.params.termNo + item.params.addr).indexOf(value) !== -1)
      },
      showInfo: function (value) {
        this.$router.push({
          name: 'receipt', params: {
            info: {
              ...value.params,
              details: Object.keys(value.devNos).map(key => ({devType: key}))
            },
            type: 'show'
          }
        })
      },
      receiptClick: function () {
        this.$router.push({
          name: 'loBatch', params: {
            list: this.list,
            type: 'show'
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
