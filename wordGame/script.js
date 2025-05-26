const wordDisplay = document.getElementById('word-display');
const wordInput = document.getElementById('word-input');
const submitButton = document.getElementById('submit-button');
const resultDiv = document.getElementById('result');

let currentWord = '끝말잇기'; // 시작 단어!
wordDisplay.textContent = currentWord;

// 버튼 클릭 이벤트 리스너 추가 [[5]](https://merrynewday.tistory.com/79)
submitButton.addEventListener('click', function() {
    const newWord = wordInput.value.trim(); // 입력된 단어 가져와서 앞뒤 공백 제거

    // 입력값 확인
    if (newWord.length === 0) {
        resultDiv.textContent = '단어를 입력해주세요!';
        wordInput.classList.add('shake'); // 입력 안 하면 흔들흔들~
        setTimeout(() => {
            wordInput.classList.remove('shake');
            resultDiv.textContent = ''; // 메시지 지우기
        }, 800); // 애니메이션보다 조금 길게
        return; // 함수 종료
    }

    // 끝말잇기 규칙 확인
    const lastCharOfCurrentWord = currentWord.slice(-1); // 현재 단어의 마지막 글자
    const firstCharOfNewWord = newWord.slice(0, 1); // 새로 입력한 단어의 첫 글자

    if (lastCharOfCurrentWord === firstCharOfNewWord) {
        // 규칙에 맞으면!
        resultDiv.textContent = '정답!';
        resultDiv.style.color = '#00aaff'; // 정답은 파란색!
        currentWord = newWord; // 현재 단어를 새로 입력한 단어로 업데이트
        wordDisplay.textContent = currentWord; // 화면에 새로운 단어 보여주기

        // 애니메이션 효과 추가
        wordDisplay.classList.add('pop'); // 단어가 뿅 커졌다가 작아짐
        setTimeout(() => {
            wordDisplay.classList.remove('pop');
            resultDiv.textContent = ''; // 메시지 지우기
        }, 800); // 애니메이션보다 조금 길게


        wordInput.value = ''; // 입력창 비우기
        wordInput.focus(); // 다시 입력창에 커서 두기
    } else {
        // 규칙에 안 맞으면 ㅠㅠ
        resultDiv.textContent = `'${lastCharOfCurrentWord}'로 시작하는 단어를 입력하세요!`;
        resultDiv.style.color = '#ff4500'; // 실패는 주황색!
        wordInput.classList.add('shake'); // 입력창 흔들흔들~
        setTimeout(() => {
            wordInput.classList.remove('shake');
            resultDiv.textContent = ''; // 메시지 지우기
        }, 800); // 애니메이션보다 조금 길게

    }
});

// Enter 키로도 입력되게 (선택 사항)
wordInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // 기본 엔터 동작 막기
        submitButton.click(); // 버튼 클릭 효과 내기
    }
});
