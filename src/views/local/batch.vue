<template>
  <div style="height:100%;">
    <x-header :right-options="{showMore: true}" @on-click-more="showMenus = true"
              style="width:100%;position:absolute;left:0;top:0;z-index:100;" title="批量回执"/>
    <actionsheet :menus="menus" v-model="showMenus"
                 @on-click-menu="receipt" show-cancel/>
    <view-box>
      <search placeholder="搜索" :auto-fixed="false"
              @on-cancel="searchClear" @on-change="searchChange" @on-clear="searchClear"/>
      <popup-header left-text="全选" right-text="反选" title="选择任务"
                    @on-click-left="selectAll" @on-click-right="selectOther"/>
      <checklist label-position="left"
                 :options="checkOptions" v-model="checkValues"/>
    </view-box>
  </div>
</template>

<script>
  import {XHeader, Actionsheet, Search, PopupHeader, Checklist, XDialog} from 'vux'
  import * as consts from '../../constants'
  import localforage from '../../store/localforage'
  import api from '../../api'

  export default {
    name: "loBatch",
    components: {
      XHeader, Actionsheet, Search, PopupHeader, Checklist, XDialog
    },
    created: function () {
      localforage(window.localStorage.id).getItem('receipt')
        .then(receipt => {
          if (receipt) {
            this.checkOptions = Object.values(receipt).map(item => ({
              key: item.params.workId + item.params.termNo,
              value: item.params.termNo,
              inlineDesc: `${consts.eventType[item.params.eventsId]}->${item.params.addr || ''}`
            }))
          }
        })
    },
    data: function () {
      return {
        menus: {
          rep: '回执',
          del: '删除'
        },
        showMenus: false,
        checkValues: [],
        checkOptions: [],
        isShow: false
      }
    },
    methods: {
      receipt: function (menu) {
        if (this.checkValues.length > 0) {
          if (menu === 'rep') {
            api.batchReceipt(this.checkValues)
              .then(error => {
                if (error.length > 0) {
                  this.$vux.toast.show({
                    type: 'warn',
                    position: 'default',
                    text: `有${error.length}个任务回执失败`
                  })
                } else {
                  this.$vux.toast.show({
                    type: 'success',
                    position: 'default',
                    text: '回执成功'
                  })
                }
                this.$router.go(-1)
              })
          } else if (menu === 'del') {
            localforage(window.localStorage.id).getItem('receipt')
              .then(receipt => {
                this.checkValues.forEach(item => {
                  delete receipt[item]
                })
                localforage(window.localStorage.id).setItem('receipt', receipt)
                  .then(() => {
                    this.$vux.toast.show({
                      type: 'success',
                      position: 'default',
                      text: '删除成功'
                    })
                    this.$router.go(-1)
                  })
              })
          }
        } else {
          this.$vux.toast.show({
            type: 'warn',
            position: 'default',
            text: '请选择任务'
          })
        }
      },
      searchClear: function () {
        this.checkOptions = this.list.map(item => ({
          key: item.params.termNo,
          value: item.params.termNo,
          inlineDesc: consts.eventType[item.params.eventsId] + ':' + item.params.addr
        }))
      },
      searchChange: function (value) {
        this.checkOptions = this.list
          .filter(item => (item.params.termNo + '' + item.addr).indexOf(value) !== -1)
          .map(item => ({
            key: item.params.termNo,
            value: item.params.termNo,
            inlineDesc: consts.eventType[item.params.eventsId] + ':' + item.params.addr
          }))
      },
      selectAll: function () {
        this.checkOptions.forEach(item => {
          this.checkValues.push(item.key)
        })
      },
      selectOther: function () {
        const oldValues = this.checkValues
        this.checkValues = this.checkOptions
          .filter(item => oldValues.indexOf(item.key) === -1)
          .map(item => item.key)
      }
    }
  }
</script>

<style scoped>

</style>
