<style scoped>
.back {
    width: 100%;
    height: 100vh;
    background: #eee;
    text-align: center;
}

.login-form {
    background: #fff;
    width: 500px;
    border-radius: 5px;
    text-align: center;
    height: 100px;
    padding: 30px;
    position: absolute;
    left: 50%;
    margin-left: -250px;
    top: 50%;
    margin-top: -50px;
    box-shadow: #dadada 2px 7px 4px 3px;
}

.title {
    padding-top: 30vh;
    font-size: 20px;
}
</style>
<template>
    <div class="back">
        <div class="title">欢迎登录协作平台</div>
        <div class="login-form">
            <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
                <Form-item prop="user">
                    <Input type="text" v-model="formInline.user" placeholder="Username">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </Form-item>
                <Form-item prop="password">
                    <Input type="password" v-model="formInline.password" placeholder="Password">
                    <Icon type="ios-locked-outline" slot="prepend"></Icon>
                    </Input>
                </Form-item>
                <Form-item>
                    <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
                </Form-item>
            </Form>
        </div>
        <foot-bottom></foot-bottom>
    </div>
</template>
<script>
import footBottom from '../components/footBottom.vue';
export default {
    components: {
        'foot-bottom': footBottom
    },
    data() {
        return {
            formInline: {
                user: '',
                password: ''
            },
            ruleInline: {
                user: [
                    { required: true, message: '请填写用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请填写密码', trigger: 'blur' },
                    { type: 'string', min: 3, message: '密码长度不能小于6位', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        handleSubmit: function (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$ajax.post(this.$store.state.api + '/user/login', {
                        userID: this.formInline.user,
                        userPWD: this.formInline.password
                    }).then(response => {
                        // this.orderTableData = response.data.result;
                        var result = response.data.result;
                        if (result.length <= 0) {
                            this.$Message.error('登录失败!');
                        } else {
                            this.$Message.success('登录成功!');
                            this.$store.state.user = result[0]
                            this.formInline.user = ''
                            this.formInline.password = ''
                            this.$router.push({ path: '/' })
                        }

                    }, response => {
                        this.$Message.error('登录失败!');
                    })


                } else {

                }
            })
        }
    }
}
</script>
