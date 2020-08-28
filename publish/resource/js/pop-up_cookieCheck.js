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
// function setCookie(key, value) {
//     document.cookie = key + "=" + value;
// }
// function clearCookie(key) {
//     document.cookie = key + "=" + "aaa;max-age=-1";
// }


var isLogin = getCookie("islogin");
// 没有isLogin的时候，是undefined;
var isLanded = (function demo() {
    return function shoppingCart() {
        if (!isLogin) {
            return Panel();
        } else {
            return location.href = "/html/shoppingCart.html";
        }
    }
})();

// 添加购物车窗口；
var Panel = (
    function () {
        class Panel {
            // 构造函数属性
            constructor(text) {
                // 文本是传进来的数据会更新，所以定义一个update()方法
                this.text = text;
                this.dom = document.createElement("div");
                this.closeDom = document.createElement("span");
                this.btn_goto = document.createElement("button");
                this.btn_cancel = document.createElement("button");
                this.init();
            }
            // 方法集合
            init() {
                // this.update();
                // this.render();
                // this.show();
                this.bindEvent()
            }
            // 渲染样式
            render() {
                // dom轮廓样式
                var obj = {
                    position: "fixed",
                    width: "400px",
                    height: "200px",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "15px",
                    backgroundColor: "pink",
                    fontWeight: "bold",
                    zIndex: 10
                }
                for (var i in obj) {
                    this.dom.style[i] = obj[i];
                }

                // 根据引入得cookie函数获取cookie
                var isLogin = getCookie("islogin");
                var tips = null;
                var targer = null;
                // 没有isLogin的时候，是undefined;
                if (!isLogin) {
                    tips = "检测您目前未登录。是否跳转至登录页面？"
                    targer = "/html/login.html#" + location.href;
                } else {
                    tips = "该商品已添加至购物车。是否跳转至购物车？"
                    targer = "/html/shoppingCart.html";
                }

                this.dom.innerHTML = ` <div class="box" style="padding-top: 0px;">
                                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${this.text}</p>
                                                    <h5 style="text-align: center;">${tips}</h5>
                                            </div>`;

                // 关闭按钮样式
                var closeObj = {
                    position: "absolute",
                    top: "0px",
                    right: "0px",
                    width: "30px",
                    hight: "30px",
                    lineHeight: "30px",
                    textAlign: "center",
                    fontSize: "20px",
                    backgroundColor: "#ccc",
                    cursor: "pointer"
                }
                for (var i in closeObj) {
                    this.closeDom.style[i] = closeObj[i];
                }
                this.closeDom.innerHTML = "&times";

                // 取消按钮
                var cancelObj = {
                    position: "absolute",
                    bottom: "10px",
                    left: "30%",
                    width: "50px",
                    hight: "25px",
                    lineHeight: "25px",
                    textAlign: "center",
                    fontSize: "15px",
                    backgroundColor: "#ccc",
                    cursor: "pointer"
                }
                for (var i in cancelObj) {
                    this.btn_cancel.style[i] = cancelObj[i];
                }
                this.btn_cancel.innerHTML = `<a style="text-decoration:none; " >取消</a>`;


                // 确定按钮
                var gotoObj = {
                    position: "absolute",
                    bottom: "10px",
                    right: "30%",
                    width: "50px",
                    hight: "25px",
                    lineHeight: "25px",
                    textAlign: "center",
                    fontSize: "15px",
                    backgroundColor: "#ccc",
                    cursor: "pointer",
                    borderRadius: "5px"
                }
                for (var i in gotoObj) {
                    this.btn_goto.style[i] = gotoObj[i];
                }
                this.btn_goto.innerHTML = `<a style="text-decoration:none" href=${targer}>确定</a>`;



            }
            // 数据更新
            update() {
                this.dom.innerHTML = this.text;
            }
            // 绑定事件
            bindEvent() {
                this.closeDom.onclick = () => {
                    this.hide();
                }
                this.btn_cancel.onclick = () => {
                    this.hide();
                }
            }
            // 上树
            show() {
                document.body.appendChild(this.dom);
                this.dom.appendChild(this.closeDom);
                this.dom.appendChild(this.btn_cancel);
                this.dom.appendChild(this.btn_goto);
            }
            // 隐藏
            hide() {
                document.body.removeChild(this.dom);
            }
        }
        var instance = null;
        return function (text) {
            if (instance === null) {
                instance = new Panel(text);
            }
            // 这层函数的作用是让我们让真正的new Panel()，并将地址交给instance保存。需要注意的是：这里的this,指代的并不是Panel()的实例。而instance才是Panel()函数的的this。并且构造函数的形参也要能写在该函数。
            instance.text = text;
            if (arguments.length === 0) {
                instance.text = "";
            }
            instance.update();
            instance.render();
            instance.show();
            return instance;
        }
    }
)();

// 页面加载
var loading = (
    function () {
                class Panel {
                    // 构造函数属性
                    constructor() {
                        this.dom = document.createElement("div");
                    }
                    // 渲染样式
                    render() {
                        // dom轮廓样式
                        var obj = {
                            position: "fixed",
                            width: "400px",
                            height: "230px",
                            bottom: "0px",
                            left: "50%",
                            transform: "translate(-50%)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "15px",
                            backgroundColor: "pink",
                            fontWeight: "bold",
                            zIndex: 10,
                            background: "url(/resource/images/loading.jpg) center no-repeat",
                            backgroundSize: "cover"
                        }
                        for (var i in obj) {
                            this.dom.style[i] = obj[i];
                        }
                    }
                    // 上树
                    show() {
                        document.body.appendChild(this.dom);
                    }
                    // 隐藏
                    hide() {
                        document.body.removeChild(this.dom);
                    }
                }
                var instance = null;
                return function (text) {
                    if (instance === null) {
                        instance = new Panel(text);
                    }
                    instance.render();
                    instance.show();
                    return instance;
                }
    }
)();

// 搜索功能
var Search = (
    function () {
                class Panel {
                    // 构造函数属性
                    constructor(text) {
                        // 文本是传进来的数据会更新，所以定义一个update()方法
                        this.text = text;
                        this.dom = document.createElement("div");
                        this.closeDom = document.createElement("span");
                        this.btn_goto = document.createElement("button");
                        this.init();
                    }
                    // 方法集合
                    init() {
                        // this.update();
                        // this.render();
                        // this.show();
                        this.bindEvent()
                    }
                    // 渲染样式
                    render() {
                        // dom轮廓样式
                        var obj = {
                            position: "fixed",
                            width: "400px",
                            height: "200px",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%,-50%)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "15px",
                            backgroundColor: "pink",
                            fontWeight: "bold",
                            zIndex: 10
                        }
                        for (var i in obj) {
                            this.dom.style[i] = obj[i];
                        }

                        this.dom.innerHTML = ` <div class="box" style="padding-top: 0px;">
                                                    <h5 style="text-align: center;">${this.text}</h5>
                                            </div>`;

                        // 关闭按钮样式
                        var closeObj = {
                            position: "absolute",
                            top: "0px",
                            right: "0px",
                            width: "30px",
                            hight: "30px",
                            lineHeight: "30px",
                            textAlign: "center",
                            fontSize: "20px",
                            backgroundColor: "#ccc",
                            cursor: "pointer"
                        }
                        for (var i in closeObj) {
                            this.closeDom.style[i] = closeObj[i];
                        }
                        this.closeDom.innerHTML = "&times";
                        // 确定按钮
                        var gotoObj = {
                            position: "absolute",
                            bottom: "10px",
                            right: "45%",
                            width: "50px",
                            hight: "25px",
                            lineHeight: "25px",
                            textAlign: "center",
                            fontSize: "15px",
                            backgroundColor: "#ccc",
                            cursor: "pointer",
                            borderRadius: "5px"
                        }
                        for (var i in gotoObj) {
                            this.btn_goto.style[i] = gotoObj[i];
                        }
                        this.btn_goto.innerHTML = `<a style="text-decoration:none" >确定</a>`;
                    }
                    // 数据更新
                    update() {
                        this.dom.innerHTML = this.text;
                    }
                    // 绑定事件
                    bindEvent() {
                        this.closeDom.onclick = () => {
                            this.hide();
                        }
                        this.btn_goto.onclick = () => {
                            this.hide();
                        }
                    }
                    // 上树
                    show() {
                        document.body.appendChild(this.dom);
                        this.dom.appendChild(this.btn_goto);
                        this.dom.appendChild(this.closeDom);
                    }
                    // 隐藏
                    hide() {
                        document.body.removeChild(this.dom);
                    }
                }
                var instance = null;
                return function (text) {
                    if (instance === null) {
                        instance = new Panel(text);
                    }
                    // 这层函数的作用是让我们让真正的new Panel()，并将地址交给instance保存。需要注意的是：这里的this,指代的并不是Panel()的实例。而instance才是Panel()函数的的this。并且构造函数的形参也要能写在该函数。
                    instance.text = text;
                    if (arguments.length === 0) {
                        instance.text = "";
                    }
                    instance.update();
                    instance.render();
                    instance.show();
                    return instance;
                }
    }
)();