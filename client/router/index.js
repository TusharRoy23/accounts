import Vue from 'vue';
import Router from 'vue-router';

const Login = () => import('@pages/common/Login.vue');
const Dashboard = () => import('@pages/dashboard/Dashboard.vue');

const DefaultContainer = () => import('@pages/DefaultContainer.vue');
const Profile = () => import('@pages/settings/Profile.vue');

const Item = () => import('@pages/item/Item.vue');
const Category = () => import('@pages/category/Category.vue');

const AccountsHead = () => import('@pages/head/AccountsHead.vue');

Vue.use(Router);

export default new Router({
    mode: 'history',
    linkActiveClass: 'open active',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        {
            path: '/',
            component: Login
        },
        {
            path: '/',
            redirect: '/dashboard', // this will search in children
            name: 'Home',
            component: DefaultContainer,
            children: [
                {
                    path: 'dashboard', // need to match with parent **redirect** path
                    name: 'Dashboard',
                    component: Dashboard
                },
                {
                    path: 'profile-settings',
                    name: 'Profile Settings',
                    component: Profile
                },
                {
                    path: 'vehicle-category',
                    name: 'Vehicle Category',
                    component: Category
                },
                {
                    path: 'item-list',
                    name: 'Item List',
                    component: Item
                },
                {
                    path: 'user-list',
                    name: 'user List',
                    component: Item
                },
                {
                    path: 'accounts-head',
                    name: 'Account Heads',
                    component: AccountsHead
                }
                // {
                //     path: 'settings',
                //     redirect: '',
                //     name: 'Settings',
                //     component: {
                //         render (c) { return c('router-view'); }
                //     },
                //     children: [
                //         {
                //             path: 'user-settings',
                //             name: 'user list',
                //             component: Item
                //         },
                //         {
                //             path: 'item-list',
                //             name: 'Item List',
                //             component: Item
                //         },
                        
                //     ]
                // }
            ]
        }
    ]
});