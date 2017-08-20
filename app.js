// use
Vue.use(VueRouter);
Vue.use(VueMaterial);

// find in collection
function findOne(collection, id, key = 'ref') {
    var result = collection.filter(el => el[key] == id);
    if (result && result.length > 0) {
        return result[0];
    }
    return null;
}

// globals

var defaultNote = {label : "", data : "", children : []};


// components
Vue.component('note', {
    template: `<div className="note">
        <div class="note__header"> 
            <md-input-container>
                <label>Nom de l'entité</label>
                <md-input v-model="data.label"></md-input>
            </md-input-container>
        </div>
        <div class="note__data">
            <md-input-container>
                <label>Numéros</label>
                <md-input v-model="data.data"></md-input>
            </md-input-container>
        </div>
        <div class="note__children" v-if="data.children && data.children.length > 0">
            <note :data="child" v-for="child in data.children"></note>
            <md-button class="md-raised md-primary" @click.native="addNewNote(data.children)">Nouveau</md-button>
        </div>
    </div>`,
    props: ['data'],
    data: function () {
        return {
            editing: 'hello'
        }
    },
    methods: {
        addNewNote : function(arr){
            arr.append(defaultNote);
        }
    }
})




const APP = new Vue({
    el: "#app",

    created: function () {
    },
    data: {
        meta: {
            page: 'statements'
        },
        split: null,
        splits: [
            {
                ref: 'P01',
                link: 'https://drive.google.com/drive/folders/0BxwWpeU40ocQOWIzWHU0eHRDNjA',
                linkId: '0BxwWpeU40ocQOWIzWHU0eHRDNjA',
                meta: {
                    owner: '',
                    date: null,
                    comments: '',
                    state: '',
                    startedAt: null,
                    doneAt: null,
                },
                notes: [
                    {
                        label : "Rue desailly", data : '21, 22, 23', children : [
                            {
                                label : "Impasse 1", data : '24'
                            },
                            {
                                label : "Impasse 2", data : '25'
                            }
                        ]
                    }
                ]
            },
            {
                ref: 'P02',
                linkId: '0BxwWpeU40ocQLWNZR2pwU2h0R2c',
                meta: {
                    owner: '',
                    date: null,
                    comments: ''
                },
                tracking: []
            }
        ]
    },
    methods: {
        title: function () {
            return this.meta.page == "statements" && "Relevé des territoires"
        },
        openMenu: function () {
            this.$refs.leftMenu.open();
        },
        triggerMenu: function () {
            this.$refs.leftMenu.trigger();
        },
        selectSplit: function (split) {
            console.log('split ?', split);
            this.split = split;
        },
        showDocuments: function () {
            if (this.split) {
                window.open(this.split.link);
            }
        },
        labelState: function (split) {
            if (split.meta.state == '') {
                return ''
            }
            if (split.meta.state == 'started') {
                return 'Commencé'
            }
            if (split.meta.state == 'done') {
                return 'Fini'
            }
        },
        embedDrive: function (id) {
            return 'https://drive.google.com/embeddedfolderview?id=' + id + '#list';
        },
        addNewNote : function(notesArray){
            notesArray.append(defaultNote);
        }
    }
})