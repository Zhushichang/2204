class List {
    constructor() {

        this.current = 1;
        //调用获取数据方法
        this.getData();
        //调用委托事件方法
        this.getClick();

    };
    //委托绑定事件
    getClick() {
        this.$(".sk_bd ul").addEventListener("click", this.addCart.bind(this))
        this.$(".sk_bd ul").addEventListener("click", this.detail.bind(this))
        window.addEventListener('scroll', this.lazyLoader)
    };
    //判断是否跳转到详情页
    detail(e) {
        //判断点击的是否是图片
        // console.log(e.target);
        if (e.target.className != "ul_img") {
            return;
        }
        //获取商品id
        let gid = e.target.parentNode.parentNode.dataset.id;
        location.assign("./detail.html?id=" + gid);
    };
    //解决绑定的添加购物车的方法
    addCart(e) {
        //判断点击的是否是立即抢购
        // console.log(e.target);
        if (e.target.className != "sk_goods_buy") {
            // console.log(1111);
            return;
        }

        //获取token
        let token = localStorage.getItem("token");
        // console.log(token);
        //获取token失败,跳转登陆页面
        if (!token) location.assign("./login.html?url=list.html");
        //获取商品id
        let g = e.target.parentNode.dataset.id - 0;
        //获取用户id
        let u = localStorage.getItem("user_id") - 0;
        // console.log(gid, uid);
        //获取token,把抢购商品添加到购物车
        this.addShppingCart(u, g);



    };
    addShppingCart(uId, gId) {
        const AUTH_TOKEN = localStorage.getItem("token");

        axios.defaults.headers.common['authorization'] = AUTH_TOKEN;

        axios.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded";
        let goods = `id=${uId}&goodsId=${gId}`
        axios.post("http://localhost:8888/cart/add", goods).then((res) => {
            console.log(res);
            if (res.status == 200 && res.data.code == 1) {
                layer.open({
                    title: '商品添加到购物车成功',
                    content: '可以选择留在本页面,或者跳转到购物车页面',
                    btn: ['留在本页面', '去购物车'],
                    btn2: function(index, layero) {
                        location.assign('./cart.html');
                    }
                });
            } else if (res.status == 200 && res.data.code == 401) {
                //清除token和userid
                localStorage.removeItem("token");
                localStorage.removeItem("user_id");
                location.assign("./login.html?url=list.html")
            } else {
                layer.open({
                    title: '商品添加到购物车失败',
                    content: '商品添加到购物车失败',
                    time: 3000
                });
            }

        })

    };
    //获取数据的方法
    async getData(page = 1) {
        //发送请求,获取数据
        let { status, data } = await axios.get("http://localhost:8888/goods/list?current=" + page);
        //查看状态是否状态
        // console.log(data.list);
        if (!status == 200 || !data.code == 1) throw new Error("请求状态失败!");
        let html = "";
        data.list.forEach(goods => {
            html += `<li class="sk_goods" data-id='${goods.goods_id}'>
            <a href="javascript:"><img  class="ul_img" src="${goods.img_big_logo}" alt=""></a>
            <h5 class="sk_goods_title">${goods.title}</h5>
            <p class="sk_goods_price"><em>¥${goods.current_price}</em> <del>￥${goods.price}</del></p>
            <div class="sk_goods_progress">
                已售<i>${goods.sale_type}</i>
                <div class="bar">
                    <div class="bar_in"></div>
                </div>
                剩余<em>${goods.goods_number}</em>件
            </div>
            <a href="javascript:" class="sk_goods_buy">立即抢购</a>
        </li>`
        });
        this.$(".sk_bd ul").innerHTML += html;
        // console.log(this.$(".sk_bd ul"));

        // console.log(html);
    };

    //封装获取结点的方法
    $(ele) {
        let res = document.querySelectorAll(ele);
        return res.length == 1 ? res[0] : res;
    };
    //这就是那个懒加载会不会是这个的问题,我知道了
    lazyLoader = () => {
        let top = document.documentElement.scrollTop;
        let cliH = document.documentElement.clientHeight;
        let conH = this.$('.sk_container').offsetHeight;
        console.log(top, cliH, conH);
        // console.log(conT);
        if (top + cliH > (conH + 450)) {
            if (this.lock) return;
            this.lock = true;
            setTimeout(() => {
                this.lock = false;
            }, 400)
            this.current = ++this.current;
            this.getData(this.current)
        }
    }
}
new List();