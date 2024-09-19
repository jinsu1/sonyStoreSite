const clr_light_grey = '#fbfbfb';
/* 
const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    //   type: 'custom',
    },

    // And if we need scrollbar
    scrollbar: {
      enabled: false,
    }, 
});
 */
/* 
const swiperRcmd = new Swiper('.swiper-rcmd', {
    // Optional parameters
    direction: 'horizontal',
    loop: false,

    slidesPerView: 4,
    
    on: {
        init: function() {
            updateNavigationButtons();
        },
        slideChange: function() {
            updateNavigationButtons();
        },
        resize: function() {
            updateNavigationButtons();
        }
    },

    // If we need pagination
    pagination: {
        el: '.swiper-pagination-rcmd',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next-rcmd',
        prevEl: '.swiper-button-prev-rcmd',
    },
    
    // And if we need scrollbar
    scrollbar: {
        el: '.swiper-scrollbar-rcmd',
    },
}); */

/* 
function updateNavigationButtons() {
    var swiper = document.querySelector('.swiper-rcmd').swiper;
    var lastSlideIndex = swiper.slides.length - swiper.params.slidesPerGroup;

    if (swiper.isEnd) {
        document.querySelector('.swiper-button-next-rcmd').style.display = 'none';
    } else {
        document.querySelector('.swiper-button-next-rcmd').style.display = '';
    }
    
    if (swiper.isBeginning) {
        document.querySelector('.swiper-button-prev-rcmd').style.display = 'none';
    } else {
        document.querySelector('.swiper-button-prev-rcmd').style.display = '';
    }
}
 */

    /* -- -- -- -- -- -- circleColor 메서드 -- -- -- -- -- -- */
const circleColor = selector => {
    //const selector = document.querySelector( selectorName ); //console.log(selector);
    if( !selector ) return;

    selector.classList.add('color-btn');
     
    const span1 = document.createElement('span');
    span1.classList.add('circle-color');

    const span2 = document.createElement('span');
    span2.classList.add('c-bg');

    span1.appendChild(span2);
    selector.appendChild(span1);
};
    /* -- -- -- clr_name 메서드 -- -- -- */
const clr_name = clr => {
    switch ( clr ) {
        case "black":
            return "블랙";
            break;
        case "white":
            return "화이트";
            break;
        case "silver":
            return "실버";
            break;
    }
};

( async () => {
    //const params = utilHelper.getQuery();
    const params = {id:4};

    const curPageId = params.id;

    if ( !curPageId ) {
        alert("제품이 없습니다");
        history.back();
        return;
    }

    let response = null;

    try {
        response = await axios.get(`http://localhost:3001/camera/${curPageId}`);
        //console.log(response.data);
    } catch (e) {
        console.error(e);
        alert("요청 실패");
        return;
    }
     
    const colorArr = response.data.color;
    document.querySelector(".main-img").setAttribute( "src", `assets/img/${response.data.thumbnail}` );
    

    /* -- -- -- 메인 우측 - 구매관련 -- -- -- */

    document.querySelector(".prd-name").innerHTML = response.data.title;
    
    document.querySelector(".prd-text").innerHTML = response.data.info;
    
    const camPrice = response.data.price;
    document.querySelector(".cam-price").innerHTML = camPrice.toLocaleString();

    document.querySelector(".vip-mlg").innerHTML = (camPrice*0.04).toLocaleString();

    document.querySelector(".family-mlg").innerHTML = (camPrice*0.02).toLocaleString();

        /* -- -- 색상 -- -- */
    if ( colorArr.length > 1 ) {         
        const div = document.createElement('div');
        div.classList.add('color-select');
        document.querySelector('.product-cont-color-select').appendChild(div);

        const p = document.createElement('p');
        p.classList.add('tit');
        p.innerHTML = "색상";

        const ul = document.createElement('ul');
        ul.classList.add('circle-color-box');

        for ( let i=0; i<2; i++ ) {
            let clr = colorArr[i];

            const li = document.createElement('li');

            const a = document.createElement('a');
            a.classList.add('color-btn');
            a.classList.add(clr);

            const span1 = document.createElement('span');
            span1.classList.add('circle-color');
            if( i==0 ) span1.classList.add('active');

            const span2 = document.createElement('span');
            span2.classList.add('c-bg');

            span1.appendChild(span2);

            const span3 = document.createElement('span');
            span3.classList.add('color-name');
            if( i==0 ) span3.classList.add('active');
            span3.innerHTML = clr_name(clr);

            a.appendChild(span1);
            a.appendChild(span3);
            
            li.appendChild(a);

            ul.appendChild(li);
        }        

        div.appendChild(p);
        div.appendChild(ul);
        
         
        document.querySelectorAll('.color-btn').forEach( (v,i) => {
            v.addEventListener( 'click', e => {
                e.preventDefault();
                const clickIdx = i;
    
                document.querySelectorAll('.circle-color').forEach( (v1,i1) => {
                    if ( clickIdx == i1 ) {
                        v1.classList.add('active');
                    } else {
                        v1.classList.remove('active');
                    }
                } );
                document.querySelectorAll('.color-name').forEach( (v2,i2) => {
                    if ( clickIdx == i2 ) {
                        v2.classList.add('active');
                    } else {
                        v2.classList.remove('active');
                    }
                } );
                //let clrNum = `clr${i}`;
                //const img = `response.data.img.${clrNum}[0]`; console.log(img);
                document.querySelector(".main-img").setAttribute( "src", `assets/img/camera${curPageId}/clr${i}_${[0]}.png` );
                
            } );
        } );
    }

        /* 제품을 선택하세요 */
    const ulSelectInner = document.querySelector('.select-inner');

    const colorNum = colorArr.length; 
    for ( let i=0; i<colorNum; i++ ) {
        const li = document.createElement('li');
        li.classList.add('inner-list');
        
        const a = document.createElement('a');
        
        li.appendChild(a);
        ulSelectInner.appendChild(li);
    } 
    document.querySelectorAll('.inner-list').forEach( (v,i) => {
        let span1, span2;
        if ( colorNum > 1 ) {
            span1 = document.createElement('span');
            span1.classList.add('circle-prd-clr');
            span1.classList.add('pad');

            circleColor(span1);                                        

            const colorName = colorArr[i];
            span1.classList.add( colorName ); 
            
            span2 = document.createElement('span');
            span2.classList.add('submenu-txt');
            span2.classList.add('pad');
            span2.innerHTML = `${response.data.title} / ${clr_name(colorName)}`;
        }
        else {
            span2 = document.createElement('span');
            span2.classList.add('submenu-txt');
            span2.classList.add('pad');
            span2.innerHTML = `제품명: ${response.data.title}`;
        }
        const a = v.children[0];
        if ( span1 ) a.appendChild(span1);
        a.appendChild(span2);
    } );
    
    document.querySelector('.selected-btn').addEventListener( 'click', e => {
        e.preventDefault();
        ulSelectInner.classList.toggle('active');       
    } );    

        /* -- -- 제품 선택 - 선택된 제품 박스 -- -- */
    
    document.querySelectorAll('.inner-list').forEach( (v,i) => {
        
        v.addEventListener( 'click', e => {
            e.preventDefault();
            const current = e.currentTarget;
            
            const createBox = () => {
                const div1 = document.createElement('div');
                div1.classList.add('selected-opt');
        
                const div2 = document.createElement('div');
                div2.classList.add('selected-opt-container');
                
                const div3 = document.createElement('div');
                div3.classList.add('selected-prd-top');
        
                const p = document.createElement('p');
                p.classList.add('prd');
                p.innerHTML = '제품';
        
                const a = document.createElement('a');
                a.classList.add('prd-delete');
                a.innerHTML = '구매목록에서 삭제';
        
                div3.appendChild(p);
                div3.appendChild(a);

                const div4 = document.createElement('div');
                div4.classList.add('selected-name');
        
                const circlePrdClr = current.querySelector('.circle-prd-clr');
                const submenuTxt = current.querySelector('.submenu-txt');
                div4.appendChild( circlePrdClr.cloneNode(true) );
                div4.appendChild( submenuTxt.cloneNode(true) );
                //console.log(div4);

                const div5 = document.createElement('div');
                div5.classList.add('selected-bottom');

                const div6 = document.createElement('div');
                div6.classList.add('count-container');

                const btn1 = document.createElement('button');
                btn1.classList.add('minus');
                btn1.classList.add('cnt-box');
                btn1.innerHTML = '-';

                const input = document.createElement('input');
                input.classList.add('cnt-box');
                input.setAttribute( 'type', 'text' );
                input.setAttribute( 'value', 1 );

                const btn2 = document.createElement('button');
                btn2.classList.add('plus');
                btn2.classList.add('cnt-box');
                btn2.innerHTML = '+';

                div6.appendChild(btn1);
                div6.appendChild(input);
                div6.appendChild(btn2);

                const div7 = document.createElement('div');
                div7.classList.add('selected-price');
                div7.innerHTML = `${response.data.price.toLocaleString()}원`;

                div5.appendChild(div6);
                div5.appendChild(div7);

                div2.appendChild(div3);
                div2.appendChild(div4);
                div2.appendChild(div5);

                div1.appendChild(div2);
                //console.log(div1);
                
                document.querySelector('.prd-select-box').appendChild(div1);
            };  
 
            if ( document.querySelector('.selected-opt') ) {
                document.querySelectorAll('.selected-opt').forEach( (v1,i1) => {
                    if( v1.querySelector(`.${colorArr[i]}`) ) {
                        //console.log(colorArr[i]);
                        alert('이미 선택된 옵션입니다.');
                        return;
                    } else {
                        createBox();
                    }                    
                } );
            } else {
                createBox();
            }
            
            ulSelectInner.classList.remove('active');

            //console.log(document.querySelectorAll('.prd-delete'));
        } );

        
    } );
/* 
    const selectedOpt = document.querySelectorAll('.selected-opt');
    console.log(selectedOpt);
     */
    
    document.querySelectorAll('.btn-icon-container').forEach( (v,i) => {
        const a = document.createElement('a');
        a.classList.add('btn-icon');
        v.appendChild(a);

        //const urlName = v.classList[0];
        const iconUrl = `../assets/img/ico_${v.classList[0]}.svg`;
        console.log(iconUrl);
        //v.style.background = `url(${url}) no-repeat center`;
        v.style.background = `url(${iconUrl}) no-repeat center`;
    } );

    
    
    

    /* -- -- 함께 구매하시면 좋은 추천 제품 -- -- */
    /* 
    let response_2 = null;

    try {
        response_2 = await axios.get(`http://localhost:3001/camera`);
        //console.log(response_2.data);
    } catch (e) {
        console.error(e);
        alert("요청 실패");
        return;
    }    

    let dataArr;
    response_2.data.some( (v,i) => {
        if ( v.id == curPageId ) {
            dataArr = arrayHyeon.removeElementAtIndex(response_2.data,i);
            return true;
        }
    } );
    //  some 메서드   탐색을 중단하는 기능 제공
    //  콜백함수가 true 리턴하는 순간 전체 반복 중단 
    //  console.log(dataArr);

    const randomData = arrayHyeon.shuffleArray(dataArr);
    console.log(randomData);
        
    const swiperWrapper = document.querySelector('.swiper-wrapper-rcmd');

    randomData.forEach( (v,i) => {
        const li = document.createElement('li');
        swiperWrapper.appendChild(li);

        const a = document.createElement('a');
        a.setAttribute('href',`view.html?id=${v.id}`);

        const div = document.createElement('div');      // swiper slide 클래스이름 추가~~~~~~
        div.classList.add('img-wrapper');
        div.style.backgroundColor = clr_light_grey;
        
        const img = document.createElement('img');
        img.setAttribute('src',`assets/img/camera${v.id}.png`);
        
        div.appendChild(img);

        const p1 = document.createElement('p');
        p1.classList.add('prd-name');
        p1.classList.add('tit');
        p1.innerHTML = v.title;
        
        const p2 = document.createElement('p');
        p2.classList.add('prd-text');
        p2.innerHTML = v.info;

        a.appendChild(div);
        a.appendChild(p1);
        a.appendChild(p2);

        const p3 = document.createElement('p');
        p3.classList.add('price');
        p3.classList.add('tit');
        p3.innerHTML = v.price.toLocaleString();

        li.appendChild(a);
        li.appendChild(p3);
    } );    
    */
    
    document.querySelectorAll('.tab-menu').forEach( (v,i) => {
        v.addEventListener( 'click', e => {
            const current = e.currentTarget;
            current.classList.add('active');
            
            document.querySelectorAll('.tab-menu').forEach( (w,j) => {
                if ( w !== current ) {
                    w.classList.remove('active');
                }
            } );

            document.querySelectorAll('.tab-zone').forEach( (v1,i1) => {
                if ( i == i1 ) {
                    v1.classList.add('active');
                } else {
                    v1.classList.remove('active');
                }
            } );
        } );
    });

    const prdSelectBox = document.querySelector('.prd-select-box');
      
    
    let observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            console.log(mutation);

            
            const cntBox = document.querySelectorAll('.cnt-box');

            document.querySelectorAll('.plus').forEach( (v,i) => {
                v.addEventListener('click', e => {

                });
            });
            
            const selectedPrice = document.querySelectorAll('.selected-price');
            selectedPrice.forEach( (v,i) => { 
            
            let price1 = selectedPrice[0].innerHTML;
            console.log(price1);

            let cntBox = document.querySelector('.cnt-box').value;

            let total = price1 * cntBox;
            });
        });
    });
    observer.observe(prdSelectBox, { childList: true });
        
})();

//콤마빼고 숫자열로 변환
// function stringNumberToInt(stringNumber){
//     return parseInt(stringNumber.replace(/,/g , ''));
// }

