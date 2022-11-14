window.Webflow ||= [];
window.Webflow.push(() => {
  const account = document.querySelector('[co-button="login"]');

  if (!account) return;
  account.addEventListener('click', () => {
    //wait 6 seconds
    setTimeout(() => {
      window.location.href = '/';
    }, 6000);
  });
});
