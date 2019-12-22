<template>
  <div id="tag-config">
    <!-- 表格头部按钮搜索等 -->
    <div class="table-top">
      <el-button type="primary" size="mini" @click="add">添加标签</el-button>
    </div>
    <!-- 表格 -->
    <div class="table">
      <el-table :data="tableData" style="width: 100%;">
        <el-table-column prop="name" label="标签名" width="180"></el-table-column>
        <el-table-column prop="remark" label="标签备注"></el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
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
    <!-- 添加编辑表单 -->
    <el-dialog
      :title="form.id?'编辑标签':'添加标签'"
      :modal-append-to-body="false"
      :visible.sync="formShow"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" size="mini">
        <el-form-item label="标签名" prop="name">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="标签描述" prop="describe">
          <el-input v-model="form.describe" auto-complete="off"></el-input>
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
          id: 1,
          name: "标签名",
          remark: "标签备注"
        }
      ],
      // 表单显示
      formShow: false,
      // 表单值
      form: {
        id: "",
        name: "",
        remark: ""
      },
      // 验证
      rules: {
        name: [{ required: true, message: "请输入标签名", trigger: "blur" }],
        remark: [{ required: true, message: "请输入标签备注", trigger: "blur" }]
      }
    };
  },
  methods: {
    // 添加
    add() {
      this.form = {
        id: "",
        name: "",
        remark: ""
      };
      this.formShow = true;
    },
    // 编辑
    edit(index, data) {
      console.log(index, data);
      this.form = {
        id: "1",
        name: "aa",
        remark: "bb"
      };
      this.formShow = true;
    },
    // 删除
    del(index, data) {
      console.log(index, data, data[index]);
      this.$confirm("是否删除该标签?", "提示", {
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
    // 表单提交
    formSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$message({
            message: "提交成功",
            type: "success"
          });
        } else {
          this.$message.error("表单验证失败");
          return false;
        }
      });
    }
  }
};
</script>

<style>
</style>