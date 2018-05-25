<template>
  <div>
    <group title="回执内容">
      <div class="weui-form-preview__ft">
        <button class="weui-form-preview__btn" @click="buttonSave">保存</button>
        <button class="weui-form-preview__btn" @click="buttonSubmit">提交</button>
      </div>
      <selector title="巡检结果" direction="rtl" v-model="inspectionResult"
                :options="insResults" :value-map="['inspectionResultId', 'inspectionResultName']"/>
      <selector title="异常原因" direction="rtl" v-model="anomalyReason"
                :options="excReasons" :value-map="['anomalousCauseId', 'anomalousCauseName']"/>
      <selector title="装机位置变化" direction="rtl" v-model="isAddress"
                :options="[{key: '0', value: '否'}, {key: '1', value: '是'}]"/>
      <datetime v-model="completeDate" format="YYYY-MM-DD" title="完成时间"/>
    </group>
    <group title="回执图片">
      <uploader :images.sync="images" :max="4"/>
    </group>
  </div>
</template>

<script>
  import {Group, Cell, Selector, Datetime, XButton, Flexbox, FlexboxItem} from 'vux'
  import Uploader from './Uploader'
  import localforage from '../store/localforage'

  export default {
    name: "Inspect",
    components: {
      Group, Cell, Selector, Datetime, Uploader, XButton, Flexbox, FlexboxItem
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
        if (this.init.params) {
          this.inspectionResult = this.init.params.inspectionResult || ''
          this.anomalyReason = this.init.params.anomalyReason || ''
          this.isAddress = this.init.params.isAddress || '0'
          this.completeDate = this.init.params.completeDate || now.getFullYear() + '-' + month + '-' + day
        }
        if (this.init.images) {
          this.images = this.init.images
        }
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
      info: Object,
      init: Object,
      submit: Function,
      save: Function,
      isSave: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      validData(cb) {
        const params = {}
        params.inspectionResult = this.inspectionResult
        params.anomalyReason = this.anomalyReason
        params.isAddress = this.isAddress
        params.completeDate = this.completeDate
        if (params.inspectionResult === '') {
          this.$vux.toast.show({
            type: 'warn',
            position: 'default',
            text: '巡检结果不能为空'
          })
        } else {
          cb(params, this.images)
        }
      },
      buttonSave() {
        this.validData(this.save)
      },
      buttonSubmit() {
        this.validData(this.submit)
      }
    }
  }
</script>

<style scoped>

</style>
