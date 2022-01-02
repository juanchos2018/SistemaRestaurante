import Login from 'pages/Login.vue';

const routes = [
  {
    path: '/',
    name:'login',
    component: Login
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }, 
  {
    path: '/Sistema',
    name:'Sistema',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: "Sistema/Cafeteria",path: 'Cafeteria', component: () => import('pages/Cafeteria/Cafeteria.vue') },
      { name: "Sistema/MiPedido",path: 'MiPedido', component: () => import('pages/Cafeteria/MiPedido.vue') },
      { name: "Sistema/Categoria",path: 'Categoria', component: () => import('pages/Cocina/CategoriaList.vue') },
      { name: "Sistema/Cocina",path: 'Cocina', component: () => import('pages/Cocina/Cocina.vue') },
      { name: "/ProductoList",path: 'ProductoList/:id_categoria',props:true, component: () => import('pages/Cocina/ProductoList.vue') },
      { name: "Sistema/Step",path: 'Step', component: () => import('pages/step.vue') },
      { name: "Sistema/Prueba",path: 'Prueba', component: () => import('pages/Cafeteria/Prueba.vue') },

     

      

    ]
  },   
 
]


 

export default routes