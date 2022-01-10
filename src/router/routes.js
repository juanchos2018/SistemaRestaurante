const routes = [
  {
      path: '/',
      component: () =>
      import('pages/Login.vue')
  },
  {
      path: '/Sistema',
      component: () =>
      import('layouts/MainLayout.vue'),
      children: [
          {path: 'Cafeteria', name: "Sistema/Cafeteria", component: () =>  import('pages/Cafeteria/Cafeteria.vue') },
          {path: 'MiPedido', name: "Sistema/MiPedido", component: () => import('pages/Cafeteria/MiPedido.vue') },
          {path: 'MisPedidos', name: "Sistema/MisPedidos", component: () => import('pages/Cafeteria/MisPedidos.vue') },
          {path: 'Categoria', name: "Sistema/Categoria",component: () => import('pages/Cocina/CategoriaList.vue') }, 
          {path: 'Cocina',   name: "Sistema/Cocina", component: () => import('pages/Cocina/Cocina.vue') },
          {path: 'ProductoList/:id_categoria',name: "/ProductoList",props:true, component: () => import('pages/Cocina/ProductoList.vue') },
          {path: 'Historial',   name: "Sistema/Historial", component: () => import('pages/Cocina/PedidosAll.vue') },
     
      
        //   { name: "Sistema/Cocina",path: 'Cocina', component: () => import('pages/Cocina/Cocina.vue') },
        //   { name: "/ProductoList",path: 'ProductoList/:id_categoria',props:true, component: () => import('pages/Cocina/ProductoList.vue') },

      ]
  },


  {
      path: '/:catchAll(.*)*',
      component: () =>
          import('pages/Error404.vue')
  },

  
]

export default routes