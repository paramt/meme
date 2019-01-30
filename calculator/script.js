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

  var a = parseInt(upvotes);
  var b = parseInt(upvotes);
  var factor = calculate(a, b);


  if(b<250){
    // If number is small enough, make calculations accurate to 1 decimal place
    while(factor<1){
      factor = calculate(a, b);
      console.log("At " + a + " upvotes your investment return factor will be " + factor);
      a=a*10;
      a++;
      a=a/10;
    }

    var result = a;

    document.getElementById('result2').value = result;

  } else {
    // If number is bigger, round calculations to nearest whole number
    while(factor<1){
      factor = calculate(a, b);
      console.log("At " + a + " upvotes your investment return factor will be " + factor);
      a++;
    }

    var result = a;

    document.getElementById('result2').value = result;
  }

}
