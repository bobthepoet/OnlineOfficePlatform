<template>
  <div>
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">
          <!-- router:启用vue-router模式，以index配置的path作为路径进行路由跳转 -->
          <el-menu router unique-opened>
            <!-- 把路由全都循环出来,v-if作用是让Login不用展示 -->
            <el-submenu :index="index+''" v-for="(item,index) in routes" :key="index" v-if="!item.hidden">
              <template slot="title">
                  <i :class="item.iconCls" style="color: #1ACCFF;margin-right: 5px"></i>
                  <span>{{item.name}}</span>
              </template>
                <el-menu-item :index="children.path" v-for="(children,indexj) in item.children" :key="indexj">{{children.name}}</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "Home",
    computed:{
      routes(){
        return this.$store.state.routes;
      }
    }
  };
</script>

<style>
</style>