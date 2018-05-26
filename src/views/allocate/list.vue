<template>
  <div>
    <x-header style="width:100%;position:absolute;left:0;top:0;z-index:100;" title="工单列表"/>
    <div v-for="item in list">
      <work-info :item="item" :clicks="getButtons(item)"/>
    </div>
  </div>
</template>

<script>
  import {XHeader} from 'vux'
  import WorkInfo from '../../components/WorkInfo'
  import api from '../../api'

  export default {
    name: "alList",
    components: {
      XHeader,
      WorkInfo
    },
    created: function () {
      api.getWorkInfoList()
        .then(data => {
          this.list = data
        })

    },
    data: function () {
      return {
        list: []
      }
    },
    methods: {
      getButtons: function (item) {
        return [
          {
            style: 'primary',
            text: '派发',
            onButtonClick: () => {
              api.getAlTermList(item.id)
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
