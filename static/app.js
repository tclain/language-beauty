Vue.use(VueMaterial);

var db = new restdb("e29881fb0e3b9546c89500c4e2ccffa50b492", {});
var portions = db.portions;
const APP = new Vue({
    el: "#app",
    created : function(){
        this.loading = true;
        portions.find({}, {}, (err, data) => {
            console.log('data', err, data);
            if(!err){
                if(data){
                    this.portions = data;
                }
            }
            this.loading = false;
        })
    },
    data: function () {
        return {
            loading : false,
            portionLoading : false,
            error : false,
            portions: []
        }
    },
    computed: {
        sortedPortions : function(){
            return this.portions.slice().sorted(function(el1, el2){
                return el1.name - el2.name
            });
        }
    },
    methods : {

    }
});