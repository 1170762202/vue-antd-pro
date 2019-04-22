<template>
    <div class="lx-login-wrap">
        <div class="lx-login">
            <a-form
                    id="components-form-demo-normal-login"
                    :form="form"
                    class="login-form"
                    @submit="handleSubmit">
                <a-form-item>
                    <a-input
                            v-decorator="['username',{ rules: [{ required: true, message: 'Please input your username!' }] }]"
                            placeholder="Username">
                        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)"/>
                    </a-input>
                </a-form-item>
                <a-form-item>
                    <a-input
                            v-decorator="['password',{ rules: [{ required: true, message: 'Please input your Password!' }] }]"
                            type="password"
                            placeholder="Password">
                        <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/>
                    </a-input>
                </a-form-item>
                <a-form-item>
                    <a-checkbox v-decorator="['remember',{valuePropName: 'checked',initialValue: true,}]">自动登录
                    </a-checkbox>
                    <a class="login-form-forgot" href="">忘记密码</a>
                    <a-button type="primary"
                              html-type="submit"
                              class="login-form-button"
                              :loading="state.loginBtn"
                              :disabled="state.loginBtn">登录
                    </a-button>
                    Or <a href="">注册</a>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>

<script>
    import {timeFix} from '@/utils/util'

    export default {
        name: "Login",
        beforeCreate() {
            this.form = this.$form.createForm(this);
        },
        data() {
            return {
                formLayout: 'horizontal',
                state: {
                    time: 60,
                    loginBtn: false,
                    // login type: 0 email, 1 username, 2 telephone
                    loginType: 0,
                    smsSendBtn: false
                }
            }
        },
        computed: {},
        methods: {
            handleSubmit(e) {
                e.preventDefault();
                const {
                    state,
                } = this;
                this.form.validateFields((err, values) => {
                    if (!err) {
                        this.$api.login(values.username, values.password)
                            .then((res) => this.loginSuccess(res))
                            .catch(err => this.requestFailed(err))
                            .finally(() => {
                                state.loginBtn = false;
                                localStorage.setItem('username', values.username);
                                this.$router.push({name: 'home'});
                            });
                        console.log('Received values of form: ', values);
                    }
                });
            },
            loginSuccess(res) {
                console.log(res);
                this.$router.push({name: 'home'});
                // 延迟 1 秒显示欢迎信息
                setTimeout(() => {
                    this.$notification.success({
                        message: '欢迎',
                        description: `${timeFix()}，欢迎回来`
                    })
                }, 1000)
            },
            requestFailed(err) {
                this.$notification['error']({
                    message: '错误',
                    description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
                    duration: 4
                })
            }
        }
    }
</script>

<style lang="scss">
    .lx-login-wrap {
        position: fixed;
        width: 100%;
        height: 100%;
        background: url("../../assets/img/bg.png");
        background-size: 100%;
    }

    .lx-login {
        position: absolute;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.3);
        overflow: hidden;
        left: 40%;
        top: 20%;
        padding: 30px;
    }

    #components-form-demo-normal-login .login-form {
        max-width: 300px;
    }

    #components-form-demo-normal-login .login-form-forgot {
        float: right;
    }

    #components-form-demo-normal-login .login-form-button {
        width: 100%;
    }
</style>
