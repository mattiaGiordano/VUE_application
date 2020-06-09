app = new Vue({
    el:'#appCrud',
    data:{
     allData:'',
     mostraModale:false,
     actionButton:'Inserisci',
     titoloModale:'Aggiungi Dati',
     nome:'',
     cognome:'',
     hiddenId:''
    },
    methods:{
     fetchAllData(){
      axios.post('action.php', { 
       action:'fetchall' 
      })
        .then((res) => {
            this.allData = res.data
        })
     },
     apriModale(){
        this.nome = ''
        this.cognome = ''
        this.actionButton = "Inserisci"
        this.titoloModale = "Aggiungi Dati"
        this.mostraModale = true
     },
     submitData(){
      if(this.nome != '' && this.cognome != '')
      {
       if(this.actionButton == 'Inserisci')
       {
        axios.post('action.php', {
         action:'insert',
         nome:this.nome, 
         cognome:this.cognome
        })
          .then((res) => {
            this.mostraModale = false
            this.fetchAllData()
            this.nome = ''
            this.cognome = ''
            alert(res.data.messaggio)
          })
       }
       if(this.actionButton == 'Aggiorna')
       {
        axios.post('action.php', {
         action:'update',
         nome : this.nome,
         cognome : this.cognome,
         hiddenId : this.hiddenId
        })
          .then((res) => {
            this.mostraModale = false
            this.fetchAllData()
            this.nome = ''
            this.cognome = ''
            this.hiddenId = ''
            alert(res.data.messaggio)
          })
       }
      }
      else
      {
       alert("Completa tutti i campi")
      }
     },
     fetchData(id){
      axios.post('action.php', {
       action:'fetchSingle',
       id:id
      })
        .then((res) => {
            this.nome = res.data.nome
            this.cognome = res.data.cognome
            this.hiddenId = res.data.id
            this.mostraModale = true
            this.actionButton = 'Aggiorna'
            this.titoloModale = 'Modifica Dati'
        })
     },
     deleteData(id){
      if(confirm("Sei sicuro di voler eliminare questi dati?"))
      {
       axios.post('action.php', {
        action:'delete',
        id:id
       })
         .then((res) => {
            this.fetchAllData()
            alert(res.data.messaggio)
         })
      }
     }
    },
    mounted: function(){
     this.fetchAllData()
    }
   })
   
   