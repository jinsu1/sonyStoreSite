let product = {}; // 전역 변수 선언

window.onload = async (e) => {
    let response = null;

    try {
        response = await axios.get('http://localhost:3001/products');   // 승현
        product = response.data; // 데이터 로딩 후 전역 변수에 할당
    } catch (error) {
        console.error(`[Error Code] ${error.code}`);
        console.error(`[Error message] ${error.message}`);
        let alertMsg = error.message;

        // HTTP 상태 메시지가 포함되어 있다면 해당 내용을 에러 문자열에 추가
        if (error.response !== undefined) {
            const errorMsg = `${error.response.status} error - ${error.response.statusText}`;
            console.error(`[HTTP Status] ${errorMsg}`);
            alertMsg += `\n${errorMsg}`;
        }

        alert(alertMsg);
        return;
    }

    // DOM 요소 선택
    const list_container = document.querySelector('.list_container'); // 제품 리스트를 표시할 컨테이너
    let currentList = []; // 현재 표시되는 제품 리스트를 저장하는 배열

    // URL 파라미터에서 카테고리, 서브 카테고리, 서브 서브 카테고리 키 가져오기
    const params = new URLSearchParams(location.search);
    const categoryKey = params.get('category') || 'camera'; // 기본 카테고리는 'camera'
    let subCategoryKey = params.get('subCategory'); // 서브 카테고리 키
    let subSubCategoryKey = params.get('subSubCategory'); // 서브 서브 카테고리 키

    // 카테고리 이름 매핑 (영어 키를 한글로 변환)
    const categoryNames = {
        'camera': '카메라',
        'video': '비디오 카메라'
    };
    //카테고리 및 서브 카테고리에 따른 배경 이미지 매핑 객체를 생성
    const backgroundImages = {
        camera: {
            default: 'bg_cat_camera.jpg',
            lens_change: 'bg_lens_change.jpg',
            compact: 'bg_compact_camera.jpg'
        },
        video: {
            default: 'bg_cat_video.jpg',
            cinema: 'bg_cinema_camera.jpg',
            camcorder: 'bg_camcorder.jpg'
        }
    };

    //배경 이미지를 설정하는 함수
    function updateBackgroundImage() {
        const category = document.querySelector(".category");
        const categoryBackground = document.getElementById('categoryBackground');
        const categoryList = document.querySelector(".category_list");
        const categoryLink = document.querySelector(".category_link");
        const goBack = document.querySelector(".go_back");

        let imageUrl = '';
    
        if (subCategoryKey && backgroundImages[categoryKey][subCategoryKey]) {
            // 서브 카테고리의 배경 이미지 설정
            imageUrl = `url(assets/img/background/${backgroundImages[categoryKey][subCategoryKey]})`;
            category.style.padding = "110px 0 0"
            categoryList.classList.add("display_none");
            categoryLink.classList.remove("display_none");
            goBack.classList.remove("display_none");
        } else if (backgroundImages[categoryKey].default) {
            // 카테고리 메인 페이지의 배경 이미지 설정
            imageUrl = `url(assets/img/background/${backgroundImages[categoryKey].default})`;
            category.style.padding = "110px 0 124px"
            categoryList.classList.remove("display_none");
            categoryLink.classList.add("display_none");
            goBack.classList.add("display_none");
        } else {
            // 기본 배경 이미지 설정 (필요에 따라 수정)
            imageUrl = 'none';
        }
    
        categoryBackground.style.backgroundImage = imageUrl;
    }
    

    // 페이지에 카테고리 이름 업데이트
    document.querySelector('.go_back').innerHTML = '<i class="fas fa-angle-left"></i>&nbsp;' + categoryNames[categoryKey]; // 'go_back' 버튼 텍스트 설정
    
    const categoryNameElement = document.querySelector('.category_name');   //서브 카테고리 이름으로 업데이트
    if (subCategoryKey) {
        const subCategoryName = getSubCategoryName(subCategoryKey);
        categoryNameElement.textContent = subCategoryName;
    } else {
        categoryNameElement.textContent = categoryNames[categoryKey];
    }

    // 렌더링 함수들 호출
    renderCategoryList(); // 카테고리 리스트 렌더링
    renderTapMenu(); // 탭 메뉴 렌더링
    renderProducts(); // 제품 리스트 렌더링
    updateBackgroundImage();// 배경 이미지 업데이트

    //서브 카테고리 키와 이미지 파일명을 매핑하여 이미지 경로를 생성
    function getSubCategoryImage(subCategoryKey) {
        return `assets/img/subcategory/icon_${subCategoryKey}.png`;
    }
    

    // 카테고리 리스트 렌더링 함수
    function renderCategoryList() {
        const categoryList = document.querySelector('.category_list .list');
        categoryList.innerHTML = ''; // 기존 리스트 초기화

        // '전체보기' 버튼 추가
        const allItem = document.createElement('li');
        allItem.innerHTML = `<a href="?category=${categoryKey}" class="All"><img src="assets/img/crossHair.svg">전체보기</a>`;
        categoryList.appendChild(allItem);

        const categoryData = product[categoryKey]; // 현재 카테고리의 데이터
        for (const subCategory in categoryData) {
            const li = document.createElement('li');
            const imgSrc = getSubCategoryImage(subCategory);
            li.innerHTML = `<a href="?category=${categoryKey}&subCategory=${subCategory}" class="${subCategory}-filter"><img src="${imgSrc}">${getSubCategoryName(subCategory)}</a>`;
            categoryList.appendChild(li); // 서브 카테고리 리스트에 추가
        }
    }

    // 서브 카테고리 이름 매핑 함수
    function getSubCategoryName(subCategoryKey) {
        const subCategoryNames = {
            'lens_change': '렌즈교환식 카메라',
            'compact': '컴팩트 카메라',
            'cinema': '시네마 라인 카메라',
            'camcorder': '캠코더'
        };
        return subCategoryNames[subCategoryKey] || subCategoryKey; // 매핑이 없으면 원래 키 반환
    }

    // 서브 서브 카테고리 이름 매핑 함수
    function getSubSubCategoryName(subSubCategoryKey) {
        const subSubCategoryNames = {
            'full_frame': '풀프레임',
            'APS-C': 'APS-C',
            '4k_handy': '4K 핸디캠',
            '4k_handheld': '4K 핸드헬드'
        };
        return subSubCategoryNames[subSubCategoryKey] || subSubCategoryKey; // 매핑이 없으면 원래 키 반환
    }

    // 탭 메뉴 렌더링 함수
    function renderTapMenu() {
        const tapMenuWrapper = document.querySelector('.tapMenu_wrapper');
        const tapMenuList = document.querySelector('.tapMenu_list');
        tapMenuList.innerHTML = ''; // 기존 탭 메뉴 초기화

        if (!subCategoryKey) {
            tapMenuWrapper.style.display = 'none'; // 서브 카테고리가 없으면 탭 메뉴 숨김
            return;
        }

        const categoryData = product[categoryKey];
        const subCategoryData = categoryData[subCategoryKey];

        if (typeof subCategoryData === 'object' && !Array.isArray(subCategoryData)) {
            // 서브 서브 카테고리가 있는 경우
            tapMenuWrapper.style.display = 'block'; // 탭 메뉴 표시

            // '전체보기' 탭 추가
            const allTab = document.createElement('li');
            allTab.innerHTML = `<a href="?category=${categoryKey}&subCategory=${subCategoryKey}" class="all-filter"><span>전체보기</span></a>`;
            tapMenuList.appendChild(allTab);

            // 활성화 상태 설정: subSubCategoryKey가 없으면 '전체보기' 탭 활성화
            if (!subSubCategoryKey) {
            allTab.querySelector('a').classList.add('active'); // '전체보기' 탭 활성화
        }
            // 각 서브 서브 카테고리별 탭 추가
            for (const subSubCategory in subCategoryData) {
                const li = document.createElement('li');
                li.innerHTML = `<a href="?category=${categoryKey}&subCategory=${subCategoryKey}&subSubCategory=${encodeURIComponent(subSubCategory)}" class="${subSubCategory}-filter"><span>${getSubSubCategoryName(subSubCategory)}</span></a>`;
                tapMenuList.appendChild(li);
            }
        } else {
            tapMenuWrapper.style.display = 'none'; // 서브 서브 카테고리가 없으면 탭 메뉴 숨김
        }
    }
    // 탭 메뉴에서 선택된 카테고리에 따라 해당 버튼에 활성화 상태를 설정하는 함수
    function activateTab(tabElement) {
        document.querySelectorAll('.tapMenu_list a').forEach(v => {
        v.classList.remove('active'); // 모든 버튼의 active 클래스 제거
        });
        tabElement.classList.add('active'); // 클릭된 버튼에만 active 클래스 추가
    }

    // 제품 렌더링 함수
    function renderProducts() {
        currentList = []; // 현재 리스트 초기화
        const categoryData = product[categoryKey];

        if (subCategoryKey) {
            const subCategoryData = categoryData[subCategoryKey];

            if (subSubCategoryKey) {
                // 특정 서브 서브 카테고리의 제품만 표시
                const productList = subCategoryData[subSubCategoryKey];
                if (productList) {
                    currentList.push(...productList); // 제품 리스트에 추가
                }
            } else {
                if (Array.isArray(subCategoryData)) {
                    // 서브 카테고리가 배열인 경우 (제품 리스트)
                    currentList.push(...subCategoryData);
                } else {
                    // 서브 서브 카테고리가 있는 경우 모든 제품 수집
                    for (const subSubCategory in subCategoryData) {
                        const productList = subCategoryData[subSubCategory];
                        currentList.push(...productList);
                    }
                }
            }
        } else {
            // 서브 카테고리가 없는 경우 카테고리 내 모든 제품 수집
            for (const subCategory in categoryData) {
                const subCategoryData = categoryData[subCategory];
                if (Array.isArray(subCategoryData)) {
                    currentList.push(...subCategoryData);
                } else {
                    for (const subSubCategory in subCategoryData) {
                        const productList = subCategoryData[subSubCategory];
                        currentList.push(...productList);
                    }
                }
            }
        }

        renderProductList(currentList); // 제품 리스트 렌더링
        updateProductCount(currentList.length); // 제품 개수 업데이트
    }

        
    // 제품 리스트를 화면에 렌더링하는 함수
    function renderProductList(productList) {
        list_container.innerHTML = ''; // 기존 내용 초기화  

        productList.forEach(v => {
            const item = document.createElement("a");
            item.classList.add("item");
            
            //  승현
            //console.log(v);
            //const keys = findParentKeys( product, v );      //console.log(keys);
            const qs = queryStringById( product, v );     //console.log(qs);
            
            item.href = `view.html?id=${v.id}&${qs}`;                 
                        
            // 이미지 컨테이너 생성
            const imgContainer = document.createElement("div");
            imgContainer.classList.add("img-container");

            // 이미지 요소 생성
            const img = document.createElement("img");

            // 이미지 경로 설정
            let imgSrc;
            let folderName;

            // 폴더명 생성: 카테고리 키와 ID를 조합하여 폴더명 생성
            // 예: camera1, video2 등
            folderName = `${categoryKey}${v.id}`;

            if (v.color && v.color.length > 0) {
                // 초기 이미지는 첫 번째 색상(clr0)
                imgSrc = `assets/img/${folderName}/clr0_0.png`;
            } else {
                // 색상이 없는 경우 기본 썸네일 사용
                imgSrc = `assets/img/${folderName}/${v.thumbnail}`;
            }

            img.setAttribute("src", imgSrc);
            imgContainer.appendChild(img);
            item.appendChild(imgContainer);
            

     // 색상 선택 버튼들
     if (v.color && v.color.length > 1) {
        const colorButtons = document.createElement("div");
        colorButtons.classList.add("color-buttons");

        v.color.forEach((color, index) => {
            const button = document.createElement("button");
            const buttonInner = document.createElement("button");

            button.classList.add("color-button");
            button.setAttribute("data-color-index", index);

            // 버튼 배경색을 실제 색상으로 설정
            button.style.backgroundColor = color;

            if(button.style.backgroundColor == "black") {
                button.appendChild(buttonInner);
                buttonInner.classList.add("color-button-inner");
            }

            // 마우스 오버 이벤트 리스너
            button.addEventListener('mouseover', () => {
                img.setAttribute("src", `assets/img/${folderName}/clr${index}_0.png`);
            });

            colorButtons.appendChild(button);
        });

        item.appendChild(colorButtons);
    } else {
        img.style.marginBottom = "24px";
    }

    // 제품 제목
    const title = document.createElement("h3");
    title.innerHTML = v.title;
    item.appendChild(title);

    // 제품 정보
    const info = document.createElement("p");
    info.innerHTML = v.info;
    item.appendChild(info);

    // 제품 가격
    const price = document.createElement("span");
            price.innerHTML = v.price.toLocaleString('ko-KR') + '원'; // 숫자 형태를 한국 스타일의 쉼표 구분 형식으로 변환
            item.appendChild(price);

            list_container.appendChild(item); // 리스트 컨테이너에 아이템 추가
        });
    }

    // 제품 개수를 업데이트하는 함수
    function updateProductCount(count) {
        const productCount = document.querySelector('.list_info_num');
        productCount.innerHTML = `(${count})`; // 제품 개수 표시
    }

    // 가격순 정렬 함수
    function sortProductsByPrice(order) {
        const sortedList = [...currentList].sort((a, b) => {
            if (order === 'high_to_low') {
                return b.price - a.price; // 높은 가격순
            } else {
                return a.price - b.price; // 낮은 가격순
            }
        });
        renderProductList(sortedList); // 정렬된 리스트 렌더링
    }

    // 최신순 정렬 함수
    function sortProductsByDate() {
        const sortedList = [...currentList].sort((a, b) => b.date - a.date); // 최신순
        renderProductList(sortedList); // 정렬된 리스트 렌더링
    }

    // 정렬 버튼 클릭 이벤트 설정
    document.querySelector('.sort_high_price').addEventListener('click', e => {
        e.preventDefault();
        sortProductsByPrice('high_to_low');
    });

    document.querySelector('.sort_low_price').addEventListener('click', e => {
        e.preventDefault();
        sortProductsByPrice('low_to_high');
    });

    document.querySelector('.sort_recent').addEventListener('click', e => {
        e.preventDefault();
        sortProductsByDate();
    });

    // 정렬 버튼 active 추가
    document.querySelectorAll('.sort').forEach( (v, i) => {
        v.addEventListener("click", (e) => {
            document.querySelectorAll('.sort').forEach( (v, i) => {
                v.classList.remove("sort_active");
            });
            e.currentTarget.classList.add("sort_active");
        })
    });

    // 카테고리 리스트 클릭 이벤트
    document.querySelector('.category_list .list').addEventListener('click', e => {
        e.preventDefault();
        const target = e.target.closest('a');
        if (target) {
            window.location.href = target.href; // 해당 링크로 이동하여 페이지 갱신
        }
    });

    // 탭 메뉴 클릭 이벤트
    document.querySelector('.tapMenu_list').addEventListener('click', e => {
        e.preventDefault();
        const target = e.target.closest('a');
        activateTab(e.target.closest('a'));
        if (target) {
            // 링크의 URL에서 파라미터 추출
            const url = new URL(target.href, location.origin);
            const params = new URLSearchParams(url.search);

            // 파라미터 값 업데이트
            subSubCategoryKey = params.get('subSubCategory') || null;

            // 페이지 콘텐츠 업데이트
            renderProducts();
        }
    });

    // 'go_back' 버튼 클릭 이벤트
    document.querySelector('.go_back').addEventListener('click', e => {
        e.preventDefault();
        window.location.href = '?category=' + categoryKey; // 현재 카테고리의 메인 페이지로 이동
    });
};
