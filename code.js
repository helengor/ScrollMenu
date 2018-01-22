function menu_obj(){

        var menu_elem = document.querySelector('menu');
        var menu_offset = 0;
        var menu_height = 0;

        var setMenuParam = function(){
            if(menu_elem) {
                var menuRec = menu_elem.getBoundingClientRect();
                menu_offset = menuRec.top + window.scrollY;
                menu_height = menuRec.height - 2;
            }
        };

        var setMenuCss = function(css){
            menu_elem.style.position = css.position;
            menu_elem.style.bottom = css.bottom;
            menu_elem.style.top = css.top;
            menu_elem.style.left = css.left;
        };

        //Меню для разделов на странице. Разделы представлены секциями. Секция, на которую можно перейти из меню, содержит якорь.
        var MenuScroll = function(){

            var menuItemsOnPage = document.querySelectorAll('menu li a.menu-in-page');
            for (var menuItemNum = 0; menuItemNum < menuItemsOnPage.length; menuItemNum++) {
                menuItemsOnPage[menuItemNum].addEventListener('click',function (event) {
                    event.preventDefault();
                    var url = this.getAttribute('href').replace(/#/g,"");
                    var hrefElem = document.querySelector("a[name='"+ url +"']");
                    var SectionStyle = getComputedStyle(hrefElem.parentElement);
                    var hrefElemRec = hrefElem.getBoundingClientRect();

                    window_scroll(hrefElemRec.top + window.scrollY - SectionStyle.marginTop.replace(/px/g,"") - SectionStyle.paddingTop.replace(/px/g,"") - menu_height);
                });
            }

            //Делаем меню фиксированным в топе окна при прокрутке, или возвращаем на место в верхней секции, если мы прокрутили до положения меню в верхней секции.
            window.addEventListener('scroll',function () {

                var scroll_top = window.scrollY;

                if (menu_offset <= scroll_top) {
                    setMenuCss({position: 'fixed', bottom: 'auto', top: '0', left: '0'});
                } else {
                    setMenuCss({position: 'absolute', bottom: '0', top: 'auto', left: 'auto'});
                }


                //Показываем текущий раздел в меню
                var documentSections = document.querySelectorAll('section');

                for (var sectionNum = 0; sectionNum < documentSections.length; sectionNum++) {
                    var sectionRec = documentSections[sectionNum].getBoundingClientRect();
                    var SectionStyle = getComputedStyle(documentSections[sectionNum]);
                    var sectionTop = sectionRec.top + window.scrollY - SectionStyle.marginTop.replace(/px/g,"") - SectionStyle.paddingTop.replace(/px/g,"") - menu_height;
                    var sectionHeight = sectionRec.height;

                    if (((scroll_top > sectionTop) && (scroll_top <= (sectionTop + sectionHeight)))) {
                        var menuTarget = documentSections[sectionNum].querySelector('.menu_target');
                        var menuItems = document.querySelectorAll('menu li a');

                        if(menuTarget) {
                            for (var menuItemNum = 0; menuItemNum < menuItems.length; menuItemNum++) {
                                if (menuItems[menuItemNum].getAttribute('href').replace(/#/g, "") == menuTarget.getAttribute('name')) {
                                    menuItems[menuItemNum].className = 'menu_target current';
                                } else {
                                    menuItems[menuItemNum].className = 'menu_target';
                                }
                            }
                        } else {
                            for (var menuItemNum = 0; menuItemNum < menuItems.length; menuItemNum++) {
                                menuItems[menuItemNum].className = 'menu_target';
                            }
                        }
                    }
                }
            })
        };

        //Если есть меню, то делаем ему красиво
        this.init = function() {
            setMenuParam();
            if(menu_offset > 0){
                MenuScroll();
            }
        }

    }
