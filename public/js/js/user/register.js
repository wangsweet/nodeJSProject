class Register {
    constructor(container) {
        this.container = container;
        this.init();
    }
    init() {
        this.createRegister();
    }
    createRegister() {
        this.container.html(Register.template);
        this.tagClick();
        this.formSumbit();
    }
    tagClick() {
        this.container.find(".tag").on("click", this.handleTagClickCb.bind(this));
    }
    handleTagClickCb() {
        new Change().createChange(true);
    }
    formSumbit() {
        this.container.find("#user_form").on("submit", this.handleFormSubmitCb.bind(this))
    }
    handleFormSubmitCb(e) {
        e.preventDefault();
        let username = this.container.find("#registe_user").val();
        let password = this.container.find("#registe_pwd").val();
        // console.log(username,password)
        if (username != "" && password != "") {
            $.ajax({
                type: "POST",
                url: "/users/register",
                data: {
                    username,
                    password
                },
                success: this.handleFormSubmitSucc.bind(this)
            })
        }
    }
    handleFormSubmitSucc(data) {
        if (data.data.status == 1) {
            alert(data.data.info);
            new Change().createChange(true);
        } else {
            alert(data.data.info);
        }
    }
}
Register.template = `<div class="qf_logo">
<img src="https://cas.1000phone.net/cas/images/login/logo.png">
</div>
<form id="user_form">
<div class="form-group">
    <label for="registe_user">用户名</label>
    <input type="text" class="form-control" id="registe_user" placeholder="请输入用户名">
</div>
<div class="form-group">
    <label for="registe_pwd">密码</label>
    <input type="password" class="form-control" id="registe_pwd" placeholder="请输入密码">
</div>
<p class="text-info tag">已有账号，立即登录</p>
<button type="submit" class="btn btn-primary registe_btn">立即注册</button>
</form>`