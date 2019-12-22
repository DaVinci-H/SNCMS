<template>
  <div id="article">
    <!-- 表格头部按钮搜索等 -->
    <div class="table-top">
      <el-button type="primary" size="mini" @click="add">添加文章</el-button>
      <el-button type="danger" size="mini" @click="doDelArr">删除文章</el-button>
      <el-input v-model="search.title" size="mini" placeholder="标题" class="search-input"></el-input>
      <el-cascader
        class="search-input"
        placeholder="分类"
        size="mini"
        :options="classList"
        v-model="search.classify"
       >
      </el-cascader>
      <el-button size="mini" @click="doSearch" class="search-btn">搜索</el-button>
    </div>
    <!-- 表格 -->
    <div class="table">
      <el-table
        :data="tableData"
        style="width: 100%;"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="recommend" label="推荐" width="80">
          <template slot-scope="scope">
            <el-switch
              active-value="1"
              inactive-value="0"
              v-model="scope.row.recommend"
              @change="recommendChange(scope.$index,scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
         <el-table-column prop="top" label="置顶" width="80">
          <template slot-scope="scope">
            <el-switch
              active-value="1"
              inactive-value="0"
              v-model="scope.row.top"
              @change="topChange(scope.$index,scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="author" label="作者"></el-table-column>
        <el-table-column prop="updateTime" label="更新时间" width="180"></el-table-column>
        <el-table-column prop="classify" label="分类"></el-table-column>
        <el-table-column prop="tabs" label="文档标签" width="180"></el-table-column>
        <el-table-column prop="click" label="点击" width="120"></el-table-column>
        <el-table-column prop="comment" label="评论" width="120"></el-table-column>
        <el-table-column prop="status" label="显示" width="80">
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
          recommend:"1",
          top:"1",
          title: "adsaofn",
          author: "asdf",
          nickname: "adasf",
          updateTime:"2019-11-27 23:19:59",
          classify:"oasd",
          tabs:"sadfsd",
          click:"1",
          comment:"5",
          status: "1"
        }
      ],
      // 文章分类列表
      classList: [
        {
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'zhinan',
            label: '指南',
            children: [{
              value: 'zhinan',
              label: '指南',
              children: [{
                value: 'zhinan',
                label: '指南',
              }]
            }]
          }]
        }
      ],
      // 删除文章数组
      delArr: [],
      // 搜索
      search: {
        title: "",
        classify:""
      },
      // 选中项数组
      multipleSelection: [],
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
    // 表格多选框选择
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 添加
    add() {
      this.$router.push({ name: "article-add" });
    },
    // 编辑
    edit(index, data) {
      console.log(index, data, data[index]);
      this.$router.push({ name: "article-edit", params: { id: data[index].id } });
    },
    // 删除
    del(index, data) {
      console.log(index, data, data[index]);
      this.$confirm("是否删除该文章?", "提示", {
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
    // 删除所选
    doDelArr() {
      if(this.multipleSelection.length==0) {
        this.$message({
          message: '您没有选择任何文章',
          type: 'warning'
        });
        return false;
      }
      this.$confirm("是否删除所选文章?", "提示", {
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
     // 推荐切换
    recommendChange(index, data) {
      console.log(index, data);
    },
     // 置顶切换
    topChange(index, data) {
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