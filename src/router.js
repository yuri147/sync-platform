const routers = [{
    path: '/',
    meta: {
        title: '',
        requireAuth : true
    },
    component: (resolve) => require(['./views/main.vue'], resolve)
},
{
    path: '/login',
    meta: {
        title: ''
    },
    component: (resolve) => require(['./views/login.vue'], resolve)
}
];
export default routers;