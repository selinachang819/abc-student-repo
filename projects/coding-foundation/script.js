var slider = document.getElementById('boxNumber');
var num = document.getElementById('text');
var flex =document.getElementById('flex');
// call this function everytime when the changes of input of the slider is detected
slider.addEventListener("input", function(){
  num.innerHTML= "there are " + this.value+ " grids";
  var k= this.value;// declare a variable for the input
  console.log(k);
  flex.innerHTML= " ";// clear the exsiting flexboxes out of the div
  for (i=0; i<k; i++){
  var box = document.createElement('div'); //creating boxes
  box.setAttribute('class', 'boxes');//set a class for styling in css
  flex.appendChild(box);//and put the flexboxes inside the div
}
});
