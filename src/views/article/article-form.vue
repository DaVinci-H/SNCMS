<template>
  <div id="user-form" class="form">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" size="mini">
      <el-form-item label="作者" prop="author">
        <el-input v-model="form.author"></el-input>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="分类" prop="classify">
         <el-cascader
          class="search-input"
          placeholder="分类"
          size="mini"
          :options="classList"
          v-model="form.classify"
        >
        </el-cascader>
      </el-form-item>
      <el-form-item label="关键字">
        <el-input v-model="form.keyword"></el-input>
      </el-form-item>
      <el-form-item label="缩略图" prop="image">
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
      <el-form-item label="是否显示">
        <el-switch active-value="1" inactive-value="0" v-model="form.status"></el-switch>
      </el-form-item>
      <el-form-item label="描述" prop="describe">
        <el-input type="textarea" v-model="form.describe"></el-input>
      </el-form-item>
      <el-form-item label="标签">
        <el-checkbox-group v-model="form.tabs">
          <el-checkbox v-for="item in tabs" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="文章内容" prop="detail">
        <vue-ueditor-wrap v-model="content" :config="myConfig"></vue-ueditor-wrap>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">提交</el-button>
        <el-button @click="clear">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import VueUeditorWrap from 'vue-ueditor-wrap'
export default {
  data() {
    return {
      // 表单值
      form: {
        author: "",
        title: "",
        classify: "",
        keyword: "",
        image: "",
        status: "1",
        describe: "",
        content: "",
        tabs: []
      },
      // 验证
      rules: {
        author: [
          { required: true, message: "请输入作者", trigger: "blur" }
        ],
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        classify: [{ required: true, message: "请选择分类", trigger: "blur" }],
        image: [{ required: true, message: "请上传缩略图", trigger: "blur" }],
        describe: [{ required: true, message: "请输入摘要", trigger: "blur" }],
        content: [{ required: true, message: "请填写文章内容", trigger: "blur" }]
      },
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
      // 标签列表
      tabs: [
        {
          id:1,
          name:'asdf'
        },
        {
          id:2,
          name:'sada'
        }
      ],
       myConfig: {
          // 如果需要上传功能,找后端小伙伴要服务器接口地址
          // serverUrl: this.$config.baseUrl + 'ueditor/ueditorConfig',
          // serverUrl: 'http://localhost:8090/ueditor/ueditorConfig',
          // 你的UEditor资源存放的路径,相对于打包后的index.html
          UEDITOR_HOME_URL: '/ueditor/',
          // 编辑器不自动被内容撑高
          autoHeightEnabled: false,
          // 工具栏是否可以浮动
          autoFloatEnabled: false,
          // 初始容器高度
          initialFrameHeight: 340,
          // 初始容器宽度
          initialFrameWidth: '100%',
          // 关闭自动保存
          enableAutoSave: true
        },
        content: ''
    };
  },
  methods: {
    // 缩略图上传成功
    handleHeadimgSuccess() {},
    // 缩略图上传前
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
  },
  components: {
    VueUeditorWrap
  }
};
</script>

<style>
</style>