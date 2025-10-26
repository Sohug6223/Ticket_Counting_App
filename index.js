var app=Vue.createApp({
    data(){
        return{
            confirmed:false,
            name: "",
            mobile: "",
            appliedCoupon: null,
            couponCode: "",
            coupons: [
                {
                    code: "AS",
                    discount: 100
                },
                {
                    code: "SM",
                    discount: 50
                }
            ],
            seatStates:{
                sold:{
                    text:"Sold",
                    color:"#ff0000"
                },
                available:{
                    text:"Available",
                    color:"#fff"
                },
                booked:{
                    text:"Booked",
                    color:"gray"
                },
                selected:{
                    text:"Selected",
                    color:"#00ff00"
                }
            },
            seats:[
                {
                    name:"A1",
                    type: "available",
                    price:500
                },
                 {
                    name:"A2",
                    type: "available",
                    price:500
                },
                {
                    name:"A3",
                    type: "available",
                    price:500
                },
                {
                    name:"A4",
                    type: "available",
                    price:500
                },
                {
                    name:"B1",
                    type: "available",
                    price:450
                },
                 {
                    name:"B2",
                    type: "available",
                    price:450
                },
                 {
                    name:"B3",
                    type: "available",
                    price:450
                },
                 {
                    name:"B4",
                    type: "available",
                    price:450
                },
                {
                    name:"C1",
                    type: "sold",
                    price:500
                },
                 {
                    name:"C2",
                    type: "sold",
                    price:500
                },
                 {
                    name:"C3",
                    type: "sold",
                    price:500
                },
                 {
                    name:"C4",
                    type: "sold",
                    price:500
                },
                 {
                    name:"D1",
                    type: "available",
                    price:400
                },
                {
                    name:"D2",
                    type: "available",
                    price:400
                },
                {
                    name:"D3",
                    type: "available",
                    price:400
                },
                {
                    name:"D4",
                    type: "available",
                    price:400
                },
                {
                    name:"E1",
                    type: "available",
                    price:300
                },
                {
                    name:"E2",
                    type: "available",
                    price:300
                },
                {
                    name:"E3",
                    type: "available",
                    price:300
                },
                {
                    name:"E4",
                    type: "available",
                    price:300
                },
                {
                    name:"F1",
                    type: "available",
                    price:300
                },
                 {
                    name:"F2",
                    type: "available",
                    price:300
                },
                 {
                    name:"F3",
                    type: "available",
                    price:300
                },
                 {
                    name:"F4",
                    type: "available",
                    price:300
                },

            ]
        };
    },
    computed:{
        selectedSeats(){
            let sc = this.seats.filter((item) => item.type ==="selected");
            return sc;
        },
        totalCost(){
            let tc=0;
            this.selectedSeats.forEach((seat)=>{
                tc += seat.price;
            });

            if(this.appliedCoupon){
                tc= tc - this.appliedCoupon.discount;
            }
            if (tc < 0) tc = 0;
            return tc;
        }
    },
    methods:{
        handleClick(i){
            let clickedSeat=this.seats[i];
             if(clickedSeat.type==='sold'||clickedSeat.type==='booked'){
                alert("You can't select this seat!");
                return;
            }

             if(clickedSeat.type=="available" && this.selectedSeats.length>=3){
                alert("You can't select more than 3 seats!");
                return;
            }
            clickedSeat.type = clickedSeat.type === "selected" ? "available" : "selected";
            console.log(clickedSeat);

        },
        applyCoupon() {
    
    if (this.couponCode.trim().toUpperCase() === "AS") {
        this.appliedCoupon = { code: "AS", discount: 100 };
        this.couponCode = "";
        alert("Coupon applied! Tk. 100 off");
    } 
    else {
        alert("Invalid coupon code!");
    }
},

removeCoupon() {
    this.appliedCoupon = null;
    alert("Coupon removed!");
},


        confirm(){
            if(!this.name || !this.mobile){
                alert("Please enter name and mobile");
                return;
            }
            this.confirmed = true;
        },

        resetData(){
            this.confirmed=false;
            this.name="";
            this.mobile="";
            this.appliedCoupon=null;
            this.couponCode = "";

            this.seats.forEach((seat) =>{
                if(seat.type === "selected") {
                    seat.type="sold";
                }
            });
        }
    },
    watch:{
        couponCode(newValue){
            if(newValue.length === 2){
                let searchedCoupons = this.coupons.filter(
                    (item)=>item.code===newValue
                );

                if(searchedCoupons.length===1){
                    this.appliedCoupon= searchedCoupons[0];
                    this.couponCode="";
                }
                else{
                    alert("Coupon not valid!");
                }
            }
        }
    }
});

app.mount("#app")