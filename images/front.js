var FRONT = (FRONT = FRONT ? FRONT : {});

FRONT.mainSlide = (function () {
  var bannerAct = function () {
    /* [수정 20180315 OSH] 하나 이상의 메인슬라이드 사용 대응 */
    /* 메인 슬라이드 */
    //$('.main_slide .inner_main_slide').slick({
    //  dots: true,
    //  infinite: true,
    //  speed: 500,
    //  fade: true,
    //  prevArrow: $('.main_slide .box_arrow .btn_prev'),
    //  nextArrow: $('.main_slide .box_arrow .btn_next'),
    //  cssEase: 'linear',
    //  responsive: [
    //    {
    //      breakpoint: 768,
    //      settings: {
    //        fade: false
    //      }
    //    }
    //  ]
    //
    //});
    $(".main_slide .inner_main_slide").each(function (i) {
      var id = "mainSlide" + i;
      $(this).closest(".main_slide").attr("id", id);

      $(this).slick({
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        prevArrow: $("#" + id + " .box_arrow .btn_prev"),
        nextArrow: $("#" + id + " .box_arrow .btn_next"),
        cssEase: "linear",
        responsive: [
          {
            breakpoint: 768,
            settings: {
              fade: false,
            },
          },
        ],
      });
    });

    if (location.pathname.indexOf("/entry/") === 0) {
      $(".section_paging").addClass("view_paging");
    }

    /* 슬라이드 */
    var categoryScroll; /* iscroll 카테고리 */
    var categoryScrolls = []; /* iscroll 이벤트 array*/

    /* [수정 20180315 OSH] 하나 이상의 event scroll 사용 대응 */
    var eventScroll; /* iscroll 이벤트 */
    var eventScrolls = []; /* iscroll 이벤트 array*/

    var scrollFlag = false; /* iscroll 세팅 유무 */
    var slideFlag = false; /* slider 세팅 유무 */
    var flag = true; /* 화면 가로크기가 1024 이상 유무 */
    var flag2 = true; /* 화면 가로크기가 1024 이하 유무 */
    $(window).resize(function () {
      mediaQueryCheck();
    });

    mediaQueryCheck();

    function mediaQueryCheck() {
      /* 미디어 쿼리 내용으로 스크립트 동작 */
      if (matchMedia("screen and (min-width: 1024px)").matches) {
        /* 1024px 이상에서 사용할 JavaScript */
        if (flag) {
          console.log("1148 이상");

          if (scrollFlag) {
            /* 카테고리, 둘러보기 iscroll 해제 */
            /* [수정 20180319 OSH] 하나 이상의 category scroll 사용 대응 */
            //categoryScroll.destroy();
            //categoryScroll = null;
            for (i in categoryScrolls) {
              if (categoryScrolls[i] instanceof IScroll) {
                categoryScrolls[i].destroy();
                categoryScrolls[i] = null;
              }
            }
            categoryScrolls = [];

            /* [수정 20180315 OSH] 하나 이상의 event scroll 사용 대응 */
            //eventScroll.destroy();
            //eventScroll = null;
            for (i in eventScrolls) {
              if (eventScrolls[i] instanceof IScroll) {
                eventScrolls[i].destroy();
                eventScrolls[i] = null;
              }
            }
            eventScrolls = [];

            /* [수정 20180319 OSH] 하나 이상의 category scroll 사용 대응 */
            //$('.category_area .scroller').removeAttr('style');
            $(".wrap_category_scroller").each(function () {
              $(this).find(".scroller").removeAttr("style");
            });

            /* [수정 20180315 OSH] 하나 이상의 event scroll 사용 대응 */
            //$('.event_area .scroller').removeAttr('style');
            $(".wrap_event_scroller").each(function () {
              $(this).find(".scroller").removeAttr("style");
            });

            scrollFlag = false;
          }

          /* [수정 20180319 OSH] 하나 이상의 category scroll 사용 대응 */
          /* 카테고리 slick */
          //$('.category_area .scroller').slick({
          //  slidesToShow: 5,
          //  slidesToScroll: 1,
          //  speed: 500,
          //  dots: false,
          //  infinite: false,
          //  prevArrow: $('.category_area .box_arrow .btn_prev'),
          //  nextArrow: $('.category_area .box_arrow .btn_next'),
          //  cssEase: 'linear'
          //});
          $(".wrap_category_scroller").each(function (i) {
            var id = "categoryScroll" + i,
              slideCount = 4,
              $scroller = $(this).find(".scroller"),
              itemCount = $scroller.find(".item_scroller").length;

            $(this).attr("id", id);
            $(this)
              .find(".scroller")
              .slick({
                slidesToShow: slideCount,
                slidesToScroll: slideCount,
                speed: 500,
                dots: false,
                infinite: false,
                prevArrow:
                  slideCount < itemCount
                    ? $("#" + id + " .box_arrow .btn_prev")
                    : false,
                nextArrow:
                  slideCount < itemCount
                    ? $("#" + id + " .box_arrow .btn_next")
                    : false,
                cssEase: "linear",
              });
            if (slideCount >= itemCount) {
              $("#" + id + " .box_arrow").hide();
            }
          });

          /* [수정 20180315 OSH] 하나 이상의 event scroll 사용 대응 */
          /* 이벤트 slick */
          //$('.event_area .scroller').slick({
          //  slidesToShow: 4,
          //  slidesToScroll: 1,
          //  speed: 500,
          //  dots: false,
          //  infinite: false,
          //  prevArrow: $('.event_area .box_arrow .btn_prev'),
          //  nextArrow: $('.event_area .box_arrow .btn_next'),
          //  cssEase: 'linear'
          //});
          $(".wrap_event_scroller").each(function (i) {
            var id = "eventScroll" + i,
              slideCount = 4,
              $scroller = $(this).find(".scroller"),
              itemCount = $scroller.find(".item_scroller").length;

            $(this).attr("id", id);
            $(this)
              .find(".scroller")
              .slick({
                slidesToShow: slideCount,
                slidesToScroll: slideCount,
                speed: 500,
                dots: false,
                infinite: false,
                prevArrow:
                  slideCount < itemCount
                    ? $("#" + id + " .box_arrow .btn_prev")
                    : false,
                nextArrow:
                  slideCount < itemCount
                    ? $("#" + id + " .box_arrow .btn_next")
                    : false,
                cssEase: "linear",
              });
            if (slideCount >= itemCount) {
              $("#" + id + " .box_arrow").hide();
            }
          });

          flag = false;
          flag2 = true;

          scrollFlag = false;
          var FRONT = (FRONT = FRONT ? FRONT : {});

          FRONT.mainSlide = (function () {
            var bannerAct = function () {
              /* [수정 20180315 OSH] 하나 이상의 메인슬라이드 사용 대응 */
              /* 메인 슬라이드 */
              //$('.main_slide .inner_main_slide').slick({
              //  dots: true,
              //  infinite: true,
              //  speed: 500,
              //  fade: true,
              //  prevArrow: $('.main_slide .box_arrow .btn_prev'),
              //  nextArrow: $('.main_slide .box_arrow .btn_next'),
              //  cssEase: 'linear',
              //  responsive: [
              //    {
              //      breakpoint: 768,
              //      settings: {
              //        fade: false
              //      }
              //    }
              //  ]
              //
              //});
              $(".main_slide .inner_main_slide").each(function (i) {
                var id = "mainSlide" + i;
                $(this).closest(".main_slide").attr("id", id);

                $(this).slick({
                  dots: true,
                  infinite: true,
                  speed: 500,
                  fade: true,
                  prevArrow: $("#" + id + " .box_arrow .btn_prev"),
                  nextArrow: $("#" + id + " .box_arrow .btn_next"),
                  cssEase: "linear",
                  responsive: [
                    {
                      breakpoint: 768,
                      settings: {
                        fade: false,
                      },
                    },
                  ],
                });
              });

              /* 슬라이드 */
              var categoryScroll; /* iscroll 카테고리 */
              var categoryScrolls = []; /* iscroll 이벤트 array*/

              /* [수정 20180315 OSH] 하나 이상의 event scroll 사용 대응 */
              var eventScroll; /* iscroll 이벤트 */
              var eventScrolls = []; /* iscroll 이벤트 array*/

              var scrollFlag = false; /* iscroll 세팅 유무 */
              var slideFlag = false; /* slider 세팅 유무 */
              var flag = true; /* 화면 가로크기가 1024 이상 유무 */
              var flag2 = true; /* 화면 가로크기가 1024 이하 유무 */
              $(window).resize(function () {
                mediaQueryCheck();
              });

              mediaQueryCheck();

              function mediaQueryCheck() {
                /* 미디어 쿼리 내용으로 스크립트 동작 */
                if (matchMedia("screen and (min-width: 1024px)").matches) {
                  /* 1024px 이상에서 사용할 JavaScript */
                  if (flag) {
                    console.log("1148 이상");

                    if (scrollFlag) {
                      /* 카테고리, 둘러보기 iscroll 해제 */
                      /* [수정 20180319 OSH] 하나 이상의 category scroll 사용 대응 */
                      //categoryScroll.destroy();
                      //categoryScroll = null;
                      for (i in categoryScrolls) {
                        if (categoryScrolls[i] instanceof IScroll) {
                          categoryScrolls[i].destroy();
                          categoryScrolls[i] = null;
                        }
                      }
                      categoryScrolls = [];

                      /* [수정 20180315 OSH] 하나 이상의 event scroll 사용 대응 */
                      //eventScroll.destroy();
                      //eventScroll = null;
                      for (i in eventScrolls) {
                        if (eventScrolls[i] instanceof IScroll) {
                          eventScrolls[i].destroy();
                          eventScrolls[i] = null;
                        }
                      }
                      eventScrolls = [];

                      /* [수정 20180319 OSH] 하나 이상의 category scroll 사용 대응 */
                      //$('.category_area .scroller').removeAttr('style');
                      $(".wrap_category_scroller").each(function () {
                        $(this).find(".scroller").removeAttr("style");
                      });

                      /* [수정 20180315 OSH] 하나 이상의 event scroll 사용 대응 */
                      //$('.event_area .scroller').removeAttr('style');
                      $(".wrap_event_scroller").each(function () {
                        $(this).find(".scroller").removeAttr("style");
                      });

                      scrollFlag = false;
                    }

                    /* [수정 20180319 OSH] 하나 이상의 category scroll 사용 대응 */
                    /* 카테고리 slick */
                    //$('.category_area .scroller').slick({
                    //  slidesToShow: 5,
                    //  slidesToScroll: 1,
                    //  speed: 500,
                    //  dots: false,
                    //  infinite: false,
                    //  prevArrow: $('.category_area .box_arrow .btn_prev'),
                    //  nextArrow: $('.category_area .box_arrow .btn_next'),
                    //  cssEase: 'linear'
                    //});
                    $(".wrap_category_scroller").each(function (i) {
                      var id = "categoryScroll" + i,
                        slideCount = 5,
                        $scroller = $(this).find(".scroller"),
                        itemCount = $scroller.find(".item_scroller").length;

                      $(this).attr("id", id);
                      $(this)
                        .find(".scroller")
                        .slick({
                          slidesToShow: slideCount,
                          slidesToScroll: slideCount,
                          speed: 500,
                          dots: false,
                          infinite: false,
                          prevArrow:
                            slideCount < itemCount
                              ? $("#" + id + " .box_arrow .btn_prev")
                              : false,
                          nextArrow:
                            slideCount < itemCount
                              ? $("#" + id + " .box_arrow .btn_next")
                              : false,
                          cssEase: "linear",
                        });
                      if (slideCount >= itemCount) {
                        $("#" + id + " .box_arrow").hide();
                      }
                    });

                    /* [수정 20180315 OSH] 하나 이상의 event scroll 사용 대응 */
                    /* 이벤트 slick */
                    //$('.event_area .scroller').slick({
                    //  slidesToShow: 4,
                    //  slidesToScroll: 1,
                    //  speed: 500,
                    //  dots: false,
                    //  infinite: false,
                    //  prevArrow: $('.event_area .box_arrow .btn_prev'),
                    //  nextArrow: $('.event_area .box_arrow .btn_next'),
                    //  cssEase: 'linear'
                    //});
                    $(".wrap_event_scroller").each(function (i) {
                      var id = "eventScroll" + i,
                        slideCount = 4,
                        $scroller = $(this).find(".scroller"),
                        itemCount = $scroller.find(".item_scroller").length;

                      $(this).attr("id", id);
                      $(this)
                        .find(".scroller")
                        .slick({
                          slidesToShow: slideCount,
                          slidesToScroll: slideCount,
                          speed: 500,
                          dots: false,
                          infinite: false,
                          prevArrow:
                            slideCount < itemCount
                              ? $("#" + id + " .box_arrow .btn_prev")
                              : false,
                          nextArrow:
                            slideCount < itemCount
                              ? $("#" + id + " .box_arrow .btn_next")
                              : false,
                          cssEase: "linear",
                        });
                      if (slideCount >= itemCount) {
                        $("#" + id + " .box_arrow").hide();
                      }
                    });

                    flag = false;
                    flag2 = true;

                    scrollFlag = false;
                    slideFlag = true;
                  }
                } else {
                  /* 1024px 미만에서 사용할 JavaScript */
                  if (flag2) {
                    console.log("1148 이하");

                    /* [수정 20180319 OSH] 하나 이상의 category scroll 사용 대응 */
                    /* 카테고리 iscroll, 이벤트 iscroll */
                    //categoryScroll = new IScroll('#categoryScroll', { eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false });
                    $(".wrap_category_scroller").each(function (i) {
                      var id = "categoryScroll" + i;
                      $(this).attr("id", id);
                      eventScrolls.push(
                        new IScroll("#" + id, {
                          eventPassthrough: true,
                          scrollX: true,
                          scrollY: false,
                          preventDefault: false,
                        }),
                      );
                    });

                    //console.log(99);
                    ///* [수정 20180315 OSH] 하나 이상의 event scroll 사용 대응 */
                    //eventScroll = new IScroll('#eventScroll', { eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false });
                    $(".wrap_event_scroller").each(function (i) {
                      var id = "eventScroll" + i;
                      $(this).attr("id", id);
                      eventScrolls.push(
                        new IScroll("#" + id, {
                          eventPassthrough: true,
                          scrollX: true,
                          scrollY: false,
                          preventDefault: false,
                        }),
                      );
                    });

                    if (slideFlag) {
                      /* 카테고리 둘러보기 slick 해제 */
                      $(".scroller").slick("unslick");
                    }

                    flag = true;
                    flag2 = false;

                    scrollFlag = true;
                    slideFlag = false;
                  }
                }
              }
            };

            var init = function () {
              bannerAct();
            };

            return {
              init: init,
            };
          })();

          FRONT.headerMenu = (function () {
            var menuAct = function () {
              /* 검색, 메뉴 레이어 열기 버튼 */
              $(".btn_util").click(function (e) {
                if ($(this).hasClass("link_back")) {
                  e.preventDefault();
                  history.back(1);
                } else if ($(this).hasClass("btn_menu")) {
                  $("html, body").css("overflow", "hidden");
                  $(".ly_area.nav").css("display", "block");
                } else if ($(this).hasClass("btn_search")) {
                  $("html, body").css("overflow", "hidden");
                  $(".ly_area.search_area").css("display", "block");
                }
              });

              /* 검색, 메뉴 레이어 닫기 버튼 */
              $(".btn_ly_close").click(function () {
                $("html, body").css("overflow", "visible");

                $(this).parents(".ly_area").css("display", "none");
              });

              /* 테마 확인 버튼 */
              $("#checkTheme").click(function () {
                if ($("body").hasClass("theme_black")) {
                  $("body").removeClass("theme_black");
                  $(this).text("Black 테마확인");
                } else {
                  $("body").addClass("theme_black");
                  $(this).text("White 테마확인");
                }
              });

              /* 검색어 입력 시 스타일 컨트롤(class="box_form" 영역에 class="on" 추가) */
              $(".search_area .box_form .inp_search").focusin(function () {
                if ($(this).val() == "") {
                  $(this).parents(".box_form").addClass("on");
                }
              });

              $(".search_area .box_form .inp_search").focusout(function () {
                if ($(this).val() == "") {
                  $(this).parents(".box_form").removeClass("on");
                }
              });

              /* 검색어 삭제 버튼 */
              $(".search_area .btn_search_del").click(function () {
                $(".search_area .box_form .inp_search").val("");
                $(".search_area .box_form .inp_search").focus();
              });
            };

            var init = function () {
              menuAct();
            };

            return {
              init: init,
            };
          })();

          FRONT.subDetailFixmenu = (function () {
            var menuAct = function () {
              var didScroll = true;
              var lastScrollTop = 0;
              var delta = 5;
              var navbarHeight = $(".header").outerHeight();
              $(window).scroll(function (event) {
                didScroll = true;
              });
              setInterval(function () {
                if (didScroll) {
                  hasScrolled();
                  didScroll = false;
                }
              }, 100);
              function hasScrolled() {
                var st = $(this).scrollTop();
                if (st > 0) {
                  $(".header").addClass("fix_header");
                } else {
                  $(".header").removeClass("fix_header");
                }
              }
            };

            var init = function () {
              menuAct();
            };

            return {
              init: init,
            };
          })();
          slideFlag = true;
        }
      } else {
        /* 1024px 미만에서 사용할 JavaScript */
        if (flag2) {
          console.log("1148 이하");

          /* [수정 20180319 OSH] 하나 이상의 category scroll 사용 대응 */
          /* 카테고리 iscroll, 이벤트 iscroll */
          //categoryScroll = new IScroll('#categoryScroll', { eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false });
          $(".wrap_category_scroller").each(function (i) {
            var id = "categoryScroll" + i;
            $(this).attr("id", id);
            eventScrolls.push(
              new IScroll("#" + id, {
                eventPassthrough: true,
                scrollX: true,
                scrollY: false,
                preventDefault: false,
              }),
            );
          });

          //console.log(99);
          ///* [수정 20180315 OSH] 하나 이상의 event scroll 사용 대응 */
          //eventScroll = new IScroll('#eventScroll', { eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false });
          $(".wrap_event_scroller").each(function (i) {
            var id = "eventScroll" + i;
            $(this).attr("id", id);
            eventScrolls.push(
              new IScroll("#" + id, {
                eventPassthrough: true,
                scrollX: true,
                scrollY: false,
                preventDefault: false,
              }),
            );
          });

          if (slideFlag) {
            /* 카테고리 둘러보기 slick 해제 */
            $(".scroller").slick("unslick");
          }

          flag = true;
          flag2 = false;

          scrollFlag = true;
          slideFlag = false;
        }
      }
    }
  };

  var init = function () {
    bannerAct();
  };

  return {
    init: init,
  };
})();

FRONT.headerMenu = (function () {
  var menuAct = function () {
    /* 검색, 메뉴 레이어 열기 버튼 */
    $(".btn_util").click(function (e) {
      if ($(this).hasClass("link_back")) {
        e.preventDefault();
        history.back(1);
      } else if ($(this).hasClass("btn_menu")) {
        $("html, body").css("overflow", "hidden");
        $(".ly_area.nav").css("display", "block");
      } else if ($(this).hasClass("btn_search")) {
        $("html, body").css("overflow", "hidden");
        $(".ly_area.search_area").css("display", "block");
      }
    });

    /* 검색, 메뉴 레이어 닫기 버튼 */
    $(".btn_ly_close").click(function () {
      $("html, body").css("overflow", "visible");

      $(this).parents(".ly_area").css("display", "none");
    });

    /* 테마 확인 버튼 */
    $("#checkTheme").click(function () {
      if ($("body").hasClass("theme_black")) {
        $("body").removeClass("theme_black");
        $(this).text("Black 테마확인");
      } else {
        $("body").addClass("theme_black");
        $(this).text("White 테마확인");
      }
    });

    /* 검색어 입력 시 스타일 컨트롤(class="box_form" 영역에 class="on" 추가) */
    $(".search_area .box_form .inp_search").focusin(function () {
      if ($(this).val() == "") {
        $(this).parents(".box_form").addClass("on");
      }
    });

    $(".search_area .box_form .inp_search").focusout(function () {
      if ($(this).val() == "") {
        $(this).parents(".box_form").removeClass("on");
      }
    });

    /* 검색어 삭제 버튼 */
    $(".search_area .btn_search_del").click(function () {
      $(".search_area .box_form .inp_search").val("");
      $(".search_area .box_form .inp_search").focus();
    });
  };

  var init = function () {
    menuAct();
  };

  return {
    init: init,
  };
})();

FRONT.subDetailFixmenu = (function () {
  var menuAct = function () {
    var didScroll = true;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $(".header").outerHeight();
    $(window).scroll(function (event) {
      didScroll = true;
    });
    setInterval(function () {
      if (didScroll) {
        hasScrolled();
        didScroll = false;
      }
    }, 100);
    function hasScrolled() {
      var st = $(this).scrollTop();
      if (st > 0) {
        $(".header").addClass("fix_header");
      } else {
        $(".header").removeClass("fix_header");
      }
    }
  };

  var init = function () {
    menuAct();
  };

  return {
    init: init,
  };
})();
