class Register {
    constructor() {
        //添加密码的input的失去焦点事件
        // console.log(this.$('#psw').value);
        this.$('#psw').onblur = () => {
            let pwd = this.$('#psw').value.trim();
            this.panduan(pwd);
            console.log(pwd);
        }

        this.$('.over').addEventListener('click', this.register.bind(this));

    }
    async register() {
        let tel = this.$('#tel').value.trim();
        //手机号正则验证
        let telReg = /^1[3-9]\d{9}$/;
        let psw = this.$('#psw').value.trim();
        let pswReg = /^\w{6,16}$/;
        let repsw = this.$('#repsw').value.trim();
        let code1 = this.$('#code').value.trim();
        //判断密码强度
        // this.panduan(psw);


        if (!tel) {
            this.$('.tel-em').innerHTML = '手机号不能为空';
            // console.log(this.$('.tel-em'));
            return;
        }
        if (!telReg.test(tel)) {
            this.$('.tel-em').innerHTML = '手机号只能是11位的数字';
            return
        }
        if (tel && telReg.test(tel)) this.$('.tel-em').innerHTML = '手机号正确';

        if (!psw) {
            this.$('.psw-em').innerHTML = '密码不能为空';
            return;
        }
        if (!pswReg.test(psw)) {
            this.$('.psw-em').innerHTML = '密码可以是6-16位任意的数字字母或下划线';
            return;
        }
        if (psw && pswReg.test(psw)) this.$('.psw-em').innerHTML = '密码设置成功';
        if (repsw != psw) {
            this.$('.repsw-em').innerHTML = '两次输入的密码不一致,请重新输入';
            return;
        }
        if (repsw == psw) this.$('.repsw-em').innerHTML = '两次输入的密码一致';



        if (!this.$('.agree-checked').checked) throw new Error('请勾选协议');
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        let par5 = `username=${tel}&password=${psw}&rpassword=${repsw}&nickname=${code1}`;
        let { status, data } = await axios.post('http://localhost:8888/users/register', par5);
        // console.log(status);
        if (data.code == 1) {
            layer.msg('注册成功');
            setTimeout(function() {
                if (location.search) {
                    location.assign(location.search.split('=')[1]);
                } else {
                    location.assign('./login.html');
                }
            }, 1200)
        } else if (data.code == 0) {
            // console.log(data);
            alert('注册失败');
        }
    }
    panduan(psw) {
        this.$(".ruo").style.display = "inline-block";
        this.$(".zhong").style.display = "inline-block";
        this.$(".qiang").style.display = "inline-block";
        var z2 = /\d+/;
        var z3 = /[a-zA-Z]+/;
        var z4 = /[^a-zA-Z\d]+/;
        var a = 0;
        var b = 0;
        var c = 0;
        if (z2.test(psw)) {
            a = 1;

        }
        if (z3.test(psw)) {
            b = 1;

        }
        if (z4.test(psw)) {
            c = 1;

        }
        switch (a + b + c) {
            case 1:
                this.$(".zhong").style.display = "none";
                this.$(".qiang").style.display = "none";
                break;
            case 2:
                this.$(".ruo").style.display = "none";
                this.$(".qiang").style.display = "none";
                break;
            case 3:
                this.$(".ruo").style.display = "none";
                this.$(".zhong").style.display = "none";
                break;
        }
    }
    $(ele) {
        let res = document.querySelectorAll(ele);
        return res.length == 1 ? res[0] : res;
    }
}
new Register;