<template>
  <div>
    <x-header style="background-color:#D41919;width:100%;position:absolute;left:0;top:0;z-index:100;" :title="getTitle"/>
    <work-info :item="info" :clicks="[]"/>
    <div v-for="item in info.workInfoExt">
      <group :title="item.merNo">
        <cell title="终端号" :value="item.termNo"/>
        <cell value="地址地址地址地址地址地址地址地址地址地址地址">
          <x-icon slot="icon" type="navigate"/>
        </cell>
      </group>
    </div>
  </div>
</template>

<script>
  import {XHeader, Group, GroupTitle, Cell} from 'vux'
  import WorkInfo from '../../components/WorkInfo'
  import api from '../../api'

  export default {
    name: "show",
    components: {
      XHeader,
      WorkInfo,
      Group,
      GroupTitle,
      Cell
    },
    props: ['info', 'type'],
    computed: {
      getTitle: function () {
        let title = ''
        switch (this.$props.type) {
          case 'allocate':
            title = '工单派发'
            break
          case 'audit':
            title = '工单审核'
            break
          case 'receipt':
            title = '工单回执'
            break
          default:
            title = '无效'
        }
        return title
      }
    }
  }
</script>

<style scoped>

</style>
