// 前端操作cookie
// 浏览器没有给我们提供操作cookie的api 只能自己封装方法
function getCookie(key) {
    var cookieStr = document.cookie;
    // 将cookie分来
    var arr = cookieStr.split("; ");
    // 循环分开每一项
    for (var i = 0; i < arr.length; i++) {
        // 每一项的属性名和属性值分开
        var subArr = arr[i].split("=");
        if (subArr[0] === key) {
            return subArr[1];
        }
    }
}
// var isLogin = getCookie("islogin");
// 没有isLogin的时候，是undefined;
// if (!isLogin) {
//     location.href = "/html/login.html#" + location.href;
// }
function setCookie(key, value) {
    document.cookie = key + "=" + value;
}
function clearCookie(key) {
    document.cookie = key + "=" + "aaa;max-age=-1";
}