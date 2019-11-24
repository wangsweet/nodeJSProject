class ArticlePush{
    constructor(){
        this.container=$(".content");
        this.init();
    }
    init(){
        this.createContent();
    }
    createContent(){
        this.container.html(ArticlePush.template);
        this.createEditor();
        this.articleFormSubmit();
    }
    createEditor(){
        this.editor = new Simditor({
            textarea: $('#editor')
          });
    }
    articleFormSubmit(){
        this.container.find("#article_form").on("submit",this.handleArticleFormSubmitCb.bind(this))
    }
    handleArticleFormSubmitCb(e){
        e.preventDefault();
        let articleTitle=this.container.find("#articleTitle").val();
        let content=this.editor.getValue();
        // console.log(articleTitle,content);
        $.ajax({
            type:"post",
            url:"/article/articlePush",
            data:{
                articleTitle,
                content 
            },
            success:this.handleArticleFormSubmitSucc.bind(this)
        })
    }
    handleArticleFormSubmitSucc(data){
        if(data.data.status==1){
            alert(data.data.info);
            new Slider().handleSliderClick(4);
        }else{
            alert(data.data.info);  
        }
    } 
}
ArticlePush.template=`
<div class="articlePush">
<form id="article_form">
<div class="form-group">
  <label for="articleTitle">文章标题</label>
  <input type="text" class="form-control" id="articleTitle" placeholder="请输入章节标题">
</div>
<textarea id="editor" placeholder="请输入章节内容" autofocus></textarea>
<button type="submit" class="btn btn-default" style="float:right;margin-top:5px;">提交</button>
</form></div>`;