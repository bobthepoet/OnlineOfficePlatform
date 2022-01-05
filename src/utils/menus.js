import { getRequest } from "./api";

//初始化菜单
export const initMenu = (router,store)=>{
    // 初始化之前，判断vuex中state的routes,不为空的话则没必要初始化
    if(store.state.routes.length>0){
        return;
    }

getRequest('/system/cfg/menu').then(res => {
    if (res) {
      // 格式化好的数据
      let fmtRoutes = formatRoutes(res);

      // 添加到路由
      for (let x of fmtRoutes) {
        router.addRoute(x)
      }
      // 将数据存入vuex
      store.commit('initRoutes', fmtRoutes);
      
      // 连接WebSocket
      store.dispatch('connect');
    }
  })
};

export const formatRoutes = (routes) => {
  let fmtRoutes = [];
  routes.forEach(item => {
    let {
      path,
      component,
      name,
      iconCls,
      children,
    } = item;
    if (children && children instanceof Array) {
      // 递归
      children = formatRoutes(children)
    }
    let fmRouter = {
      path: path,
      name: name,
      iconCls: iconCls,
      children: children,
      // 懒加载路由
      component(resolve) {
        if (component.startsWith('Home')){
          require(['../views/' + component + '.vue'], resolve);
        }else if (component.startsWith('Emp')) {
          require(['../views/emp/' + component + '.vue'], resolve);
        } else if (component.startsWith('Per')) {
          require(['../views/per/' + component + '.vue'], resolve);
        } else if (component.startsWith('Sal')) {
          require(['../views/sal/' + component + '.vue'], resolve);
        } else if (component.startsWith('Sta')) {
          require(['../views/sta/' + component + '.vue'], resolve);
        } else if (component.startsWith('Sys')) {
          require(['../views/sys/' + component + '.vue'], resolve);
        }
      }
    };
    fmtRoutes.push(fmRouter)
  });
  return fmtRoutes
};
