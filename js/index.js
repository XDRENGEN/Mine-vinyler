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

            editVinyl: null,
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
                this.newVinyl.id = Date.now();

                this.liste.push({ ...this.newVinyl });

                // Gemmer i local storage.
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


        // Metode til at vælge en vinyl til redigering.
        selectVinylForEdit(vinyl) {
            this.editVinyl = { ...vinyl };
        },


        // Metode til at gemme redigerede oplysninger.
        saveEditedVinyl() {
            const index = this.liste.findIndex(v => v.id === this.editVinyl.id);
            if (index !== -1) {
                this.liste.splice(index, 1, { ...this.editVinyl });
                localStorage.setItem('vinylliste', JSON.stringify(this.liste));
                this.editVinyl = null;
            }
        },



        // Metode til at slette en vinyl.
        deleteVinyl(id) {
            const vinyl = this.liste.find(v => v.id === id);

            if (vinyl) {
                const confirmation = confirm(`Er du sikker på, at du vil slette ${vinyl.album} af ${vinyl.artist}?`);
                
                if (confirmation) {
                    this.liste = this.liste.filter(v => v.id !== id);

                    // Gemmer i local storage.
                    localStorage.setItem('vinylliste', JSON.stringify(this.liste));
                }
            }
        }
    }
}).mount('#app');