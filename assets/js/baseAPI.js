//测试环境服务器地址
var baseURL = 'http://ajax.frontend.itheima.net'
//拦截所有ajax请求
//处理参数
$.ajaxPrefilter(function (uu) {
    //拼接对应环境服务器地址
    uu.url = baseURL + uu.url
    //对需要权限的接口配置信息
    if (uu.url.indexOf('/my/') !== -1) {
        uu.headers= {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    uu.complete = function(res){
        console.log(res.responseJSON);
        var obj = res.responseJSON
        if (obj.status == 1 && obj.message == '身份认证失败！') {
            localStorage.removeItem('token')
            location.href='/login.html'
        }
    }
})