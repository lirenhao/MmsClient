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
      <uploader :images="images" :max="4"/>
    </group>
    <group>
      <x-button type="primary" @click.native="buttonClick">提交</x-button>
    </group>
  </div>
</template>

<script>
  import {Group, Cell, Selector, Datetime, XInput, XButton} from 'vux'
  import Uploader from './Uploader'

  export default {
    name: "Uninstall",
    components: {
      Group, Cell, Selector, Datetime, Uploader, XInput, XButton
    },
    created: function () {
      let now = new Date()
      let month = now.getMonth() + 1
      let day = now.getDate()
      if (month < 10) month = '0' + month
      if (day < 10) day = '0' + day
      this.completeDate = now.getFullYear() + '-' + month + '-' + day
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
      handler: {
        type: Function,
        required: true
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
      buttonClick() {
        this.handler(this.$data)
      }
    }
  }
</script>

<style scoped>

</style>
