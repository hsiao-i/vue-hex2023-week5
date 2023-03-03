Object.keys(VeeValidateRules).forEach(rule => {
  if (rule !== 'default') {
    VeeValidate.defineRule(rule, VeeValidateRules[rule]);
  }
});

VeeValidateI18n.loadLocaleFromURL('./zh_TW.json');

// Activate the locale
VeeValidate.configure({
  generateMessage: VeeValidateI18n.localize('zh_TW'), //語系設定
  validateOnInput: true, // 驗證方式，調整為輸入字元立即進行驗證
});

const app = Vue.createApp({
  data() {
    return {
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
    
  },
  methods: {
    onSubmit() {
      console.log('送出表單');
      this.$refs.orderForm.resetForm()
    },
    isPhone(value) {
      if(!value) {
        return '手機號碼 為必填'
      }
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '需要正確的手機號碼'
    }
  }
})

app.component('VForm', VeeValidate.Form)
app.component('VField', VeeValidate.Field)
app.component('ErrorMessage', VeeValidate.ErrorMessage)

app.mount('#app')