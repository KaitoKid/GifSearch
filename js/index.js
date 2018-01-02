// init Isotope
const electron = require('electron')
const clipboard = electron.clipboard

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

// Adds filter and copies the link to clipboard
$grid.on('click', '.grid-item', function() {
  //$(this).addClass('overlayFilter');
  overlayOn()
  var s = String(this.innerHTML)
  var matches = s.match(/"([^"]*)"/)[1];
  clipboard.writeText(matches);
});

function overlayOn() {
  document.getElementById("overlay").style.display = "block";
}

function overlayOff() {
  document.getElementById("overlay").style.display = "none";
}
