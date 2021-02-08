<template>
  <div>
    <div v-if="show"
         class="popup u-flex u-row-center">
      <div class="neirong u-flex-col u-row-around">
        <div class="title u-flex u-row-center u-m-t-10 u-m-b-20">{{title}}</div>
        <div class="desc u-m-b-10">{{content}}</div>
        <div class="u-m-t-20 u-m-b-10 u-flex u-row-between">
          <el-button @click="event_click(0)"
                     :class="cancelFlex"
                     :round="true"
                     :type="cancelTextType">{{cancelText}}</el-button>
          <el-button @click="event_click(1)"
                     :class="confirmFlex"
                     :round="true"
                     :type="confirmTextType">{{confirmText}}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      title: "提示",
      content: "",
      confirmText: "确定",
      confirmTextType: "primary",
      confirmFlex: "u-flex-3",
      cancelText: "取消",
      cancelTextType: "",
      cancelFlex: "u-flex-1",
    }
  },
  methods: {
    event_click (type) {
      type == 0 ? this.cancel() : this.confirm();
      this.close();
    },
    close () {
      this.show = false;
      this.$popupClose();
    }
    // popup ({
    //   title = "提示",
    //   content = "是否要删除?",
    //   confirmText = "确定",
    //   confirmTextType = "primary",
    //   cancelText = "取消",
    //   cancelTextType = "",
    //   width = "450",
    //   height = "600"
    // } = {}) {
    //   this.show = true;
    // }
  }
}
</script>

<style>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  /* width: 200px;
  height: 200px;
  background-color: azure;
  border-radius: 10px; */
}
.neirong {
  padding: 30px;
  width: 300px;
  max-height: 550px;
  overflow: hidden;
  border-radius: 5px;
  background: white;
}
.desc {
  line-height: 1.5em;
  max-height: 300px;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 13;
  -webkit-box-orient: vertical;
}
.title {
  font-weight: 500;
  font-size: 1.2em;
}
.desc {
  font-size: 0.9em;
  color: rgb(141, 141, 141);
}
</style>