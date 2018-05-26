<template>
  <form-preview header-label="工单单号" :header-value="item.id"
                :body-items="parserItem(item)" :footer-buttons="clicks"/>
</template>

<script>
  import {FormPreview} from 'vux'
  import * as consts from '../constants'

  export default {
    name: "WorkInfo",
    components: {
      FormPreview
    },
    props: ['item', 'clicks'],
    methods: {
      parserItem: function (item) {
        const body = []
        body.push({label: '事件', value: consts.eventType[item.eventsId]})
        body.push({label: '发布时间', value: item.createDate})
        body.push({label: '截止日期', value: item.endDate})
        body.push({label: '工单状态', value: consts.workStatus[item.workStatus]})
        return body
      }
    }
  }
</script>

<style scoped>

</style>
