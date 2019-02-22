var app = getApp();
import {url} from "../../utils/util"
Page({
      data:{
          userInfo:{}
      },
     onLoad(){
        const that= this
        console.log( wx.getStorageSync("userInfo") )
        that.setData({
          userInfo:wx.getStorageSync("userInfo")
        })
     },
    onShow() {
      wx.request({
        url:url(),
        method:'post',
        data:{
          apid:'53',
          params:{

          }
        },
        success:(res) => {
          console.log(res)
          if( res.data.apidata.code == 401 ) {
            wx.removeStorageSync('token')
          }
        },
        error:(err) => {
          console.log(err)
        }
    })
  },
  goSelectAddress () {
    wx.navigateTo({
      url:"/pages/select-address/index"
    })
  },
  goLogin() {
    wx.navigateTo({
      url:"/pages/userLogin/index"
    })
  }
})