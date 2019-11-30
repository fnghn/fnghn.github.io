var headertext = new Blotter.Text("finghin.com", {
    family : "'Lack Regular', sans",
    size : 48,
    paddingLeft : 12  ,
    paddingRight : 48
});

var liquid = new Blotter.LiquidDistortMaterial();
liquid.uniforms.uSpeed.value = 0.05;

var liquidBlotter = new Blotter(liquid, {
  texts : headertext
});

var headertextElem, scrollElem, baby0Elem = null;

function calcHeaderScroll(element) {
  let viewportHeight = document.documentElement.clientHeight;

  return (element.scrollTop % viewportHeight)/viewportHeight;
}

function scrollEvent(evt, element) {
  let headerScrollPercent = calcHeaderScroll(element);
  liquid.uniforms.uSpeed.value = Math.log(headerScrollPercent + 1);
}

document.addEventListener("DOMContentLoaded", function () {
  headertextElem = document.getElementById("pageheader");
  headertextElem.innerHTML = "";
  
  scrollElem = document.getElementById("scroll");
  scrollElem.addEventListener("scroll", function (e) {
    scrollEvent(e, scrollElem);
  });
  
  let scope = liquidBlotter.forText(headertext);
  headertextElem == null ? void 0 : scope.appendTo(headertextElem);
});
