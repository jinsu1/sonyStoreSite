//  utility  유용성, 다용도의

/**
 * UtilHelper.js
 * 
 * 재사용 가능한 기능들 모아 놓은 클래스
 */

class UtilHelper {
    /**
     * URL 의 querystring 을 JSON 객체로 변환하여 리턴한다
     * @returns json object
     */
    getQuery() {
        const query = new URLSearchParams(location.search);
        // ? URL 매개변수 뒤에 붙는 문자열
        return Object.fromEntries(query);
        // URL의 querystring 을 JSON 객체로 변환하여 리턴한다
    }

    /**
     * 쿠키에 저장된 값을 반환한다. 값이 없을 경우 undefined를 반환한다
     * @param {string} name - 쿠키이름
     * @returns 쿠키값
     */
    getCookie (name) {
        const regex = new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)");
        // 주어진 이름에 대해 ";name=<value>"패턴을 찾아 <value>부분만 반환
        let matches = document.cookie.match(regex);
        // matches[0] 이름 / matches[1] 값
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    /**
     * 쿠키를 저장한다
     * @param {string} name - 쿠키이름
     * @param {*} value - 저장할 값
     * @param {number} maxAge - 유효시간(초단위)
     */
    setCookie (name, value, maxAge) {
        const encName = encodeURIComponent(name);
        const encValue = encodeURIComponent(value);
        let updatedCookie = `${encName}=${encValue}`;

        updatedCookie += 'path=/;';     // 유효경로설정
        //updatedCookie += 'domain=.naver.com;';  원래는 저장할 도메인 넣어줘야 한다
        
        if (maxAge != undefined) {
            updatedCookie += `max-age=${maxAge}`;
        }

        document.cookie - updatedCookie;
    }
}

const utilHelper = new UtilHelper();
