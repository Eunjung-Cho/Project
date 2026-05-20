/**
 * 힐링푸드연구소 (Healing Food Lab) Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Lucide 아이콘 초기화
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. 헤더 스크롤 상태 반영 (글래스모피즘 효과 트리거)
    const header = document.querySelector('.header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 초기 로드 시점 체크

    // 3. 모바일 네비게이션 토글 (드로어 메뉴)
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // 아리아 레이블 상태 변경
            const isExpanded = mobileToggle.classList.contains('active');
            mobileToggle.setAttribute('aria-label', isExpanded ? '메뉴 닫기' : '메뉴 열기');
        });

        // 네비게이션 링크 클릭 시 드로어 자동 닫힘
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
                mobileToggle.setAttribute('aria-label', '메뉴 열기');
            });
        });
    }

    // 4. 부드러운 스크롤 (Anchor Link Smooth Scroll)
    const smoothLinks = document.querySelectorAll('a[href^="#"]');
    smoothLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // 네비게이션 바 높이만큼 오프셋 설정 (헤더가 고정되어 있으므로)
                const headerHeight = header.offsetHeight || 80;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. 연구소 소개 섹션 인터랙티브 탭 (Philosophy & Core Values Tabs)
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // 활성화 버튼 클래스 전환
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // 콘텐츠 전환 애니메이션
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === targetTab) {
                    // 약간의 딜레이를 주어 부드러운 교차 전환 효과 연출
                    setTimeout(() => {
                        content.classList.add('active');
                    }, 50);
                }
            });
        });
    });

    // 6. 스크롤 인터랙션 - 페이드인 효과 (Scroll Reveal Animation via IntersectionObserver)
    // HTML에 클래스를 일일이 지정하지 않고 JS에서 세련된 요소들을 자동으로 지정합니다.
    const elementsToReveal = [
        '.section-header',
        '.about-image-side',
        '.about-content-side',
        '.service-card',
        '.ref-card',
        '.partners-section',
        '.contact-card-wrapper'
    ];

    // 요소들에 reveal 클래스 바인딩
    elementsToReveal.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('reveal');
        });
    });

    // Intersection Observer 설정
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // 한 번 등장 후 관찰 해제
            }
        });
    }, {
        threshold: 0.15, // 요소가 15% 정도 화면에 노출될 때 실행
        rootMargin: '0px 0px -50px 0px' // 하단 여백 오프셋을 두어 자연스러운 시점 연출
    });

    // 모든 reveal 대상 관찰 시작
    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // 7. 문의하기 폼 인터랙션 (Contact Form Handle)
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    const formResetBtn = document.getElementById('btn-form-reset');
    const submitBtn = document.getElementById('btn-submit');

    if (contactForm && successMessage && submitBtn) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // 유효성 체크
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const email = document.getElementById('email').value.trim();
            const interest = document.getElementById('interest').value;
            const message = document.getElementById('message').value.trim();
            const privacy = document.getElementById('privacy').checked;

            if (!name || !phone || !email || !interest || !message || !privacy) {
                alert('모든 필수 항목을 입력하고 개인정보 처리방침에 동의해 주세요.');
                return;
            }

            // 버튼 로딩 상태 전환
            const originalBtnHTML = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span>전송 중입니다...</span> <i data-lucide="loader" class="animate-spin"></i>`;
            if (typeof lucide !== 'undefined') {
                lucide.createIcons({attrs: {class: ['animate-spin', 'icon-loader']}});
            }

            // 1.5초 후 전송 완료 상태 연출 (비동기 통신 시뮬레이션)
            setTimeout(() => {
                // 폼 숨기고 성공 카드 표시
                contactForm.style.display = 'none';
                successMessage.classList.add('active');
                
                // 복원
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHTML;
                
                // 스크롤을 접수 카드로 부드럽게 고정
                const contactCard = document.querySelector('.contact-card-wrapper');
                if (contactCard) {
                    contactCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 1500);
        });

        // 다시 문의하기 버튼 클릭 로직
        if (formResetBtn) {
            formResetBtn.addEventListener('click', () => {
                contactForm.reset();
                successMessage.classList.remove('active');
                contactForm.style.display = 'block';
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            });
        }
    }
});
