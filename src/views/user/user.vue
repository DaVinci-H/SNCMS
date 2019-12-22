<template>
  <div id="user">
    <!-- 表格头部按钮搜索等 -->
    <div class="table-top">
      <el-button type="primary" size="mini" @click="add">添加用户</el-button>
      <el-input v-model="search.username" size="mini" placeholder="用户名" class="search-input"></el-input>
      <el-select v-model="search.role" size="mini" placeholder="角色" class="search-input">
        <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <el-button size="mini" @click="doSearch" class="search-btn">搜索</el-button>
    </div>
    <!-- 表格 -->
    <div class="table">
      <el-table
        :data="tableData"
        style="width: 100%;"
      >
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column label="用户角色" width="180">
          <template slot-scope="scope">
            {{getRoleName(scope.row.role)}}
          </template>
        </el-table-column>
        <el-table-column prop="nickname" label="昵称"></el-table-column>
        <el-table-column prop="phone" label="手机号" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="status" label="是否有效" width="180">
          <template slot-scope="scope">
            <el-switch
              active-value="1"
              inactive-value="0"
              v-model="scope.row.status"
              @change="statusChange(scope.$index,scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="edit(scope.$index, tableData)"
              type="text"
              size="small"
            >编辑</el-button>
            <el-button
              @click.native.prevent="del(scope.$index, tableData)"
              type="text"
              size="small"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="table-page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.currentPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 表格数据
      tableData: [
        {
          id: 2,
          username: "张三",
          role: "1",
          nickname: "adasf",
          phone: "18256423154",
          email: "529402@qq.com",
          status: "1"
        }
      ],
      // 搜索
      search: {
        username: "",
        role: ""
      },
      // 角色列表
      roleList: [
        {
          id: "1",
          name: "管理员"
        },
        {
          id: "2",
          name: "开发者"
        }
      ],
      // 分页配置
      page: {
        currentPage: 4,
        pageSizes: [10, 20, 50, 100],
        pageSize: 100,
        layout: "total, sizes, prev, pager, next, jumper",
        total: 400
      }
    };
  },
  methods: {
    // 判断角色
    getRoleName(role) {
      for(let i of this.roleList) {
        if(role == i.id) {
          return i.name;
        }
      }
    },
    // 添加
    add() {
      this.$router.push({ name: "user-add" });
    },
    // 编辑
    edit(index, data) {
      console.log(index, data, data[index]);
      this.$router.push({ name: "user-edit", params: { id: data[index].id } });
    },
    // 删除
    del(index, data) {
      console.log(index, data, data[index]);
      this.$confirm("是否删除该用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 状态切换
    statusChange(index, data) {
      console.log(index, data);
    },
    // 切换显示条数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    // 切换页数
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 搜索
    doSearch() {}
  }
};
</script>

<style>
</style>