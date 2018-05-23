<template>
  <div>
    <x-header style="background-color:#F33A55;" title="首页" :left-options="{showBack: false}"></x-header>
    <group>
      <cell title="工单管理" link="/list">
        <x-icon slot="icon" type="code"/>
      </cell>
      <cell title="工单回执" link="/reList">
        <x-icon slot="icon" type="code-working"/>
      </cell>
      <cell title="工单回执" link="/reList">
        <x-icon slot="icon" type="code-download"/>
      </cell>
    </group>
  </div>
</template>
<script>
  import {XHeader, Group, Cell} from 'vux'

  export default {
    name: "home",
    components: {
      XHeader,
      Group,
      Cell
    }
  }
</script>

<style scoped>

</style>
