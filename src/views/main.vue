<style scoped>

</style>

<template>
    <div>
        <head-top @menuSelect="menuSelect"></head-top>
        <welcome v-if="showWelcome"></welcome>
        <order-list v-if="showOrderList"></order-list>
        <order-insert v-if="showOrderInsert"></order-insert>
        <item-insert v-if="showItemInsert"></item-insert>
        <item-list v-if="showItemList" ></item-list>
        <item-img v-if="showItemImg" ></item-img>
        <foot-bottom></foot-bottom>
    </div>
</template>
<script>
import headTop from '../components/headTop.vue';
import footBottom from '../components/footBottom.vue';
import welcome from '../components/welcome.vue';
import orderinsert from '../components/order/orderinsert.vue';
import orderlist from '../components/order/orderlist.vue';
import iteminsert from '../components/item/iteminsert.vue';
import itemlist from '../components/item/itemlist.vue';
import itemimgupload from '../components/item/itemimgupload.vue';
export default {
    components: {
        'head-top': headTop,
        'foot-bottom': footBottom,
        'order-list': orderlist,
        'order-insert': orderinsert,
        'item-insert': iteminsert,
        'item-list':itemlist,
        'item-img':itemimgupload,
        'welcome': welcome
    },
    data() {
        return {
            showWelcome: true,
            showOrderList: false,
            showOrderInsert: false,
            showItemInsert: false,
            showItemList:false,
            showItemImg:false,
            itemTableData:[]
        }
    },
    methods: {
        menuSelect: function (event) {
            this.init();
            if (event.level1 == 1 && event.level2 == 1) {
                this.showOrderInsert = true;
            }
            if (event.level1 == 1 && event.level2 == 2) {
                this.showOrderList = true;                
            }
            if (event.level1 == 2 && event.level2 == 1) {
                this.showItemInsert = true;
            }
            if (event.level1 == 2 && event.level2 == 2) {
                this.showItemList = true;                
            }
            if (event.level1 == 2 && event.level2 == 3) {
                this.showItemImg = true;
            }
        },
        init: function () {
            this.showWelcome = false;
            this.showOrderList = false;
            this.showOrderInsert = false;
            this.showItemInsert = false;
            this.showItemList = false;
            this.showItemImg = false;
        }
    }
}
</script>
