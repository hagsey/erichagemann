$(function() {

  var $all_menus = $(".menu-header"),
      $all_articles = $("nav article");

  var adjustMenuHeight = function(command) {
    if (command === "shrink") {
      $all_menus.css({
        "height": "8%",
        "background-color": "rgba(0, 0, 0, 0.9)"
       });
    } else if (command === "expand") {
      $all_menus.css({
        "height": "25%",
        "background-color": "rgba(0, 0, 0, 0.5)"
      });
    }
  };

  var resetMenuFormatting = function() {
    adjustMenuHeight("expand");
    $all_articles.slideUp();
    $(".menu-header > i").removeClass("fa-minus-square").addClass("fa-plus-square");
    resetMenu();
  };

  var resetMenuListeners = function() {
    var $active_menu = $(this),
        $active_article = $active_menu.next("article"),
        $inactive_menus = $active_menu.siblings(".menu-header"),
        $inactive_articles = $active_article.siblings("article"),
        $active_icon = $active_menu.find("i"),
        $inactive_icons = $inactive_menus.find("i");

        $active_icon.removeClass("fa-plus-square").addClass("fa-minus-square");
        $inactive_icons.removeClass("fa-minus-square").addClass("fa-plus-square");

    // If the active menu is re-clicked, reset to original formatting
    $active_menu.off().on("click", resetMenuFormatting);

    // If any of the other menus are clicked, show is, and reset the listeners with new context
    $inactive_menus.off().on("click", function() {
      var $target_article = $("article[data-menu='" + $(this).data("menu") + "']");

      $all_articles.slideUp();
      $target_article.slideDown();
      resetMenuListeners.call(this);
    });
  };

  var resetMenu = function() {
    $(".menu-header").off().on("click", function() {

      // Remove all listeners from menu
      $(".menu-header").off();

      var $this = $(this),
          target_id = $this.data("menu"),
          $sibling_menus = $this.siblings(".menu-header"),
          $target_article = $("article[data-menu='" + target_id + "']"),
          $sibling_articles = $target_article.siblings("article");

      // Show the target article
      $sibling_articles.slideUp();
      $target_article.slideDown();
      adjustMenuHeight("shrink");

      // Attach listeners to menu items and define the active menu as the context
      resetMenuListeners.call(this);

      $(".left").off().on("click", resetMenuFormatting);
    });

  };

  resetMenu();
});


//     var id = $(this).data("nav"),
//         $article = $(this).next("article[data-nav='" + id + "']"),
//         $all_articles = $("nav").find("article"),
//         $others = $all_articles.not($article),
//         $all_navs = $("nav").find("li"),
//         fade_time = 400;

//     $all_navs.css({ 'height': '8%'});
//     $others.slideUp();


//     $article.slideDown();

//     $(".close, .left").off().on("click", function() {
//       $all_articles.slideUp(1200);
//       $all_navs.css({
//         'height': '25%',
//       });
//     });
//   });
// Create a function that listens for a click on the nav
// within that funciton, create another funciton that li
