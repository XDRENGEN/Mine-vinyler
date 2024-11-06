const app = Vue.createApp({
    data() {
        return {
            intro: 'Velkommen til min vinylsamling.',
            liste: JSON.parse(localStorage.getItem('vinylliste')) || [],

            newVinyl: {
                id: null,
                artist: '',
                album: '',
                year: '',
                genre: '',
                label: '',
            },
        };
    },


    computed: {
        myComputed(){
            return''
        }
    },


    methods: {
        addMethod(){
            if (
                this.newVinyl.id &&
                this.newVinyl.artist &&
                this.newVinyl.album &&
                this.newVinyl.year &&
                this.newVinyl.genre &&
                this.newVinyl.label
            ) {
                this.liste.push({ ...this.newVinyl });

                localStorage.setItem('vinylliste', JSON.stringify(this.liste));

 

                this.newVinyl = {
                    id: null,
                    artist: '',
                    album: '',
                    year: '',
                    genre: '',
                    label: '',
                };

            } else {
                alert('Udfyld venligst alle felter');
            }
        },
    },


}).mount('#app');