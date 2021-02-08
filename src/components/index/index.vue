<template>
  <div>
    index.vue
    <el-button type="primary"
               @click="alertPlugin">调用插件的方法$alert</el-button>
    <hello v-if="showHello"></hello>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showHello: false,
      content: `网开创《隐私政策》与《服务条款》
我们重视用户的隐私。您在使用我们的服务时，我们可能会收集和使用您的相关信息。我们希望通过本《隐私政策》向您说明，在使用我们的服务时，我们如何收集、使用、储存和分享这些信息，以及我们为您提供的访问、更新、控制和保护这些信息的方式。本《隐私政策》与您所使用的服务息息相关，希望您仔细阅读，在需要时，按照本《隐私政策》的指引，作出您认为适当的选择。本《隐私政策》中涉及的相关技术词汇，我们尽量以简明扼要的表述，并提供进一步说明的链接，以便您的理解。
您使用或继续使用我们的服务，即意味着同意我们按照本《隐私政策》收集、使用、储存和分享您的相关信息。
我们可能收集的信
我们提供服务时，可能会收集、储存和使用下列与您有关的信息。如果您不提供相关信息，可能无法享受我们提供的某些服务，或者无法达到相关服务拟达到的效果。
您提供的信
您在使用们的服务时，向我们提供的相关个人信息，例如电话号码、银行卡号等；`
    }
  },
  methods: {
    alertPlugin () {
      this.showHello = !this.showHello;
      // this.$alert();
      this.$popup({
        title: "服务条款和隐私政策",
        cancelText: "仅浏览",
        confirmText: "同意",
        content: this.content,
        confirm: () => {
          console.log("同意");
        },
        cancel: () => {
          console.log("仅浏览");
        }
      });
    }
  }
}
</script>

<style>
</style>