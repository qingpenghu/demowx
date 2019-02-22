var app = getApp();
import {url} from "../../utils/util"
var requestUrl = url();
Page({
    data:{
        list:[],
        property:'1', 
        pageNo:'1',
        apid:'', // 接口
        sortId:'', // 分类id
        search:'', // 搜索关键字
        lowerFlag:false, // 加载更多
        noMoreData:false, // 没有更多数据
        noMoreDataShow:false, // 数据少于5条
        scrollTop:0
    },
    onLoad(e){
        console.log(e)
        this.getSearchInfo(e)
    },
    getSearchInfo(data){
        console.log(data)
        let property = data.property || '0';
        let setData = {}
        setData.property = property;
        setData.list = [];
        setData.pageNo = '1';
        if( property == '1' ){
            setData.apid = "195" // 虚拟商品接口
            setData.sortId = data.sortId || '' 
        }else if(property == '2'){
            setData.apid = "237"  // 实物商品接口
            setData.sortId = data.sortId || '' 
        }else if(property == '3' ){  // 全部商品列表
            setData.apid = "239",
            setData.search = data.search
        }
        this.setData(setData)
        this.getList()
    },
    getList(){
        const that = this
        if( that.data.pageNo == 1 ) {
            that.setData({
                lowerFlag:true,
                list:[]
            })
        }
        wx.request({
            url:url(),
            method:'post',
            data:{
                apid:that.data.apid,
                params:{
                    pageNo:String(that.data.pageNo),
                    productSortId3:String(that.data.sortId),
                    sortId:String(that.data.sortId),
                    pageSize:"10",
                    location:"3",
                    searchStr:String(that.data.search)
                }
            },
            success(res){
                if( res.statusCode == 200 ) {
                    if( res.data.apidata.code == 1){
                        console.log( res.data )
                        let dataArr = that.data.list;
                        if( that.data.apid != "195" ) {
                            dataArr = dataArr.concat(res.data.apidata.data)
                            that.setData({
                                list:dataArr,
                                lowerFlag:true,
                                noMoreData: res.data.apidata.data.length < 10 ? true:false,
                                noMoreDataShow:res.data.apidata.data.length < 5 ? true:false,
                            })
                        }else{
                            dataArr = dataArr.concat(res.data.apidata.data.datas)
                            that.setData({
                                list:dataArr,
                                lowerFlag:true,
                                noMoreData: res.data.apidata.data.datas.length < 10 ? true:false,
                                noMoreDataShow:res.data.apidata.data.datas.length < 5 ? true:false,
                            })
                        }
                        
                    }
                }
            }
        })
    },
    onReachBottom: function () {
        const that = this
        if(that.data.noMoreData) {
            return false
        }
        if( !that.data.lowerFlag && !that.data.noMoreData   ){
            return false
        }
        that.setData({
            pageNo: Number(that.data.pageNo) + 1,
            lowerFlag:false
        })
        that.getList()
    },
    listenerSearchInput(e){
        this.setData({
            search:e.detail.value
        })
    },
    toSearch(){
        this.setData({
            pageNo:1,
            apid: "239"
        })
        this.getList()
    },
    toDetailsTap(e){
        console.log(e)
        const that = this
        if( that.data.apid == 195 ) {
            wx.navigateTo({
                url:"/pages/goodDetail/index?type=1&id="+e.currentTarget.dataset.item.id
            })
        }else if(that.data.apid == 237){
            wx.navigateTo({
                url:"/pages/goodDetail/index?type=2&id="+e.currentTarget.dataset.item.code
            })
        }else{
            if( e.currentTarget.dataset.item.productType == 1 ) {
                wx.navigateTo({
                    url:"/pages/goodDetail/index?type=1&id="+e.currentTarget.dataset.item.id
                })
            }else if(e.currentTarget.dataset.item.productType == 2){
                wx.navigateTo({
                    url:"/pages/goodDetail/index?type=2&id="+e.currentTarget.dataset.item.code
                })
            } 
        }
    }  
})