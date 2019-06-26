window.onload = function(){
    var url = new URL(location.href);
    var upvotes = parseInt(url.searchParams.get("old"));
    var futureUpvotes = parseInt(url.searchParams.get("new"));
    var netWorth = parseInt(url.searchParams.get("balance"));

    if(upvotes && futureUpvotes && netWorth){
      document.getElementById("upvotes").value = upvotes;
      document.getElementById("future_upvotes").value = futureUpvotes;
      document.getElementById("netWorth").value = netWorth;
      calculateInvestmentReturn();
    }
  }
