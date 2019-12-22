<template>
  <div id="comment">
    <!-- 表格头部按钮搜索等 -->
    <div class="table-top">
      <el-button type="danger" size="mini" @click="doDelArr">删除</el-button>
      <el-input v-model="search.title" size="mini" placeholder="文章标题" class="search-input"></el-input>
      <el-input v-model="search.comment" size="mini" placeholder="留言内容" class="search-input"></el-input>
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
        <el-table-column prop="title" label="文章标题"></el-table-column>
        <el-table-column prop="comment" label="留言内容"></el-table-column>
        <el-table-column prop="commentUser" label="留言者"></el-table-column>
        <el-table-column prop="updateTime" label="时间" width="180"></el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="reply(scope.$index, tableData)"
              type="text"
              size="small"
            >回复</el-button>
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
    <!-- 回复表单 -->
    <el-dialog
      title="评论回复"
      :modal-append-to-body="false"
      :visible.sync="formShow"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" size="mini">
        <el-form-item label="评论">
          <el-input v-model="form.comment" type="textarea" :disabled="true" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="回复" prop="reply">
          <el-input v-model="form.reply" type="textarea" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="formShow = false">取 消</el-button>
        <el-button type="primary" @click="formSubmit('form')">确 定</el-button>
      </div>
    </el-dialog>
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
          title: "adsaofn",
          comment:"asdf",
          commentUser:"adsfsa",
          updateTime:'2019-11-15 17:18:20'
        }
      ],
      // 删除评论数组
      delArr: [],
      // 搜索
      search: {
        title: "",
        comment:""
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
      },
       // 表单显示
      formShow: false,
      // 表单值
      form: {
        comment:"adsaf",
        reply:""
      },
      // 验证
      rules: {
        reply: [{ required: true, message: "请输入回复", trigger: "blur" }]
      },
    };
  },
  methods: {
    // 表格多选框选择
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
          message: '您没有选择任何评论',
          type: 'warning'
        });
        return false;
      }
      this.$confirm("是否删除所选评论?", "提示", {
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
    // 回复
    reply() {
      this.form = {
        comment:"adsaf",
        reply:""
      };
      this.formShow = true;
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