<template>
  <div id="index">
    <el-container>
      <el-header height="50px">
        <!-- 头部 -->
        <div id="header">
          <!-- logo -->
          <div class="logo">SNCMS</div>
          <!-- 面包屑导航 -->
          <div class="left-breadcrumb">
            <el-breadcrumb>
              <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <!-- 右侧头像操作     -->
          <div class="right-menu" v-popover:rightMenupopover>
            <img :src="testimg" />
            <i class="fa fa-sort-down"></i>
          </div>
          <!-- 用户名与退出登录 -->
          <el-popover ref="rightMenupopover" placement="top-start" width="100" trigger="click">
            <div class="head-menu-username">用户名</div>
            <div class="head-menu-exit" @click="logout">退出登录</div>
          </el-popover>
        </div>
      </el-header>
      <el-container>
        <!-- 左侧菜单栏 -->
        <el-aside width="200px">
          <el-menu
            :default-active="$route.meta.activeName||$route.name"
            class="el-menu-vertical-demo"
            background-color="#1F2D3D"
            text-color="#8aa4af"
            active-text-color="#fff"
            @select="menuSelect"
          >
            <div v-for="item in menuList" :key="item.name">
              <el-submenu :index="item.name" v-if="item.children">
                <template slot="title">
                  <i v-if="item.icon" :class="item.icon"></i>
                  <span>{{item.title}}</span>
                </template>
                <el-menu-item :index="son.name" v-for="son in item.children" :key="son.name">
                  <i v-if="son.icon" :class="son.icon"></i>
                  <span slot="title">{{son.title}}</span>
                </el-menu-item>
              </el-submenu>
              <el-menu-item :index="item.name" v-else>
                <i v-if="item.icon" :class="item.icon"></i>
                <span slot="title">{{item.title}}</span>
              </el-menu-item>
            </div>
          </el-menu>
        </el-aside>
        <!-- 内容主体 -->
        <el-main>
          <div id="main">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import testimg from "@/assets/images/login-admin.png";
export default {
  data() {
    return {
      testimg,
      // 菜单列表
      menuList: [
        {
          name: "control-panel",
          icon: "fa fa-dashboard",
          title: "控制台"
        },
        {
          name: "basic",
          icon: "fa fa-cog",
          title: "基本信息"
        },
        {
          name: "user",
          icon: "fa fa-user",
          title: "用户管理"
        },
        {
          name: "role",
          icon: "fa fa-group",
          title: "角色管理"
        },
        {
          name: "resource",
          icon: "fa fa-key",
          title: "资源管理"
        },
        {
          name: "ad",
          icon: "fa fa-image",
          title: "广告管理"
        },
        {
          name: "classify",
          icon: "fa fa-list",
          title: "分类管理"
        },
        {
          name: "tag-config",
          icon: "fa fa-tag",
          title: "标签管理"
        },
        {
          name: "article",
          icon: "fa fa-file-text",
          title: "文章管理"
        },
        {
          name: "comment",
          icon: "fa fa-comments",
          title: "评论管理"
        },
        // {
        //   name: "log",
        //   icon: "fa fa-list-alt",
        //   title: "日志管理"
        // },
        {
          name: "api-doc",
          icon: "fa fa-columns",
          title: "接口文档"
        }
      ]
    };
  },
  methods: {
    // 菜单项选择跳转
    menuSelect(index) {
      this.$router.push({ name: index });
    },
    // 退出登录
    logout() {
      console.log("退出登录");
    }
  }
};
</script>

<style lang="less">
@import "../../assets/less/index/index.less";
</style>