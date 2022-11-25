import gsap from 'gsap';

function init() {
  console.log('init');
  login();
  const nextTraining = document.querySelector('[co-button="next-training"]');
  if (!nextTraining) return;

  nextTraining.addEventListener('click', () => {
    const timeline = gsap.timeline();
    console.log('click');

    const stepper1 = document.querySelector('[co-stepper="1"]') as HTMLElement;
    const stepper2 = document.querySelector('[co-stepper="2"]') as HTMLElement;

    stepper2.style.transform = 'translateY(2rem)';
    stepper2.style.opacity = '0';

    timeline.to(stepper1, {
      opacity: 0,
      transform: 'translateY(-2rem)',
    });

    timeline.to(
      stepper1,
      {
        display: 'none',
      },
      0.3
    );

    timeline.to(
      stepper2,
      {
        transform: 'translateY(0rem)',
        opacity: 1,
      },
      0.6
    );
  });
}

init();

function login() {
  const account = document.querySelector('[co-button="login"]');

  if (!account) return;
  account.addEventListener('click', () => {
    //wait 6 seconds
    setTimeout(() => {
      window.location.href = '/';
    }, 6000);
  });
}
