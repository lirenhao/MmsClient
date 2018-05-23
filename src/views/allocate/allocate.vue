<template>
  <div>
    <x-header style="background-color:#F33A55;" title="工单派发">
      <div slot="right" @click="allocateClick">派发</div>
    </x-header>
    <search ref="search" placeholder="搜索" :auto-fixed="false"
            @on-cancel="searchClear" @on-change="searchChange" @on-clear="searchClear"/>
    <popup-header left-text="全选" right-text="反选" title="选择终端"
                  @on-click-left="selectAll" @on-click-right="selectOther"/>
    <checklist label-position="left"
               :options="checkOptions" v-model="checkValues"/>
    <div>
      <popup v-model="showUser">
        <popup-header
          left-text="取消"
          right-text="确定"
          title="选择执行人"
          :show-bottom-border="false"
          @on-click-left="showUser = false"
          @on-click-right="allocateSubmit"></popup-header>
        <group gutter="0">
          <radio v-model="userId" :options="userOptions"></radio>
        </group>
      </popup>
    </div>
  </div>
</template>

<script>
  import {XHeader, Search, PopupHeader, Checklist, Popup, Group, Radio} from 'vux'
  import api from '../../api'

  export default {
    name: "allocate",
    components: {
      XHeader,
      Search,
      PopupHeader,
      Checklist,
      Popup,
      Group,
      Radio
    },
    props: ['info', 'list', 'type'],
    data: function () {
      return {
        checkValues: [],
        checkOptions: this.$props.list
          .map(item => ({key: item.termNo, value: item.termNo, inlineDesc: item.addr})),
        showUser: false,
        userId: '',
        userOptions: []
      }
    },
    methods: {
      allocateSubmit: function () {
        console.log(this.info)
        api.workAllocate(this.info.id, this.userId, this.checkValues)
          .then(() => {
            this.$vux.toast.show({
              type: 'success',
              position: 'default',
              text: '派发成功'
            })
            this.$router.go(-1)
          })
      },
      allocateClick: function () {
        if (this.checkValues.length > 0) {
          api.getAlUserList()
            .then(data => {
              this.userOptions = data
              this.userId = data[0].key
              this.showUser = true
            })
        } else {
          this.$vux.toast.show({
            type: 'warn',
            position: 'default',
            text: '请选择终端'
          })
        }
      },
      searchClear: function () {
        this.checkOptions = this.$props.list
          .map(item => ({key: item.termNo, value: item.termNo, inlineDesc: item.addr}))
      },
      searchChange: function (value) {
        this.checkOptions = this.$props.list
          .filter(item => (item.termNo + '' + item.addr).indexOf(value) !== -1)
          .map(item => ({key: item.termNo, value: item.termNo, inlineDesc: item.addr}))
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
  .vux-popup-header-left {
    color: #04BE02;
  }
</style>
