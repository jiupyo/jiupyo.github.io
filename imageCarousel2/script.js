// script.js 파일 또는 HTML <script> 태그 안에 작성

// HTML 문서의 모든 내용이 로드된 후 스크립트 실행 보장
document.addEventListener('DOMContentLoaded', () => {

    // ====== 캐러셀 작동에 필요한 HTML 요소 참조 ======
    const carouselTrack = document.querySelector('.carousel-track'); // 슬라이드 이미지를 감싸고 움직일 트랙
    const slides = document.querySelectorAll('.carousel-slide'); // 개별 슬라이드 요소들 (전체 개수 및 너비 계산에 사용)
    const prevBtn = document.querySelector('.prev-btn'); // 이전 버튼
    const nextBtn = document.querySelector('.next-btn'); // 다음 버튼
    const paginationContainer = document.querySelector('.carousel-pagination'); // 페이지 점들이 들어갈 컨테이너

    // ====== 캐러셀 현재 상태 추적 변수 ======
    let currentSlideIndex = 0; // 현재 화면에 보이는 슬라이드의 인덱스 (0부터 시작)
    const totalSlides = slides.length; // 전체 슬라이드의 총 개수

    // ====== 💖 핵심 함수: 지정된 인덱스의 슬라이드를 보여주는 기능 ======
    function showSlide(index) {
        // --- 슬라이드 순환 로직 구현 ---
        // 이동하려는 인덱스가 전체 슬라이드 개수 이상이면 (마지막 슬라이드에서 다음 버튼 클릭 시)
        // -> 첫 번째 슬라이드(인덱스 0)로 이동
        if (index >= totalSlides) {
            currentSlideIndex = 0;
        }
        // 이동하려는 인덱스가 0 미만이면 (첫 번째 슬라이드에서 이전 버튼 클릭 시)
        // -> 마지막 슬라이드로 이동 (인덱스 totalSlides - 1)
        else if (index < 0) {
            currentSlideIndex = totalSlides - 1;
        }
        // 그 외의 경우 (유효한 범위 내의 인덱스)
        // -> 해당 인덱스로 현재 슬라이드 인덱스 업데이트
        else {
            currentSlideIndex = index;
        }

        // ====== 슬라이드 트랙(carouselTrack)의 위치를 이동시켜 현재 슬라이드를 보이게 함 ======
        // 1. 슬라이드 하나의 현재 너비를 정확하게 계산 (반응형 디자인 대응)
        //    모든 슬라이드의 너비가 같다고 가정하고 첫 번째 슬라이드의 너비를 기준으로 사용합니다.
        const slideWidth = slides[0].clientWidth;

        // 2. 슬라이드 트랙을 얼마나 왼쪽으로 이동시켜야 할지 계산
        //    (현재 슬라이드 인덱스 * 슬라이드 하나의 너비) 만큼 왼쪽으로 이동해야 하므로 음수 값 사용
        //    예: currentSlideIndex가 0이면 0px 이동 (제자리), 1이면 -slideWidth 만큼 이동
        const moveAmount = -currentSlideIndex * slideWidth;

        // 3. 계산된 값으로 슬라이드 트랙의 CSS transform: translateX 속성을 변경
        //    CSS에 설정된 transition 속성에 의해 이 변화가 부드러운 애니메이션으로 보입니다.
        carouselTrack.style.transform = `translateX(${moveAmount}px)`;

        // 슬라이드 위치가 변경되었으므로 페이지 표시 점들의 상태도 업데이트해야 합니다.
        // 페이지 점 업데이트 함수는 5. JavaScript (추가 기능)에서 구현합니다.
        updatePaginationDots(); // ⬅️ 이 함수는 다음 코드 블록(5페이지)에서 완성됩니다.
    }

    // ====== 캐러셀 탐색 버튼 클릭 이벤트 리스너 연결 ======
    // '다음' 버튼 클릭 시:
    nextBtn.addEventListener('click', () => {
        // 현재 슬라이드 인덱스보다 1 큰 값으로 showSlide 함수 호출 (다음 슬라이드 이동)
        showSlide(currentSlideIndex + 1);
    });

    // '이전' 버튼 클릭 시:
    prevBtn.addEventListener('click', () => {
        // 현재 슬라이드 인덱스보다 1 작은 값으로 showSlide 함수 호출 (이전 슬라이드 이동)
        showSlide(currentSlideIndex - 1);
    });

    // 참고: 페이지 로드 시 초기 설정 및 페이지 점 기능 완성은 5. JavaScript (추가 기능 및 초기 설정)에서 이어집니다.

 // DOMContentLoaded 이벤트 리스너 끝 (script.js 파일 전체의 가장 마지막 괄호가 됩니다)

 // script.js 파일 또는 HTML <script> 태그 안에 4. JavaScript 코드에 이어서 작성

// 4. JavaScript 코드의 DOMContentLoaded 이벤트 리스너 내부에서 이 코드를 이어서 작성합니다.

    // ====== 페이지 표시 점(pagination dots) 자동 생성 및 이벤트 연결 ======
    function createPaginationDots() {
        // 점들을 담을 컨테이너(carousel-pagination)의 기존 내용을 모두 비웁니다.
        // (혹시 중복 생성될 경우를 방지)
        paginationContainer.innerHTML = '';
        // 전체 슬라이드 개수(totalSlides)만큼 반복하며 페이지 점을 생성합니다.
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div'); // 새로운 div 요소를 생성 (이것이 하나의 페이지 점이 됩니다)
            dot.classList.add('pagination-dot'); // CSS에서 스타일링한 'pagination-dot' 클래스를 추가합니다.
            dot.dataset.index = i; // **중요:** 이 점이 몇 번째 슬라이드(0부터 시작)를 나타내는지 데이터 속성(data-index)에 저장합니다.

            // ====== **점 클릭 이벤트 리스너 추가** ======
            // 생성된 각 점을 클릭했을 때 동작을 정의합니다.
            dot.addEventListener('click', (e) => {
                // 클릭된 점(e.target)의 data-index 값을 가져와 정수형으로 변환합니다.
                const index = parseInt(e.target.dataset.index);
                // 4. JavaScript에서 구현한 showSlide 함수를 호출하여, 클릭된 점이 가리키는 슬라이드로 이동시킵니다.
                showSlide(index);
            });

            // 생성 및 설정이 완료된 점(dot) 요소를 페이지 점 컨테이너(paginationContainer)에 추가합니다.
            paginationContainer.appendChild(dot);
        }
    }

    // ====== 현재 활성 슬라이드에 해당하는 페이지 점 상태 업데이트 ======
    // 4. JavaScript의 showSlide 함수가 슬라이드를 변경할 때마다 이 함수를 호출하여 점 상태를 최신화합니다.
    function updatePaginationDots() {
        // 페이지에 있는 모든 'pagination-dot' 클래스를 가진 요소(모든 페이지 점들)를 선택합니다.
        const dots = document.querySelectorAll('.pagination-dot');
        // 선택된 모든 점들에 대해 반복 작업을 수행합니다.
        dots.forEach((dot, index) => {
            if (index === currentSlideIndex) {
                // 만약 현재 점의 인덱스가 현재 보여지고 있는 슬라이드의 인덱스와 같다면
                // -> CSS에서 활성 상태로 스타일링한 'active' 클래스를 이 점에 추가합니다.
                dot.classList.add('active');
            } else {
                // 그렇지 않다면 (활성 슬라이드의 점이 아니라면)
                // -> 이전에 추가되었을 수 있는 'active' 클래스를 제거합니다.
                dot.classList.remove('active');
            }
        });
    }

    // ====== 💖 웹 페이지 로드 완료 시 캐러셀 초기 설정 💖 ======
    // DOMContentLoaded 이벤트 리스너 내부에서 (4. JavaScript 코드 시작 부분에) 작성됩니다.

    // 1. 페이지 로드 후, 먼저 페이지 표시 점들을 생성하여 화면에 표시합니다.
    createPaginationDots();

    // 2. 캐러셀 로드 시, currentSlideIndex (초기값 0)에 해당하는 첫 번째 슬라이드를 보여줍니다.
    showSlide(currentSlideIndex); // showSlide(0)과 동일

    // 3. 첫 번째 슬라이드가 보이므로, 첫 번째 페이지 점을 활성 상태로 표시합니다.
    updatePaginationDots();


    // ====== 윈도우 크기 변경 시 슬라이드 위치 재조정 (반응형 대응 필수) ======
    // 브라우저 창 크기가 변경될 때 발생하는 'resize' 이벤트를 감지합니다.
    // 창 크기 변경 시 슬라이드 너비가 달라지므로, 현재 슬라이드의 위치를 다시 정확하게 조정해야 합니다.
    window.addEventListener('resize', () => {
        // 1. 변경된 창 크기에 따른 슬라이드 하나의 새로운 너비를 가져옵니다.
        const slideWidth = slides[0].clientWidth;

        // 2. 현재 보고 있는 슬라이드(currentSlideIndex)를 기준으로
        //    새로운 슬라이드 너비에 맞춰 슬라이드 트랙의 이동 거리(translateY 값)를 다시 계산합니다.
        const moveAmount = -currentSlideIndex * slideWidth;

        // 3. 계산된 새로운 위치로 슬라이드 트랙을 이동시킵니다.
        //    resize 중에는 transition 애니메이션을 잠시 꺼서 부자연스러움을 방지하는 것이 일반적입니다.
        carouselTrack.style.transition = 'none'; // transition 일시 중지
        carouselTrack.style.transform = `translateX(${moveAmount}px)`; // 위치 즉시 변경

        // 위치 변경 후 다시 transition을 활성화하여 다음 슬라이드 이동 시 애니메이션이 작동하도록 합니다.
        // requestAnimationFrame을 사용하면 다음 애니메이션 프레임에 안전하게 transition을 다시 켤 수 있습니다.
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                 // CSS에 설정했던 원래 transition 속성으로 되돌립니다.
                carouselTrack.style.transition = 'transform 0.8s ease-in-out';
            });
        });

        // 참고: 버튼이나 점들의 위치, 크기는 대부분 CSS @media 쿼리에 의해 자동으로 반응형으로 조절됩니다.
        //       resize 이벤트 발생 시 점들을 다시 생성하거나 업데이트할 필요는 일반적으로 없습니다.
    });

// 4. JavaScript 시작 부분에 있던 DOMContentLoaded 이벤트 리스너의 마지막 괄호가 여기서 닫힙니다.
}); // DOMContentLoaded 끝

