new Vue({
    el:'#app',
    data:{
        currencies:{},
        amount:0,
        from:'USD',
        to:'INR',
        result: 0,
        loading:false
    },

    mounted(){
        this.getCurrencies();
    },
    
    computed:{
        formattedCurrencies(){
            return Object.values(this.currencies);
        },

        calculateResult(){
            return (Number(this.amount)*this.result).toFixed(3 );
        },

        disabled(){
            return this.amount===0 || !this.amount || this.loading ;
        }
    },

    methods: {
        getCurrencies() {

            const currencies=localStorage.getItem('currencies')

            if(currencies){
                this.currencies=JSON.parse(currencies);

                return;
            }

            axios.get('https://free.currencyconverterapi.com/api/v6/currencies')
            .then(response=>{
                this.currencies=response.data.results;
                localStorage.setItem('currencies',JSON.stringify(response.data.results))
            });
        },

        convertCurrency() {

            const key = `${this.from}_${this.to}`;
            this.loading=true;
            axios.get(`https://free.currencyconverterapi.com/api/v6/convert?q=${key}`)
            .then((response)=>{
                this.loading = false;
                this.result = response.data.results[key].val
            })
        }
    },

    watch: {
        from() {
            this.result=0;
        },

        to(){
            this.result=0;
        }
    }

})