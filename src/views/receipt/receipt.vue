<template>
  <div>
    <x-header style="background-color:#F33A55;" title="工单回执"/>
    <group :title="title">
      <cell title="终端号" :value="info.termNo"></cell>
      <!--<cell-form-preview list="list"></cell-form-preview>-->
    </group>
    <install v-if="info.eventsId === '0' || info.eventsId === '1'"
             :handler="submit" :info="info"/>
    <uninstall v-if="info.eventsId === '2'"
               :handler="submit" :info="info"/>
    <inspect v-if="info.eventsId === '3' || info.eventsId === '4' || info.eventsId === '5'"
             :handler="submit" :info="info"/>
  </div>
</template>

<script>
  import {XHeader, Group, Cell, CellFormPreview} from 'vux'
  import Install from '../../components/Install'
  import Uninstall from '../../components/Uninstall'
  import Inspect from '../../components/Inspect'
  import api from '../../api'
  import * as consts from '../../constants'

  export default {
    name: "receipt",
    components: {
      XHeader, Group, Cell, CellFormPreview, Install, Uninstall, Inspect
    },
    props: ['info', 'type'],
    data: function () {
      return {
        title: consts.eventType[this.info.eventsId]
      }
    },
    methods: {
      submit(value) {
        console.log(value)
      },
    }
  }
</script>

<style scoped>

</style>
