<template>
  <div id="api-info">
    <!-- 标题 -->
    <h2 class="api-title">
        {{info.title}}
        <div class="api-info-btn-list">
            <a class="el-icon-edit" @click="edit"></a>
            <a class="el-icon-view" @click="see"></a>
            <a class="el-icon-delete" @click="del"></a>
        </div>
    </h2>
    <mavon-editor 
        v-model="info.content" 
        ref="md" 
        style="min-height: 600px"
        :editable="false"
        :toolbarsFlag="false"
        :subfield="false"
        defaultOpen="preview"
    />
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
    data() {
        return {
            info:{
                id:'3',
                title:'标题',
                content:'',
                user:'adf',
                updateTime:'2018-11-06 16:15:09'
            }
        }
    },
    methods: {
        // 编辑
        edit() {
            this.$router.push({name:'api-edit',params: { apiId: this.info.id }});
        },
        // 查看
        see() {
            this.$message({
              type: 'info',
              message: `本文档由: ${ this.info.user } 于 ${this.info.updateTime} 更新`
            });
        },
        // 删除
        del() {
            this.$confirm("是否删除该文档?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                this.$message({
                    type: "success",
                    message: "删除成功!"
                });
                this.$router.go(-1);
            }).catch(() => {
                this.$message({
                    type: "info",
                    message: "已取消删除"
                });
            });
        }
    },
    components: {
        mavonEditor,
    },
    created() {
        this.info.content = 
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