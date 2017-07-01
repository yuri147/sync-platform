<style scoped>
.upload {
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 20px;
}
</style>
<template>
    <div class="upload">
        <Form ref="formItem" :model="formItem" :label-width="130" :rules="ruleInline">
            <Form-item label="商品" prop="itemID">
                <Select v-model="formItem.itemID" filterable placeholder="请选择">
                    <Option v-for="item in itemData" :value="item.itemID" :key="itemID">{{ item.itemName }}</Option>
                </Select>
            </Form-item>
            <Form-item label="商品图片">
                <Upload ref="upload" type="drag" multiple :action="uploadPath" :on-success="handleSuccess" :on-format-error="handleFormatError" :on-remove="handleRemove" :on-exceeded-size="handleMaxSize" :format="['jpg','jpeg','png']" :max-size="5120">
                    <div style="padding: 20px 0">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>点击或将文件拖拽到这里上传</p>
                    </div>
                </Upload>
            </Form-item>
            <Form-item>
                <Button type="primary" @click="submit">提交</Button>
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
        }, () => {
            this.itemData = null;
        });
    },
    props: ['itemID'],
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
                    }, () => {
                        this.$Message.error('新增失败');
                    })
                }
            });
        },
        handleMaxSize(file) {
            this.$Notice.warning({
                title: '超出文件大小限制',
                desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
            });
        },
        handleFormatError(file) {
            this.$Notice.warning({
                title: '文件格式不正确',
                desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
            });
        },
        handleSuccess(res, file) {            
            if (res.result == 'success') {
                this.$Message.success('上传成功');
            } else {
                this.$Message.error('上传失败');
            }
            // console.info(file);
            // 因为上传过程为实例，这里模拟添加 url
            // file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
            // file.name = '7eb99afb9d5f317c912f08b5212fd69a';
        },
        handleRemove(file, fileList) {
            console.info(file);
            console.info(fileList);
        }
    },
    mounted() {
        this.uploadList = this.$refs.upload.fileList;
        console.info(this.uploadList);
    },
    data() {
        return {
            uploadList: [],
            formItem: {},
            itemData: [],
            imgPreviewUrl:this.$store.state.imgPath,
            uploadPath: this.$store.state.api + '/item/upload',
            ruleInline: {
                itemID: [
                    { required: true, message: '请选择商品', trigger: 'blur' }
                ]
            }
        }
    }
}
</script>
