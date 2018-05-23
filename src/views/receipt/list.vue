<template>
  <div>
    <x-header style="background-color:#F33A55;" title="回执列表"/>
    <search ref="search" placeholder="搜索" :auto-fixed="false"
            @on-cancel="searchClear" @on-change="searchChange" @on-clear="searchClear"/>
    <div v-for="item in results">
      <ext-info :item="item" :clicks="getButtons(item)"/>
    </div>
  </div>
</template>

<script>
  import {XHeader, Search} from 'vux'
  import ExtInfo from '../../components/ExtInfo'
  import api from '../../api'

  export default {
    name: "receiptList",
    components: {
      XHeader,
      Search,
      ExtInfo
    },
    created: function () {
      api.getWorkReList()
        .then(data => {
          this.list = data
          this.results = data
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
        const showButton = {
          style: 'primary',
          text: '查看',
          onButtonClick: () => {
            api.getWorkInfoShow(item.id)
              .then(data => {
                this.$router.push({
                  name: 'allocate', params: {
                    info: data,
                    type: 'show'
                  }
                })
              })
          }
        }
        const buttons = []
        if (item.reviewStatus === "0")
          buttons.push(reptButton)
        if (item.receiptStatus === "1")
          buttons.push(showButton)
        return buttons
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
