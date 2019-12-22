<template>
  <div id="classify">
    <!-- 按钮 -->
    <div class="table-top">
      <el-button type="primary" size="mini" @click="add">添加分类</el-button>
    </div>
    <!-- 分类树 -->
    <div class="table">
      <el-tree :data="classList" node-key="id" default-expand-all :expand-on-click-node="false">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span style="margin-right:20px;">{{data.label}}</span>
          <span class="tree-row-operation">
            <el-button type="text" size="mini" @click="() => add(data)">添加</el-button>
            <el-button type="text" size="mini" @click="() => edit(node, data)">编辑</el-button>
            <el-button type="text" size="mini" @click="() => del(node, data)">删除</el-button>
          </span>
        </span>
      </el-tree>
    </div>
    <!-- 添加编辑表单 -->
    <el-dialog
      :title="form.id?'编辑分类':'添加分类'"
      :modal-append-to-body="false"
      :visible.sync="formShow"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" size="mini">
        <el-form-item label="父级分类" v-if="pName">
          <el-input v-model="pName" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="显示">
          <el-switch active-value="1" inactive-value="0" v-model="form.status"></el-switch>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择">
            <el-option label="普通" value="1"></el-option>
            <el-option label="单页" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input-number v-model="form.sort" label="排序"></el-input-number>
        </el-form-item>
        <el-form-item label="关键词">
          <el-input type="textarea" v-model="form.keyword" placeholder="一行一个"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.name" auto-complete="off" placeholder="SEO描述"></el-input>
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
      // 资源列表
      classList: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1"
                },
                {
                  id: 10,
                  label: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ],
      // 表单显示
      formShow: false,
      // 父级名称
      pName: "父级分类",
      // 表单值
      form: {
        pid: "",
        id: "",
        name: "",
        type: "1",
        status:"1",
        sort: "0",
        describe:"",
        keyword:""
      },
      // 验证
      rules: {
        name: [{ required: true, message: "请输入分类名", trigger: "blur" }],
        type: [{ required: true, message: "请选择类型", trigger: "blur" }],
        sort: [{ required: true, message: "请输入排序", trigger: "blur" }]
      }
    };
  },
  methods: {
    // 添加
    add(data) {
      if (data) {
        console.log(data);
      }
      this.form = {
        pid: "",
        id: "",
        name: "",
        type: "1",
        status:"1",
        sort: "0",
        describe:"",
        keyword:""
      };
      this.formShow = true;
    },
    // 编辑
    edit(node, data) {
      console.log(node, data);
      this.form = {
        pid: "",
        id: "",
        name: "",
        type: "1",
        status:"1",
        sort: "0",
        describe:"",
        keyword:""
      };
      this.formShow = true;
    },
    // 删除
    del(node, data) {
      console.log(node, data);
      this.$confirm("是否删除该分类?", "提示", {
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