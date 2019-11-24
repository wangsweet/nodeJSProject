class Change{
        constructor(){
            this.container=$(".form_container");
        }
        init(){
            this.createChange();
        };
        createChange(flag){
            if(flag){
                this.login=new Login(this.container);
            }else{
                this.register=new Register(this.container);
            }
        }
}
new Change().init();