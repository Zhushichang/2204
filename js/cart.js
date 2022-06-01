class CartList {
    constructor() {

        this.getList();

        //给cart-list绑定事件
        this.$(".cart-list").addEventListener("click", this.click);

        //全选的事件
        this.$(".cart-th input").addEventListener("click", this.checkedAll);


    };
    //委托事件
    click = (e) => {

        let target = e.target;
        // console.log(target);
        if (target.nodeName == 'A' && target.className == "del") this.del(target);
        //判断是否点击的是+号
        if (target.nodeName == 'A' && target.className == "increment plus") this.add(target);

        //判断是否是-
        if (target.nodeName == 'A' && target.className == "increment mins") this.jian(target);
    };

    /**************修改数量****************/
    //加
    add = (tar) => {
        console.log(tar);
        let ul = tar.parentNode.parentNode.parentNode;
        //获取数量
        let num = ul.querySelector(".itxt");
        //获取价格
        let sum = ul.querySelector(".sum");
        //获取单价
        let price = ul.querySelector(".price").innerHTML - 0;
        console.log(price);
        //更新input中的数据
        let numVal = num.value - 0;
        //数量加1
        numVal++;


        //发送请求修改json中的数量
        const AUTH_TOKEN = localStorage.getItem("token");

        axios.defaults.headers.common['authorization'] = AUTH_TOKEN;
        //获取goodsid
        let goods = `id=${localStorage.getItem("user_id")}&goodsId=${ul.dataset.id}&number=${numVal}`
        axios.post("http://localhost:8888/cart/number", goods).then(res => {
            // console.log(res);
            if (res.status == 200 && res.data.code == 1) {
                num.value = numVal;
                sum.innerHTML = numVal * price;
                this.countSunPrice();
            }
        })

    };
    //减
    jian = (tar) => {
        console.log(tar);
        let ul = tar.parentNode.parentNode.parentNode;
        //获取数量
        let num = ul.querySelector(".itxt");
        //获取价格
        let sum = ul.querySelector(".sum");
        //获取单价
        let price = ul.querySelector(".price").innerHTML - 0;
        console.log(price);
        //更新input中的数据
        let numVal = num.value - 0;
        //数量加1
        numVal--;
        if (num == 1) {
            return;
        }

        //发送请求修改json中的数量
        const AUTH_TOKEN = localStorage.getItem("token");

        axios.defaults.headers.common['authorization'] = AUTH_TOKEN;
        //获取goodsid
        let goods = `id=${localStorage.getItem("user_id")}&goodsId=${ul.dataset.id}&number=${numVal}`
        axios.post("http://localhost:8888/cart/number", goods).then(res => {
            // console.log(res);
            if (res.status == 200 && res.data.code == 1) {
                num.value = numVal;
                sum.innerHTML = numVal * price;
                this.countSunPrice();
            }
        })

    }



    /*****************统计数量和价格*****************/
    countSunPrice() {
        let num = 0;
        let price = 0;
        //只统计选中的
        this.$(".good-checkbox").forEach((e) => {


            //判断选中的
            if (e.checked) {
                let ul = e.parentNode.parentNode;
                //获取数量
                let tmpNum = ul.querySelector(".itxt").value - 0;
                // console.log(num);
                //价格
                let tmPprice = ul.querySelector(".sum").innerHTML - 0;
                // console.log(tmpNum, tmPprice);
                num += tmpNum;
                price += tmPprice;
            }
        });
        // console.log(num, price);
        this.$(".sumprice-top strong").innerHTML = num;
        price = parseInt(price * 100) / 100;
        this.$(".summoney span").innerHTML = price
    }



    //全选单选实现
    checkedAll = (e) => {
        //点击全选的时候让单个商品状态跟随全选
        let checked = e.target.checked;
        // console.log(checked);
        this.CheckGoods(checked);
        //调用统计的方法
        this.countSunPrice();

    };
    CheckGoods(checked) {
        this.$(".good-checkbox").forEach((e) => {
            e.checked = checked;
        })
    };

    //单选实现
    oneCheckedGood() {

        //给每个商品的复选框添加点击事件
        this.$(".good-checkbox").forEach((e) => {
            let self = this;
            e.onclick = function() {
                self.countSunPrice();
                //获取当前的点击状态
                // console.log(e.checked);
                //判断当前商品点击的是取消,则取消全选
                if (!e.checked) {
                    self.$(".cart-th input").checked = false;
                }

                //单个商品全部选中,全选选中
                if (e.checked) {
                    let status = self.getOneChecken();
                    if (status) {
                        self.$(".cart-th input").checked = true;
                    }
                }
            }
        })

    };
    //获取单个商品的选中状态

    getOneChecken() {
        //寻找没选中的
        let res = Array.from(this.$(".good-checkbox")).find(e => {
            return !e.checked;

            // console.log(e.checked);
        })
        return !res;
    }


    //删除商品方法,商品id和用户id
    del(tar) {
        // console.log(gid, uid);
        let index = layer.confirm("是否删除这件商品", { title: '删除提示' }, function() {
            // const AUTH_TOKEN = localStorage.getItem("token");
            // axios.defaults.headers.common['authorization'] = AUTH_TOKEN;
            let ul = tar.parentNode.parentNode.parentNode;
            let gid = tar.parentNode.parentNode.parentNode.dataset.id;
            let uid = localStorage.getItem("user_id");
            axios.get("http://localhost:8888/cart/remove", {
                params: {
                    id: uid,
                    goodsId: gid
                }
            }).then((res) => {
                // console.log(res);
                //直接刷新页面
                // location.reload();
                //无刷新删除
                layer.close(index);
                ul.remove();


            })
        })

    };
    //显示购物车列表
    async getList() {
        const AUTH_TOKEN = localStorage.getItem("token");

        axios.defaults.headers.common['authorization'] = AUTH_TOKEN;

        let { status, data } = await axios.get("http://localhost:8888/cart/list", {
            params: {
                id: localStorage.getItem("user_id")
            }

        });

        // console.log(data);
        if (!status == 200 && !data.code == 1) return
        if (status == 200 && data.code == 401) {
            //清除token和userid
            localStorage.removeItem("token");
            localStorage.removeItem("user_id");
            location.assign("./login.html?url=cart.html")
        }
        if (status == 200 && data.code == 5) {
            //清除token和userid
            localStorage.removeItem("token");
            localStorage.removeItem("user_id");
            location.assign("./login.html?url=cart.html")
        }
        // if (!status == 200 && !data.code == 401) location.assign("./login.html?url=cart.html")
        let html = "";
        data.cart.forEach(e => {
            html += `<ul class="goods-list yui3-g" data-id=${e.goods_id}>
            <li class="yui3-u-3-8 pr">
                <input type="checkbox" class="good-checkbox">
                <div class="good-item">
                    <div class="item-img">
                        <img src="${e.img_small_logo}">
                    </div>
                    <div class="item-msg">${e.title}</div>
                </div>
            </li>
            <li class="yui3-u-1-8">
              
            </li>
            <li class="yui3-u-1-8">
                <span class="price">${e.current_price}</span>
            </li>
            <li class="yui3-u-1-8">
                <div class="clearfix">
                    <a href="javascript:;" class="increment mins">-</a>
                    <input autocomplete="off" type="text" value="${e.cart_number}" minnum="1" class="itxt">
                    <a href="javascript:;" class="increment plus">+</a>
                </div>
                <div class="youhuo">有货</div>
            </li>
            <li class="yui3-u-1-8">
                <span class="sum">${e.cart_number*e.current_price}</span>
            </li>
            <li class="yui3-u-1-8">
                <div class="del1">
                    <a href="javascript:;" class='del'>删除</a>
                </div>
                <div>移到我的关注</div>
            </li>
        </ul>`

        });
        // console.log(data.cart);
        // console.log(html);
        this.$(".cart-list").innerHTML += html;
        //单选按钮的事件绑定
        //因为是异步事件必须等代码追加玩后才能调用
        this.oneCheckedGood();
    }



    //封装获取结点的方法
    $(ele) {
        let res = document.querySelectorAll(ele);
        return res.length == 1 ? res[0] : res;
    }
}
new CartList();