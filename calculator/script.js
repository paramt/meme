function calculateInvestmentReturn(){
  var oldUpvotes = document.getElementById('upvotes').value;
  var newUpvotes = document.getElementById('future_upvotes').value;
  var investment = document.getElementById('investment').value;
  var factor = calculate(newUpvotes, oldUpvotes);
  var error = 0;

  if(displayInAmount()){
    if(oldUpvotes !== "" && newUpvotes !== "" && investment !== "" && investment > 0){
      var investmentReturn = Math.round(factor*investment - investment);
      var upperLimit = Math.round(sigmoid_max(oldUpvotes)*investment) - investment + " MemeCoins";
      var upperLimitAmount = calculatePoint(sigmoid_max(oldUpvotes), oldUpvotes);

      if(investmentReturn > 0){
        investmentReturn = "+" + investmentReturn;
      }

      investmentReturn = investmentReturn + " MemeCoins";
    } else if(oldUpvotes !== "" || newUpvotes !== "" || investment !== ""){
      error = 1;
    }

  } else {
    if(oldUpvotes !== "" && newUpvotes !== ""){
      var investmentReturn = (Math.round((factor-1)*100*100))/100;
      var upperLimit = (Math.round(sigmoid_max(oldUpvotes)*10000) - 10000)/100 + "%";
      var upperLimitAmount = calculatePoint(sigmoid_max(oldUpvotes), oldUpvotes);

      if(investmentReturn >= 0){
        investmentReturn = "+" + investmentReturn;
      }

      investmentReturn = investmentReturn + "%";
    } else {
      error = 1;
    }
  }

  if(error == 0){
    document.getElementById('result').innerHTML = "Return: " + investmentReturn;
    document.getElementById('max').innerHTML = "Upper Limit: +" + upperLimit + " at " + Math.ceil(upperLimitAmount) + " upvotes";
    document.getElementById('output').style.opacity = "1";

  } else if(error == 1){
    document.getElementById('result').innerHTML = "Incorrect input";
    document.getElementById('max').innerHTML = "Fill out each field first"
    document.getElementById('output').style.opacity = "1";
  } else if(error == 2){
    document.getElementById('result').innerHTML = "Incorrect input";
    document.getElementById('max').innerHTML = "Investment must be greater than 0";
    document.getElementById('output').style.opacity = "1";
  }

}

function calculateBreakEvenPoint(){
  var upvotes = document.getElementById('upvotes').value;
  var output = document.getElementById('result');

  if(upvotes < 0){
    upvotes = 0;
  }

  if(upvotes>0 && upvotes!==""){
    output.innerHTML = "Break even at " + Math.round(calculatePoint(1, upvotes)*100)/100 + " upvotes";
  } else if(upvotes===""){
    output.innerHTML = "Enter a number";
  } else {
    output.innerHTML = "Enter a number greater than 0";
  }


  document.getElementById('output').style.opacity = "1";
}

/** calculatePoint using goal seek method
function calculatePoint(point, upvotes){
  var a = parseInt(upvotes);
  var b = parseInt(upvotes);
  var factor = calculate(a, b);

  if(b<250){
    // If number is small enough, make calculations accurate to 1 decimal place
    while(Math.round(factor*10000)/10000<point){
      factor = calculate(a, b);
      console.log("At " + a + " upvotes your investment return factor will be " + factor);
      a=a*10;
      a++;
      a=a/10;
    }

    var result = a;
    return result;
  } else if(b<1000) {
    // If number is bigger, round calculations to nearest whole number
    while(Math.round(factor*10000)/10000<point){
      factor = calculate(a, b);
      console.log("At " + a + " upvotes your investment return factor will be " + factor);
      a++;
    }

    var result = a;
    return result;
  } else {
    // If number is very big, round calculations to the nearest 10
    while(Math.round(factor*10000)/10000<point){
      factor = calculate(a, b);
      console.log("At " + a + " upvotes your investment return factor will be " + factor);
      a+=10;
    }

    var result = a;
    return result;
  }

}
*/

function changeFormat(){
  if(document.getElementById("amount").checked){
    document.getElementById("amount-display").style.display = "block";
  } else {
    document.getElementById("amount-display").style.display = "none";
  }
}

function displayInAmount(){
  if(document.getElementById("amount").checked){
    return true;
  } else {
    return false;
  }
}

function calculatePoint(factor, oldNumber){
  var y = oldNumber;
  var z = factor;

  if(factor !== 1){
    if(factor > 1.2){
      var z = 0.7*factor;
    }

    if(factor > 1.5){
      var z = 0.8*factor;
    }

    if(factor > 1.7){
      var z = 0.95*factor;
    }
  }

  // solves x assuming z = 1 (break even point)
  // var x = -((Math.log((14/(y+10))+0.2)*(y+100))/4) + ((2549/2500)*y) + 10;

  var x = ((-125000*Math.log((-(5*y*z+50*z-6*y-90)^(1/3))/(5^(1/3)*(y+10)^(1/3)*z^(1/3)))) + y*(2549-1250*Math.log((-(5*y*z+50*z-6*y-90)^(1/3))/(5^(1/3)*(y+10)^(1/3)*z^(1/3))))+25000)/2500;

  while(isNaN(x) || !isFinite(x)){
    z = z-0.001;
    console.log(z);
    x = ((-125000*Math.log((-(5*y*z+50*z-6*y-90)^(1/3))/(5^(1/3)*(y+10)^(1/3)*z^(1/3)))) + y*(2549-1250*Math.log((-(5*y*z+50*z-6*y-90)^(1/3))/(5^(1/3)*(y+10)^(1/3)*z^(1/3))))+25000)/2500;
  }

  return x;
}
