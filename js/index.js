$(function () {

  let sectionPlayed = {};

  $("#fullpage").fullpage({
    responsiveWidth: 768.98,
    scrollingSpeed: 1200,
    navigation: true,
    navigationPosition: "right",

    navigationTooltips: [
      "HOME",
      "ABOUT",
      "MEMBERS",
      "CASES",
      "COLUMNS",
      "CONTACT US",
      "FOOTER",
    ],

    onLeave: function (index, nextIndex, direction) {

      // header
      if (nextIndex == 1) {
        $('header').removeClass('next');
      } else {
        $('header').addClass('next');
      }

      // navigation 색상
      if (
        nextIndex == 2 ||
        nextIndex == 3 ||
        nextIndex == 5
      ) {
        $('#fp-nav ul li').addClass('black');
      } else {
        $('#fp-nav ul li').removeClass('black');
      }

    },

    afterLoad: function(anchorLink, index){

      // 이미 실행했던 섹션이면 종료
      if(sectionPlayed[index]) return;

      // 해당 섹션 실행 완료 처리
      sectionPlayed[index] = true;


      // =========================
      // 1. HOME
      // =========================
      if(index == 1){

        const paths = $('.logo-svg path');

        paths.each(function(){
          const length = this.getTotalLength();
          gsap.set(this, 
            {
              strokeDasharray: length,
              strokeDashoffset: length,
              fillOpacity: 0
            });
        });

        // 1. 모든 외곽선 순차적으로 그리기
        gsap.to(paths, {
          strokeDashoffset: 0, 
          duration: 2,
          stagger: 0.1,
          ease: 'power3.in'
        })
        
        // 2. 모든 path 의 fil을 동시에 등장
        gsap.to(paths, {
          fillOpacity: 1, 
          duration: 0.8,
          ease: 'power2.in',
          delay: 1.5
        });

        gsap.to(
          '#fp-nav.right',
          {
            xPercent: '-300',
            duration: 1,
            ease: 'power3.out',
            delay: .5
          }
        )

        gsap.to(
          '.main-detail',
          {
            opacity: 1,
            yPercent: '-50',
            duration: 2,
            ease: 'power3.out',
            delay: 2
          }
        );
        $('.home').addClass('scale')
      }

      // =========================
      // 2. ABOUT
      // =========================
      if(index == 2){

        // 이미지 마스크
        gsap.to('.about .content .img-wrap img', {
          webkitMaskSize: '200% 200%',
          maskSize: '200% 200%',
          duration: 6,
          ease: 'power4.out'
        });


        // 선 효과
        $('.about .txt-box h3').addClass('on');


        // 글자 효과
        gsap.fromTo(
          '.about .txt-box h3 span',
          {
            opacity: 0,
            filter: 'blur(5px)',
            scale: 1.3
          },
          {
            opacity: 1,
            filter: 'blur(0px)',
            scale: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: 'power2.out',
            delay: 0.8
          }
        );

      }

      // =========================
      // 3. MEMBERS
      // =========================
      if(index == 3){

        let counter = { value: 0 };

        gsap.to(counter, {
          value: 7,
          duration: 1.5,
          ease: 'none',

          onUpdate: function(){
            $('.countsmall').text(Math.floor(counter.value));
          }
        })
        gsap.to(counter, {
          value: 43,
          duration: 1.5,
          ease: 'none',

          onUpdate: function(){
            $('.count').text(Math.floor(counter.value));
          }
        })

        gsap.to(
          '.members .content .m-title h2',
          {
            opacity: 1,
            duration: 1,
            ease: 'power2.out'
          }
        );
        gsap.to(
          '.m-bottom .name-box',
          {
            opacity: 1,
            yPercent: '-20',
            duration: 2.5,
            ease: 'power3.out'
          }
        )

      }

      // =========================
      // 4. CASES
      // =========================
      if(index == 4){

        gsap.to(
          '.jose li',
          {
            opacity: 1,
            yPercent: '-10',
            duration: 1.5,
            stagger: 0.1,
            ease: 'power3.out'
          }
        )

      }

      // =========================
      // 5. COLUMNS
      // =========================
      if(index == 5){
        gsap.to(
          '.c-title',
          {
            opacity: 1,
            duration: .5,
            eafe: 'power3.out'
          }
        )
        gsap.to(
          '.c-slide',
          {
            opacity: 1,
            yPercent: '-10',
            duration: 1.5,
            ease: 'power3.out'
          }
        )

      }


      // =========================
      // 6. CONTACT
      // =========================
      if(index == 6){

        gsap.fromTo(
          '.logotitle span',
          {
            opacity: 0,
            filter: 'blur(5px)',
            scale: 1.3
          },
          {
            opacity: 1,
            filter: 'blur(0px)',
            scale: 1,
            duration: 2.5,
            stagger: 0.08,
            ease: 'power3.out',
          }
        );

        gsap.to(
          '.logotitle .line', 
          {
          scaleY: 1,
          duration: 1.5,
          ease: 'power3.out',
          delay: 0.8,
          }
        );

        gsap.to(
          '.contact-us .inner h2, .inner > span, .inner > .btn',
          {
           opacity: 1,
           yPercent: '-10',
           duration: 2,
           ease: 'power3.out',
           delay: .5
          }
        )

      }

    }

  });


  // nav 한자
  const hanja = [
    "家",
    "一",
    "二",
    "三",
    "四",
    "五",
    "下"
  ];

  $('#fp-nav ul li').each(function(index){
    $(this).attr('data-hanja', hanja[index]);
  });


  // gotop
  $('.gotop').click(function(e){
    e.preventDefault();
    $.fn.fullpage.moveTo(1);
  });


});

// 이미지 반응형 변경
function imgChange() {
    if ($(window).width() <= 768) {
        $('.about .img-wrap > img').attr('src', 'img/text-m.svg');
    } else {
        $('.about .img-wrap > img').attr('src', 'img/text.svg');
    }
}

// 처음 로딩할 때 실행
imgChange();

// 화면 크기 변경할 때 실행
$(window).resize(function () {
    imgChange();
});