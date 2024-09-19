/*** nav ***/

/* scrollEvent header && go_top append or hide */
const sideToggleBox = document.querySelector(".side_toggle_box");
const headerPc = document.querySelector(".header_pc");
const sideToggleBtn = document.querySelector(".side_toggle_btn");
const goTop = document.querySelector(".go_top");
let lastScrollY = 0;

window.addEventListener("scroll", () => {

    if(window.scrollY > lastScrollY) {
        //현재 스크롤 위치가 이전 위치보다 클 때 (내려갈 때)
        headerPc.classList.add("header_pc_hide");
        sideToggleBox.classList.add("side_toggle_show");
    } else {
        //현재 스크롤 위치가 이전 위치보다 작을 때 (올라갈 떄)
        headerPc.classList.remove("header_pc_hide");
        sideToggleBox.classList.remove("side_toggle_show");
    }

    lastScrollY = window.scrollY;
});

const sideToggleContents = document.querySelector('.side_toggle_contents');

sideToggleBtn.addEventListener("click", e => {
    sideToggleContents.classList.toggle("side_toggle_contents_show");
    sideToggleBtn.classList.toggle("side_toggle_active");
});


goTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
});


/*
1) class가 secondary_menu_list인 5개를 배열로 secondaryList라는 변수에 담음
2) 1번째 depth에 마우스 올라갔을 때 2번째 depth의 ul의 배경색이 바뀌어야함
3) 2번째 depth에 마우스 올라갔을 때 1번째 depth에 border-bottom과 color가 바뀌어야함
4) 1번째 depth와 2번째 depth의 ul은 아빠의 사촌의 아들급인 6촌 관계임 (css hover로 상대방 제어 불가)
5) 1번째 depth의 a태그와 2번째 depth는 ul태그 마다 for문으로 이벤트를 거는 함수를 만듦
6) 1_depth a 와 2_depth ul은 배열의 길이가 같음
7) 이벤트 발생지점은 i번째 요소임
8) 각 배열의 i번째에 각각 필요한 클래스를 추가, 삭제함


*/
const secondary = document.querySelector(".secondary_menu_bg");
const secondaryList = document.querySelectorAll(".secondary_menu_list");
const gnbTitle = document.querySelectorAll(".gnb_title");
const gnbMenuChild = document.querySelectorAll("nav > ul > li > a");
const secondMenuChild = document.querySelectorAll("nav > ul > div > div > ul");

function addEvent(el) {
    for(let i=0;i<el.length;i++) {
        el[i].addEventListener("mouseover", () => {
            secondary.style.height = `${secondary.scrollHeight}px`;
            gnbTitle[i].classList.add("menu_active_border");
            secondaryList[i].classList.add("menu_active");
        });
    }
}

function removeEvent(el) {
    for(let i=0;i<el.length;i++) {
        el[i].addEventListener("mouseout", () => {
            secondary.style.height = `0px`;
                secondaryList[i].classList.remove("menu_active");
                gnbTitle[i].classList.remove("menu_active_border");
        });
    }
}
addEvent(gnbMenuChild);
addEvent(secondMenuChild);
removeEvent(gnbMenuChild);
removeEvent(secondMenuChild);



// 7) 1_depth a 와 2_depth ul에 dataset으로 번호를 매겨 연결점 생성
// 8) 이벤트가 발생한 dataset.num와 2_depth ul 을 하나하나(param => c) 검사해 dataset.num이 일치하는 요소를 찾음
// 9) 일치하는게 있다면 2_depth ul의 c번째에게 배경색을 변경하는 class추가
// function addEvent (el) {
//     for(let i=0;i<el.length;i++) {
//         el[i].addEventListener("mouseover", (e) => {
//             secondary.style.height = `${secondary.scrollHeight}px`;
//             secondaryList.forEach((v, c) => {
//                 if( e.currentTarget.dataset.num === v.dataset.num) {
//                     secondaryList[c].classList.add("menu_active");
//                     gnbTitle[c].classList.add("menu_active_border");
//                 }
//             });
//         });
//     }
// }

// function removeEvent (el) {
//     for(let i=0;i<el.length;i++) {
//         el[i].addEventListener("mouseout", (e) => {
//             secondary.style.height = `0px`;
//             secondaryList.forEach((v, c) => {
//                 secondaryList[c].classList.remove("menu_active");
//                 gnbTitle[i].classList.remove("menu_active_border");
//             });
//         });
//     }
// }

/*** nav end ***/



/***  banner swiper ***/
let loop_slider = true;
const num_of_slides = 4;
let swiper_sliders = document.querySelectorAll(".banner_swiper");

for (const this_slider of swiper_sliders){
    let num_of_slides_before_init = this_slider.querySelectorAll(".swiper-slide").length;
    if(num_of_slides_before_init < num_of_slides){
        loop_slider = false;
    }

    let swiper = new Swiper(this_slider, {
        slidesPerView: 1,
        loop: loop_slider,
        allowTouchMove: false,
        speed:800,
        navigation: {
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next',
        },
        pagination: {
        el: ".swiper-pagination",
        type: 'custom',
        renderCustom: function (swiper, current, total) {
            return 'No.0' + current + '<span style="color:#666">' +'&nbsp;___ 0' + total + '</span>';
            }
        },
    });
};
/***  banner swiper end ***/




/*** dual_swiper ***/
let swiperTopNum = $('.main-slide').find('.swiper-slide');
let swiperSubNum = $('.sub-slide').find('.sub-slide');

let mainSlide = new Swiper('.main-slide', {
    initialSlide: 2, // 슬라이드 시작지점
    loop: true,	//슬라이드 반복
    loopedSlides: swiperTopNum.length,
    touchRatio: 0 // 슬라이드 control 막음
});

let subSlide = new Swiper('.sub-slide', {
    spaceBetween: 10,	//슬라이드 간격
    slidesPerView: '1.5',	//한번에 보여지는 슬라이드 개수
    // slideToClickedSlide: true,	//클릭 시 해당 슬라이드 위치로 이동
    loop: true,	//슬라이드 반복
    speed:800,
    loopedSlides: swiperSubNum.length, //loop 시 파라미터 duplicate 개수
    navigation: {
        nextEl: '.swiper-button-next'
    },
    controller: {
        control: mainSlide,
    }
});

//mainSlide.controller.control = subSlide; // swiper controller 속성을 바깥에서 제어
//subSlide.controller.control = mainSlide; // 안에서 값을 주면 subSlide를 선언하기 전에 control에서 호출해버리게됨

//swiper title, desc opacity
const SubSlide = document.querySelectorAll(".column");
const SubSlideTitle = document.querySelectorAll(".sub_swiper_title");
const SubSlideName = document.querySelectorAll(".sub_swiper_name");
const SubSlideDesc = document.querySelectorAll(".sub_swiper_desc");

// 클래스 변경을 감지할 콜백 함수
const callback = function(mutationsList) {
    mutationsList.forEach(mutation => {
    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        SubSlide.forEach((slide, index) => {
            const hasClass = slide.classList.contains('swiper-slide-active');
        
            if (hasClass) {
                    SubSlideTitle[index].classList.add('opacity_1');
                    SubSlideName[index].classList.add('opacity_1');
                    SubSlideDesc[index].classList.add('opacity_1');
                } else {
                    SubSlideTitle[index].classList.remove('opacity_1');
                    SubSlideName[index].classList.remove('opacity_1');
                    SubSlideDesc[index].classList.remove('opacity_1');
                }
            });
        }
    });
};

// 각 슬라이드에 대해 MutationObserver를 설정
SubSlide.forEach((slide) => {
    const observer = new MutationObserver(callback);
    observer.observe(slide, { attributes: true });
});

/*** dual_swiper  end ***/

/*** footer drop up ***/

const dropUpBtn = document.querySelector('.drop_up_btn');
const dropUpContent = document.querySelector('.sony_family_content');

dropUpBtn.addEventListener("click", e => {
    dropUpContent.classList.toggle("show_family");
});

/*** footer drop up end ***/

/*** sweetalert (modal)  ***/
document.querySelector(".go_service").addEventListener('click', e => {
    new Swal({
        html: '<span class="alert_content">고객님께서 원하시는 제품을<br/> 빠르고 정확하게 구매하실 수 있도록<br/> 도와드리겠습니다.<br/>고객지원센터: 1588-0911</span>',
        confirmButtonColor: '#000',
        confirmButtonText: '확인',
        width: '312px',
        padding: '16px 0 34px 0',
    });
});

document.querySelector(".go_kakao").addEventListener('click', e => {
    new Swal({
        html: '<span class="alert_content">카톡 상담을 위해선 로그인이 필요합니다.<br/>로그인 하시겠습니까?</span>',
        confirmButtonColor: '#000',
        confirmButtonText: '확인',
        showCancelButton: true,
        cancelButtonColor: '#fff',
        cancelButtonText: '취소',
        width: '312px',
        padding: '16px 0 34px 0',
        reverseButtons: true
    });
});

/*** sweetalert (modal) end ***/
