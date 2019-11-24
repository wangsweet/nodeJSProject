class ArticleList{
    constructor(){
        this.container=$(".content");
        this.init();
    }
    init(){
        this.createContent();
    }
    createContent(){
        this.container.html(ArticleList.template);
        this.getArticleList();
    }
    getArticleList(){
        $.ajax({
            type:"get",
            url:"/article/articleList",
            data:{
                page:1,
                limit:30
            },
            success:this.handleGetArticleListSucc.bind(this)
        })
    }
    handleGetArticleListSucc(data){
        this.data=data.data.list;
        // console.log(this.data);
        let con="";
        for(let i=0;i<data.data.list.length;i++){
            con+=`<ul>
            <li data-id="${data.data.list[i]._id}" style="list-style:circle;list-style-position:inside;font-size:16px;margin-top:10px;" class="articletit">${data.data.list[i].articleTitle}</li>
            </ul>`;
        }
        this.container.find(".articleList").html(con);
        this.articleEach();
    }
    articleEach(){
        $.each(this.container.find(".articletit"),this.handleArticleEachCb.bind(this))
    }
    handleArticleEachCb(index){
        this.container.find(".articletit").eq(index).on("click",this.handleArticletitClick.bind(this,index))
        
    } 
    handleArticletitClick(index){
        let id=this.container.find(".articletit").eq(index).attr("data-id");
        window.location.href="http://localhost:3000/html/article.html?id="+id;
    } 
}
ArticleList.template=`
<div class="articleList"></div>`;