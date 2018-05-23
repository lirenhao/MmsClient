<template>
  <form-preview header-label="终端号" :header-value="item.termNo"
                :body-items="parserItem(item)" :footer-buttons="clicks"/>
</template>

<script>
  import {FormPreview} from 'vux'

  export default {
    name: "ExtInfo",
    components: {
      FormPreview
    },
    props: ['item', 'clicks'],
    methods: {
      parserItem: function (item) {
        const body = []
        body.push({label: '工单号', value: item.workId})
        body.push({label: '商户号', value: item.merNo})
        body.push({label: '派工人', value: item.jobOffer})
        body.push({label: '执行人', value: item.executor})
        body.push({label: '回执状态', value: item.receiptStatus})
        body.push({label: '复核状态', value: item.reviewStatus})
        body.push({label: '派工时间', value: item.dispatchingDate})
        body.push({label: '派工描述', value: item.dispatchingRemark})
        return body
      }
    }
  }
</script>

<style scoped>

</style>
