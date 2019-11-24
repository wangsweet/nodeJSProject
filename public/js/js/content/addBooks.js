class AddBooks{
    constructor(){
        this.container=$(".content");
        this.init();
    }
    init(){
        this.createContent();
    }
    createContent(){
        this.container.html(AddBooks.template);
        this.booksSubmit();
        this.fileChange();
    }
    booksSubmit(){
        this.container.find("#books_form").on("submit",this.handleBooksSubmitCb.bind(this))
    }
    handleBooksSubmitCb(e){
        e.preventDefault();
        let booksAuth=this.container.find("#booksAuth").val();
        let booksName=this.container.find("#booksName").val();
        let booksStatus=this.container.find("#booksStatus").val();
        let booksPrice=this.container.find("#booksPrice").val();
        let booksLogo=this.container.find("#booksLogo").attr("data-url");;
        // console.log(booksAuth,booksName,booksStatus,booksPrice,booksLogo);
        $.ajax({
            type:"post",
            url:"/books/addbooks",
            data:{
                booksAuth,
                booksName,
                booksStatus,booksPrice,
                booksLogo 
            },
            success:this.handleBooksSubmitSucc.bind(this)
        })

    }
    handleBooksSubmitSucc(data){
        if(data.data.status==1){
            alert(data.data.info)
            new Slider().handleSliderClick(1);
        }else{
            alert(data.data.info)
        }
    }
    fileChange(){
        this.container.find("#booksLogo").on("change",this.handleFileChangeCb.bind(this))
    }
    handleFileChangeCb(){
        let file=this.container.find("#booksLogo")[0].files[0];
        // console.log(file);
        //模拟form上传
        let formData=new FormData();
        formData.append("booksLogo",file);
        $.ajax({
            type:"post",
            url:"/upload/urlImg",
            data:formData,
            contentType:false,
            processData:false,
            cache:false,
            success:this.handleUploadSucc.bind(this)
        })
    }
    handleUploadSucc(data){
        if(data.data.urlImg){
            let img =$("<img/>");
            img.attr("src",data.data.urlImg);
            img.css({
                width:90,
                height:120
            })
            this.container.find(".upload div").html(img);
            this.container.find("#booksLogo").attr("data-url",data.data.urlImg);
        }
    }
}
AddBooks.template=`<div class="addBooks">
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
    <input type="number" class="form-control" id="booksPrice" placeholder="请输入书籍价格">
</div>
<div class="form-group upload">
  <div>上传图片</div>
  <input type="file" id="booksLogo">
</div>

<button type="submit" class="btn btn-primary">添加书籍</button>
</form>
</div>`;