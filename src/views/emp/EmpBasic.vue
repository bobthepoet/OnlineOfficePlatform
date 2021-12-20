<template>
<!-- 已跳过 -->
<!-- 已跳过 -->
<!-- 已跳过 -->
  <div>
      <div>
        <div style="display:flex;justify-content: space-between">
          <div>
          <el-input style="width:300px;margin-right:10px" prefix-icon="el-icon-search" placeholder="请输入员工姓名进行搜索"></el-input>
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
          <el-button type="primary">
            <i class="fa fa-angle-double-down" aria-hidden="true"></i>
            高级搜索</el-button>
        </div>
          <el-button type="success">
            <i class="fa fa-level-up" aria-hidden="true"></i>
            导入数据</el-button>
          <el-button type="success">
            <i class="fa fa-level-down" aria-hidden="true"></i>
            导出数据</el-button>
          <el-button type="primary" icon="el-icon-plus">添加员工</el-button>
        </div>
      </div>
      <div>
        <el-table :data="emps" stripe border style="width:100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="姓名" fixed width="70" align="left">
        </el-table-column
        ><el-table-column prop="workID" label="工号" width="85">
        </el-table-column
        ><el-table-column prop="gender" label="性别" width="50">
        </el-table-column
        ><el-table-column prop="birthday" label="出生日期" width="90">
        </el-table-column
        ><el-table-column prop="idCard" label="身份证号" width="150">
        </el-table-column
        ><el-table-column prop="wedlock" label="婚姻状况" width="60">
        </el-table-column
        ><el-table-column prop="nation.name" label="民族" width="50">
        </el-table-column
        ><el-table-column prop="nativePlace" label="籍贯" width="80">
        </el-table-column
        ><el-table-column
          prop="politicsStatus.name"
          label="政治面貌"
          width="50"
        >
        </el-table-column
        ><el-table-column prop="email" label="电子邮件" width="150">
        </el-table-column
        ><el-table-column prop="phone" label="电话号码" width="100">
        </el-table-column
        ><el-table-column prop="address" label="联系地址" width="220">
        </el-table-column
        ><el-table-column prop="department.name" label="所属部门" width="70">
        </el-table-column
        ><el-table-column prop="position.name" label="职位" width="70">
        </el-table-column
        ><el-table-column prop="engageForm" label="聘用形式" width="100">
        </el-table-column
        ><el-table-column prop="tiptopDegree" label="最高学历" width="80">
        </el-table-column
        ><el-table-column prop="school" label="学校" width="100">
        </el-table-column
        ><el-table-column prop="specialty" label="专业" width="120">
        </el-table-column
        ><el-table-column prop="workState" label="在职状态" width="70">
        </el-table-column
        ><el-table-column prop="beginDate" label="入职日期" width="95">
        </el-table-column
        ><el-table-column prop="conversionTime" label="转正日期" width="95">
        </el-table-column
        ><el-table-column prop="beginContract" label="合同起始日期" width="95">
        </el-table-column
        ><el-table-column prop="endContract" label="合同截止日期" width="95">
        </el-table-column
        ><el-table-column label="合同期限" width="80">
          <template slot-scope="scoped">
            <el-tag>{{ scoped.row.contractTerm }}</el-tag
            >年
          </template> </el-table-column
        ><el-table-column fixed="right" label="操作" width="200">
          <template>
            <el-button style="padding:3px" size="mini">编辑</el-button>
            <el-button style="padding:3px" type="primary" size="mini">查看高级资料</el-button>
            <el-button style="padding:3px" type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column></el-table>
      </div>
  </div>
</template>

<script>
  export default {
      name:"EmpBasic",
      data(){
        return {
          emps:[]
        }
      },
      mounted(){
        this.initEmps();
      },
      methods:{
        initEmps(){
          this.getRequest('/employee/basic/list').then(res=>{
            if(res){
              this.emps = res.data;
            }
          })
        }
      }
  }
</script>

<style>

</style>
