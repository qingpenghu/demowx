var app = getApp();
import {url} from "../../utils/util"
var requestUrl = url()
Page({
    data:{
        orderStatus:'0',
        pageNo:'1',
        pageStatus:'0',
        orderList:[],
        lowerFlag:true, // 加载进度条 显隐
        noMoreData:true, // 没有更多数据 
        noMoreDataShow:true, // 数据少于5条
    },
    onLoad(){

    },
    onShow(){
        this.getOrderList()
    },
    getOrderList(){
        const that = this
        wx.request({
            url:url(),
            method:'post',
            data:{
              apid:'124',
              params:{
                'pageNo':String(this.data.pageNo),
                'pageSize':'10',
                'status':String(this.data.pageStatus),
              }
            },
            success:(res) => {
              console.log(res)
            },
            error:(err) => {
              console.log(err)
            }
        })
    },
    toggeleNav(e){
        console.log(e.currentTarget.dataset.status);
        this.setData({
            orderStatus:e.currentTarget.dataset.status,
            pageNo:'1'
        })
    }
})