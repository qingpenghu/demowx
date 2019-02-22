var app = getApp();
import {url} from "../../utils/util"
var requestUrl = url()
Page({
    data:{
        phoneNum:'',
        password:'',
    },
    onLoad(){

    },
    goToLogin(){
        const that = this
        wx.request({
            url:url(),
            method:'post',
            data:{
                apid:"26",
                params:{
                    phoneNum:that.data.phoneNum,
                    password:that.data.password,
                    LoginType:"2"
                }
            },
            success(res){
                console.log(res)
                if( res.statusCode == 200 && res.data.apidata.code == '1' ) {
                    wx.setStorageSync('token', res.data.apidata.data.token)
                    wx.setStorageSync('userId', res.data.apidata.data.userId)
                    wx.switchTab({
                        url:"/pages/home/index"
                    })
                }
            }
        })
    },
    listenerPhoneInput(e){
        this.setData({
            phoneNum:e.detail.value
        })
    },
    listenerPwdInput(e){
        this.setData({
            password:e.detail.value
        })
    }
})