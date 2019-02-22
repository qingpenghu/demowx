var app = getApp();
// 引用百度地图微信小程序JSAPI模块
var bmap = require('../../utils/bmap-wx.min.js'); 
var WxParse = require('../../wxParse/wxParse.js');
var wxMarkerData = [];  //定位成功回调对象 
import {url} from "../../utils/util"
var requestUrl = url();
Page({
    data:{
        ak: "tfaGjvOVbrBCnVAwAaP5vTKxvnGFQvaw",
        goodDetail:{},
        indicatorDots: true,
        autoplay: false,
        interval: 5000,
        duration: 1000,
        circular:true,
        swiperCurrent:0,
        address:[],
        addressSelect:{},
        code:'',
        upDatePrice:{},
        allowBuy:false,
        buttonMessage:'立即购买',
        fictitiousGoodDetail:{},
        goodType:true // true 代表实物 false 虚拟商品
    },
    onLoad(e){
        if( e.type == 2 ) {
            this.setData({
                code:e.id,
            })
            this.getGoodDetail()
            this.getAddressInfo() 
            this.getMapDetail()
            
        }else{
            this.setData({
                goodType:false,
                code:e.id
            })
            this.getFictitiousGoodDetail()
        }
        
        
    },
    swiperChange (e) {
    let that = this
        this.setData({
        swiperCurrent:e.detail.current
        })
    },
    getFictitiousGoodDetail(){
        const that = this
        wx.request({
            url:url(),
            method:'post',
            data:{
                apid:"110",
                params:{
                    productId: that.data.code,
                }
            },
            success(res){
                if( res.statusCode == 200 ) {
                    if( res.data.apidata.code == 1){
                        console.log( res.data )
                        that.setData({
                            fictitiousGoodDetail:res.data.apidata.data,
                            indicatorDots:res.data.apidata.data.product_bananer.length > 1 ? true:false
                        })
                    }
                }
            }
        })
    },
    onShow(){
        if( this.data.goodType ){
            this.getStorageInfo()
        }
    },
    getGoodDetail(id){
        const that = this
        wx.request({
            url:url(),
            method:'post',
            data:{
                apid:"236",
                params:{
                    cmmdtyCode: that.data.code,
                    sceneType: "2",
                    province: "北京市", 
                    city: "北京市", 
                    county: "朝阳区"
                }
            },
            success(res){
                if( res.statusCode == 200 ) {
                    if( res.data.apidata.code == 1){
                        // console.log( res.data )
                        that.setData({
                            goodDetail:res.data.apidata.data,
                            indicatorDots:res.data.apidata.data.materials.length > 1 ? true:false
                        })
                        let article = res.data.apidata.data.extension.cmmdtyAddress
                        // console.log(article)
                        WxParse.wxParse('article', 'html', article, that, 5);
                    }
                }
            }
        })
    },
    getAddressInfo(data){
        const that = this
        wx.request({
            url:url(),
            method:'post',
            data:{
                apid:"235",
                params:{
                    parentCode: "0"
                }
            },
            success(res){
                if( res.statusCode == 200 ) {
                    if( res.data.apidata.code == 1){
                        console.log( res.data )
                        that.setData({
                            address:res.data.apidata.data
                        })
                    }
                }
            }
        })
    },
    bindPickerChange(){

    },
    selectAddress(){
        wx.navigateTo({
            url: "/pages/addressSelect/index",
          })
    },
    getStorageInfo(){
        let addressSelect = wx.getStorageSync("addressInfo")
        if( addressSelect ) {
            this.setData({
                addressSelect:addressSelect
            }) 
        }
        this.getGoodPriceInfo()
        
    },
    getMapDetail(options) { // 获取地址
        console.log("定位");
        var that = this;
        //新建百度地图对象
        var BMap = new bmap.BMapWX({
          ak: that.data.ak
        });
        var success = function(data){
          let addressData = {
            province: data.originalData.result.addressComponent.province, 
            city: data.originalData.result.addressComponent.city, 
            county: data.originalData.result.addressComponent.district
          }
          let addressSelect = wx.getStorageSync("addressInfo")
          if( addressSelect ) {
            that.setData({
                addressSelect:addressSelect
            })
          }else{
            that.setData({
                addressSelect:addressData
                })
          }
        //   that.getGoodPriceInfo()
        }
        var fail = function(data){
          console.log(data);
        }
        BMap.regeocoding({
          fail:fail,
          success:success
        });
      },
      getGoodPriceInfo(){
        const that = this
        console.log(that.data.addressSelect)
        wx.request({
            url:url(),
            method:'post',
            data:{
                apid:"236",
                params:{
                    cmmdtyCode: that.data.code,
                    sceneType: "2",
                    province: that.data.addressSelect.province || '北京市', 
                    city: that.data.addressSelect.city || '北京市', 
                    county: that.data.addressSelect.county || '朝阳区'
                }
            },
            success(res){
                if( res.statusCode == 200 ) {
                    if( res.data.apidata.code == 1){
                        console.log( res.data )
                        let result = res.data;
                        if(result.apidata.data.canSale == 1){
                            that.setData({
                                allowBuy:false,
                                buttonMessage:'立即购买',
                                upDatePrice:result.apidata.data
                            })
                          }else if(result.apidata.data.canSale == 2) {
                            that.setData({
                                allowBuy:true,
                                buttonMessage:'无货',
                                upDatePrice:result.apidata.data
                            })
                          }else if(result.apidata.data.canSale == 3) {
                            that.setData({
                                allowBuy:true,
                                buttonMessage:'暂不销售',
                                upDatePrice:result.apidata.data
                            })
                          }else if(result.apidata.data.canSale == 4) {
                            that.setData({
                                allowBuy:true,
                                buttonMessage:'不可配送',
                                upDatePrice:result.apidata.data
                            })
                          }else if(result.apidata.data.canSale == 5) {
                            that.setData({
                                allowBuy:true,
                                buttonMessage:'易购自有活动',
                                upDatePrice:result.apidata.data
                            })
                          }else{
                            that.setData({
                                allowBuy:true,
                                buttonMessage:'暂不可售',
                                upDatePrice:result.apidata.data
                            })
                          }

                        that.setData({
                            upDatePrice:res.data.apidata.data
                        })
                    }
                }
            }
        })
      },
      confirm(){

      }
})