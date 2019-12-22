<template>
  <div id="ad-form" class="form">
    <!-- 表单 -->
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" size="mini">
      <el-form-item label="广告名" prop="name">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-radio v-model="form.type" label="1">文字</el-radio>
        <el-radio v-model="form.type" label="2">图片</el-radio>
      </el-form-item>
      <el-form-item label="是否有效">
        <el-switch active-value="1" inactive-value="0" v-model="form.status"></el-switch>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input type="textarea" v-model="form.remark"></el-input>
      </el-form-item>
      <el-form-item label="链接列表" v-if="form.type==1">
        <el-button type="primary" plain @click="addLink">添加链接</el-button>
      </el-form-item>
      <el-form-item v-if="form.type==1&&form.links.length>0">
        <el-tag
          style="margin-right:5px;"
          v-for="(tag,index) in form.links"
          :key="index"
          closable
          @click="editLink(tag)"
          @close="closeLink(index)"
        >{{tag.title}}</el-tag>
      </el-form-item>
      <el-form-item label="是否轮播" v-if="form.type==2">
        <el-switch active-value="1" inactive-value="0" v-model="form.carousel"></el-switch>
      </el-form-item>
      <el-form-item label="图片列表" v-if="form.type==2">
        <el-button type="primary" plain @click="addImg">添加图片</el-button>
      </el-form-item>
      <el-form-item v-if="form.type==2&&form.images.length>0">
        <div class="img-list clear">
          <div class="img" v-for="(img,index) in form.images" :key="index">
            <img :src="img.url" @click="seeImg(img.url)" />
            <div class="operation">
              <a class="edit" @click="editImg(img)">编辑</a>
              <a class="del" @click="closeImg(index)">删除</a>
            </div>
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">提交</el-button>
        <el-button @click="clear">取消</el-button>
      </el-form-item>
    </el-form>
    <!-- 添加编辑链接表单 -->
    <el-dialog :title="linkFormTitle" :modal-append-to-body="false" :visible.sync="linkFormShow">
      <el-form ref="linkForm" :model="linkForm" :rules="linkRules" label-width="80px" size="mini">
        <el-form-item label="标题" prop="title">
          <el-input v-model="linkForm.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="链接" prop="link">
          <el-input v-model="linkForm.link" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input-number v-model="linkForm.sort" label="排序"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="linkFormShow = false">取 消</el-button>
        <el-button type="primary" @click="linkFormSubmit('linkForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加编辑图片表单 -->
    <el-dialog :title="imgFormTitle" :modal-append-to-body="false" :visible.sync="imgFormShow">
      <el-form ref="imgForm" :model="imgForm" :rules="imgRules" label-width="80px" size="mini">
        <el-form-item label="描述" prop="describe">
          <el-input v-model="imgForm.describe" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="链接" prop="link">
          <el-input v-model="imgForm.link" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input-number v-model="imgForm.sort" label="排序"></el-input-number>
        </el-form-item>
        <el-form-item label="图片">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleHeadimgSuccess"
            :before-upload="beforeHeadimgUpload"
          >
            <img v-if="imgForm.url" :src="imgForm.url" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="imgFormShow = false">取 消</el-button>
        <el-button type="primary" @click="imgFormSubmit('imgForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 查看大图 -->
    <div class="bigImg" v-show="bigImg.show" @click="bigImg.show=false">
      <img :src="bigImg.url" />
    </div>
  </div>
</template>

<script>
import testimg from "@/assets/images/login-admin.png";
export default {
  data() {
    return {
      // 表单值
      form: {
        name: "",
        type: "1",
        status: "1",
        remark: "",
        carousel: "1",
        links: [],
        images: [
          {
            describe: "12312",
            link: "aaaaaa",
            sort: "0",
            url: testimg
          },
          {
            describe: "ccc",
            link: "bbbb",
            sort: "1",
            url: testimg
          }
        ]
      },
      // 验证
      rules: {
        name: [{ required: true, message: "请输入广告名", trigger: "blur" }],
        remark: [{ required: true, message: "请输入备注", trigger: "blur" }]
      },
      // 链接表单显示隐藏
      linkFormShow: false,
      // 链接表单标题
      linkFormTitle: "",
      // 链接表单值
      linkForm: {
        title: "",
        link: "",
        sort: "0"
      },
      // 链接表单验证
      linkRules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        link: [{ required: true, message: "请输入链接", trigger: "blur" }],
        sort: [{ required: true, message: "请输入排序", trigger: "blur" }]
      },
      // 图片表单显示隐藏
      imgFormShow: false,
      // 图片表单标题
      imgFormTitle: "",
      // 图片表单值
      imgForm: {
        describe: "",
        link: "",
        sort: "0",
        url: ""
      },
      // 图片表单验证
      imgRules: {
        describe: [{ required: true, message: "请输入描述", trigger: "blur" }],
        link: [{ required: true, message: "请输入链接", trigger: "blur" }],
        sort: [{ required: true, message: "请输入排序", trigger: "blur" }]
      },
      // 大图
      bigImg: {
        show: false,
        url: ""
      }
    };
  },
  methods: {
    // 图片上传成功
    handleHeadimgSuccess() {},
    // 图片上传前
    beforeHeadimgUpload() {},
    // 添加链接
    addLink() {
      this.linkFormTitle = "添加链接";
      this.linkForm = {
        title: "",
        link: "",
        sort: "0"
      };
      this.linkFormShow = true;
    },
    // 编辑链接
    editLink(tab) {
      this.linkFormTitle = "编辑链接";
      this.linkForm = tab;
      this.linkFormShow = true;
    },
    // 删除链接
    closeLink(index) {
      this.form.links.splice(index, 1);
    },
    // 链接提交
    linkFormSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.linkFormTitle == "添加链接") {
            this.form.links.push(this.linkForm);
          }
          this.form.links.sort((a, b) => {
            return b.sort - a.sort;
          });
          this.linkFormShow = false;
        } else {
          this.$message.error("表单验证失败");
          return false;
        }
      });
    },
    // 添加图片
    addImg() {
      this.imgFormTitle = "添加图片";
      this.imgForm = {
        describe: "",
        link: "",
        sort: "0",
        url: ""
      };
      this.imgFormShow = true;
    },
    // 编辑图片
    editImg(item) {
      this.imgFormTitle = "编辑图片";
      this.imgForm = item;
      this.imgFormShow = true;
    },
    // 删除图片
    closeImg(index) {
      this.form.images.splice(index, 1);
    },
    // 图片提交
    imgFormSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.imgFormTitle == "添加图片") {
            this.form.images.push(this.imgForm);
          }
          this.form.images.sort((a, b) => {
            return b.sort - a.sort;
          });
          this.imgFormShow = false;
        } else {
          this.$message.error("表单验证失败");
          return false;
        }
      });
    },
    // 查看图片
    seeImg(url) {
      this.bigImg.url = url;
      this.bigImg.show = true;
    },
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

<style lang="less">
@import "../../assets/less/ad/ad-form.less";
</style>