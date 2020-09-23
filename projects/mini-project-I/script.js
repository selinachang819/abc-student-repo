// select items
let slider = document.getElementById('slider');
let images1 =[document.getElementById('a1'), document.getElementById('a3'), document.getElementById('c1')];
let images2 =[document.getElementById('a2'), document.getElementById('c2'), document.getElementById('c3')];

slider.addEventListener("input",function(){
  console.log(slider.value);
//apply changes to each one in the array
  for (i=0; i<images1.length; i ++){
    images1[i].style.transform="rotate("+(slider.value-135)*3+"deg)";
    images1[i].style.left=-(slider.value-135)*3+ "px";
  }
  for (i=0; i<images2.length; i ++){
    images2[i].style.transform="rotate("+(slider.value-135)*-3+"deg)";
    images2[i].style.left=(slider.value-135)*3+ "px";
  }
})
