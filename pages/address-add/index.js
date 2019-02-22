// var commonCityData = require('../../utils/city.js')
//获取应用实例
import {url} from "../../utils/util";
var requestUrl = url();
var commonCityData = []
var app = getApp()
Page({
  data: {
    addressId:'',
    provinces:[], // 选择器用 所有的省名
    provincesAll:[], // 省 
    citys:[], // 选择器用 所有的市名
    citysAll:[], // 市
    districts:[],// 选择器用 所有的区名
    districtsAll:[], // 区
    selProvince:'请选择',
    selCity:'请选择',
    selDistrict:'请选择',
    selProvinceCode:'',
    selCityCode:"",
    selDistrictCode:'',
    isDefault:false
  },
  bindCancel:function () {
    wx.navigateBack({})
  },
  switch2Change(e){
    this.setData({
      isDefault:e.detail.value
    })
  },
  bindSave: function(e) {
    var that = this;
    var linkMan = e.detail.value.linkMan;
    var address = e.detail.value.address;
    var mobile = e.detail.value.mobile;
    var code = e.detail.value.code;
    linkMan =linkMan.replace(/(^\s*)|(\s*$)/g, "") // 去掉前后的空格
    code = code.replace(/(^\s*)|(\s*$)/g, "") // 去掉前后的空格
    if (linkMan == ""){
      wx.showModal({
        title: '提示',
        content: '请填写联系人姓名',
        showCancel:false
      })
      return
    }
    var reg=/^1[3456789]\d{9}$/;
    if(!reg.test(mobile)){ // 校验手机号
      wx.showModal({
        title: '提示',
        content: '请输入有效的手机号码',
        showCancel:false
      })
      return
    }
    if (this.data.selProvince == "请选择"){
      wx.showModal({
        title: '提示',
        content: '请选择地区',
        showCancel:false
      })
      return
    }
    if (this.data.selCity == "请选择"){
      wx.showModal({
        title: '提示',
        content: '请选择地区',
        showCancel:false
      })
      return
    }
    if (address == ""){
      wx.showModal({
        title: '提示',
        content: '请填写详细地址',
        showCancel:false
      })
      return
    }
    if (code == ""){
      wx.showModal({
        title: '提示',
        content: '请填写邮编',
        showCancel:false
      })
      return
    }
    wx.request({
      url: requestUrl,
      method:'post',
      data:{
        apid: that.data.addressId ? "233":"232",
        params:{
          "id": String(that.data.addressId)||'',
          "userId":Number(wx.getStorageSync("userId")), // 用户id
          "receiver": linkMan, //收货人姓名
          "phoneNo":mobile, //收货人号码
          "alternatePhone":'',    // 备用号码 
          "province":this.data.selProvince||'', // 省
          "provinceCode":this.data.selProvinceCode, // 省编码
          "city":that.data.selCity||'', // 市
          "cityCode":that.data.selCityCode, // 市编码
          "county":that.data.selDistrict ||'', // 县/区
          "countyCode":that.data.selDistrictCode, // 县/区编码
          "street":"", // 街道 (可不传，为空)
          "address":address, // 详细地址
          "tag":"", // 标签
          "isDefault": that.data.isDefault?'1':'0' // 是否设置为默认地址
        }
      },
      success: function(res) {
        if (res.data.apidata.code != 1) {
          // 登录错误 
          wx.hideLoading();
          wx.showModal({
            title: '失败',
            content: res.data.apidata.message,
            showCancel:false
          })
          return;
        }
        // 跳转到结算页面
        wx.navigateBack({})
      }
    })
  },
  initCityData:function(level, obj){
    const that = this
    let pinkArray = [];
        wx.request({
          url:url(),
          method:'post',
          data:{
              apid:"235",
              params:{
                  parentCode: obj.addressCode
              }
          },
          success(res){
              if( res.statusCode == 200 ) {
                  if( res.data.apidata.code == 1){
                      let arr = res.data.apidata.data;
                      for(var i = 0;i<arr.length;i++){
                        pinkArray.push(arr[i].addressName);
                      }
                      if( level == '1') {
                          that.setData({
                            provinces:pinkArray,
                            provincesAll:res.data.apidata.data
                          })
                      }else if (level == '2') {
                        that.setData({
                          citys:pinkArray,
                          citysAll:res.data.apidata.data
                        })
                      }else if(level == '3') {
                        that.setData({
                          districts:pinkArray,
                          districtsAll:res.data.apidata.data
                        })
                      }
                  }
              }
          }
      })
  },
  bindPickerProvinceChange:function(event){ // 选择省
    var selIterm = this.data.provincesAll[event.detail.value];
    this.setData({
      selProvince:selIterm.addressName,
      selProvinceCode:selIterm.addressCode,
      selCity:'请选择',
      selCityCode:'',
      selDistrict:'请选择',
      selDistrictCode: ''
    })
    this.initCityData(2, selIterm)
  },
  bindPickerCityChange:function (event) { // 选择市
    if( this.data.selProvinceCode) {
      var selIterm = this.data.citysAll[event.detail.value];
      this.setData({
        selCity:selIterm.addressName,
        selCityCode:selIterm.addressCode,
        selDistrict: '请选择',
        selDistrictCode: ''
      })
      this.initCityData(3, selIterm)
    }
  },
  bindPickerChange:function (event) { // 选择区
    var selIterm = this.data.districtsAll[event.detail.value];
    if (selIterm && selIterm.addressName && event.detail.value) {
      this.setData({
        selDistrict: selIterm.addressName,
        selDistrictCode: selIterm.addressCode
      })
    }
  },
  onLoad: function (e) {
    var that = this;
    this.initCityData(1,{addressCode:'0'});
    var id = e.id;
    if (id) {
      // 初始化原数据
      wx.showLoading();
      wx.request({
        url: requestUrl,
        method:"post",
        data: {
          apid: "238",
          params:{
            addressId:id
          }
        },
        success: function (res) {
          wx.hideLoading();
          console.log(res)
          if (res.data.apidata.code == 1) {
            that.setData({
              addressId:id,
              addressData: res.data.apidata.data,
              selProvinceCode: res.data.apidata.data.provinceCode,
              selCityCode: res.data.apidata.data.cityCode,
              selDistrictCode: res.data.apidata.data.countyCode,
              selProvince:res.data.apidata.data.province,
              selCity:res.data.apidata.data.city,
              selDistrict:res.data.apidata.data.county,
              isDefault:res.data.apidata.data.isDefault == "1" ? true:false
              });
            // that.setDBSaveAddressId(res.data.data);
            that.initCityData("1",{addressCode:"0"})
            that.initCityData("2",{addressCode:that.data.selProvinceCode})
            that.initCityData("3",{addressCode:that.data.selCityCode})
            return;
          } else {
            wx.showModal({
              title: '提示',
              content: '无法获取快递地址数据',
              showCancel: false
            })
          }
        }
      })
    }
  },
  setDBSaveAddressId: function(data) {
    var retSelIdx = 0;
    for (var i = 0; i < commonCityData.cityData.length; i++) {
      if (data.provinceId == commonCityData.cityData[i].id) {
        this.data.selProvinceIndex = i;
        for (var j = 0; j < commonCityData.cityData[i].cityList.length; j++) {
          if (data.cityId == commonCityData.cityData[i].cityList[j].id) {
            this.data.selCityIndex = j;
            for (var k = 0; k < commonCityData.cityData[i].cityList[j].districtList.length; k++) {
              if (data.districtId == commonCityData.cityData[i].cityList[j].districtList[k].id) {
                this.data.selDistrictIndex = k;
              }
            }
          }
        }
      }
    }
   },
  selectCity: function () {
    
  },
  deleteAddress: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '确定要删除该收货地址吗？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: requestUrl,
            method:"post",
            data: {
              "apid":"234",
               "params":{
                  "id": id
                }
            },
            success: (res) => {
              if(  res.data.apidata.code == 1 ) {
                wx.navigateBack({})
              }else {
                wx.showModal({
                  title: '提示',
                  content: res.data.apidata.message,
                  showCancel: false
                })
              }
              
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  readFromWx : function () {
    let that = this;
    wx.chooseAddress({
      success: function (res) {
        let provinceName = res.provinceName;
        let cityName = res.cityName;
        let diatrictName = res.countyName;
        let retSelIdx = 0;

        for (var i = 0; i < commonCityData.cityData.length; i++) {
          if (provinceName == commonCityData.cityData[i].name) {
            let eventJ = { detail: { value:i }};
            that.bindPickerProvinceChange(eventJ);
            that.data.selProvinceIndex = i;
            for (var j = 0; j < commonCityData.cityData[i].cityList.length; j++) {
              if (cityName == commonCityData.cityData[i].cityList[j].name) {
                //that.data.selCityIndex = j;
                eventJ = { detail: { value: j } };
                that.bindPickerCityChange(eventJ);
                for (var k = 0; k < commonCityData.cityData[i].cityList[j].districtList.length; k++) {
                  if (diatrictName == commonCityData.cityData[i].cityList[j].districtList[k].name) {
                    //that.data.selDistrictIndex = k;
                    eventJ = { detail: { value: k } };
                    that.bindPickerChange(eventJ);
                  }
                }
              }
            }
            
          }
        }

        that.setData({
          wxaddress: res,
        });
      }
    })
  }
})
