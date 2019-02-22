var app = getApp();
import {url} from "../../utils/util";
var requestUrl = url();
Page({
    data:{
        address:[],
        cityAddress:[],
        areaAddress:[],
        index:0,
        cityIndex:0,
        areaIndex:0,
        provinceCode:"0",
        cityCode:'',
        areaCode:'',
        province:'', //省
        city:"", // 市
        county:'', // 区
        flag:false,
        cityFlag:false,
        areaFlag:false,
        showAddress:'请选择当前所在地址'

    },
    onLoad(){
        this.getAddressInfo({status:'0',code:'0'})
    },
    getAddressInfo(data){
        const that = this
        wx.request({
            url:url(),
            method:'post',
            data:{
                apid:"235",
                params:{
                    parentCode: data.code
                }
            },
            success(res){
                if( res.statusCode == 200 ) {
                    if( res.data.apidata.code == 1){
                        if( data.status == '1') {
                            that.setData({
                                cityAddress:res.data.apidata.data
                            })
                        }else if(data.status == '2'){
                            that.setData({
                                areaAddress:res.data.apidata.data
                            })
                        }else{
                            that.setData({
                                address:res.data.apidata.data
                            })
                        }
                    }
                }
            }
        })
    },
    bindPickerChange(e) {
        const that = this
        this.setData({
            index:e.detail.value,
            provinceCode: that.data.address[e.detail.value].addressCode,
            province:that.data.address[e.detail.value].addressName,
            flag: true,
            areaFlag:false,
            cityFlag:false
        })
        this.getAddressInfo({status:1,code:that.data.provinceCode})
    },
    bindCityPickerChange(e) {
        const that = this
        this.setData({
            cityIndex:e.detail.value,
            cityCode: that.data.cityAddress[e.detail.value].addressCode,
            city:that.data.cityAddress[e.detail.value].addressName,
            cityFlag:true,
            areaFlag:false
        })
        this.getAddressInfo({status:2,code:that.data.cityCode})
    },
    bindAreaPickerChange(e) {
        const that = this
        this.setData({
            areaIndex:e.detail.value,
            areaCode: that.data.areaAddress[e.detail.value].addressCode,
            county:that.data.areaAddress[e.detail.value].addressName,
            areaFlag:true
        })
    },
    cancel(){
        wx.navigateBack({
            delta: 1
        })
    },
    confirm(){
        if( this.data.flag && this.data.cityFlag && this.data.areaFlag ){
            
            let addressInfo = {
                provinceCode:this.data.provinceCode,
                cityCode:this.data.cityCode,
                areaCode:this.data.areaCode,
                province:this.data.province, //省
                city:this.data.city, // 市
                county:this.data.county, // 区
            }
            wx.setStorage({
                key: 'addressInfo',
                data: addressInfo
            })
            wx.navigateBack({
                delta: 1
            })
        }else{
            wx.showToast({
                title: '请填写完整的配送地址',
                icon: 'none',
                duration: 2000
            })
        }
    }
})