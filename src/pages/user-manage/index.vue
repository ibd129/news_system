<!--
 * @Author: ibd129 1536479720@qq.com
 * @Date: 2022-06-10 21:46:01
 * @LastEditors: ibd129 1536479720@qq.com
 * @LastEditTime: 2022-06-17 16:13:35
 * @FilePath: \vue-news-system\src\components\Header\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="users">
    <el-table
      :data="tableData"
      style="width: 100%"
      :highlight-current-row="true"
    >
      <el-table-column prop="region" label="区域" width="200">
      </el-table-column>
      <el-table-column label="角色名称" width="200" prop="role.roleName">
      </el-table-column>
      <el-table-column prop="username" label="用户名" width="200">
      </el-table-column>
      <el-table-column prop="roleState" label="用户状态" width="200">
        <template slot-scope="scope">
          <el-switch
            @change="changeRoleState(scope.row.roleState, scope.$index)"
            v-model="scope.row.roleState"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="default" label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            :disabled="scope.row.default"
            circle
            @click="open(scope.$index)"
          ></el-button>

          <el-button
            type="danger"
            icon="el-icon-delete"
            :disabled="scope.row.default"
            circle
            @click="deleteBtn(scope.$index)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-card v-show="isOpen" class="box-card">
      <div slot="header" class="clearfix">
        <span>修改用户信息</span>
        <el-button type="primary" plain @click="addNewUser"
          >添加新用户</el-button
        >
        <el-button style="float: right; padding: 3px 0" type="text"
          ><i class="el-icon-close" @click="closeUpdate"></i
        ></el-button>
      </div>
      用户名：
      <el-input v-model="inputUsername" placeholder="请输入内容"></el-input>
      密码：
      <el-input
        placeholder="请输入密码"
        v-model="inputPassword"
        show-password
      ></el-input>
      区域：
      <el-select v-model="regValue" :placeholder="regValue">
        <el-option
          v-for="item in regOptions"
          :key="item.id"
          :label="item.title"
          :value="item.value"
        >
        </el-option>
      </el-select>
      角色：
      <el-select v-model="roleValue" :placeholder="roleValue">
        <el-option
          v-for="item in roleOptions"
          :key="item.id"
          :label="item.roleName"
          :value="item.roleName"
        >
        </el-option>
      </el-select>
      <div class="btnOption">
        <el-button type="info" plain @click="closeUpdate">取消</el-button>
        <el-button type="primary" @click="upData">确定</el-button>
      </div>
    </el-card>
    <el-card v-show="isAddOpen" class="box-card">
      <div slot="header" class="clearfix">
        <span>添加新用户</span>
        <el-button style="float: right; padding: 3px 0" type="text"
          ><i class="el-icon-close" @click="addNewUser"></i
        ></el-button>
      </div>
      用户名：
      <el-input v-model="addUserName" placeholder="请输入内容"></el-input>
      密码：
      <el-input
        placeholder="请输入密码"
        v-model="addUserPwd"
        show-password
      ></el-input>
      区域：
      <el-select v-model="addUseRegValue" placeholder="请选择">
        <el-option
          v-for="item in regOptions"
          :key="item.id"
          :label="item.title"
          :value="item.value"
        >
        </el-option>
      </el-select>
      角色：
      <el-select v-model="addUseRoleValue" placeholder="请选择">
        <el-option
          v-for="item in roleOptions"
          :key="item.id"
          :label="item.roleName"
          :value="item.roleName"
        >
        </el-option>
      </el-select>
      <div class="btnOption">
        <el-button type="info" plain @click="addNewUser">取消</el-button>
        <el-button type="primary" @click="createdNewUser">确定</el-button>
      </div>
    </el-card>
    <el-dialog
      title="为确保本人操作，请输入密码进行确定删除！"
      :visible.sync="dialogFormVisible"
    >
      <el-input
        placeholder="请输入密码"
        v-model="surePwd"
        show-password
      ></el-input>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="roleDelete">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import {
  Table,
  TableColumn,
  Button,
  Switch,
  Card,
  Dialog,
  Form,
  Message,
} from "element-ui";
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Button);
Vue.use(Switch);
Vue.use(Card);
Vue.use(Dialog);
Vue.use(Form);

const Users = {
  name: "Users",
  data() {
    return {
      //请求的表单数据
      tableData: [],
      //弹出层开关
      isOpen: false,
      //区域相关数据
      regOptions: [],
      regValue: "",
      //角色相关数
      roleOptions: [],
      roleValue: "",
      roleList: [],
      //用户信息数据
      inputUsername: "",
      inputPassword: "",
      index: "",
      //新建用户开关
      isAddOpen: false,
      addUserName: "",
      addUserPwd: "",
      addUseRegValue: "",
      addUseRoleValue: "",

      //删除时的提示开关
      dialogFormVisible: false,
      //删除时的密码
      surePwd: "",

      currentPage: 1,

      pageSize: 5,
    };
  },
  methods: {
    //打开修改用户信息
    open(index) {
      this.index = index;
      this.isOpen = !this.isOpen;
      this.inputUsername = this.tableData[index].username;
      this.inputPassword = this.tableData[index].password;
      this.regValue = this.tableData[index].region;
      this.roleValue = this.tableData[index].role.roleName;
      console.log(index);
    },
    //关闭修改
    closeUpdate() {
      this.isOpen = !this.isOpen;
    },
    roleId() {
      if (this.roleValue === "超级管理员") {
        return 1;
      } else if (this.roleValue === "区域管理员") {
        return 2;
      } else {
        return 3;
      }
    },
    //更新用户信息
    upData() {
      //前端更新
      const tabI = this.tableData[this.index];
      tabI.username = this.inputUsername;
      tabI.password = this.inputPassword;
      tabI.region = this.regValue;
      tabI.role = this.roleList;
      tabI.role.roleName = this.roleValue;
      this.isOpen = !this.isOpen;

      //后台同步更新

      axios.patch(`http://localhost:3000/users/${tabI.id}`, {
        username: this.inputUsername,
        password: this.inputPassword,
        region: this.regValue,
        roleId: this.roleId(),
      });
    },
    //添加新用户弹出层
    addNewUser() {
      this.isAddOpen = !this.isAddOpen;
      this.isOpen = false;
    },
    //创建新用户
    createdNewUser() {
      const roleNumber = () => {
        if (this.addUseRoleValue === "超级管理员") {
          return 1;
        } else if (this.addUseRoleValue === "区域管理员") {
          return 2;
        } else {
          return 3;
        }
      };
      console.log(roleNumber());
      const newUserInfo = {
        id: Math.random(),
        username: this.addUserName,
        password: this.addUserPwd,
        roleState: true,
        default: false,
        region: this.addUseRegValue,
        roleId: roleNumber(),
        role: {},
      };
      if (newUserInfo.roleId) {
        newUserInfo.role = {
          roleName: this.addUseRoleValue,
        };
      }
      this.tableData.push(newUserInfo);
      this.isAddOpen = !this.isAddOpen;

      //添加到后台数据
      axios.post(`http://localhost:3000/users`, newUserInfo);
    },

    //角色删除
    //点击删除按钮
    deleteBtn(index) {
      this.index = index;
      this.dialogFormVisible = true;
      console.log(this.tableData[this.index]);
    },
    //执行删除操作
    roleDelete() {
      axios.delete(
        `http://localhost:3000/users/${this.tableData[this.index].id}`
      );
      if (this.tableData[0].password == this.surePwd) {
        if (this.tableData.length >= 1) {
          this.tableData.splice(this.index, 1);
          Message({
            message: "删除成功",
            type: "success",
          });
          this.dialogFormVisible = false;
        }
      } else {
        Message({
          message: "删除失败",
          type: "error",
        });
      }
      console.log(this.tableData[this.index]);
    },

    //修改状态
    changeRoleState(isState, index) {
      console.log(this.tableData[index].id);
      axios.patch(`http://localhost:3000/users/${this.tableData[index].id}`, {
        roleState: isState,
      });
    },
  },

  mounted() {
    axios.get("http://localhost:3000/users?_expand=role").then((res) => {
      this.tableData = res.data;
    });
    axios.get("http://localhost:3000/regions").then((res) => {
      this.regOptions = res.data;
    });
    axios.get("http://localhost:3000/roles").then((res) => {
      this.roleOptions = res.data;
    });
  },
};
export default Users;
</script>

<style>
.el-card {
  position: fixed;
  left: 26%;
  top: 12%;
  width: 50%;
  height: 500px;
}
.el input {
  margin-top: 10px;
  padding: 5px;
}

.btnOption {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
</style>