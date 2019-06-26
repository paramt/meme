window.onload = function(){
    var url = new URL(location.href);
    var upvotes = parseInt(url.searchParams.get("upvotes"));

    if(upvotes){
      document.getElementById("upvotes").value = upvotes;
      calculateBreakEvenPoint();
    }
}
