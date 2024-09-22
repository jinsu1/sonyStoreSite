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






/**
 * 제품 id 에 따른 상위 category들을 query string 으로 생성
 * @param {object} data  제품 리스트 json
 * @param {object} targetObject  선택한 제품 object
 * @returns  상위key값을 querystring으로 변환한 문자열
 */

function queryStringById ( data, targetObject ) {
        
    //  제품별 상위key값 배열로 반환하는 메서드
    function findParentKeys(data, targetObject) {
        const parentKeys = [];
    
        function recursiveSearch(currentObject, target) {
            for (const key in currentObject) {
                if (Array.isArray(currentObject[key])) {
                    for (const item of currentObject[key]) {
                        if (item === target) {
                            parentKeys.unshift(key);
                            return true;
                        }
                    }
                } else if (currentObject[key] === target) {
                    parentKeys.unshift(key);
                    return true;
                } else if (typeof currentObject[key] === 'object' && currentObject[key] !== null) {
                    const found = recursiveSearch(currentObject[key], target);
                    if (found) {
                        parentKeys.unshift(key);
                        return true;
                    }
                }
            }
            return false;
        }
    
        recursiveSearch(data, targetObject);
        return parentKeys;
    }

    //  상위key값이 원소인 배열을 querystring으로 변환하는 메서드 
    function createQueryString( keys ) {
        return keys.map((key, index) => `path${index + 1}=${encodeURIComponent(key)}`).join('&');
    }

    return createQueryString( findParentKeys( data, targetObject) );
} 
