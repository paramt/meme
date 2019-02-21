function calculate(newNumber, oldNumber, net_worth){
  // Treat anything below 0 upvotes as 0 upvotes
  if(oldNumber < 0){
    oldNumber = 0;
  }

  if(newNumber < 0){
    newNumber = 0;
  }

  // Compute gain
  var delta = newNumber - oldNumber;

  // Treat negative gain as no gain
  if(delta < 0){
    delta = 0
  }

  // Compute the maximum of the sigmoid
  var sig_max = sigmoid_max(oldNumber);

  // Compute the midpoint of the sigmoid
  var sig_mp = sigmoid_midpoint(oldNumber);

  // Compute the steepness of the sigmoid
  var sig_stp = sigmoid_steepness(oldNumber);

  // Calculate return
  var factor = sigmoid(delta, sig_max, sig_mp, sig_stp);

  factor = factor - 1;
  factor = factor * net_worth_coefficient(net_worth);
  return factor + 1
}

function sigmoid(x, maxvalue, midpoint, steepness){
  var arg = -(steepness * (x - midpoint));
  var y = maxvalue / ( 1 + Math.exp(arg) );
  return y;
}

function sigmoid_max(oldNumber){
  return 1.2 + 0.6 / ((oldNumber / 10) + 1);
}

function sigmoid_midpoint(oldNumber){
  var sig_mp_0 = 10;
  var sig_mp_1 = 500;
  return linear_interpolate(oldNumber, 0, 25000, sig_mp_0, sig_mp_1);
}

function sigmoid_steepness(oldNumber){
  return 0.06 / ((oldNumber / 100) + 1);
}

function linear_interpolate(x, x_0, x_1, y_0, y_1){
  var m = (y_1 - y_0) / x_1 - x_0;
  var c = y_0;
  var y = (m * x) + c;
  return y;
}

function net_worth_coefficient(net_worth){
  return Math.pow(net_worth, -0.155) * 6
}
