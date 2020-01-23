const headertext = new Blotter.Text("finghin.com", {
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

function calcHeaderScroll(element) {
  const viewportHeight = document.documentElement.clientHeight;

  return (element.scrollTop % viewportHeight)/viewportHeight;
}

function scrollEvent(evt, element) {
  let headerScrollPercent = calcHeaderScroll(element);
  liquid.uniforms.uSpeed.value = Math.log(headerScrollPercent + 1);
}

const observer = lozad();

document.fonts.ready.then(() => {
  observer.observe();

  headertextElem = document.getElementById("pageheader");
  headertextElem.innerHTML = "";
  
  scrollElem = document.getElementById("scroll");
  scrollElem.addEventListener("scroll", function (e) {
    scrollEvent(e, scrollElem);
  });
  
  const scope = liquidBlotter.forText(headertext);
  headertextElem == null ? void 0 : scope.appendTo(headertextElem);
});
