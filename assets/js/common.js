
/* banner swiper */
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





/* dual_swiper */
let swiperTopNum = $('.main-slide').find('.swiper-slide');
let swiperSubNum = $('.sub-slide').find('.sub-slide');

let mainSlide = new Swiper('.main-slide', {
    loop: true,	//슬라이드 반복
    loopedSlides: swiperTopNum.length,
    touchRatio: 0
});

let subSlide = new Swiper('.sub-slide', {
    spaceBetween: 10,	//슬라이드 간격
    centeredSlides: false,	//슬라이드 중앙 배치
    slidesPerView: '1.5',	//한번에 보여지는 슬라이드 개수
    slideToClickedSlide: true,	//클릭 시 해당 슬라이드 위치로 이동
    loop: true,	//슬라이드 반복
    loopedSlides: swiperSubNum.length //loop 시 파라미터 duplicate 개수
});

mainSlide.controller.control = subSlide;
subSlide.controller.control = mainSlide;

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