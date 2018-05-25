<template>
  <div>
    <group title="回执信息">
      <selector title="装机位置变化" direction="rtl" v-model="isAddress"
                :options="[{key: '0', value: '否'}, {key: '1', value: '是'}]"/>
      <datetime v-model="completeDate" format="YYYY-MM-DD" title="完成时间"/>
    </group>
    <group v-for="(item, index) in info.details" :key="index" :title="getDevTypeName(item.devType)">
      <cell :value="item.devNo">
        <x-icon slot="label" style="padding-right:10px;display:block;" type="ios-barcode-outline" size="24"/>
      </cell>
    </group>
    <group title="回执图片">
      <uploader :images.sync="images" :max="4"/>
    </group>
    <group>
      <flexbox>
        <flexbox-item v-if="isSave">
          <x-button @click.native="buttonClick">保存</x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button @click.native="buttonClick">提交</x-button>
        </flexbox-item>
      </flexbox>
    </group>
  </div>
</template>

<script>
  import {Group, Cell, Selector, Datetime, XInput, XButton, Flexbox, FlexboxItem} from 'vux'
  import Uploader from './Uploader'

  export default {
    name: "Uninstall",
    components: {
      Group, Cell, Selector, Datetime, Uploader, XInput, XButton, Flexbox, FlexboxItem
    },
    created: function () {
      let now = new Date()
      let month = now.getMonth() + 1
      let day = now.getDate()
      if (month < 10) month = '0' + month
      if (day < 10) day = '0' + day
      this.completeDate = now.getFullYear() + '-' + month + '-' + day
      if (this.init.params) {
        this.isAddress = this.init.params.isAddress || '0'
        this.completeDate = this.init.params.completeDate || now.getFullYear() + '-' + month + '-' + day
      }
      if (this.init.images) {
        this.images = this.init.images
      }
    },
    data: function () {
      return {
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
      getDevTypeName(typeId) {
        let typeName
        this.devTypes.forEach(v => {
          if (v.typeId === typeId)
            typeName = v.typeName
        })
        return typeName
      },
      validData(cb) {
        const params = {}
        params.isAddress = this.isAddress
        params.completeDate = this.completeDate
        cb(params, this.images)
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
