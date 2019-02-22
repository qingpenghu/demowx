function request(data) {
    return new Promise(function(resolve, reject){
        if(!data.method){
            data.method='post' // 默認 post
        }
        if(!data.params){
            data.params={}
        }
        let token = wx.getStorageSync("token") || "";
        wx.request({
          url: "https://uat.app.eratpay.com/h5/to/b/handler.do?channelId=10000&token="+token,
          method:data.method,
          data: {
            apid:data.apid,
            params:data.params
          },
          success: function(res){
            resolve(res)
            // if(res.statusCode == 200 && res.data.apidata.code == 1 ){
            //     resolve({
            //         data:res.data.apidata.data,
            //         message:res.data.apidata.message
            //     })
            // }else{
            //     reject({
            //         message:res.data.apidata.message
            //     }) 
            // }
          },
          fail:function(err){
            reject(err)
          }
        })
    })
}
module.exports = {
    request: request
}