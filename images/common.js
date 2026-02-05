$(function() {
    /* 헤더 메뉴 및 검색 레이어 동작 */
    FRONT.headerMenu.init();
    /* 메인 배너 슬라이드, 카테고리 둘러보기, 이벤트 슬라이드 및 iscroll 동작 */
    //FRONT.mainSlide.init();

    // css 에서 display 설정을 기본으로 hidden 해야 할 필요가 있는 요소들
    $('.no_img').hide();
    $('.tistory_support_menus').hide();

    // end css hidden

    menu_replace();
    display_control();
    /* 메인 적용되는 스크립트, 메인에만 적용되도록 적용 */
    // 스킨에서 메인 페이지 노출 시 메인 스크립트 동작
    var mainScrollCheckStr = $('.scroll_area').parents('.content').css('display'); // block, none
    if(mainScrollCheckStr != "none") {
        FRONT.mainSlide.init();
    }

    /* 서브 상세페이지 fixed 메뉴 적용되는 스크립트, 서브 상세페이지에만 적용되도록 적용 */
    // 스킨에서 서브상세 페이지 노출 시 fix menu 스크립트 동작
    var subDetailMenuCheckStr = $('.wrap_detail_content').find('.content').css('display');
    if(subDetailMenuCheckStr == "block" ) {
        FRONT.subDetailFixmenu.init();
    }

          $('.opt_select').bind('change', function(e) {
                var $o = $(this).find('option:selected'),
                        url = $o.data('href');
                if (url) {
                    window.open(url, '_blank');
                }
    });
});

function menu_replace()
{
    var $menu = $('.tistory_support_menus ul:first'),
            $category = $('.tistory_support_menus ul.category_list');

    $menu.find('li').each(function () {
        $el = $($(this).html());
        $('.box_home').append($el.addClass('link_menu'));
    });

    $category.children().each(function () {
        $el = $(this).clone();

        var has_sub_category = false;
        if( $el.find('.sub_category_list').length != false) {
            has_sub_category = true;
        }

        var $cnt = $el.children('a').find('.c_cnt'),
                count_text = $cnt.text();
        count_text = count_text.replace('(', '');
        count_text = count_text.replace(')', '');
        $cnt.removeClass('c_cnt').addClass('count').text(count_text);

        if (has_sub_category == false) {
            $el.children('a').addClass('link_menu').removeClass('link_item');
        } else {
            // 서브 카테고리가 있다면 숫자 표시 안함
            $el.children('a').addClass('link_category').removeClass('link_item');
            $cnt.hide();

            $el.find('.sub_category_list').children().each(function () {
                $(this).children('a').addClass('link_menu').removeClass('link_sub_item');
                var $cnt = $(this).children('a').find('.c_cnt'),
                        count_text = $cnt.text();
                count_text = count_text.replace('(', '');
                count_text = count_text.replace(')', '');
                $cnt.removeClass('c_cnt').addClass('count').text(count_text);
            });
            $el.find('.sub_category_list').addClass('list_sub_category').removeClass('sub_category_list');
        }
        $('.list_category').append($el);
    });
}

function display_control()
{
    var pathname = $(location).attr('pathname'),
            parts = pathname.split('/');
    
    var hasSearchList = $('#content_search_list').length;
    var hasContent = $('.wrap_detail_content #content_permallink_article').length;
    
    // content wrap control
//    if (pathname == '/' || pathname == '/manage/previewSkin.php') {
    if (pathname == '/' || (pathname != '/' && hasSearchList == false && hasContent == false)) {
        /* webzine, gallery cover no_img 처리 */
        $('.list_article li').each(function () {
            if ($(this).find('.thumb_img').length == false) {
                if ($(this).find('.no_img').show());
            }
        });
        /* event cover no_img 처리 */
        $('.scroller .box_item').each(function () {
            if ($(this).find('.thumb_img').length == false) {
                if ($(this).find('.no_img').show());
            }
        });

        /* 커버 사용할 경우 처리 */
        if ($('#content_cover_group ').length != false) {
            /* 컨텐츠 출력 영역에 의한 레이아웃 조정 */
            $('.wrap_detail_content').removeClass('wrap_detail_content');
        }
    } else {
        /* 메인 슬라이드 영역 숨김 */
        $('#content_cover').hide();

        /* 페이지일 경우 처리 */
        if (parts[1] == 'pages') {
            /* 컨텐츠 출력 영역에 의한 레이아웃 조정 - 페이지 내용이 전체에 표현 되도록 처리 */
            $('.wrap_detail_content').removeClass('wrap_detail_content');
        }

        /* 검색 리스크가 있을 경우 처리 */
        if ($('#content_search_list').length != false) {
            /* 컨텐츠 출력 영역 숨김 - 목록 표현을 검색 리스트로 대체 */
            $('.wrap_detail_content').hide();
        }

        /* 내용 출력이 있는 경우 처리 */
        if ($('.wrap_detail_content #content_permallink_article').length != false) {
            // 제목 관련 보정
            $('.box_fix_header .txt_fix_tit').text($('#content_permallink_article .txt_sub_tit').text());
            
            var seoImage = $('meta[property="og:image"]').attr('content');
            if (seoImage != false ) {
                $('#content_permallink_article .article_cont').prepend('<p class="article_img img_type1"><span class="imageblock"><img src="'+seoImage+'" alt=""></span></p>');
            }
            // 댓글 수 보정
            $('.box_fix_header .util_comment .txt_count').text($('.btn_info_comment .txt_style').text());
            $('#content_permallink_article .article_util .util_comment .txt_count').text($('.btn_info_comment .txt_style').text());
            $('.btn_info_comment .txt_style').bind("DOMSubtreeModified",function(){
                $('.box_fix_header .util_comment .txt_count').text($('.btn_info_comment .txt_style').text());
                $('#content_permallink_article .article_util .util_comment .txt_count').text($('.btn_info_comment .txt_style').text());
            });

            // 댓글 아이콘 클릭 이벤트 처리
            $('#content_permallink_article .article_util .util_comment').click(function (e) {
                e.preventDefault();
                $('#content_permallink_article .comment_info .btn_info_write').trigger('click');
            });
            $('.box_fix_header .util_comment').click(function (e) {
                e.preventDefault();
                $('#content_permallink_article .comment_info .btn_info_write').trigger('click');
            });

            // 공유하기 아이콘 클릭 이벤트 처리
            $(document).on("click",".box_fix_header .util_share", function(e){
                e.preventDefault();
                $('.postbtn_like .btn_share').trigger('click');
            });
            $(document).on("click","#content_permallink_article .article_util .util_share", function(e){
                e.preventDefault();
                $('.postbtn_like .btn_share').trigger('click');
            });

            // 공감 아이콘 클릭 이벤트 처리
            if ($('.postbtn_like .uoc-icon').length != false) {
                // 헤데의 공감 아이콘 클릭 시 처리
                $('.box_fix_header .util_like').click(function (e) {
                    e.preventDefault();
                    $('.postbtn_like .uoc-icon').trigger('click');
                });
                // 컨텐츠 하단의 공감 아이콘 클릭 시 처리
                $('#content_permallink_article .article_util .util_like').click(function (e) {
                    e.preventDefault();
                    $('.postbtn_like .uoc-icon').trigger('click');
                });

                // 공감 수 변경 시 처리
                $('.postbtn_like .uoc-icon .uoc-count').bind("DOMSubtreeModified",function(){
                    $('.box_fix_header .util_like .txt_count').text($('.postbtn_like .uoc-icon .uoc-count').text());
                    $('#content_permallink_article .article_util .util_like .txt_count').text($('.postbtn_like .uoc-icon .uoc-count').text());
                });
            } else {
                // 공감 기능이 지원되지 않는 콘텐츠에 대한 처리
                $('.box_fix_header .util_like').hide();
                $('#content_permallink_article .article_util .util_like').hide();
            }
        }
    }

    /* 검색 리스트 처리 - 글 목록에서 썸네일, 카테고리 정보 참조 */
    $('#content_search .list_article li').each(function (i) {
        var href = $(this).find('.link_thumb').attr('href');
        var content_detail = $('.wrap_content .content_article_rep').find('[href="'+href+'"]');

        if (content_detail.find('.thumb_img').length == 0) {
            $(this).find('.box_thumb').show();
            $(this).find('.box_thumb').addClass('no_img');
            $(this).find('.box_thumb').html('<div class="default_img"> <span class="box_svg"> <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" class="img_svg"> <defs> <path id="errorIconSvg" d="M18.5 27.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0zM21 11h-2v13h2V11zm-1-9C10.059 2 2 10.059 2 20s8.059 18 18 18 18-8.059 18-18S29.941 2 20 2zm0 34c-8.837 0-16-7.163-16-16S11.163 4 20 4s16 7.163 16 16a16 16 0 0 1-16 16z"></path> </defs> <g fill="none" fill-rule="evenodd"> <path d="M0 0h40v40H0z"></path> <use fill="#fff" fill-rule="nonzero" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#errorIconSvg"></use> </g> </svg> </span> </div>');
        }
        $(this).find('.txt_category').text(content_detail.find('.category').text());
    });

    /* 사이드바 처리 */
    if ($('#content_permallink_article').length == false) {
        /* 내용 출력이 없는 경우 상이드바 숨김 */
        $('.sidebar').hide();

        /* 서브디테일 페이지에서 fixed 메뉴 적용을 위한 클래스 제거 */
        $('#container').removeClass('container_sub_detail');
    } else {
        /* 사이드바 출력할 때 썸네일, 숫자 표기 처리 */
        $('.sidebar .list_sidebar').each(function () {
            $(this).find('.link_thumb').each(function (i) {
                $(this).find('.item_count').text(i+1);

                if ($(this).find('.thumb_img').length == false) {
                    if ($(this).find('.no_img').show());
                }
            });
        });
        $('.list_related .link_thumb').each(function () {
            if ($(this).find('.thumb_img').length == false) {
                if ($(this).find('.no_img').show());
            }
        });

        /* 서브디테일 페이지에서 fixed 메뉴 적용을 위한 클래스 추가 */
        $('#container').addClass('container_sub_detail');

    }

    // 박스 헤더
    if ($('.inner_content').children(':first-child').hasClass('slide_area')) {
        $('.slide_area').addClass('slide_area_top');
    } 
}
