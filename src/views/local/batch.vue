<template>
  <div>
    <x-header style="background-color:#F33A55;" title="批量回执">
      <div slot="right" @click="receipt" size="40">回执</div>
    </x-header>
    <search ref="search" placeholder="搜索" :auto-fixed="false"
            @on-cancel="searchClear" @on-change="searchChange" @on-clear="searchClear"/>
    <popup-header left-text="全选" right-text="反选" title="选择任务"
                  @on-click-left="selectAll" @on-click-right="selectOther"/>
    <checklist label-position="left"
               :options="checkOptions" v-model="checkValues"/>
  </div>
</template>

<script>
  import {XHeader, Search, PopupHeader, Checklist} from 'vux'
  import * as consts from '../../constants'
  import api from '../../api'

  export default {
    name: "loBatch",
    components: {
      XHeader,
      Search,
      PopupHeader,
      Checklist
    },
    props: ['list'],
    data: function () {
      return {
        checkValues: [],
        checkOptions: this.list.map(item => ({
          key: item.params.workId + item.params.termNo,
          value: item.params.termNo,
          inlineDesc: `${consts.eventType[item.params.eventsId]}->${item.params.addr || ''}`
        }))
      }
    },
    methods: {
      receipt: function () {
        console.log(this.checkValues)
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
