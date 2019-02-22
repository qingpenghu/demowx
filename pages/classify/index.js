var app = getApp()
import {url} from "../../utils/util"
import {API} from "../../utils/config"
const order = ['red', 'yellow', 'blue', 'green', 'red']
var requestUrl = url();
Page({
    data:{
        classifyData:{},
        secondList:{},
        toView: 'red',
        scrollTop: 100,
        checkedId:'', // 选中一级菜单id
        checkedIndex:'', // 选中一级菜单索引
        scrollNav:{

        }
    },
    onLoad(){
        console.log("分类")
        const that = this
        wx.request({
            url:url(),
            method:'post',
            data:{
                apid:"194",
                params:{}
            },
            success(res){
                if( res.statusCode == 200 ) {
                    if( res.data.apidata.code == 1){
                        that.setData({
                            classifyData:res.data.apidata.data,
                            checkedId:res.data.apidata.data[0].id,
                            secondList:res.data.apidata.data[0].sortChildren
                        })
                    }
                }
            }
        })
    },
    toggle(e){ // 切换一级菜单
        this.setData({
            checkedId:e.currentTarget.dataset.id,
            checkedIndex:e.currentTarget.dataset.index,
            secondList:this.data.classifyData[e.currentTarget.dataset.index].sortChildren
        })
    },
    goSearch(e){
        wx.navigateTo({
            url:"/pages/searchList/index?sortId="+e.currentTarget.dataset.id+"&property="+e.currentTarget.dataset.property
        })
    }
})