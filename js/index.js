class Index {
    constructor() {
        this.$("#sss").onmouseleave = function() {
            sta.$(".content").style.display = "none";
        }
        this.timer()
            //点击事件委托
        this.$("#sss").addEventListener("mouseover", this.click);
        let sta = this;

    }

    click = (e) => {
            let target = e.target;

            if (target.nodeName == 'LI') {
                this.getDom()
            }
        }
        //


    //
    getDom() {

        //给cart-list绑定事件
        this.$(".grid-col1 li").forEach((e, v) => {
            let start = this;
            e.onmouseover = function() {
                start.init()
                start.$(".content").style.display = "block";
                start.$(".content-" + (v - 0 + 1)).style.display = "block";
            };

        });

    };
    //初始化2级下拉
    init() {
        let t = this.$(".aa")
        for (let i = 0; i < t.length; i++) {
            t[i].style.display = "none";
        }
    }

    //封装获取结点的方法
    $(ele) {
            let res = document.querySelectorAll(ele);
            return res.length == 1 ? res[0] : res;
        }
        //秒杀
        //京东秒杀倒计时
    seckill() {
            let time = new Date();
            let endTime = new Date('2022/5/31 23:59:59');
            let timeDiff = endTime.getTime() - time.getTime();
            let day = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            let hour = Math.floor(timeDiff / (1000 * 60 * 60) % 24);
            let minute = Math.floor(timeDiff / (1000 * 60) % 60);
            let second = Math.floor(timeDiff / 1000 % 60);
            this.$('.day').innerHTML = day;
            this.$('.hour').innerHTML = hour;
            this.$('.minute').innerHTML = minute;
            this.$('.second').innerHTML = second;
            // console.log(day, hour, minute, second);
        }
        //定时器
    timer() {
        setInterval(() => {
            this.seckill();
        }, 1000);
    }


}
new Index();