
/**
 * MathHyeon.js
 * 
 */

class MathHyeon {

    /**
     * 특정 숫자를 제외한 중복되지 않는 랜덤 숫자 배열 생성
     * @param {number} size - 반환할 배열의 크기
     * @param {number} min - 무작위로 뽑을 수의 최솟값
     * @param {number} max - 무작위로 뽑을 수의 최댓값
     * @param {number[]} exclude - 제외할 숫자 배열
     * @returns {number[]} - 랜덤 숫자 배열
     */
    
    
    getUniqueRandomArray(min, max, size, exclude = []) {
      // Check if size is within the possible range
      if (size > (max - min + 1) - exclude.length) {
          throw new Error('The count exceeds the number of available unique numbers.');
      }

      // Create an array with all numbers from min to max
      const numbers = [];
      for (let i = min; i <= max; i++) {
          if (!exclude.includes(i)) {
              numbers.push(i);
          }
      }

      // Shuffle the array
      for (let i = numbers.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
      }

      // Slice the array to get the desired number of unique random numbers
      return numbers.slice(0, size);
    }
  
}

const mathHyeon = new MathHyeon();

/* 
const arr = mathHyeon.getUniqueRandomArray(1,20,5);
console.log(arr);
 */
