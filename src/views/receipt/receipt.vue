<template>
  <div>
    <x-header style="background-color:#D41919;width:100%;position:absolute;left:0;top:0;z-index:100;" title="工单回执"/>
    <group :title="title">
      <cell title="终端号" :value="info.termNo"></cell>
      <!--<cell-form-preview list="list"></cell-form-preview>-->
    </group>
    <install v-if="info.eventsId === '0' || info.eventsId === '1'"
             :submit="submit" :save="save" :info="info" :init="init"/>
    <uninstall v-if="info.eventsId === '2'"
               :submit="submit" :save="save" :info="info" :init="init"/>
    <inspect v-if="info.eventsId === '3' || info.eventsId === '4' || info.eventsId === '5'"
             :submit="submit" :save="save" :info="info" :init="init"/>
  </div>
</template>

<script>
  import {XHeader, Group, Cell, CellFormPreview} from 'vux'
  import Install from '../../components/Install'
  import Uninstall from '../../components/Uninstall'
  import Inspect from '../../components/Inspect'
  import * as consts from '../../constants'
  import api from '../../api'
  import localforage from '../../store/localforage'

  export default {
    name: "receipt",
    components: {
      XHeader, Group, Cell, CellFormPreview, Install, Uninstall, Inspect
    },
    props: ['info'],
    created: function () {
      localforage(window.localStorage.id).getItem('receipt')
        .then(receipt => {
          this.init = receipt[this.info.workId + this.info.termNo] || {}
        })
    },
    data: function () {
      return {
        init: {},
        title: consts.eventType[this.info.eventsId]
      }
    },
    methods: {
      submit(params, images, devNos) {
        params.workId = this.info.workId
        params.merNo = this.info.merNo
        params.termNo = this.info.termNo
        params.eventsId = this.info.eventsId
        params.addr = this.info.addr
        api.workReceipt(params, images, devNos)
      },
      save(params, images, devNos) {
        params.workId = this.info.workId
        params.merNo = this.info.merNo
        params.termNo = this.info.termNo
        params.eventsId = this.info.eventsId
        params.addr = this.info.addr
        api.saveReceipt(params, images, devNos)
      }
    }
  }
</script>

<style scoped>

</style>
