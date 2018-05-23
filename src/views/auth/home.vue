<template>
  <div>
    <x-header style="background-color:#F33A55;" title="首页" :left-options="{showBack: false}"></x-header>
    <group>
      <cell title="工单管理" link="/list">
        <x-icon slot="icon" style="padding-right:10px;display:block;" type="code"/>
      </cell>
      <cell title="工单回执" link="/reList">
        <x-icon slot="icon" style="padding-right:10px;display:block;" type="code-working"/>
      </cell>
      <cell title="工单回执" link="/reList">
        <x-icon slot="icon" style="padding-right:10px;display:block;" type="code-download"/>
      </cell>
      <div @click="refresh">
        <cell title="参数更新" isLink>
          <x-icon slot="icon" style="padding-right:10px;display:block;" type="android-refresh"/>
        </cell>
      </div>
    </group>
  </div>
</template>
<script>
  import {XHeader, Group, Cell} from 'vux'
  import api from '../../api'

  export default {
    name: "home",
    components: {
      XHeader,
      Group,
      Cell
    },
    methods: {
      refresh() {
        api.getParams()
      }
    }
  }
</script>

<style scoped>

</style>
