// prevent status image from being dragged
document.getElementById('status').ondragstart = function() { return false; };

function calculateInvestmentReturn(){
  var oldUpvotes = document.getElementById('upvotes').value;
  var newUpvotes = document.getElementById('future_upvotes').value;
  var netWorth = document.getElementById('netWorth').value;
  var factor = calculate(newUpvotes, oldUpvotes, netWorth);
  var error = 0;

  if(oldUpvotes !== "" && newUpvotes !== "" && netWorth !== "" && netWorth > 0){
    var investmentReturn = (Math.round((factor-1)*100*100))/100;
    var upperLimit = (Math.round(sigmoid_max(oldUpvotes)*10000) - 10000)/100 + "%";
    var upperLimitAmount = calculatePoint(sigmoid_max(oldUpvotes), oldUpvotes, netWorth);


    if(investmentReturn > 0){
      investmentReturn = "+" + investmentReturn;
    }

    investmentReturn = investmentReturn + "%";
  } else if(oldUpvotes !== "" || newUpvotes !== "" || netWorth !== ""){
    error = 1;
  }

  if(error == 0){
    document.getElementById('result').innerHTML = "Return: " + investmentReturn;
    //document.getElementById('max').innerHTML = "Upper Limit: +" + upperLimit + " at " + Math.ceil(upperLimitAmount) + " upvotes";
    document.getElementById('max').innerHTML = ""
    document.getElementById('output').style.opacity = "1";

  } else if(error == 1){
    document.getElementById('result').innerHTML = "Incorrect input";
    document.getElementById('max').innerHTML = "Fill out each field first"
    document.getElementById('output').style.opacity = "1";
  } else {
    document.getElementById('result').innerHTML = "Incorrect input";
    document.getElementById('output').style.opacity = "1";
  }

}

function calculateBreakEvenPoint(){
  var upvotes = parseInt(document.getElementById('upvotes').value);
  var output = document.getElementById('result');

  if(upvotes>0 && upvotes!=="" && upvotes<200000){
      output.innerHTML = "Break even at " + Math.round(calculatePoint(1, upvotes, 100)*100)/100 + " upvotes";
  } else if(upvotes===""){
    output.innerHTML = "Enter a number";
  } else if(upvotes<1){
    output.innerHTML = "Enter a number greater than 0";
  } else if(upvotes>=200000){
    output.innerHTML = "Enter a number smaller than 200,000";
  }


  document.getElementById('output').style.opacity = "1";
}

function calculatePoint(factor, oldNumber, net_worth){
  var y = parseInt(oldNumber);
  var z = factor;
  var TOL;

  var x = y;
  var newFactor = calculate(x, y, net_worth);

  if(factor !== 1){
    z = 0.999*factor;

    if(y>50000){
      TOL = 50;
    } else if(y>2000){
      TOL = 10;
    } else {
      TOL = 1;
    }

    if(newFactor > z){
      while(newFactor > z){
        x = x - TOL;
        newFactor = calculate(x, y, net_worth);
      }
    } else {
      while(newFactor < z){
        x = x + TOL;
        newFactor = calculate(x, y, net_worth);
      }
    }
  } else {
    if(y>50000){
      TOL = 1;
    } else if(y>2000){
      TOL = 0.1;
    } else {
      TOL = 0.01;
    }

    while(newFactor < z){
      x = x + TOL;
      newFactor = calculate(x, y, net_worth);
    }
  }


  return x;
}
