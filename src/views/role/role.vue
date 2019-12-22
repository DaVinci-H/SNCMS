<template>
  <div id="role">
    <!-- 表格头部按钮搜索等 -->
    <div class="table-top">
      <el-button type="primary" size="mini" @click="add">添加角色</el-button>
    </div>
    <!-- 表格 -->
    <div class="table">
      <el-table :data="tableData" style="width: 100%;">
        <el-table-column prop="name" label="角色名" width="180"></el-table-column>
        <el-table-column prop="describe" label="角色描述"></el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="edit(scope.$index, tableData)"
              type="text"
              size="small"
            >编辑</el-button>
            <el-button
              @click.native.prevent="auth(scope.$index, tableData)"
              type="text"
              size="small"
            >权限</el-button>
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
      :title="form.id?'编辑角色':'添加角色'"
      :modal-append-to-body="false"
      :visible.sync="formShow"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" size="mini">
        <el-form-item label="角色名" prop="name">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="describe">
          <el-input v-model="form.describe" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="formShow = false">取 消</el-button>
        <el-button type="primary" @click="formSubmit('form')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 权限设置 -->
    <el-dialog title="设置权限" :modal-append-to-body="false" :visible.sync="authShow">
      <el-tree :data="authList" show-checkbox node-key="id"></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="authShow = false">取 消</el-button>
        <el-button type="primary" @click="authSubmit">确 定</el-button>
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
          name: "角色名",
          describe: "角色描述"
        }
      ],
      // 表单显示
      formShow: false,
      // 表单值
      form: {
        id: "",
        name: "",
        describe: ""
      },
      // 验证
      rules: {
        name: [{ required: true, message: "请输入角色名", trigger: "blur" }],
        describe: [{ required: true, message: "请输入描述", trigger: "blur" }]
      },
      // 权限显示
      authShow: false,
      // 权限列表
      authList: [
        {
          id: 1,
          label: "一级 2",
          children: [
            {
              id: 3,
              label: "二级 2-1",
              children: [
                {
                  id: 4,
                  label: "三级 3-1-1"
                },
                {
                  id: 5,
                  label: "三级 3-1-2",
                  disabled: true
                }
              ]
            },
            {
              id: 2,
              label: "二级 2-2",
              disabled: true,
              children: [
                {
                  id: 6,
                  label: "三级 3-2-1"
                },
                {
                  id: 7,
                  label: "三级 3-2-2",
                  disabled: true
                }
              ]
            }
          ]
        }
      ]
    };
  },
  methods: {
    // 添加
    add() {
      this.form = {
        id: "",
        name: "",
        describe: ""
      };
      this.formShow = true;
    },
    // 编辑
    edit(index, data) {
      console.log(index, data);
      this.form = {
        id: "1",
        name: "aa",
        describe: "bb"
      };
      this.formShow = true;
    },
    // 权限
    auth(index, data) {
      console.log(index, data);
      this.authShow = true;
    },
    // 权限提交
    authSubmit() {},
    // 删除
    del(index, data) {
      console.log(index, data, data[index]);
      this.$confirm("是否删除该角色?", "提示", {
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