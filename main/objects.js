(function ($) {

  $.fn.playMat = function(options) {
    var settings = $.extend({
      backgroundColor: "red",
      width: $(window).width(),
      height: $(window).height()
    }, options );

    var playMat = this;

    var playMatObjects = playMat.children();

    var player = playMat.children(".playMatObjectPlayer");

    player.css('transform', 'translate(' + (0.5*settings.width-(0.5*player.width())) + 'px,' + (0.5*settings.height-(0.5*player.height())) + 'px)');

    playMatObjects.css("position","relative");
    
    var lastangle = 0;

    playMat[0].ontouchstart = function(e) {

      var touche = e.touches[0];

      var divX = player.offset().left + parseInt(player.width() / 2, 10);
      var divY = player.offset().top + parseInt(player.height() / 2, 10);

      var touchX = touche.clientX;
      var touchY = touche.clientY;

      // calc angle

      var deltaY = touchY - divY;
      var deltaX = touchX - divX;
      
      var offset = Math.floor(lastangle / 360) * 360;
      var angleInDegrees = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + offset;

      var cwangle = angleInDegrees < lastangle ? angleInDegrees + 360 : angleInDegrees;
      var ccwangle = angleInDegrees > lastangle ? angleInDegrees - 360 : angleInDegrees;
      
      if (Math.abs(cwangle - lastangle) < Math.abs(ccwangle - lastangle)) {
          angleInDegrees = cwangle;
      } else {
          angleInDegrees = ccwangle;
      }
      
      lastangle = angleInDegrees;

      player.css('transform', 'translate(' + (touchX-(0.5*player.width())) + 'px,' + (touchY-(0.5*player.height())) + "px) " + ' rotate('+ angleInDegrees +'deg)');
    }    

    playMat[0].ontouchmove = function(e) {
      var touche= e.touches[0];
    }

    return playMat.css({
      backgroundColor: settings.backgroundColor,
      width: settings.width,
      height: settings.height
    });
  }
}( jQuery ));