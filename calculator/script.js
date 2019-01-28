function predictOutcome(){
  var oldUpvotes = document.getElementById('upvotes').value;
  var newUpvotes = document.getElementById('future_upvotes').value;
  var investment = document.getElementById('investment').value;
  var factor = calculate(newUpvotes, oldUpvotes);

  var investmentReturn = factor*investment;

  if(investmentReturn<investment){
    var result = "You would lose " + Math.round(investment - investmentReturn) + " MemeCoins";
  }

  if(investmentReturn>investment){
    var result = "You would gain " + Math.round(investmentReturn - investment) + " MemeCoins";
  }

  document.getElementById('result').value = result;
  console.log(investmentReturn);
}


/**

function calculateBreakEvenPoint(){
  var upvotes = parseInt(document.getElementById('upvotes2').value);
  var profit = calculate(upvotes, upvotes);

  while(profit<-10 || profit>10){
    var newUpvotes = (Math.random() * upvotes);
    console.log(newUpvotes);
    profit = calculate(newUpvotes, upvotes)*1000
  }

  var result = newUpvotes;

  document.getElementById('result2').value = result;
}

*/
