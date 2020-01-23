// fancy library code

const headertext = new Blotter.Text('finghin.com', {
  family: "'Lack Regular', sans",
  size: 48,
  paddingLeft: 12,
  paddingRight: 48
});

let liquid = new Blotter.LiquidDistortMaterial();
liquid.uniforms.uSpeed.value = 0.05;

let liquidBlotter = new Blotter(liquid, {
  texts : headertext
});

let headertextElem, scrollElem = null;

const calcHeaderScroll = (element) => {
  const viewportHeight = document.documentElement.clientHeight;

  return (element.scrollTop % viewportHeight)/viewportHeight;
}

const scrollEvent = (evt, element) => {
  let headerScrollPercent = calcHeaderScroll(element);
  liquid.uniforms.uSpeed.value = Math.log(headerScrollPercent + 1);
}

const observer = lozad();

// mundane things

const checkWindowSize = (next) => {
  console.log(document.body.clientWidth < 666);
  next(
    document.body.clientWidth < 666
  );
};

document.fonts.ready.then(() => {
  observer.observe();

  headertextElem = document.getElementById('pageheader');
  headertextElem.innerHTML = '';

  window.addEventListener('resize', checkWindowSize((isTooSmall) => {
    if (isTooSmall) headertextElem.style.display = 'none';
    else headertextElem.style.display = 'block';
  }), true);
  
  scrollElem = document.getElementById('scroll');
  scrollElem.addEventListener('scroll', function (e) {
    scrollEvent(e, scrollElem);
  });
  
  const scope = liquidBlotter.forText(headertext);
  headertextElem == null ? void 0 : scope.appendTo(headertextElem);
});
