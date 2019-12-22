<template>
  <div id="api-doc">
    <el-row>
      <el-col :span="4">
        <div class="btn-list">
          <el-button type="primary" size="mini" @click="addApi">添加api</el-button>
          <el-button type="info" size="mini" @click="doDirConfigShow">目录管理</el-button>
        </div>
        <div class="left-menu" :style="{height:leftMenuHeight}">
          <el-menu :default-active="$route.params.apiId" @select="menuSelect">
            <child-menu :menuData="menuList"></child-menu>
          </el-menu>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="api-router-view" :style="{height:apiRouterViewHeight}">
          <router-view></router-view>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="目录管理" :visible.sync="dirConfigShow" :modal-append-to-body="false">
      <el-button type="primary" size="mini" @click="addDir">添加目录</el-button>
      <el-table :data="dirTableData">
        <el-table-column property="name" label="目录名"></el-table-column>
        <el-table-column property="updateTime" label="更新时间" width="200"></el-table-column>
        <el-table-column property="sort" label="排序" width="100"></el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="editDir(scope.$index, dirTableData)"
              type="text"
              size="small"
            >编辑</el-button>
            <el-button
              @click.native.prevent="delDir(scope.$index, dirTableData)"
              type="text"
              size="small"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- 添加编辑目录表单 -->
    <el-dialog
      :title="dirForm.id?'编辑目录':'添加目录'"
      :modal-append-to-body="false"
      :visible.sync="dirFormShow"
    >
      <el-form ref="dirForm" :model="dirForm" :rules="dirRules" label-width="80px" size="mini">
        <el-form-item label="目录名" prop="name">
          <el-input v-model="dirForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级目录">
          <el-select v-model="dirForm.pid" placeholder="请选择">
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
          <el-input-number v-model="dirForm.sort" :min="0" :max="10" label="排序"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dirFormShow = false">取 消</el-button>
        <el-button type="primary" @click="dirFormSubmit('dirForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import childMenu from "@/components/childMenu";
export default {
  data() {
    return {
      leftMenuHeight: "",
      apiRouterViewHeight: "",
      // 菜单列表
      menuList: [
        {
          id: "1",
          pid: "0",
          menu_name: "目录1",
          type:1,
          node: [
            {
              id: "2",
              pid: "1",
              menu_name: "目录1-1",
              type:1,
              node: [
                {
                  id: "3",
                  pid: "2",
                  menu_name: "接口1-1-1",
                  type:2
                }
              ]
            }
          ]
        },
        {
          id: "4",
          pid: "0",
          menu_name: "目录2",
          type:1,
          node: [
            {
              id: "5",
              pid: "4",
              menu_name: "目录2-1",
              type:1
            }
          ]
        }
      ],
      // 目录管理列表
      dirTableData: [
        {
          pid:0,
          id:1,
          name:"目录名",
          updateTime:"2018-10-22 14:14:36",
          sort:"95"
        }
      ],
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
      // 目录管理显示
      dirConfigShow: false,
      // 目录表单显示
      dirFormShow: false,
      // 目录表单
      dirForm: {
        id:"",
        pid:"",
        name:"",
        sort:"0"
      },
      // 目录验证
      dirRules: {
        name: [{ required: true, message: "请输入目录名", trigger: "blur" }],
        sort: [{ required: true, message: "请输入排序", trigger: "blur" }]
      },
    };
  },
  methods: {
    // 菜单项选择跳转
    menuSelect(index) {
      console.log(index);
      this.$router.push({name:'api-info',params: { apiId: index }});
    },
    // 添加Api
    addApi() {
      this.$router.push({name:'api-add'})
    },
    // 打开目录管理
    doDirConfigShow() {
      this.dirConfigShow = true;
    },
    // 添加目录
    addDir() {
      this.dirForm =  {
        id:"",
        pid:"",
        name:"",
        sort:"0"
      }
      this.dirFormShow = true;
    },
    // 编辑目录
    editDir(index, data) {
      console.log(index, data, data[index]);
      this.dirForm =  {
        id:"2",
        pid:"1",
        name:"daf",
        sort:"99"
      }
      this.dirFormShow = true;
    },
    // 删除目录
    delDir(index, data) {
      console.log(index, data, data[index]);
      this.$confirm("是否删除该目录?", "提示", {
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
    // 目录提交
    dirFormSubmit(formName) {
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
  },
  components: {
    childMenu
  },
  created() {
    this.leftMenuHeight = document.documentElement.clientHeight - 110 + "px";
    this.apiRouterViewHeight =
      document.documentElement.clientHeight - 70 + "px";
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        this.leftMenuHeight =
          document.documentElement.clientHeight - 110 + "px";
        this.apiRouterViewHeight =
          document.documentElement.clientHeight - 70 + "px";
      })();
    };
  }
};
</script>

<style lang="less">
@import "../../assets/less/api-doc/api-doc.less";
</style>