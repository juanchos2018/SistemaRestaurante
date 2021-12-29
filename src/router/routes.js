const routes = [{
    path: '/',
    component: () =>
        import('layouts/MainLayout.vue'),
    children: [{
        path: '',
        component: () =>
            import('pages/Dashboard.vue')
    },
    {
        path: '/Atender',
        component: () =>
            import('pages/Atender.vue')
    },
    {
        path: '/mesas',
        component: () =>
            import('pages/Mesas.vue')
    },
    {
        path: '/Cocina',
        component: () =>
            import('src/pages/Cocina/Cocina.vue')
    },
    {
        path: '/Categoria',
        component: () =>
            import('src/pages/Cocina/CategoriaList.vue')
    },
    {
        path: '/ProductoList',
        name:'ProductoList',
        component: () =>
            import('src/pages/Cocina/ProductoList.vue')
    },

        // Not completed yet
        // {path: '/Taskboard', component: () => import('pages/TaskBoard.vue')},
    ]
},

// Always leave this as last one,
// but you can also remove it
{
    path: '/:catchAll(.*)*',
    component: () =>
        import('pages/Error404.vue')
},



{
    path: '/Login-1',
    component: () =>
        import('pages/Login-1.vue')
},

]

export default routes