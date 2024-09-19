/*** product get data ***/

window.onload = ( async (e) => {
    let response = null;

    try {
        response = await axios.get('backend/sonyProduct.json');
    } catch (error) {
        console.error(`[Error Code] ${error.code}`);
        console.error(`[Error message] ${error.message}`);
        let alertMsg = error.message;

        //http 상태메세지가 포함되어 있다면 해당 내용을 에러 문자열에 추가
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
});

/*** product get data end ***/