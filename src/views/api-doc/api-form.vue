<template>
  <div id="api-form">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" size="mini">
        <div class="api-form-btn-list">
            <el-button type="primary" size="mini" @click="onSubmit('form')">保存</el-button>
            <el-button size="mini" @click="$router.go(-1)">返回</el-button>
        </div>
        <el-form-item label="标题" prop="title">
            <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="所属目录">
          <el-select v-model="form.pid" placeholder="请选择">
            <el-option label="无" value="0"></el-option>
            <el-option
              v-for="item in dieSelectList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input-number v-model="form.sort" :min="0" :max="10" label="排序"></el-input-number>
        </el-form-item>
        <el-form-item>
            <mavon-editor 
                v-model="form.content" 
                ref="md" 
                style="min-height: 600px"
            />
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
    data() {
        return {
            form:{
                id:'',
                pid:'',
                sort:'0',
                content:'',
            },
            // 验证
            rules: {
                title: [{ required: true, message: "请输入标题", trigger: "blur" }],
                sort: [{ required: true, message: "请输入排序", trigger: "blur" }]
            },
            // 目录选择列表
            dieSelectList: [
                {
                    pid:"0",
                    id:"1",
                    name:"目录名",
                    updateTime:"2018-10-22 14:14:36",
                    sort:"95"
                }
            ],
        }
    },
    methods: {
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
    },
    components: {
        mavonEditor,
    },
    created() {
        this.form.content = 
`
**简要描述：** 

- 用户注册接口

**请求URL：** 

- \` http://xx.com/api/user/register \`

**请求方式：**
- POST 

**参数：** 

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|username |是  |string |用户名   |
|password |是  |string | 密码    |
|name     |否  |string | 昵称    |

**返回示例**
\`\`\` 
  {
    "error_code": 0,
    "data": {
      "uid": "1",
      "username": "12154545",
      "name": "张三",
      "groupid": 2 ,
      "reg_time": "1436864169",
      "last_login_time": "0",
    }
  }
\`\`\`
**返回参数说明**

|参数名|类型|说明|
|:-----  |:-----|-----                           |
|groupid |int   |用户组id，1：超级管理员；2：普通用户  |

**备注**

- 更多返回错误代码请看首页的错误代码描述
`
    }
}
</script>

<style>

</style>