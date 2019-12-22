<template>
  <div id="ad">
    <!-- 表格头部按钮搜索等 -->
    <div class="table-top">
      <el-button type="primary" size="mini" @click="add">添加广告</el-button>
    </div>
    <!-- 表格 -->
    <div class="table">
      <el-table
        :data="tableData"
        style="width: 100%;"
        ref="multipleTable"
      >
        <el-table-column prop="name" label="广告名"></el-table-column>
        <el-table-column label="广告类型" width="180">
          <template slot-scope="scope">
            {{scope.row.type==1?'文字':'图片'}}
          </template>
        </el-table-column>
        <el-table-column label="是否有效" width="180">
          <template slot-scope="scope">
          <el-switch
            active-value="1"
            inactive-value="0"
            v-model="scope.row.status"
            @change="statusChange(scope.$index,scope.row)"
          ></el-switch>
        </template>
        </el-table-column>
        <el-table-column prop="describe" label="描述"></el-table-column>   
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
          name: "广告名",
          type: "1",
          describe: "描述",
          nickname: "adasf",
          phone: "18256423154",
          email: "529402@qq.com",
          status: "1"
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
    // 添加
    add() {
      this.$router.push({ name: "ad-add" });
    },
    // 编辑
    edit(index, data) {
      console.log(index, data, data[index]);
      this.$router.push({ name: "ad-edit", params: { id: data[index].id } });
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
    }
  }
};
</script>

<style>
</style>