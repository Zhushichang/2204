class XiangQing {
    constructor() {

            if (location.search) {
                this.url = location.search.split("=")[1];
            }
            this.getData();
        }
        //
    async getData() {
        let gid = this.url;
        gid = Number(gid);
        let { data, status } = await axios.get("http://localhost:8888/goods/item", {
            params: {
                id: gid
            }
        });
        console.log(data);
        console.log(data.info.img_big_logo);
        if (!status == 200 && !data.code == 1) return
        let html = "";
        html += ` 
    <div class="sku_name">
       ${data.info.title}
    </div>
    <div class="news" >
        购买1-50件时享受单件价￥${parseInt(data.info.current_price*0.8)}，超出数量以结算价为准
    </div>
    <div class="summary" data-id='${data.info.goods_id}'>
        <dl class="summary_price">
            <dt>闪购价</dt>
            <dd>
                <i class="price">${data.info.current_price}</i>
                <a href="#">降价通知</a>
                <div class="remark">累计评价51万+</div>
            </dd>
        </dl>
        <dl class="summary_promotion">
            <dt>促销</dt>
            <dd>
                <em>加购价</em> 满999.00另加20.00元，或满1999.00另加30.00元，或满2999.00另加40.00元，即可在购物车换购热销商品 详情》
            </dd>
        </dl>
        <dl class="summary_support">
            <dt>支持</dt>
            <dd>以旧换新，闲置手机回收 4G套餐超值抢 礼品购</dd>
        </dl>
        <dl class="summary_stock">
            <dt>配送至</dt>
            <dd>
                北京海淀区中关有货 支持 99元免运费 |货到付款 |211限时达
                <br>由自营发货，并提供售后服务。11:00前完成下单，预计今天（11月19日）送达
            </dd>
        </dl>
        <dl class="choose_color">
            <dt>选择颜色</dt>
            <dd>
                <a href="javasript:;" class="current">天空之境</a>
                <a href="javasript:;">亮黑色</a>
                <a href="javasript:;">极光色</a>
                <a href="javasript:;">赤茶橘</a>
                <a href="javasript:;">珠光贝母</a>
                <a href="javasript:;">嫣紫色</a>
                <a href="javasript:;">墨玉蓝</a>
            </dd>
        </dl>
        <dl class="choose_version">
            <dt>选择版本</dt>
            <dd>
                <a href="javascript:;" class="current">公开版</a>
                <a href="javascript:;">移动4G</a>
            </dd>
        </dl>
        <dl class="choose_version">
            <dt>内存容量</dt>
            <dd>
                <a href="javascript:;" class="current">8G+218G</a>
                <a href="javascript:;">8G+256G</a>
                <a href="javascript:;">8G+512G</a>
            </dd>
        </dl>
        <dl class="choose_type">
            <dt>购买方式</dt>
            <dd>
                <a href="javascript:;" class="current">官方标配</a>
                <a href="javascript:;">移动优惠购</a>
                <a href="javascript:;">电信优惠购</a>
            </dd>
        </dl>
        <dl class="choose_type">
            <dt>套餐</dt>
            <dd>
                <a href="javascript:;" class="current">保护套餐</a>
                <a href="javascript:;">充电套餐</a>
            </dd>
        </dl>
        <div class="choose_btns">
            <div class="choose_amount">
                <input type="text" value="1">
                <a href="javascript:;" class="add">+</a>
                <a href="javascript:;" class="reduce">-</a>
            </div>
            <a href="javascript:" class="addCar">加入购物车</a>
        </div>
    </div>`
        console.log(this.$("#small img"));
        this.$("#small img").setAttribute("src", data.info.img_big_logo);
        this.$(".big img").setAttribute("src", data.info.img_big_logo);
        this.$(".list_item img")[0].setAttribute("src", data.info.img_big_logo);
        // console.log(data.info.goods_introduce);
        let html2 = `${data.info.goods_introduce}`;
        // console.log()
        this.$(".detail_tab_con").innerHTML = html2.replace(/\/\//g, 'https://');

        this.$(".itemInfo_wrap").innerHTML = html;
    };



    //封装获取结点的方法
    $(ele) {
        let res = document.querySelectorAll(ele);
        return res.length == 1 ? res[0] : res;
    }
}
new XiangQing();