/*** dual slide get data ***/
/* 
 ( async (e) => {
     let response = null;

     try {
        response = await axios.get('http://localhost:3001/products');
        product = response.data;
     } catch (error) {
         console.error(`[Error Code] ${error.code}`);
         console.error(`[Error message] ${error.message}`);
         let alertMsg = error.message;

         if(error.response !== undefined) {
             const errorMsg = `${error.response.status} error - ${error.response.statusText}`;
             console.error(`[HTTP Status] ${errorMsg}`);
             alertMsg += `\n${errorMsg}`;
         }

         alert(alertMsg);
         return;
     }
     //navigation
     const secondMenu = document.querySelector('.secondary_menu');
     product.forEach((v, i) => {
         const ul = document.createElement('ul');
         const li = document.createElement('li');
         const a = document.createElement('a');

         ul.classList.add('secondary_menu_list');
         a.setAttribute('href', 'category.html?${v.product.camera}');
         a.innerHTML = "카메라";

         secondMenu.appendChild(ul);
         ul.appendChild(li);
         li.appendChild(a);
     });

     //dual slide
     const subImgContainer = document.querySelector(".sub_img");



     product.배열이름.배열이름.forEach((v, i) => {
     const subImg = document.createElement("img");
    
     subImgContainer.setAttribute('href', 'view.html?id=${v.id}');
     subImg.setAttribute('src', 'assets/img/${v.사진이름.확장자}');
     subImg.setAttribute('alt', '${v.title}')

     subImgContainer.appendChild(subImg);
     });
 })();
 */
/*** dual slide get data end ***/

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

/*** product get data ***/

 ( async (e) => {
    let response = null;

    try {
        response = await axios.get('backend/data.json');
    } catch (error) {
        console.error(`[Error Code] ${error.code}`);
        console.error(`[Error message] ${error.message}`);
        let alertMsg = error.message;

        if(error.response !== undefined) {
            const errorMsg = `${error.response.status} error - ${error.response.statusText}`;
            console.error(`[HTTP Status] ${errorMsg}`);
            alertMsg += `\n${errorMsg}`;
        }

        alert(alertMsg);
        return;
    }

    const prodContainer = document.querySelector(".product_container");
    const productList = response.data.productList;

    productList.forEach((v, i) => {
        const prodItem = document.createElement("a");
        const prodName = document.createElement("span");
        
        prodItem.classList.add("product_item");
        prodItem.setAttribute('href', `category.html?category=${v.category}`)
        prodItem.classList.add("pointer");
        prodName.innerHTML = v.prodName;

        prodContainer.appendChild(prodItem);
        prodItem.appendChild(prodName);
        prodItem.style.backgroundImage = `url(assets/img/${v.prodImg})`;

    });
})();

/*** product get data end ***/