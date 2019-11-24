class User {
    constructor() {
        this.container = $(".content");
        this.init();
    }
    init() {
        this.createContent();
    }
    createContent() {
        this.container.html(User.template);
        this.getUserMess();
    }
    getUserMess() {
        $.ajax({
            type: "get",
            url: "/user/userMess",
            data: {
                page: 1,
                limit: 10
            },
            success: this.handleGetUserMess.bind(this)
        })
    }
    handleGetUserMess(data) {
        let str = "";
        let status="";
        let time="";
        let dat="";
        for (var i = 0; i < data.data.list.length; i++) {
            if(data.data.list[i].status){
                status="未冻结";
             }else{
                 status="已冻结";
             }
             let time=new Date(data.data.list[i].registerTime);
             let dat =time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate();
            str += `<tr style="background:#fff">
            <td>${data.data.list[i].name}</td>
            <td style="width:90px">
                <img style="width:90px" src="${data.data.list[i].userPic}"/>
            </td>
            <td>${data.data.list[i].username}</td>
            <td>${dat}</td>
            <td>${status}</td>
        </tr>`
        }
        this.container.find(".user tbody").html(str);
    }
}
User.template = `
<div class="user">
<table class="table table-striped">
    <thead>
        <tr>
            <th>用户昵称</th>
            <th>用户头像</th>
            <th>用户账户</th>
            <th>注册时间</th>
            <th>用户状态</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>zttdd</td>
            <td style="width:90px">
                <img src="https://bookcover.yuewen.com/qdbimg/349573/1016433659/90"/>
            </td>
            <td>ws</td>
            <td>2019-10-28</td>
            <td>未冻结</td>
        </tr>
    </tbody>
</table>
</div>`;