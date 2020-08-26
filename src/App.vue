<template>
  <div id="app">
    <keep-alive exclude="Login,Register,Security,FindPwd,Comment,SetUpInfo,ProductDetail,Cart,Payment,PaySucc,OrderDetail">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="stylus">
  @import "~styles/elstyles.styl"
</style>
