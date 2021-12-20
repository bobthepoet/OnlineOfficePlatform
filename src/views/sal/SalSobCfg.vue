<template>
  <div>
      <el-table :data="emps" border stripe size="mini">
        <el-table-column type="selection" align="left" width="55"></el-table-column>
        <el-table-column prop="name" label="姓名" align="left" fixed wiwdth="120"></el-table-column>
        <el-table-column prop="workID" label="工号" align="left" wiwdth="120"></el-table-column>
        <el-table-column prop="email" label="邮箱地址" align="left" wiwdth="200"></el-table-column>
        <el-table-column prop="phone" label="电话号码" align="left" wiwdth="120"></el-table-column>
        <el-table-column prop="department.name" label="所属部门" align="left" wiwdth="120"></el-table-column>
        <el-table-column label="工资帐套" align="center">
          <template slot-scope="scope">
            <el-tooltip placement="right" v-if="scope.row.salary">
              <div slot="content">
                <tr>
                  <td>基本工资</td>
                  <td>{{scope.row.salary.basicSalary}}</td>
                </tr>
                <tr>
                  <td>交通补助</td>
                  <td>{{traffic.row.salary.trafficSalary}}</td>
                </tr>
                <tr>
                  <td>午餐补助</td>
                  <td>{{traffic.row.salary.lunchSalary}}</td>
                </tr>
                <tr>
                  <td>奖金</td>
                  <td>{{traffic.row.salary.bonus}}</td>
                </tr>
                <tr>
                  <td>养老金比率</td>
                  <td>{{traffic.row.salary.pensaionPer}}</td>
                </tr>
                <tr>
                  <td>养老金基数</td>
                  <td>{{traffic.row.salary.lunchSalary}}</td>
                </tr>
                <tr>
                  <td>医疗保险比率</td>
                  <td>{{traffic.row.salary.medicalPer}}</td>
                </tr>
                <tr>
                  <td>医疗保险基数</td>
                  <td>{{traffic.row.salary.medicalBase}}</td>
                </tr><tr>
                  <td>公积金比率</td>
                  <td>{{traffic.row.salary.accumulationFundPer}}</td>
                </tr>
                <tr>
                  <td>公积金基数</td>
                  <td>{{traffic.row.salary.accumulationFundBase}}</td>
                </tr>
              </div>
            <el-tag>{{scope.row.salary.name}}</el-tag>
            </el-tooltip>
            <el-tag v-else>暂未设置</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">

            <el-popover @show="showPop(scope.row.salary)" @hide="hidePop(scope.row)" placement="left" title="编辑工资帐套" width="200" trigger="click">
              <div>
                <el-select v-model="currentSalary" size="mini" placeholder="请选择">
                  <el-option v-for="item in salaries" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </div>
              <el-buttoon slot="reference" type="danger">修改工资帐套</el-buttoon>
            </el-popover>

          </template>
        </el-table-column>
      </el-table>
      <div style="display;flex;justify-content:flex-end;margin-top:5px">
        <el-pagination @current-change="currentChange" @size-change="sizeChange" background layout="sizes,prev,pager,next,jumper,->,total,slot" :total="total"></el-pagination>
      </div>
  </div>
</template>

<script>
export default {
    name:"SalSobCfg",
    data(){
      return{
        emps:[],
        salaries:[],
        currentPage:1,
        currentSalary:null,
        size:10,
        total:0
      }
    },
    mounted(){
      this.initEmps();
      this.initSalaries();
    },
    methods:{
      hidePop(data){
        if(this.currentSalary && this.currentSalary!=data.salary.id){
          this.putRequest('/salary-adjust/update/?eid='+data.id+'&eSid='+this.currentSalary).then(res=>{
            if(res){
              this.initEmps();
            }
          })
        }
      },
      showPop(data){
        if(data){
          this.currentSalary = data.id;
        }else{
          this.currentSalary = null;
        }
      },
      initSalaries(){
        this.getRequest('/salary-adjust/get-All').then(res=>{
          if(res){
            this.salaries = res;
          }
        })
      },
      currentChange(page){
        this.currentPage = page;
        this.initEmps();
      },
      sizeChange(size){
        this.size = size;
        this.initEmps();
      },
      initEmps(){
        this.getRequest('/salary-adjust/list/?currentPage='+this.currentPage+'&size='+this.size).then(res=>{
          if(res){
            this.emps = res.data;
            this.total = res.total;
          }
        })
      }
    }
}
</script>

<style>

</style>