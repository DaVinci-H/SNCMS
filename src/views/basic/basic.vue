<template>
  <div id="basic" class="form">
    <el-form ref="form" :model="form" :rules="rules" label-width="140px" size="mini">
      <el-form-item label="网站开关">
        <el-switch active-value="1" inactive-value="0" v-model="form.webStatus"></el-switch>
      </el-form-item>
      <el-form-item label="网站名" prop="webName">
        <el-input v-model="form.webName"></el-input>
      </el-form-item>
      <el-form-item label="网站logo" prop="webLogo">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleLogoSuccess"
          :before-upload="beforeLogoUpload"
        >
          <img v-if="form.webLogo" :src="form.webLogo" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="地址栏图标" prop="webIco">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleIcoSuccess"
          :before-upload="beforeIcoUpload"
        >
          <img v-if="form.webIco" :src="form.webIco" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="网站网址" prop="webBasehost">
        <el-input v-model="form.webName"></el-input>
      </el-form-item>
      <el-form-item label="首页标题" prop="IndexTitle">
        <el-input v-model="form.IndexTitle"></el-input>
      </el-form-item>
      <el-form-item label="首页关键词" prop="IndexKeywords">
        <el-input v-model="form.IndexKeywords"></el-input>
      </el-form-item>
      <el-form-item label="首页描述" prop="IndexDescription">
        <el-input type="textarea" v-model="form.IndexDescription"></el-input>
      </el-form-item>
      <el-form-item label="版权信息">
        <el-input type="textarea" v-model="form.webCopyright"></el-input>
      </el-form-item>
      <el-form-item label="第三方代码PC端">
        <el-input type="textarea" v-model="form.webThirdcodePc"></el-input>
      </el-form-item>
      <el-form-item label="第三方代码WAP端">
        <el-input type="textarea" v-model="form.webThirdcodeWap"></el-input>
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
        webStatus:'1',
        webName:'',
        webLogo:'',
        webIco:'',
        webBasehost:'',
        IndexTitle:'',
        IndexKeywords:'',
        IndexDescription:'',
        webCopyright:'',
        webThirdcodePc:'',
        webThirdcodeWap:'',
      },
      // 验证
      rules: {
        webName: [{ required: true, message: "请输入网站名称", trigger: "blur" }],
        webLogo: [{ required: true, message: "请上传网站logo", trigger: "blur" }],
        webIco: [{ required: true, message: "请上传地址栏图标", trigger: "blur" }],
        webBasehost: [{ required: true, message: "请输入网站网址", trigger: "blur" }],
        IndexTitle: [{ required: true, message: "请输入首页标题", trigger: "blur" }],
        IndexKeywords: [{ required: true, message: "请输入首页关键词", trigger: "blur" }],
        IndexDescription: [{ required: true, message: "请输入首页描述", trigger: "blur" }]
      },
    };
  },
  methods: {
    // 网站logo上传成功
    handleLogoSuccess() {},
    // 网站logo上传前
    beforeLogoUpload() {},
     // 地址栏图标上传成功
    handleIcoSuccess() {},
    // 地址栏图标上传前
    beforeIcoUpload() {},
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