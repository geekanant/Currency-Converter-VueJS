new Vue({
    el:'#app',
    data:{
        currencies:{},
        amount:null,
        from:'USD',
        to:'INR',
        result: 0
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

            axios.get(`https://free.currencyconverterapi.com/api/v6/convert?q=${key}`)
            .then((response)=>{
                console.log(response)
                this.result = response.data.results[key].val
            })
        }
    }
})