<template>
  <div>
    <x-header slot="header" style="background-color:#F33A55;width:100%;position:absolute;left:0;top:0;z-index:100;" title="回执列表"></x-header>
    <search ref="search" placeholder="搜索" :auto-absolute="false"
            @on-cancel="searchClear" @on-change="searchChange" @on-clear="searchClear"/>
    <div v-for="item in results">
      <ext-info :item="item" :clicks="getButtons(item)"/>
    </div>
  </div>
</template>

<script>
  import {XHeader, Search} from 'vux'
  import ExtInfo from '../../components/ExtInfo'
  import localforage from '../../store/localforage'
  import api from '../../api'

  export default {
    name: "reList",
    components: {
      XHeader,
      Search,
      ExtInfo
    },
    created: function () {
      localforage(window.localStorage.id).getItem('work')
        .then(work => {
          if (work) {
            this.list = Object.values(work)
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
      getButtons: function (item) {
        const reptButton = {
          style: 'primary',
          text: '回执',
          onButtonClick: () => {
            this.$router.push({
              name: 'receipt', params: {
                info: item,
                type: 'receipt'
              }
            })
          }
        }
        const delButton = {
          style: 'primary',
          text: '删除',
          onButtonClick: () => {
            localforage(window.localStorage.id).getItem('work')
              .then(work => {
                delete work[item.workId + item.termNo]
                localforage(window.localStorage.id).setItem('work', work)
                this.list = Object.values(work)
                this.results = this.results
                  .filter(value => (item.workId + item.termNo) !== (value.workId + value.termNo))
              })
          }
        }
        return [reptButton, delButton]
      },
      searchClear: function () {
        this.results = this.list
      },
      searchChange: function (value) {
        this.results = this.list
          .filter(item => ('' + item.termNo).indexOf(value) !== -1)
      },
    }
  }
</script>

<style scoped>

</style>
