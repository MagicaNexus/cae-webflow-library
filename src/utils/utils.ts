function onClickOutside(ele: any, cb: any) {
  document.addEventListener('click', (event) => {
    if (!ele.contains(event.target)) cb();
  });
}
