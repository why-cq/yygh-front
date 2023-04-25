import request from '@/utils/request'

export default {
  // 医院设置列表方法
  getHospSetList(current,limit,searchObj) {
    return request({
      url: `/admin/hosp/hospitalSet/findPageHospSet/${current}/${limit}`,
      method: 'post',
      data: searchObj  //使用json格式进行传递
    })
  },
  // 删除医院
  deleteHsopSet(id){
    return request({
      url: `/admin/hosp/hospitalSet/${id}`,
      method: 'delete',

    })

  }

}

