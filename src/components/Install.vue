<template>
  <div>
    <group title="回执内容">
      <selector title="装机位置变化" direction="rtl" v-model="isAddress"
                :options="[{key: '0', value: '否'}, {key: '1', value: '是'}]"/>
      <selector title="程序编号" direction="rtl" v-model="programName"
                :options="programs" :value-map="['posProgramId', 'programName']"/>
      <datetime v-model="completeDate" format="YYYY-MM-DD" title="完成时间"/>
    </group>
    <group v-for="(item, index) in info.details" :key="index" :title="getDevTypeName(item.devType)">
      <x-input title="设备序列号" v-model="devNos[item.devType]" placeholder="输入序列号">
        <x-icon slot="label" style="padding-right:10px;display:block;" type="ios-barcode-outline" size="24"/>
      </x-input>
    </group>
    <group title="回执图片">
      <uploader :images.sync="images" :max="4"/>
    </group>
    <group>
      <div class="weui-form-preview__ft">
        <button class="weui-form-preview__btn" @click="buttonSave">保存</button>
        <button class="weui-form-preview__btn" @click="buttonSubmit">提交</button>
      </div>
    </group>
  </div>
</template>

<script>
  import {Group, Cell, Selector, Datetime, XInput} from 'vux'
  import Uploader from './Uploader'
  import localforage from '../store/localforage'

  export default {
    name: "Install",
    components: {
      Group, Cell, Selector, Datetime, Uploader, XInput
    },
    created: function () {
      let now = new Date()
      let month = now.getMonth() + 1
      let day = now.getDate()
      if (month < 10) month = '0' + month
      if (day < 10) day = '0' + day
      this.completeDate = now.getFullYear() + '-' + month + '-' + day
      localforage().getItem('params').then(params => {
        this.programs = params.programs
        this.devTypes = params.devTypes
        if (this.init.params) {
          this.isAddress = this.init.params.isAddress || '0'
          this.completeDate = this.init.params.completeDate || now.getFullYear() + '-' + month + '-' + day
          this.programName = this.init.params.programName || ''
        }
        if (this.init.images) {
          this.images = this.init.images || []
        }
        if (this.init.devNos) {
          this.devNos = this.init.devNos || {}
        } else {
          this.info.details.forEach(item => {
            this.devNos[item.devType] = item.devNo
          })
        }
      })
    },
    data: function () {
      return {
        programs: [],
        devTypes: [],
        isAddress: '0',
        completeDate: '',
        programName: '',
        devNos: {},
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
      getDevTypeName(typeId) {
        let typeName
        this.devTypes.forEach(v => {
          if (v.typeId === typeId)
            typeName = v.typeName
        })
        return typeName
      },
      validData(cb) {
        // 验证
        const params = {}
        params.isAddress = this.isAddress
        params.completeDate = this.completeDate
        params.programName = this.programName
        let result = true
        if (params.programName === '') {
          this.$vux.toast.show({
            type: 'warn',
            position: 'default',
            text: '程序编号不能为空'
          })
          result = false
        }
        const denNos = Object.values(this.devNos)
        if (result && denNos.filter(v => v).length < denNos.length) {
          this.$vux.toast.show({
            type: 'warn',
            position: 'default',
            text: '序列号不能为空'
          })
          result = false
        }
        if (result) {
          cb(params, this.images, this.devNos)
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
