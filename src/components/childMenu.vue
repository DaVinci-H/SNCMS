<template>
  <div>
    <div v-for="value in this.menuData" :key="value.id">
      <el-submenu :index="value.id" v-if="value.node">
        <template slot="title">
          <i class="fa fa-folder-o" v-if="value.type==1"></i>
          <i class="fa fa-file-text-o" v-else-if="value.type==2"></i>
          <span slot="title">{{value.menu_name}}</span>
        </template>
        <childMenu :menuData="value.node"></childMenu>
      </el-submenu>
      <el-menu-item :index="value.id" v-else>
        <i class="fa fa-folder-o" v-if="value.type==1"></i>
        <i class="fa fa-file-text-o" v-else-if="value.type==2"></i>
        <span slot="title">{{value.menu_name}}</span>
      </el-menu-item>
    </div>
  </div>
</template>

<script>
export default {
  name: "childMenu",
  props: ["menuData"]
};
</script>