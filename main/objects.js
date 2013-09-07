(function ($) {

  $.fn.playMat = function(options) {
    var settings = $.extend({
      backgroundColor: "red",
      width: $(window).width(),
      height: $(window).height()
    }, options );

    var playMat = this;

    var playMatObjects = playMat.children();

    var player = playMat.children("div[playMatObject='player'");

    playMatObjects.css("position","relative");

    var xInitial = parseInt(player.css("top"));
    var yInitial = parseInt(player.css("left"));

    var transformation = "translate(" + 200/*(xFinal-(0.5*player.width()))*/ + "px, " + 200/*(yFinal-(0.5*player.height()))*/ + "px)";

    $(".playMatObject").css('-webkit-transform', transformation);
    $(".playMatObject").css('-moz-transform', transformation);
    $(".playMatObject").css('-o-transform', transformation);
    $(".playMatObject").css('-ms-transform', transformation);
    $(".playMatObject").css('transform', transformation);
    
    var previousAngle = 0;

    playMat[0].ontouchstart = function(e) {

      var touche= e.touches[0];

      console.log(touche);

      var xFinal = touche.clientX;
      var yFinal = touche.clientY;

      var deltaY = yFinal - yInitial;
      var deltaX = xFinal - xInitial;

      var angleInDegrees = Math.atan2(deltaY, deltaX);

      angleInDegrees *= 180/Math.PI;

      angleInDegrees = angleInDegrees - previousAngle;

      console.log(angleInDegrees);

      var transformation = "translate(" + 200/*(xFinal-(0.5*player.width()))*/ + "px, " + 200/*(yFinal-(0.5*player.height()))*/ + "px) rotate(" + angleInDegrees + "deg)";

      $(".playMatObject").css('-webkit-transform', transformation);
      $(".playMatObject").css('-moz-transform', transformation);
      $(".playMatObject").css('-o-transform', transformation);
      $(".playMatObject").css('-ms-transform', transformation);
      $(".playMatObject").css('transform', transformation);
      
      //xInitial = xFinal;
      //yInitial = yFinal;
      xInitial = 200;
      yInitial = 200;

      previousAngle = angleInDegrees;
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