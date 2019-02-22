var app = getApp();
import {url} from "../../utils/util"
var requestUrl = url();
// 引用百度地图微信小程序JSAPI模块
var bmap = require('../../utils/bmap-wx.min.js'); 
var wxMarkerData = [];  //定位成功回调对象 
// 腾讯地图 微信小程序JSAPI模块
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({
        data:{ak: "tfaGjvOVbrBCnVAwAaP5vTKxvnGFQvaw", //填写申请到的ak  
        markers: [],     //地图标记 这里暂没用到
        longitude: '',   //经度  
        latitude: '',    //纬度  
        address: '',     //地址  
        business: {},    //商圈 
        desc:'' ,
        city:'',
        userInfo:{},
        key:"2O2BZ-RVOKJ-FZDF6-FTNBG-VI2OK-5CFHV", // 腾讯地图key
        qqAddress:{}
    },
    onLoad(){
        const that= this
        this.getMapDetail()
        // qqmapsdk = new QQMapWX({
        //     key: that.data.key
        // });
        // wx.getLocation({
        //     type: 'wgs84',
        //     success: function (res) {
        //       //2、根据坐标获取当前位置名称，显示在顶部:腾讯地图逆地址解析
        //       qqmapsdk.reverseGeocoder({
        //         location: {
        //           latitude: res.latitude,
        //           longitude: res.longitude
        //         },
        //         success: function (addressRes) {
        //           var address = addressRes.result.formatted_addresses.recommend;
        //           console.log( addressRes )
        //           that.setData({
        //             qqAddress:address
        //           })
        //         },
        //         fail: function(res) {
        //             console.log(res);
        //         },
        //         complete: function(res) {
        //             console.log(res);
        //         }
        //       })
        //     }
        // })
    },
    getMapDetail(options) { // 获取地址
        console.log("定位");
        var that = this;
        //新建百度地图对象
        var BMap = new bmap.BMapWX({
          ak: that.data.ak
        });
        var success = function(data){
          console.log(data);
          wxMarkerData = data.wxMarkerData;
          that.setData({
            markers:wxMarkerData,
            latitude: wxMarkerData[0].latitude,
            longitude:wxMarkerData[0].longitude,
            address:wxMarkerData[0].address,
            business: wxMarkerData[0].business,
            desc: wxMarkerData[0].desc,
          });
        }
        var fail = function(data){
          console.log(data);
        }
        BMap.regeocoding({
          fail:fail,
          success:success
        });
      },
    onShow() {
      wx.request({
        url:url(),
        method:'post',
        data:{
          apid:'218',
          params:{

          }
        },
        success:(res) => {
          console.log(res)
        },
        error:(err) => {
          console.log(err)
        }
    })
  }
})