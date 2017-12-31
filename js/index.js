// ALL THE PHOTO MANIPULATION STUFF HERE
// init Isotope

var $grid = $('.grid').imagesLoaded(function() {
  // init Isotope after all images have loaded
  $grid.isotope({
    itemSelector: '.grid-item',
    percentPosition: true,
    masonry: {
      columnWidth: '.grid-sizer'
    }
  });
});

$grid.on('click', '.grid-item', function() {
  // change size of item by toggling gigante class
  $(this).addClass('overlayFilter');
  //$grid.isotope('layout');
});

function gifSearch() {
  $(".grid-item").remove();
  var x = (document.getElementById("search-me").value + ' gif');
  //$grid.isotope('destroy');
  $.get("https://www.googleapis.com/customsearch/v1", {
    key: 'AIzaSyDGQ1RlDQjeTJ_Wwkb9GD9lP9k8vO38Gig',
    cx: '002856694791594034693:0kmg0kkpg1m',
    searchType: 'image',
    q: x
  }, function(data) {
    var $items = getItemElement(data.items[0]['link']);
    for (i = 1; i < data.items.length; i++) {
      $items = $items.add(getItemElement(data.items[i]['link']));
    }
    $grid.append($items).isotope('appended', $items);
  });

  // Refresh the layout on search cus images dont know when they're done
  (function loopingFunction() {
    $grid.isotope('layout');
    setTimeout(loopingFunction, 1000);
  })();

  // Next step would be to create all the images first from their property
  // and then calculate the layout
  // images can then take their time to load
}


function getItemElement(gifURL) {
  var $item = $('<div class="grid-item id="lastImage""><img src="' + gifURL + '" /></div>');
  return $item;
}


function addElements($items, index, data) {
  $items.add(getItemElement(data.items[index]['link']))
}
