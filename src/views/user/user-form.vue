<template>
  <div id="user-form" class="form">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" size="mini">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="form.nickname"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleHeadimgSuccess"
          :before-upload="beforeHeadimgUpload"
        >
          <img v-if="form.headimg" :src="form.headimg" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="password2">
        <el-input v-model="form.password2" type="password"></el-input>
      </el-form-item>
      <el-form-item label="用户角色" prop="role">
        <el-select v-model="form.role" placeholder="请选择">
          <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="是否有效">
        <el-switch active-value="1" inactive-value="0" v-model="form.status"></el-switch>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="form.remark"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">提交</el-button>
        <el-button @click="clear">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 表单值
      form: {
        username: "",
        nickname: "",
        headimg: "",
        password: "",
        password2: "",
        role: "",
        phone: "",
        email: "",
        status: "1",
        remark: ""
      },
      // 验证
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        password2: [{ required: true, message: "请确认密码", trigger: "blur" }],
        role: [{ required: true, message: "请选择角色", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }]
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
      ]
    };
  },
  methods: {
    // 头像上传成功
    handleHeadimgSuccess() {},
    // 头像上传前
    beforeHeadimgUpload() {},
    // 提交
    onSubmit(formName) {
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
    },
    // 取消
    clear() {
      this.$router.go(-1);
    }
  }
};
</script>

<style>
</style>