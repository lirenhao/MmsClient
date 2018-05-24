<template>
  <div>
    <group title="回执信息">
      <selector title="巡检结果" direction="rtl" v-model="inspectionResult"
                :options="insResults" :value-map="['inspectionResultId', 'inspectionResultName']"/>
      <selector title="异常原因" direction="rtl" v-model="anomalyReason"
                :options="excReasons" :value-map="['anomalousCauseId', 'anomalousCauseName']"/>
      <selector title="装机位置变化" direction="rtl" v-model="isAddress"
                :options="[{key: '0', value: '否'}, {key: '1', value: '是'}]"/>
      <datetime v-model="completeDate" format="YYYY-MM-DD" title="完成时间"/>
    </group>
    <group title="回执图片">
      <uploader :images="images" :max="4"/>
    </group>
    <group>
      <x-button type="primary" @click.native="buttonClick">提交</x-button>
    </group>
  </div>
</template>

<script>
  import {Group, Cell, Selector, Datetime, XButton} from 'vux'
  import Uploader from './Uploader'
  import localforage from '../store/localforage'

  export default {
    name: "Inspect",
    components: {
      Group, Cell, Selector, Datetime, Uploader, XButton
    },
    created: function () {
      let now = new Date()
      let month = now.getMonth() + 1
      let day = now.getDate()
      if (month < 10) month = '0' + month
      if (day < 10) day = '0' + day
      this.completeDate = now.getFullYear() + '-' + month + '-' + day
      localforage().getItem('params').then(params => {
        this.insResults = params.insResults
        this.excReasons = params.excReasons
      })
    },
    data: function () {
      return {
        insResults: [],
        excReasons: [],
        inspectionResult: '',
        anomalyReason: '',
        isAddress: '0',
        completeDate: '',
        images: []
      }
    },
    props: {
      handler: {
        type: Function,
        required: true
      }
    },
    methods: {
      buttonClick() {
        const params = {}
        params.inspectionResult = this.inspectionResult
        params.anomalyReason = this.anomalyReason
        params.isAddress = this.isAddress
        params.completeDate = this.completeDate
        params.images = this.images
        if (params.inspectionResult === '') {
          this.$vux.toast.show({
            type: 'warn',
            position: 'default',
            text: '巡检结果不能为空'
          })
        } else {
          this.handler(params)
        }
      }
    }
  }
</script>

<style scoped>

</style>
