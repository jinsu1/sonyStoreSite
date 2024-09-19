
/**
 * ArrayHyeon.js
 * 
 */

class ArrayHyeon {

    /**
     * 배열의 순서를 랜덤하게 바꾼다
     * @param {Array} array - 랜덤하게 순서를 바꿀 배열
     * @returns {Array} - 순서가 랜덤하게 바뀐 배열
     */
    shuffleArray(array) {
        // 배열을 복사하여 원본 배열을 변경하지 않도록 한다
        let shuffledArray = array.slice();
        
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            // 0부터 i까지의 인덱스 중에서 무작위로 선택한다
            const j = Math.floor(Math.random() * (i + 1));
            
            // 현재 인덱스 i와 무작위로 선택된 인덱스 j의 요소를 교환한다
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        
        return shuffledArray;
    }


    /**
     * 배열에서 특정 인덱스의 요소를 삭제한다
     * @param {Array} array - 요소를 삭제할 배열
     * @param {number} index - 삭제할 요소의 인덱스
     * @returns {Array} - 요소가 삭제된 배열
     */
    removeElementAtIndex(array, index) {
        // 유효한 인덱스인지 확인
        if (index < 0 || index >= array.length) {
            throw new Error('Index out of bounds');
        }

        // 배열에서 특정 인덱스의 요소를 삭제한다
        array.splice(index, 1);
        
        return array;
    }    

}

const arrayHyeon = new ArrayHyeon();

/* 
// 사용 예시
const originalArray = [{id:1},{id:2},{id:3},{id:4},{id:5}];
const shuffled = arrayHyeon.shuffleArray(originalArray);
console.log('Original Array:', originalArray);
console.log('Shuffled Array:', shuffled); 
*/

/* 
// 사용 예시
const myArray = [10, 20, 30, 40, 50];
const indexToRemove = 2; // 삭제할 인덱스 (여기서는 30을 삭제)
const updatedArray = arrayHyeon.removeElementAtIndex(myArray, indexToRemove);
console.log(updatedArray); // [10, 20, 40, 50] 
*/