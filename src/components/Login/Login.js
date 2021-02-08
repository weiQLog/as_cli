export default {
  props: {},
  data() {
    return {
      logining: false,
      ruleForm2: {
        account: 'admin',
        checkPass: '123456',
      },
      rules2: {
        account: [
          {
            required: true,
            message: '请输入账号',
            trigger: 'blur',
          },
          //{ validator: validaePass }
        ],
        checkPass: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
          },
          //{ validator: validaePass2 }
        ],
      },
      checked: true,
    }
  },
  methods: {
    handleSubmit2(ev) {
      var _this = this
      _this.$refs.ruleForm2.validate((valid) => {
        if (valid) {
          _this.logining = true
          var loginParams = {
            username: this.ruleForm2.account,
            password: this.ruleForm2.checkPass,
          }
          if (
            loginParams.username == 'admin' &&
            loginParams.password == '123456'
          ) {
            _this.logining = false
            sessionStorage.setItem('user', JSON.stringify(loginParams))
            _this.$router.push({ path: '/menutab' })
          } else {
            _this.logining = false
            _this.$alert('用户名或密码错误！', '提示信息', {
              confirmButtonText: '确定',
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  },
}
