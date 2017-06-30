<style scoped>
.insert {
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 20px;
}
</style>
<template>
    <div class="insert">
        <Form ref="formItem" :model="formItem" :label-width="130" :rules="ruleInline">
            <Form-item label="商品" prop="itemID">
                <Select v-model="formItem.itemID" filterable placeholder="请选择">
                    <Option v-for="item in itemData" :value="item.itemID" :key="itemID">{{ item.itemName }}</Option>
                </Select>
            </Form-item>
            <Form-item label="购买人姓名" prop="buyerName">
                <Input v-model="formItem.buyerName" placeholder="请输入"></Input>
            </Form-item>
            <Form-item label="购买人手机号" prop="buyerPhone">
                <Input v-model="formItem.buyerPhone" placeholder="请输入"></Input>
            </Form-item>
            <Form-item label="地址" prop="buyerAddress">
                <Input v-model="formItem.buyerAddress" placeholder="请输入"></Input>
            </Form-item>
            <Form-item>
                <Button type="primary" @click="submit('formItem')">提交</Button>
                <!--<Button type="ghost" style="margin-left: 8px">取消</Button>-->
            </Form-item>
        </Form>
    </div>
</template>
<script>
export default {
    beforeCreate: function () {
        this.$ajax.get(this.$store.state.api + '/item/list').then(response => {
            this.itemData = response.data.result;
        }, response => {
            this.itemData = null;
        })
    },
    props: ['itemID', 'buyerName', 'buyerPhone', 'buyerAddress'],
    methods: {
        submit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$ajax.post(this.$store.state.api + '/order/insert', {
                        itemID: this.formItem.itemID,
                        buyerName: this.formItem.buyerName,
                        buyerPhone: this.formItem.buyerPhone,
                        buyerAddress: this.formItem.buyerAddress,
                    }).then(response => {
                        if (response.data.result == 'success') {
                            this.$Message.success('新增成功');
                            this.formItem = {};
                        } else {
                            this.$Message.error('新增失败');
                        }

                    }, response => {
                        // console.info(response);
                        this.$Message.error('新增失败');
                    })
                }
            });
        }
    },
    data() {
        const validatePhone = (rule, value, callback) => {
            var reg = /^1[0-9]{10}$/;
            // 模拟异步验证效果
            setTimeout(() => {
                if (reg.test(value)) {
                    callback();
                } else {
                    callback(new Error('手机号格式不正确'));
                }
            }, 300);
        };
        return {
            itemData: [],
            formItem: {
                itemID: '',
                buyerName: '',
                buyerPhone: '',
                buyerAddress: '',
            },
            ruleInline: {
                itemID: [
                    { required: true, message: '请填写商品', trigger: 'blur' }
                ],
                buyerName: [
                    { required: true, message: '请填写购买人姓名', trigger: 'blur' }
                ],
                buyerPhone: [
                    { required: true, message: '请填购买人手机号', trigger: 'blur' },
                    { validator: validatePhone, trigger: 'blur' }
                ],
                buyerAddress: [
                    { required: true, message: '请填购买人地址', trigger: 'blur' }
                ]
            }
        }
    }
}
</script>
