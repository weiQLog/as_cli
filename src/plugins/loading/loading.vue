<template>
  <div id="plugin_login_container_width_weiqlog"
       @click="cancel">
    <div class="dot-spin"></div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
#plugin_login_container_width_weiqlog {
  width: 50px;
  height: 50px;
  // background: rgba(0, 0, 0, 0.212);
  z-index: 99999999;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -25px;
  margin-top: -25px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>