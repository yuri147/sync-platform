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
            <Form-item label="商品编号" prop="itemID">
                <Input v-model="formItem.itemID" placeholder="请输入"></Input>
            </Form-item>
            <Form-item label="商品名称" prop="itemName">
                <Input v-model="formItem.itemName" placeholder="请输入"></Input>
            </Form-item>
            <Form-item label="商品类型" prop="itemType">
                <Select v-model="formItem.itemType" placeholder="请选择">
                    <Option value="男装">男装</Option>
                    <Option value="女装">女装</Option>
                </Select>
            </Form-item>
            <!--<Form-item label="商品图片">-->
            <Upload action="//jsonplaceholder.typicode.com/posts/">
        <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
    </Upload>
            <!--</Form-item>-->
            <Form-item>
                <Button type="primary" @click="submit">提交</Button>
                <!--<Button type="ghost" style="margin-left: 8px">取消</Button>-->
            </Form-item>
        </Form>
    </div>
</template>
<script>
export default {
    props: ['itemID', 'itemName', 'itemType'],
    methods: {
        submit() {
            this.$refs['formItem'].validate((valid) => {
                if (valid) {
                    this.$ajax.post(this.$store.state.api + '/item/insert', {
                        itemID: this.formItem.itemID,
                        itemName: this.formItem.itemName,
                        itemType: this.formItem.itemType
                    }).then(response => {
                        if (response.data.result == 'success') {
                            this.$Message.success('新增成功');
                            this.formItem = {};
                        } else {
                            this.$Message.error('新增失败');
                        }
                    }, response => {
                        this.$Message.error('新增失败');
                    })
                }
            });

        }        
    },
    data() {
        return {
            uploadList: [],
            formItem: {},
            ruleInline: {
                itemID: [
                    { required: true, message: '请填写商品编号', trigger: 'blur' }
                ],
                itemName: [
                    { required: true, message: '请填写商品名称', trigger: 'blur' }
                ],
                itemType: [
                    { required: true, message: '请填购商品类型', trigger: 'blur' }
                ]
            }
        }
    }
}
</script>
