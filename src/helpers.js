export function NoOfOrdersByPayment(data) {
    var CreditCard = 0, Cash = 0, KNET = 0;
    data.map(function (order) {
        if (order.paymentMethod == 'CreditCard') {
            CreditCard++;
        }
        if (order.paymentMethod == 'Cash') {
            Cash++;
        }
        if (order.paymentMethod == 'KNET') {
            KNET++;
        }
    })
    return [CreditCard, Cash, KNET];
}3

// Morning 6am-12pm, Afternoon 12-5pm, Evening 5-8pm, Night 8pm-6am
export function NoOfOrdersByTime(data) {
    let morning = 0, afternoon = 0, evening = 0, night = 0;
    data.map(function (time) {
        time = new Date(time.orderdate)
        let hours = time.getHours()
        //console.log(hours);
        if (hours >= 6 && hours < 12) {
            morning++;
        }
        if (hours >= 12 && hours < 17) {
            afternoon++;
        }
        if (hours >= 17 && hours < 20) {
            evening++;
        }
        if ((hours >= 20 && hours < 23) || hours == 0) {
            night++;
        }
    })
    return [morning, afternoon, evening, night]
}


export function NoOfOrdersBySize(data) {
    let less10 = 0, from10to20 = 0, from20to40 = 0, from40to70 = 0, more70 = 0;
    data.map(function (size) {
        let amount = size.orderAmount.split('$')[1];
        //console.log(amount);
        if (amount > 0 && amount < 10) {
            less10++;
        }
        if (amount >= 10 && amount < 20) {
            from10to20++;
        }
        if (amount >= 20 && amount < 40) {
            from20to40++;
        }
        if (amount >= 40 && amount < 70) {
            from40to70++;
        }
        if (amount > 70) {
            more70++;
        }
    })
    return [less10, from10to20, from20to40, from40to70, more70]
}


export function RevenueByPayment(data) {
    let CreditCard = 0, Cash = 0, KNET = 0;
    data.map(function (order) {
      let amount = order.orderAmount.split('$')[1];
      amount = Number(amount)
      if (order.paymentMethod == 'CreditCard') {
        CreditCard += amount;
      }
      if (order.paymentMethod == 'Cash') {
        Cash += amount;;
      }
      if (order.paymentMethod == 'KNET') {
        KNET += amount;;
      }
    })
    return [CreditCard.toFixed(2), Cash.toFixed(2), KNET.toFixed(2)]; 
  }
  
  //RevenueByPayment(orders);
  
  export function RevenueByTime(data) {
    let morning = 0, afternoon = 0, evening = 0, night = 0 , total = 0 ;
      data.map(function (order) {
      let amount = order.orderAmount.split('$')[1];
      amount = Number(amount)
      let time = new Date(order.orderdate)
      let hours = time.getHours()
      //console.log(hours);
      total = amount + total;
      if( hours >=6  && hours < 12){
        morning += amount;
      }
      if(hours >= 12 && hours < 17 ){
        afternoon += amount;
      }
      if(hours >= 17 && hours < 20 ){
        evening += amount;
      }
      if((hours >= 20 && hours < 23) || hours == 0){
        night += amount;
      }
    })
    return [morning,afternoon,evening,night, total]
  }
  
  //RevenueByTime(orders)
  
  
  export function RevenueBySize(data) {
    let less10 = 0, from10to20 = 0, from20to40 = 0, from40to70 = 0, more70 =0 ;
      data.map(function (size) {
      let amount = size.orderAmount.split('$')[1];
      amount = Number(amount)
  
      //console.log(amount);
      if( amount > 0  && amount < 10){
        less10 += amount;
      }
      if(amount >= 10  && amount < 20 ){
        from10to20 += amount;
      }
      if(amount >= 20 && amount < 40 ){
        from20to40 += amount;
      }
      if(amount >= 40 && amount < 70){
        from40to70 += amount;
      }
      if(amount > 70){
        more70 += amount;
      }
    })
    return [less10, from10to20, from20to40,from40to70, more70]
  }


  export function RevenueByBranch(data){
    let branchA = 0 , branchB = 0, branchC = 0,
    branchD = 0, branchE = 0;  
    data.map(function(data){
    let branchName = data.branch.split(' ')[1];
    let amount = data.orderAmount.split('$')[1];
    amount = Number(amount);
      if(branchName == 'A'){
        branchA += amount;
      }
      if(branchName == 'B'){
        branchB += amount;
      }
      if(branchName == 'C'){
        branchC += amount;
      }
      if(branchName == 'D'){
        branchD += amount;
      }
      if(branchName == 'E'){
        branchE += amount;
      }
    })
    return [branchA, branchB, branchC, branchD, branchE]
  }





