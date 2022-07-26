/*
 * @Author: ibd129 1536479720@qq.com
 * @Date: 2022-06-11 00:11:09
 * @LastEditors: ibd129 1536479720@qq.com
 * @LastEditTime: 2022-06-18 19:40:04
 * @FilePath: \vue-news-system\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import VueRouter from "vue-router";

//登录
import Login from "../pages/Login"
//首页
import Home from "../pages/Home"
//用户管理
import Users from "../pages/user-manage"
// 权限列表
import RoleList from "../pages/right-manage/role-list"
import RightList from "../pages/right-manage/right-list"
//新闻管理
import newsManageAdd from "../pages/news-manage/news-manage-add"
import newsManageDraft from "../pages/news-manage/news-manage-draft"
import newsManageCategories from "../pages/news-manage/news-manage-category"
//审核管理
import AuditManageAudit from "../pages/audit-manage/audit-manage-audit"
import AuditManageList from "../pages/audit-manage/audit-manage-list"
//发布管理

const router = new VueRouter({
    routes: [{
            path: '/',
            redirect: "/login"
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/home',
            meta: {
                auth: true
            },
            component: Home,
            children: [{
                path: '',
                component: Home
            }]

        }, {
            path: '/user-manage',
            component: Users,
            children: [{
                path: 'list',
                component: Users
            }]

        },
        {
            path: '/right-manage',
            redirect: '/right-manage/role/list',
        },

        {
            path: '/right-manage/role/list',
            component: RoleList
        }, {
            path: '/right-manage/right/list',
            component: RightList
        }, {
            path: "/news-manage",
            redirect: '/news-manage/add'
        },
        {
            path: '/news-manage/add',
            component: newsManageAdd
        },

        {
            path: '/news-manage/draft',
            component: newsManageDraft
        },
        {
            path: '/news-manage/category',
            component: newsManageCategories
        }, {
            path: '/audit-manage',
            redirect: '/audit-manage/audit'
        },
        {
            path: '/audit-manage/audit',
            component: AuditManageAudit
        },
        {
            path: '/audit-manage/list',
            component: AuditManageList
        }
    ]

})
// 路由守卫
router.beforeEach((to, from, next) => {
    // to要跳转到的路径
    // from从哪个路径来
    // next往下执行的回调
    // 在localStorage中获取token
    let token = localStorage.getItem('twt')
    // 判断该页面是否需要登录
    if (to.meta.auth) {
        // 如果token存在直接跳转
        if (token) {
            next()
        } else {
            // 否则跳转到login登录页面
            next({
                path: '/login',
                // 跳转时传递参数到登录页面，以便登录后可以跳转到对应页面
                query: {
                    redirect: to.fullPath
                }
            })
        }
    } else {
        // 如果不需要登录，则直接跳转到对应页面
        next()
    }
})

export default router