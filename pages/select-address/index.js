//index.js
//获取应用实例
var app = getApp()
import {url} from "../../utils/util";
var requestUrl = url();
Page({
  data: {
    addressList:[]
  },

  selectTap: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.request({
      url: 'https://api.it120.cc/'+ app.globalData.subDomain +'/user/shipping-address/update',
      data: {
        token: wx.getStorageSync('token'),
        id:id,
        isDefault:'true'
      },
      success: (res) =>{
        wx.navigateBack({})
      }
    })
  },

  addAddess : function () {
    wx.navigateTo({
      url:"/pages/address-add/index"
    })
  },
  
  editAddess: function (e) {
    wx.navigateTo({
      url: "/pages/address-add/index?id=" + e.currentTarget.dataset.id
    })
  },
  
  onLoad: function () {
    console.log('onLoad')

   
  },
  onShow : function () {
    this.initShippingAddress();
  },
  initShippingAddress: function () {
    var that = this;
    wx.request({
      url: requestUrl,
      method:'post',
      data:{
        apid:"230",
        params:{}
      },
      success: (res) =>{
        console.log(res)
        if ( res.statusCode == 200 &&  res.data.apidata.code == 1) {
          that.setData({
            addressList:res.data.apidata.data
          });
        } else{
          that.setData({
            addressList: null
          });
        }
      }
    })
  }

})
