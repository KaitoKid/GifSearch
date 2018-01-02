function gifSearch() {
  $(".grid-item").remove();
  var query = (document.getElementById("search-me").value + ' gif');
  //$grid.isotope('destroy');
  if (query === ' gif') {
    console.log("Empty search, try again")
    // do nothing, not a real search
  } else {
    searchNow(query, 1);
  }
  // Refresh the layout on search cus images dont know when they're done
  (function loopingFunction() {
    $grid.isotope('layout');
    setTimeout(loopingFunction, 1000);
  })();

  // Next step would be to create all the images first from their property
  // and then calculate the layout
  // images can then take their time to load
}

function searchNow(searchQuery, startIndex) {
  document.getElementById("loader").style.display = "block";
  $.get("https://www.googleapis.com/customsearch/v1", {
    key: 'AIzaSyDGQ1RlDQjeTJ_Wwkb9GD9lP9k8vO38Gig',
    cx: '002856694791594034693:0kmg0kkpg1m',
    searchType: 'image',
    count: 25,
    q: searchQuery,
    start: startIndex
  }, function(data) {
    var $items = getItemElement(data.items[0]['link']);
    for (i = 1; i < data.items.length; i++) {
      $items = $items.add(getItemElement(data.items[i]['link']));
    }
    // Should there be a loading indicator for the gifs?
    $items.imagesLoaded(function() {
      document.getElementById("loader").style.display = "none";
      $grid.append($items).isotope('appended', $items);
    })
  });
}

function getItemElement(gifURL) {
  var $item = $('<div class="grid-item" id="copyable" onClick="copyToast()"> <img src="' + gifURL + '" /></div>');
  return $item;
}


function addElements($items, index, data) {
  $items.add(getItemElement(data.items[index]['link']))
}
