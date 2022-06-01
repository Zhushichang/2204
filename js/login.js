class Login {
    constructor() {
        this.$(".over").addEventListener("click", this.implementLogin);
        // console.log(location.search.split("="))
        if (location.search) {
            this.url = location.search.split("=");
            console.log(this.url);
        }
    }
    implementLogin = () => {
        //获取表单
        let forms = document.forms[0].elements;
        // console.log(forms);
        //获取每个表单的input的值
        let name = forms[0].value.trim();
        // console.log(name);
        let pwd = forms[1].value.trim();
        //input内容不得为哦空
        if (!name || !pwd) throw new Error("用户名或密码不能为空");
        //
        // axios.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded";
        //发送请求进行登陆验证
        let user = `username=${name}&password=${pwd}`
        axios.post("http://localhost:8888/users/login", user).then(res => {
            console.log(res);
            if (res.status == 200 && res.data.code == 1) {
                //将token和userid保存到localstorage
                localStorage.setItem('token', res.data.token);
                localStorage.setItem("user_id", res.data.user.id);
                if (this.url) {
                    location.href = this.url[1];
                    // console.log(111);
                }
            }
        })
    };
    //封装获取结点的方法
    $(ele) {
        let res = document.querySelectorAll(ele);
        return res.length == 1 ? res[0] : res;
    }
}
new Login();