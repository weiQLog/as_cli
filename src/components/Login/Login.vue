<template>
  <div class="login-page-container">
    <el-form :model="ruleForm2"
             :rules="rules2"
             ref="ruleForm2"
             label-position="left"
             label-width="0px"
             class="demo-ruleForm login-container">
      <h3 class="u-flex u-row-center">
        <span>欢迎登录</span>
      </h3>
      <el-form-item prop="account">
        <el-input type="text"
                  v-model="ruleForm2.account"
                  auto-complete="off"
                  placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password"
                  v-model="ruleForm2.checkPass"
                  auto-complete="off"
                  placeholder="密码"></el-input>
      </el-form-item>
      <el-checkbox v-model="checked"
                   checked
                   class="remember">记住密码</el-checkbox>
      <el-form-item style="width: 100%">
        <el-button type="primary"
                   style="width: 100%"
                   @click="handleSubmit2"
                   :loading="logining">登录</el-button>
      </el-form-item>
      <div>同意</div>
    </el-form>

    <div class="header">
      <div class="inner-header flex"></div>
      <div>
        <svg class="waves"
             xmlns="http://www.w3.org/2000/svg"
             xmlns:xlink="http://www.w3.org/1999/xlink"
             viewBox="0 24 150 28"
             preserveAspectRatio="none"
             shape-rendering="auto">
          <defs>
            <path id="gentle-wave"
                  d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          </defs>
          <g class="parallax">
            <use xlink:href="#gentle-wave"
                 x="48"
                 y="0"
                 fill="rgba(255,255,255,0.7)" />
            <use xlink:href="#gentle-wave"
                 x="48"
                 y="3"
                 fill="rgba(255,255,255,0.5)" />
            <use xlink:href="#gentle-wave"
                 x="48"
                 y="5"
                 fill="rgba(255,255,255,0.3)" />
            <use xlink:href="#gentle-wave"
                 x="48"
                 y="7"
                 fill="#fff" />
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import Login from "./Login";
export default Login
</script>

<style lang="scss" scope>
@import "./Login.scss";
</style>