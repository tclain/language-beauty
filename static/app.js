Vue.use(VueMaterial);



Vue.use('territory', {
    template : `
        <div>Territory template</div> 
    `
})


const APP = new Vue({
    el: "#app",
    created : function(){
        this.loading = true;
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