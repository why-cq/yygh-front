<template>
  <div>
    医院设置添加
    <el-form label-width="120px">
      <el-form-item label="医院名称">
        <el-input v-model="hospitalSet.hosname"/>
      </el-form-item>
      <el-form-item label="医院编号">
        <el-input v-model="hospitalSet.hoscode"/>
      </el-form-item>
      <el-form-item label="api基础路径">
        <el-input v-model="hospitalSet.apiUrl"/>
      </el-form-item>
      <el-form-item label="联系人姓名">
        <el-input v-model="hospitalSet.contactsName"/>
      </el-form-item>
      <el-form-item label="联系人手机">
        <el-input v-model="hospitalSet.contactsPhone"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
import hospset from '@/api/hospset'
import th from 'element-ui/src/locale/lang/th'
import el from 'element-ui/src/locale/lang/el'
export default {
  data() {
    return {
      hospitalSet: {}

    }
  },
  created() {
    //获取路由中id的值
    //调用接口得到id的信息

    if(this.$route.params && this.$route.params.id){
      const  id = this.$route.params.id
      this.getHospSet(id)
    }else{
      this.hospitalSet = {}
    }

  },
  methods: {
    sava() {
      hospset.saveHospitalSet(this.hospitalSet)
        .then(resp =>{
          //提示
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          //跳转到页面,路由跳转进行实现
          this.$router.push({path:'/hospSet/list'})
        })

    },
    update() {
      hospset.saveHospitalSet(this.hospitalSet)
        .then(resp =>{
          //提示
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          //跳转到页面,路由跳转进行实现
          this.$router.push({path:'/hospSet/list'})
        })

    },
    //添加或者修改
    saveOrUpdate(){
      if(!this.hospitalSet.id){
        this.sava()
      }else {
        this.update()
      }

    },
    //根据id查询
    getHospSet(id){
      hospset.getHospSet(id)
        .then(resp =>{
          console.log(resp)
          this.hospitalSet = resp.data
        })
    }
  }

}
</script>

<style scoped>

</style>
