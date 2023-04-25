import request from '@/utils/request'

export function getList(current,limit,searchObj) {
  return request({
    url: `/admin/hosp/hospitalSet/findPageHospSet/${current}/${limit}`,
    method: 'post',
    data: searchObj  //使用json格式进行传递
  })
}
