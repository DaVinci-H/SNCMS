<template>
    <div id="control-panel">
        <!-- 头部四栏信息 -->
        <div class="four-list">
            <el-row :gutter="40">
                <!-- 访问量 -->
                <el-col :span="6">
                    <div class="info-item">
                        <div class="icon">
                            <img :src="images.visitNumImg">
                        </div>
                        <div class="right-info">
                            <div class="info-label">今日访问量</div>
                            <div class="info-value">{{info.visitNum}}</div>
                        </div>
                    </div>
                </el-col>
                <!-- 注册用户数量 -->
                <el-col :span="6">
                    <div class="info-item">
                        <div class="icon">
                            <img :src="images.regUsersImg">
                        </div>
                        <div class="right-info">
                            <div class="info-label">注册用户</div>
                            <div class="info-value">{{info.regNum}}</div>
                        </div>
                    </div>
                </el-col>
                <!-- 文章总数量 -->
                <el-col :span="6">
                    <div class="info-item">
                        <div class="icon">
                            <img :src="images.articleImg">
                        </div>
                        <div class="right-info">
                            <div class="info-label">文章总数</div>
                            <div class="info-value">{{info.articleNum}}</div>
                        </div>
                    </div>
                </el-col>
                <!-- 评论总数量 -->
                <el-col :span="6">
                    <div class="info-item">
                        <div class="icon">
                            <img :src="images.commentImg">
                        </div>
                        <div class="right-info">
                            <div class="info-label">评论总数</div>
                            <div class="info-value">{{info.commentNum}}</div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <!-- 下方三栏信息 -->
        <div class="three-list">
            <el-row :gutter="10">
                <!-- 近期评论列表 -->
                <el-col :span="11">
                    <el-card>
                        <div slot="header" class="clear">
                            <span class="head-title">近期评论</span>
                        </div>
                        <div class="comment-item" v-for="item in commentList" :key="item.id">
                            <div class="top-info clear">
                                <span class="username">{{item.userInfo.username}}</span>
                                <span class="txt">在</span>
                                <span class="title ellipsis">{{item.articleInfo.title}}</span>
                                <span class="txt" v-if="item.replyId==0">说</span>
                                <span class="txt" v-else-if="item.replyId>0">回复</span>
                                <span class="reply-username" v-if="item.replyId>0">{{item.replyInfo.username}}</span>
                                <span class="date">{{item.date}}</span>
                            </div>
                            <div class="comment-info">
                                <img class="head-img" v-if="item.userInfo.headImg" :src="item.userInfo.headImg">
                                <div class="head-img" :style="{background:`rgb(${item.userInfo.imgbg})`}" v-else>{{getHeadImg(item.userInfo.username[0])}}</div>
                                <div class="comment-content ellipsis">{{item.comment}}</div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <!-- 新注册用户列表 -->
                <el-col :span="6">
                    <el-card>
                        <div slot="header" class="clear">
                            <span class="head-title">新注册用户</span>
                        </div>
                        <div class="new-reg-item" v-for="item in newRegList" :key="item.id">
                            <img class="head-img" v-if="item.headImg" :src="item.headImg">
                            <div class="head-img" :style="{background:`rgb(${item.imgbg})`}" v-else>{{getHeadImg(item.username[0])}}</div>
                            <div class="username ellipsis">{{item.username}}</div>
                        </div>
                    </el-card>
                </el-col>
                <!-- 系统信息 -->
                <el-col :span="7">
                    <el-card>
                        <div slot="header" class="clear">
                            <span class="head-title">系统信息</span>
                        </div>
                        <div class="system-info-item clear">
                            <div class="label lf">操作系统</div>
                            <div class="value lf">{{systemInfo.OS}}</div>
                        </div>
                        <div class="system-info-item clear">
                            <div class="label lf">上次登陆时间</div>
                            <div class="value lf">{{systemInfo.lastLogin}}</div>
                        </div>
                        <div class="system-info-item clear">
                            <div class="label lf">上次登陆ip</div>
                            <div class="value lf">{{systemInfo.lastIp}}</div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import testimg from '@/assets/images/login-admin.png';
import visitNumImg from '@/assets/images/visit-num.png';
import regUsersImg from '@/assets/images/reg-users.png';
import articleImg from '@/assets/images/article.png';
import commentImg from '@/assets/images/comment.png';
export default {
    data() {
        return {
            // 四栏信息
            info: {
                visitNum:20,
                regNum:20,
                articleNum:20,
                commentNum:20
            },
            // 最新评论列表
            commentList:[
                {
                    id:1,
                    replyId:0,
                    replyInfo:null,
                    comment:'评论信息',
                    date:'2019-11-15 17:18:20',
                    userInfo:{
                        headImg:null,
                        imgbg:'230, 162, 60',
                        username:'dawenxi'
                    },
                    articleInfo:{
                        title:'文章标题的撒佛哦啊的非农'
                    }             
                },
                {
                    id:2,
                    replyId:1,
                    replyInfo:{
                        username:'dawenxi'
                    },
                    comment:'评论信息',
                    date:'2019-11-15 17:18:20',
                    userInfo:{
                        headImg:testimg,
                        imgbg:'230, 162, 60',
                        username:'dawenxi2'
                    },
                    articleInfo:{
                        title:'文章标题的撒佛哦啊的非农'
                    }              
                }
            ],
            // 新注册用户列表
            newRegList:[
                {
                    id:1,
                    headImg:null,
                    imgbg:'230, 162, 60',
                    username:'张三'
                },
                {
                    id:2,
                    headImg:null,
                    imgbg:'230, 162, 60',
                    username:'asdfa'
                },
                {
                    id:3,
                    headImg:testimg,
                    imgbg:'230, 162, 60',
                    username:'121'
                }
            ],
            // 系统信息
            systemInfo:{
                OS:'centos',
                lastLogin:'2019-11-26 23:09:28',
                lastIp:'113.200.87.252'
            },
            images: {
                visitNumImg,
                regUsersImg,
                articleImg,                
                commentImg
            }
        }
    },
    methods:{
        // 获取用户名第一个字符，如果是字符就转大写
        getHeadImg(str) {
            if(/^[A-Za-z]+$/.test(str)){
                return str.toUpperCase();
            }
            return str;
        }
    }
}
</script>

<style lang="less">
    @import "../../assets/less/control-panel/control-panel.less";
</style>