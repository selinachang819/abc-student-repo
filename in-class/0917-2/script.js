let range =document.getElementById('slider');
let content =document.getElementById('content');

let text = content.innerHTML;
let letters = text.split("");
let letterSpan = letters.map((letter) =>{
  return "<span>" +letter+ "<span>";
})
let spanString =letterSpans.join("");
content.innerHTML = spanString;

let spanTags =document.getElementTagName("span");

range.addEventListener
