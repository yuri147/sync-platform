<style scoped>
.layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
}

.layout-logo {
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}

.layout-nav {
    width: 420px;
    margin-left: 150px;
}

.layout-assistant {
    width: 600px;
    margin-left: 10px;
    height: inherit;
}

.layout-breadcrumb {
    padding: 10px 15px 0;
}

.layout-content {
    min-height: 1vh;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
}

.layout-content-main {
    padding: 10px;
}

.layout-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
}

.right-pad {
    position: absolute;
    right: 1vw;
    width: auto;
}

.user-name {
    color: #fff;
    position: absolute;
    right: 4vw;
    width: 70px;
}
</style>
<template>
    <div class="layout">
        <Menu mode="horizontal" theme="dark" v-on:on-select="goLevel1" active-name="1">
            <div class="layout-logo"></div>
            <div class="layout-nav">
                <Menu-item name="1">
                    <Icon type="android-menu"></Icon>
                    订单管理
                </Menu-item>
                <Menu-item name="2">
                    <Icon type="bag"></Icon>
                    商品管理
                </Menu-item>
            </div>
            <div class="layout-nav right-pad">
                <span class="user-name">{{this.$store.state.user.userName}}</span>
                <Menu-item name="logout">
                    <Icon type="log-out"></Icon>
                    登出
                </Menu-item>
            </div>
        </Menu>
        <Menu mode="horizontal" v-on:on-select="goLevel2" active-name="1">
            <div class="layout-assistant" v-if="showOrder">
                <Menu-item name="1">订单录入</Menu-item>
                <Menu-item name="2">订单管理</Menu-item>
            </div>
            <div class="layout-assistant" v-if="showItem" active-name="1">
                <Menu-item name="1">商品录入</Menu-item>
                <Menu-item name="2">商品管理</Menu-item>
                <Menu-item name="3">商品图片上传</Menu-item>
            </div>
        </Menu>
    </div>
</template>
<script>
export default {
    data() {
        return {
            showOrder: false,
            showItem: false,
            menu: {}
        }
    },
    methods: {
        goLevel1: function (event) {
            if (event == 1) {
                this.initMenu();
                this.showOrder = true;
                this.menu.level1 = 1;
            } else if (event == 2) {
                this.initMenu();
                this.showItem = true;
                this.menu.level1 = 2;
            } else if (event == 'logout') {
                this.initMenu();
                this.$store.state.user = null;
                sessionStorage.setItem("spf.user", null);
                this.$router.push({ path: '/login' });
            }
            this.$emit('menuSelect', this.menu);
        },
        goLevel2: function (event) {
            if (event == 1) {
                this.menu.level2 = 1;
            } else if (event == 2) {
                this.menu.level2 = 2;
            } else if (event == 3) {
                this.menu.level2 = 3;
            }
            this.$emit('menuSelect', this.menu);
        },
        initMenu: function (event) {
            this.showOrder = false;
            this.showItem = false;
        }
    }
}
</script>
