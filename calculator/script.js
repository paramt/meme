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




function calculateBreakEvenPoint(){
  var upvotes = document.getElementById("upvotes2").value;

  var a = upvotes;
  var b = upvotes;
  var factor = calculate(a, b);

  while(factor<1){
    factor = calculate(a, b);
    a++;
  }

  var result = a - 1;

  document.getElementById('result2').value = result;
}
