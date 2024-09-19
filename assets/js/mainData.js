/*** dual slide get data ***/

// ( async (e) => {
//     let response = null;

//     try {
//         response = await axios.get('backend/data.json');
//     } catch (error) {
//         console.error(`[Error Code] ${error.code}`);
//         console.error(`[Error message] ${error.message}`);
//         let alertMsg = error.message;

//         if(error.response !== undefined) {
//             const errorMsg = `${error.response.status} error - ${error.response.statusText}`;
//             console.error(`[HTTP Status] ${errorMsg}`);
//             alertMsg += `\n${errorMsg}`;
//         }

//         alert(alertMsg);
//         return;
//     }
//     //navigation
//     const secondMenu = document.querySelector('.secondary_menu');
//     response.data.product.forEach((v, i) => {
//         const ul = document.createElement('ul');
//         const li = document.createElement('li');
//         const a = document.createElement('a');

//         ul.classList.add('secondary_menu_list');
//         a.setAttribute('href', 'category.html?${v.product.camera}');
//         a.innerHTML = "카메라";

//         secondMenu.appendChild(ul);
//         ul.appendChild(li);
//         li.appendChild(a);
//     });

//     //dual slide
//     const subImgContainer = document.querySelector(".sub_img");

//     response.data.배열이름.배열이름.forEach((v, i) => {
//     const subImg = document.createElement("img");
    
//     subImgContainer.setAttribute('href', 'view.html?id=${v.id}');
//     subImg.setAttribute('src', 'assets/img/${v.사진이름.확장자}');
//     subImg.setAttribute('alt', '${v.title}')

//     subImgContainer.appendChild(subImg);
//     });
// })();

/*** dual slide get data end ***/


/*** product get data ***/

 ( async (e) => {
    let response = null;

    try {
        response = await axios.get('backend/sonyProduct.json');
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

    response.data.productList.forEach((v, i) => {
        const prodItem = document.createElement("div");
        const prodName = document.createElement("span");
        
        prodItem.classList.add("product_item");
        prodItem.classList.add("pointer");
        prodName.innerHTML = v.prodName;

        prodContainer.appendChild(prodItem);
        prodItem.appendChild(prodName);
        prodItem.style.backgroundImage = `url(assets/img/${v.prodImg})`;

    });
})();

/*** product get data end ***/