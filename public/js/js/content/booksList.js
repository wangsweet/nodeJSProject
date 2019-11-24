class BooksList {
    constructor() {
        this.container = $(".content");
        this.init();
        this.sort = null;
    }
    init() {
        this.createContent();
        this.number=1;
    }
    createContent() {
        this.container.html(BooksList.template);
        this.getBooksList();
    }
    getBooksList() {
        $.ajax({
            type: "get",
            url: "/books/booksList",
            data: {
                page: 1,
                limit: 10
            },
            success: this.handleGetBooksListSucc.bind(this)
        })
    }
    handleGetBooksListSucc(data) {
        this.data = data.data.list;
        // console.log(this.data)
        let str = "";
        for (var i = 0; i < data.data.list.length; i++) {
            str += `<tr style="background:#fff">
                <td>${i+1}</td>
                <td>${data.data.list[i].booksAuth}</td>
                <td>${data.data.list[i].booksName}</td>
                <td>${data.data.list[i].booksStatus}</td>
                <td style="width:90px">
                    <img style="width:90px" src="${data.data.list[i].booksLogo}"/>
                </td>
                <td>￥${data.data.list[i].booksPrice}</td>
                <td data-id="${data.data.list[i]._id}">
                   <button type="button" class="btn btn-link modify" 
                   data-toggle="modal" 
                   data-target="#booksModify">修改</button>
                   <button type="button" class="btn btn-link delete">删除</button>
               </td>
            </tr>`
        }
        this.container.find(".booksList tbody").html(str);
        this.modifyEach();
        this.fileChange();
        this.saveDataClick();
        this.deleteEach();
        this.seclectEach(data);
        this.fuzzySearch();
        this.clickBtnSort();  
    }
    //选择渲染
    seclectEach(data) {
        var me = this;
        let sta = 0;
        let sec = "";
        me.container.find(".sec").change(function () {
            let opt = me.container.find(".sec").val();
            sec = "";
            sta = 0;
            for (var i = 0; i < data.data.list.length; i++) {
                if (opt === data.data.list[i].booksStatus) {
                    sec += `<tr style="background:#fff">
            <td>${++sta}</td>
            <td>${data.data.list[i].booksAuth}</td>
            <td>${data.data.list[i].booksName}</td>
            <td>${data.data.list[i].booksStatus}</td>
            <td style="width:90px">
                <img style="width:90px" src="${data.data.list[i].booksLogo}"/>
            </td>
            <td>￥${data.data.list[i].booksPrice}</td>
            <td data-id="${data.data.list[i]._id}">
               <button type="button" class="btn btn-link modify" 
               data-toggle="modal" 
               data-target="#booksModify">修改</button>
               <button type="button" class="btn btn-link delete">删除</button>
           </td>
        </tr>`
                    me.container.find(".booksList tbody").html(sec);
                    me.modifyEach();
                    me.fileChange();
                    me.saveDataClick();
                    me.deleteEach();
                }

            }
            if (opt === "全部") {
                me.getBooksList();
            }
        });
    }
    //模糊查询
    fuzzySearch() {
        this.container.find(".txt").on("input propertychange", this.handleFuzzySearch.bind(this))
    }
    handleFuzzySearch() {
        var value = this.container.find(".txt").val();
        console.log(value)
        $.ajax({
            type: "get",
            url: "/books/booksSearch",
            data: {
                value
            },
            success: this.handleFuzzySearchSucc.bind(this)
        })
    }
    handleFuzzySearchSucc(data) {
        let fuzzy = "";
        for (var i = 0; i < data.data.list.length; i++) {
            fuzzy += `<tr style="background:#fff">
                <td>${i+1}</td>
                <td>${data.data.list[i].booksAuth}</td>
                <td>${data.data.list[i].booksName}</td>
                <td>${data.data.list[i].booksStatus}</td>
                <td style="width:90px">
                    <img style="width:90px" src="${data.data.list[i].booksLogo}"/>
                </td>
                <td>￥${data.data.list[i].booksPrice}</td>
                <td data-id="${data.data.list[i]._id}">
                   <button type="button" class="btn btn-link modify" 
                   data-toggle="modal" 
                   data-target="#booksModify">修改</button>
                   <button type="button" class="btn btn-link delete">删除</button>
               </td>
            </tr>`
        }
        this.container.find(".booksList tbody").html(fuzzy);
        this.modifyEach();
        this.fileChange();
        this.saveDataClick();
        this.deleteEach();
    }
    //排序
    clickBtnSort() {
        this.container.find(".sortbtn").on("click", this.handleClickBtnSortCb.bind(this))
    }
    handleClickBtnSortCb() {
       this.number=this.number*(-1);
        $.ajax({
            type: "get",
            url: "/books/booksSort",
            data:{
                number:this.number},
            success: this.handleClickBtnSortSucc.bind(this)
        })
    }
    handleClickBtnSortSucc(data){
        let sort = "";
        for (var i = 0; i < data.data.list.length; i++) {
            sort += `<tr style="background:#fff">
                <td>${i+1}</td>
                <td>${data.data.list[i].booksAuth}</td>
                <td>${data.data.list[i].booksName}</td>
                <td>${data.data.list[i].booksStatus}</td>
                <td style="width:90px">
                    <img style="width:90px" src="${data.data.list[i].booksLogo}"/>
                </td>
                <td>￥${data.data.list[i].booksPrice}</td>
                <td data-id="${data.data.list[i]._id}">
                   <button type="button" class="btn btn-link modify" 
                   data-toggle="modal" 
                   data-target="#booksModify">修改</button>
                   <button type="button" class="btn btn-link delete">删除</button>
               </td>
            </tr>`
        }
        this.container.find(".booksList tbody").html(sort);
        this.modifyEach();
        this.fileChange();
        this.saveDataClick();
        this.deleteEach();
    }
    modifyEach() {
        $.each(this.container.find(".modify"), this.handleModifyEachCb.bind(this))
    }
    handleModifyEachCb(index) {
        this.container.find(".modify").eq(index).on("click", this.handleModifyClick.bind(this, index))
    }
    handleModifyClick(index) {
        let id = this.container.find(".modify").eq(index).parent().attr("data-id");
        // console.log(index);
        // console.log(id);
        // console.log(this.data.length)
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i]._id == id) {
                this.container.find("#booksAuth").val(this.data[i].booksAuth);
                this.container.find("#booksName").val(this.data[i].booksName);
                this.container.find("#booksStatus").val(this.data[i].booksStatus);
                this.container.find("#booksPrice").val(this.data[i].booksPrice);
                this.container.find("#booksLogo").attr("data-url", this.data[i].booksLogo);
                var img = $("<img/>");
                img.attr("src", this.data[i].booksLogo);
                img.css({
                    width: 90,
                    height: 120
                })
                this.container.find(".upload>div").html(img);
                this.container.find("#books_form").attr("data-id", this.data[i]._id);
                break;
            }
        }
    }
    fileChange() {
        this.container.find("#booksLogo").on("change", this.handleFileChange.bind(this))
    }
    handleFileChange() {
        let file = this.container.find("#booksLogo")[0].files[0];
        // console.log(file);
        //模拟form上传
        let formData = new FormData();
        formData.append("booksLogo", file);
        $.ajax({
            type: "post",
            url: "/upload/urlImg",
            data: formData,
            contentType: false,
            processData: false,
            cache: false,
            success: this.handleUploadSucc.bind(this)
        })
    }
    handleUploadSucc(data) {
        if (data.data.urlImg) {
            let img = $("<img/>");
            img.attr("src", data.data.urlImg);
            img.css({
                width: 90,
                height: 120
            })
            this.container.find(".upload div").html(img);
            this.container.find("#booksLogo").attr("data-url", data.data.urlImg);
        }
        
    }
    saveDataClick() {
        this.container.find("#saveData").one("click", this.handleSaveDataClickCb.bind(this));
    }
    handleSaveDataClickCb() {
        let booksAuth = this.container.find("#booksAuth").val();
        let booksName = this.container.find("#booksName").val();
        let booksStatus = this.container.find("#booksStatus").val();
        let booksPrice = this.container.find("#booksPrice").val();
        let booksLogo = this.container.find("#booksLogo").attr("data-url");
        let id = this.container.find("#books_form").attr("data-id")
        // console.log(booksAuth,booksName,booksStatus,booksPrice,booksLogo,id)
        $.ajax({
            type: "post",
            url: "/books/modify",
            data: {
                booksAuth,
                booksName,
                booksStatus,
                booksPrice,
                booksLogo,
                id
            },
            success: this.handleModifySucc.bind(this)
        })
    }
    handleModifySucc(data) {
        if (data.data.status == 1) {
            alert(data.data.info);
            $('#booksModify').modal('hide');
            this.getBooksList();
        } else {
            alert(data.data.info);
        }
    }
    //删除
    deleteEach() {
        $.each(this.container.find(".delete"), this.handleDeleteEachCb.bind(this))
    }
    handleDeleteEachCb(index) {
        this.container.find(".delete").eq(index).on("click", this.handleDeletClick.bind(this, index))
    }
    handleDeletClick(index) {
        let id = this.container.find(".delete").eq(index).parent().attr("data-id");
        $.ajax({
            type: "get",
            url: "/books/delete",
            data: {
                id
            },
            success: this.handleDeleteSucc.bind(this)
        })
    }
    handleDeleteSucc(data) {
        if (data.data.status == 1) {
            alert(data.data.info);
            this.getBooksList();
        } else {
            alert(data.data.info);
        }
    }
}
BooksList.template = `<div class="booksList">
<form class="form-inline">
    <div class="form-group">
     <select class="form-control sec">
        <option>全部</option>
        <option>连载中</option>
        <option>已完结</option>
     </select>
    </div>
    <div class="form-group">
        <input type="text" class="form-control txt" placeholder="请输入关键字"/>
    </div>
    <div class="btn btn-primary sortbtn">排序</div>
  </form>
<table class="table table-striped">
    <thead>
        <tr>
            <th>书籍ID</th>
            <th>书籍作者</th>
            <th>书籍名称</th>
            <th>书籍状态</th>
            <th>书籍Logo</th>
            <th>书籍价格</th>
            <th>操作</th>
        </tr>
    </thead>
    <tbody>
    </tbody>
</table>
<div class="modal fade" tabindex="-1" role="dialog" id="booksModify">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">书籍修改</h4>
                </div>
                <div class="modal-body">
                <form id="books_form">
                <div class="form-group">
                  <label for="booksAuth">书籍作者</label>
                  <input type="text" class="form-control" id="booksAuth" placeholder="请输入书籍作者">
                </div>
                <div class="form-group">
                    <label for="booksName">书籍名称</label>
                    <input type="text" class="form-control" id="booksName" placeholder="请输入书籍名称">
                </div>
                <div class="form-group">
                    <label for="booksStatus">书籍状态</label>
                    <select class="form-control" id="booksStatus">
                        <option>连载中</option>
                        <option>已完结</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="booksPrice">书籍价格</label>
                    <input type="number" class="form-control" id="booksPrice" placeholder="请输入书籍名称">
                </div>
                <div class="form-group upload">
                  <div>上传图片</div>
                  <input type="file" id="booksLogo" >
                </div>
              </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" id="saveData">保存数据</button>
                </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
            </div><!-- /.modal -->
</div>`;