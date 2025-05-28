// script.js 파일 또는 HTML <script> 태그 안에 작성

// HTML 문서가 완전히 로드되면 그때 자바스크립트 코드를 실행해줘! (안전 제일!)
document.addEventListener('DOMContentLoaded', () => {

    // ====== 캐러셀을 움직이는 데 필요한 HTML 요소들 가져오기 ======
    // document.querySelector는 해당 클래스를 가진 첫 번째 요소를 가져와.
    const carouselTrack = document.querySelector('.carousel-track'); // 슬라이드 전체를 담고 움직일 요소
    const prevBtn = document.querySelector('.prev-btn'); // 이전 버튼
    const nextBtn = document.querySelector('.next-btn'); // 다음 버튼
    const paginationContainer = document.querySelector('.carousel-pagination'); // 페이지 점들이 들어갈 곳

    // document.querySelectorAll는 해당 클래스를 가진 모든 요소를 배열처럼 가져와.
    const slides = document.querySelectorAll('.carousel-slide'); // 각 슬라이드들 (이걸로 개수랑 너비 계산)

    // ====== 캐러셀 상태를 기억할 변수 ======
    let currentSlideIndex = 0; // 💖 지금 보고 있는 슬라이드의 순서 (제일 처음 슬라이드는 0번부터 시작이야!)
    const totalSlides = slides.length; // 전체 슬라이드가 몇 개인지 세어두기

    // ====== 💖 핵심! 💖 원하는 번호(index)의 슬라이드를 화면에 보여주는 함수 ======
    function showSlide(index) {
        // --- 슬라이드 순환 로직 ---
        // 만약 이동하려는 index가 전체 슬라이드 개수보다 크거나 같으면 (예: 5장인데 5번 슬라이드를 보여달라고 하면)
        // -> 맨 처음 슬라이드 (0번)으로 돌아가서 무한 반복처럼 보이게 해!
        if (index >= totalSlides) {
            currentSlideIndex = 0;
        }
        // 만약 이동하려는 index가 0보다 작으면 (예: 첫 번째(0번) 슬라이드에서 이전 버튼 누름)
        // -> 맨 마지막 슬라이드로 이동해서 무한 반복처럼 보이게 해!
        else if (index < 0) {
            currentSlideIndex = totalSlides - 1;
        }
        // 그 외의 경우에는 (중간 슬라이드 이동이거나, 처음 시작할 때)
        // -> 요청된 index로 currentSlideIndex 값을 업데이트해!
        else {
            currentSlideIndex = index;
        }

        // ====== 슬라이드 트랙을 움직여서 현재 슬라이드 위치 맞추기 ======
        // 1. '현재' 슬라이드 하나가 화면에서 얼마나 너비를 차지하는지 정확하게 알아내기
        //    (반응형이라 화면 크기나 기기에 따라 너비가 달라지므로 그때그때 계산하는 게 중요해!)
        //    여기서는 모든 슬라이드의 너비가 같다고 가정하고, 첫 번째 슬라이드(slides[0])의 현재 너비를 기준으로 사용할 거야.
        const slideWidth = slides[0].clientWidth;

        // 2. 슬라이드 트랙(carouselTrack) 전체를 얼마나 왼쪽으로 밀어야 할지 계산
        //    (현재 보고 싶은 슬라이드 번호 * 슬라이드 하나의 너비 만큼!)
        //    - 0번 슬라이드면: 0 * slideWidth = 0px (하나도 안 움직임)
        //    - 1번 슬라이드면: 1 * slideWidth = slideWidth 만큼 왼쪽으로 이동
        //    - 2번 슬라이드면: 2 * slideWidth = slideWidth의 두 배 만큼 왼쪽으로 이동
        //    ... 이런 식으로! 왼쪽 이동이니까 값 앞에 마이너스(-)를 붙여야 해!
        const moveAmount = -currentSlideIndex * slideWidth;

        // 3. 계산된 값으로 슬라이드 트랙의 CSS 'transform' 속성을 변경!
        //    CSS에 transform 속성에 transition을 걸어놨기 때문에, 이 변화가 뚝 끊기지 않고
        //    아주 부드러운 애니메이션으로 보이게 될 거야! 😉
        carouselTrack.style.transform = `translateX(${moveAmount}px)`;

        // 슬라이드 위치가 바뀌었으니 아래쪽에 있는 페이지 표시 점들의 상태도 업데이트해야겠지?
        // 점 업데이트 함수는 다음 페이지(다섯 번째 페이지)에서 만들 거지만, 여기서 호출할 준비를 해두자!
        updatePaginationDots(); // ⬅️ 이 함수는 다음 페이지에서 완성될 거예요!
    }

    // ====== 버튼 클릭 이벤트 리스너 연결 ======
    // '다음' 버튼(nextBtn)을 클릭했을 때:
    nextBtn.addEventListener('click', () => {
        // showSlide 함수를 호출해서 현재 슬라이드 번호(currentSlideIndex)보다 1 큰 번호의 슬라이드를 보여달라고 해!
        showSlide(currentSlideIndex + 1);
    });

    // '이전' 버튼(prevBtn)을 클릭했을 때:
    prevBtn.addEventListener('click', () => {
        // showSlide 함수를 호출해서 현재 슬라이드 번호(currentSlideIndex)보다 1 작은 번호의 슬라이드를 보여달라고 해!
        showSlide(currentSlideIndex - 1);
    });

    // 참고: 페이지 로드 시 초기 설정 및 페이지 점 기능 완성은 다음 페이지(다섯 번째 페이지)에서 이어집니다!

 // DOMContentLoaded 이벤트 리스너 끝! (이 괄호는 script.js 파일의 제일 마지막에 있어야 해!)
 // script.js 파일 또는 HTML <script> 태그 안에 네 번째 페이지 코드에 이어서 작성

// 네 번째 페이지 코드에 이어서 바로 작성하면 됩니다!

// ====== 페이지 표시 점들 자동으로 만들기 ======
function createPaginationDots() {
    // 점들을 담을 컨테이너(carousel-pagination) 안의 내용을 일단 깨끗하게 비워줘.
    // (혹시 코드가 다시 실행되거나 할 때 점들이 중복으로 생기는 걸 방지하는 안전 장치!)
    paginationContainer.innerHTML = '';
    // 전체 슬라이드 개수(totalSlides)만큼 반복하면서 점들을 만들자!
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div'); // 새로운 <div> 요소를 만들어 (이게 화면에 보일 하나의 점이 될 거야!)
        dot.classList.add('pagination-dot'); // 우리가 CSS에서 예쁘게 꾸며놓은 'pagination-dot' 클래스를 이 점에 붙여줘!
        dot.dataset.index = i; // **중요!** 이 점이 몇 번째 슬라이드(0부터 시작!)를 가리키는지 기억하게 'data-index' 속성에 순서(i)를 저장해놔!

        // ====== **점 클릭 이벤트 추가!** ======
        // 이 점을 클릭했을 때 어떤 일이 일어나야 할지 정해주자!
        dot.addEventListener('click', (e) => {
            // 클릭된 점(e.target)이 기억하고 있는 'data-index' 값을 가져와서 숫자로 바꿔줘.
            const index = parseInt(e.target.dataset.index);
            // 네 번째 페이지에서 만든 showSlide 함수를 호출해서,
            // 클릭된 점이 가리키는 번호(index)의 슬라이드를 화면에 보여달라고 해!
            showSlide(index);
        });

        // 다 만든 점(dot)을 페이지 점들 컨테이너(paginationContainer)에 하나씩 순서대로 붙여넣자!
        paginationContainer.appendChild(dot);
    }
}

// ====== 현재 보고 있는 슬라이드에 해당하는 점을 활성 상태로 만들기 ======
// 네 번째 페이지에서 showSlide 함수가 슬라이드를 바꿀 때마다 이 updatePaginationDots 함수를 호출할 거야!
function updatePaginationDots() {
    // 페이지에 있는 모든 'pagination-dot' 클래스를 가진 요소(만들어 놓은 모든 점들!)를 가져와.
    const dots = document.querySelectorAll('.pagination-dot');
    // 가져온 점들 하나하나에 대해서 작업을 할 거야! (forEach 반복문 사용)
    dots.forEach((dot, index) => {
        if (index === currentSlideIndex) {
            // 만약 이 점의 순서(index)가 현재 보고 있는 슬라이드 번호(currentSlideIndex)와 같다면
            // -> CSS에서 활성 상태로 예쁘게 꾸며놓은 'active' 클래스를 이 점에 추가해줘! ✨
            dot.classList.add('active');
        } else {
            // 만약 이 점이 현재 보고 있는 슬라이드의 점이 아니라면
            // -> 혹시 이전에 붙어있을지 모르는 'active' 클래스를 제거해줘.
            dot.classList.remove('active');
        }
    });
}

// ====== 💖 페이지가 처음 로드되었을 때 캐러셀 초기 설정! 💖 ======
// (이 코드는 네 번째 페이지의 DOMContentLoaded 이벤트 리스너 안에서 showSlide 호출 전에 넣으면 돼!)

// 1. 먼저 페이지 아래쪽에 페이지 표시 점들을 화면에 만들어줘!
createPaginationDots();

// 2. 캐러셀을 처음 로드했을 때 맨 첫 번째 슬라이드(0번)를 화면에 보여줘!
//    (showSlide 함수는 currentSlideIndex 값을 사용하는데, 처음에는 위에서 0으로 초기화했지!)
showSlide(currentSlideIndex); // currentSlideIndex가 0이니까 showSlide(0)과 같아!

// 3. 맨 처음 슬라이드가 보이고 있으니, 맨 첫 번째 점을 활성 상태로 만들어줘!
updatePaginationDots();


// ====== 윈도우 크기 변경 시 슬라이드 위치 재조정 (반응형 디자인을 위한 필수 코드!) ======
// 사용자가 웹 브라우저 창 크기를 조절할 때 'resize' 이벤트가 발생해.
// 이 이벤트가 발생했을 때, 슬라이드 너비가 달라질 수 있으니까
// 현재 보고 있는 슬라이드의 위치가 이상해지지 않도록 다시 정확하게 잡아주는 코드야!
window.addEventListener('resize', () => {
     // 1. 변경된 창 크기에서의 슬라이드 하나당 정확한 너비를 다시 가져와.
     //    (slides[0].clientWidth는 현재 화면에서의 너비를 실시간으로 알려줘!)
     const slideWidth = slides[0].clientWidth;

     // 2. 현재 보고 있는 슬라이드 번호(currentSlideIndex)를 기준으로
     //    변경된 슬라이드 너비에 맞춰 슬라이드 트랙의 위치를 다시 계산해!
     //    (네 번째 페이지의 showSlide 함수에서 했던 계산과 같아!)
     const moveAmount = -currentSlideIndex * slideWidth;

     // 3. 계산된 새로운 위치 값으로 슬라이드 트랙을 이동시켜줘!
     //    CSS transition을 사용하지 않고 바로 위치를 변경해야 resize 중에 부자연스럽지 않아.
     carouselTrack.style.transition = 'none'; // 잠시 transition을 끄고
     carouselTrack.style.transform = `translateX(${moveAmount}px)`; // 위치를 바로 변경
     // 변경이 끝난 후 다시 transition을 켜줘야 다음 슬라이드 이동 시 애니메이션이 작동해.
     // 하지만 DOM 조작 후 바로 transition을 켜면 적용이 안 될 수 있어서, 작은 지연이 필요해.
     // requestAnimationFrame을 사용해서 다음 애니메이션 프레임에 transition을 다시 켜는 게 좋아!
     requestAnimationFrame(() => {
         requestAnimationFrame(() => {
             carouselTrack.style.transition = 'transform 0.8s ease-in-out'; // 원래 transition으로 되돌리기 (두 번째 페이지 CSS에 설정했던 값!)
         });
     });


     // 참고: 버튼이나 점들의 위치, 크기는 CSS @media 쿼리가 알아서 반응형으로 잘 조절해줄 거야!
     //       resize 이벤트가 발생할 때마다 createPaginationDots()나 updatePaginationDots()를 다시 호출할 필요는 없어!
});


// 네 번째 페이지 시작 부분에 있던 DOMContentLoaded 이벤트 리스너의 마지막 괄호가 여기서 닫힙니다!
// script.js 파일 전체의 끝에 이 괄호 }) 가 와야 해요!
}); // DOMContentLoaded 끝
