import login from '@/views/login/login';
import index from '@/views/index/index';
import controlPanel from '@/views/control-panel/control-panel';
import basic from '@/views/basic/basic';
import user from '@/views/user/user';
import userForm from '@/views/user/user-form';
import role from '@/views/role/role';
import resource from '@/views/resource/resource';
import ad from '@/views/ad/ad';
import adForm from '@/views/ad/ad-form';
import classify from '@/views/classify/classify';
import tagConfig from '@/views/tag-config/tag-config';
import article from '@/views/article/article';
import articleForm from '@/views/article/article-form';
import comment from '@/views/comment/comment';
import log from '@/views/log/log';
import apiDoc from '@/views/api-doc/api-doc';
import apiForm from '@/views/api-doc/api-form';
import apiInfo from '@/views/api-doc/api-info';
const routes = [
  // 登录页
  { path: '/login', name:'login',component: login },
  // 主页主体
  { 
    path: '/index', 
    name: 'index',
    component: index,
    children: [
      // 控制台
      {
        path: 'control-panel', 
        name: 'control-panel',
        component: controlPanel,
        meta:{
          title:'控制台'
        }
      },
      // 基本信息
      {
        path: 'basic', 
        name: 'basic',
        component: basic,
        meta:{
          title:'基本信息'
        }
      },
      // 用户管理
      {
        path: 'user', 
        name: 'user',
        component: user,
        meta:{
          title:'用户管理'
        }
      },
      // 用户添加
      {
        path: 'user-add', 
        name: 'user-add',
        component: userForm,
        meta:{
          title:'用户添加',
          activeName:'user'
        }
      },
      // 用户编辑
      {
        path: 'user-edit/:id', 
        name: 'user-edit',
        component: userForm,
        meta:{
          title:'用户编辑',
          activeName:'user'
        }
      },
      // 角色管理
      {
        path: 'role', 
        name: 'role',
        component: role,
        meta:{
          title:'角色管理'
        }
      },
      // 资源管理
      {
        path: 'resource', 
        name: 'resource',
        component: resource,
        meta:{
          title:'资源管理'
        }
      },
      // 广告管理
      {
        path: 'ad', 
        name: 'ad',
        component: ad,
        meta:{
          title:'广告管理'
        }
      },
      // 广告添加
      {
        path: 'ad-add', 
        name: 'ad-add',
        component: adForm,
        meta:{
          title:'广告添加',
          activeName:'ad'
        }
      },
      // 广告编辑
      {
        path: 'ad-edit/:id', 
        name: 'ad-edit',
        component: adForm,
        meta:{
          title:'广告编辑',
          activeName:'ad'
        }
      },
      // 分类管理
      {
        path: 'classify', 
        name: 'classify',
        component: classify,
        meta:{
          title:'分类管理'
        }
      },
      // 标签管理
      {
        path: 'tag-config', 
        name: 'tag-config',
        component: tagConfig,
        meta:{
          title:'标签管理'
        }
      },
      // 文章管理
      {
        path: 'article', 
        name: 'article',
        component: article,
        meta:{
          title:'文章管理'
        }
      },
      // 文章添加
      {
        path: 'article-add', 
        name: 'article-add',
        component: articleForm,
        meta:{
          title:'文章添加',
          activeName:'article'
        }
      },      
      // 文章编辑
      {
        path: 'article-edit/:id', 
        name: 'article-edit',
        component: articleForm,
        meta:{
          title:'文章编辑',
          activeName:'article'
        }
      },      
      // 评论管理
      {
        path: 'comment', 
        name: 'comment',
        component: comment,
        meta:{
          title:'评论管理'
        }
      },
      // 日志管理
      {
        path: 'log', 
        name: 'log',
        component: log,
        meta:{
          title:'日志管理'
        }
      },     
      // 接口文档
      {
        path: 'api-doc', 
        name: 'api-doc',
        component: apiDoc,
        meta:{
          title:'接口文档'
        },
        children: [
          {
            path: 'api-info/:apiId', 
            name: 'api-info',
            component: apiInfo,
            meta:{
              title:'接口详情'
            }
          },     
          {
            path: 'api-add', 
            name: 'api-add',
            component: apiForm,
            meta:{
              title:'接口添加'
            }
          },    
          {
            path: 'api-edit/:apiId', 
            name: 'api-edit',
            component: apiForm,
            meta:{
              title:'接口编辑'
            }
          },      
        ]
      }
    ]
  }
];
export default routes;