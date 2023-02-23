import gsap from 'gsap';

function init() {
  login();

  const confirm = document.querySelector('[co-action="confirm"]') as HTMLElement;
  const nextTraining = document.querySelector('[co-button="next-training"]') as HTMLElement;
  const stepperComp1 = document.querySelector('[co-element="stepper-comp-1"]') as HTMLElement;
  const stepperComp2 = document.querySelector('[co-element="stepper-comp-2"]') as HTMLElement;

  stepperComp2.style.display = 'none';
  stepperComp2.style.opacity = '0';

  if (!nextTraining) return;

  nextTraining.addEventListener('click', () => {
    const timeline = gsap.timeline();

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
      stepperComp1,
      {
        display: 'none',
        opacity: 0,
      },
      0.2
    );
    timeline.to(
      stepperComp2,
      {
        display: 'flex',
        opacity: 1,
      },
      0.6
    );

    timeline.to(
      stepper2,
      {
        transform: 'translateY(0rem)',
        opacity: 1,
      },
      0.6
    );

    //wait400ms
    setTimeout(() => {
      stepperComp2.style.display = 'block';
    }, 400);
  });

  confirm?.addEventListener('click', () => {
    const stepper1 = document.querySelector('[co-stepper="1"]') as HTMLElement;
    const stepper2 = document.querySelector('[co-stepper="2"]') as HTMLElement;

    //wait 400ms
    setTimeout(() => {
      stepper2.style.transform = 'translateY(2rem)';
      stepper2.style.opacity = '0';
      nextTraining.style.display = 'flex';
      nextTraining.style.opacity = '1';
      confirm.style.opacity = '0';
      stepper1.style.transform = 'translateY(0rem)';
      stepper1.style.opacity = '1';
      stepper1.style.display = 'block';
      stepperComp2.style.display = 'none';
      stepperComp2.style.opacity = '0';
      stepperComp1.style.display = 'block';
      stepperComp1.style.opacity = '1';
    }, 400);
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
