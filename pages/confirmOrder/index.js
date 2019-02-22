var app = getApp();
import {url} from "../../utils/util";
var requestUrl = url();
Page({
    data:{
        productId:'',
        productType:true, // true 代表虚拟商品 false 代表实物商品
        jfChecked:false,
        wxChecked:true
    },
    onLoad(e){
        const that = this
        if(e.type == 2) { // type 为 2 代表实物
            that.setData({
                productId:e.id,
                productType:false
            }) 
        }else{
            that.setData({
                productId:e.id
            })
            that.getFictitiousGoodDetail()
        }
    },
    getFictitiousGoodDetail(){
        const that = this
        wx.request({
            url:url(),
            method:'post',
            data:{
                apid:"110",
                params:{
                    productId: that.data.productId,
                }
            },
            success(res){
                if( res.statusCode == 200 ) {
                    if( res.data.apidata.code == 1){
                        console.log( res.data )
                        that.setData({
                            fictitiousGoodDetail:res.data.apidata.data,
                        })
                    }
                }
            }
        })
    },
    selectAddress(){
        console.log('aaaa')
    },
    checkboxChange(e){
        console.log(e)
    }
})