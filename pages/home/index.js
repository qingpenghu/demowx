//index.js
//获取应用实例
const app = getApp()
import {API} from "../../utils/config"
import {request} from "../../utils/request"
Page({
  data: {
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular:true,
    swiperCurrent:0,
    scrollTop:0,
    start:1, // 开始页码
    lowerFlag:false,
    noMoreData:false,
    allData:[],
    flag:false
  },
  swiperChange (e) {
    let that = this
      this.setData({
        swiperCurrent:e.detail.current
      })
  },
  //事件处理函数
  onShow () {
    // this.getIndexData()
    this.getBannerData()
    this.getAllData()
  },
  swiperLink(e){
    console.log(e.currentTarget.dataset)
  },
  listenerSearchInput(e){
    this.setData({
      query:e.detail.value
    })
  },
  toSearch(){
    wx.navigateTo({
      url:"/pages/searchList/index?search="+ this.data.query +"&property=3"
    })
  },
  getBannerData(){
    const that = this;
    request({
      apid:'218',
      params:{}
    }).then((res)=>{
      if(res.data.apidata.code == 1){
        that.setData({
            imgUrls:(res.data.apidata.data)
        })
      }
    }).catch((err)=>{
      console.log(err,"err")
    })
    // wx.request({
    //     url:url(),
    //     method:'post',
    //     data:{
    //       apid:'218',
    //       params:{}
    //     },
    //     success:(res) => {
    //       if(res.data.apidata.code == 1){
    //         that.setData({
    //             imgUrls:(res.data.apidata.data)
    //         })
    //       }
    //     },
    //     error:(err) => {
    //       console.log(err)
    //     }
    // })
  },
  getAllData(){
     const that = this;
     request({
      apid:'239',
        params:{
            pageNo:String(that.data.start),
            pageSize:"5",
            location:"0"
        }
    }).then((res)=>{
        if(res.data.apidata.code == 1){
          let goodlist = that.data.allData
          goodlist = goodlist.concat(res.data.apidata.data)
          that.setData({
            allData:goodlist,
            lowerFlag:true
          })
        }else if( res.data.apidata.code == 2072 ) {
          // that.getAllData()
        } 
    }).catch((err)=>{
      console.log(err,"err")
    })
    //  wx.request({
    //     url:url(),
    //     method:'post',
    //     data:{
    //       apid:'239',
    //       params:{
    //           pageNo:String(that.data.start),
    //           pageSize:"5",
    //           location:"0"
    //       }
    //     },
    //     success:(res) => {
    //       console.log(res.data.apidata.data)
    //       if(res.data.apidata.code == 1){
    //         let goodlist = that.data.allData
    //         goodlist = goodlist.concat(res.data.apidata.data)
    //         that.setData({
    //           allData:goodlist,
    //           lowerFlag:true
    //         })
    //       }else if( res.data.apidata.code == 2072 ) {
    //         // that.getAllData()
    //       }   
    //     },
    //     error:(err) => {
    //       console.log(err)
    //     }
    // })
  },
  onReachBottom: function () {
    console.log("111")
    const that = this
    if( !that.data.lowerFlag  ){
      return
    }
    that.setData({
      start: that.data.start + 1,
      lowerFlag:false
    })
    that.getAllData()
  },
  onPageScroll(e) {
    let scrollTop = this.data.scrollTop
    this.setData({
      scrollTop: e.scrollTop
    })
  },
  toDetailsTap(e){
    console.log(e.currentTarget.dataset.id)
    let goodDetailUrl = "/pages/goodDetail/index?type=1&id="+e.currentTarget.dataset.id
    if( e.currentTarget.dataset.type == "2" ){
      goodDetailUrl = "/pages/goodDetail/index?type=2&id="+e.currentTarget.dataset.code
    }
    wx.navigateTo({
      url:goodDetailUrl
    })
    
  },
  onShareAppMessage (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '嗨学',
      path: '/pages/index/index',
      success: function(e) {
          wx.showShareMenu({
            withShareTicket: true
          })
        }
    }
  },
})
