var num=document.getElementById('valueNumber');
var slider=document.getElementById('imageNumber');

num.innerHTML=slider.value;

slider.oninput = function() {
  num.innerHTML = this.value;
}
