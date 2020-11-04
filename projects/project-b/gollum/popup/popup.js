let greeting = "I'm always watching you.";
let generic1 = "I am watching you..."
let generic2 = "Are you still there?";
let generic3 = "Good choice.";
let generic4 = "I know your password";
let generic5 = "Interesting";
let generic6 = "emmmm...";
let genericSayings = [generic1, generic2, generic3,generic4,generic5,generic6];

function getRandom(max){
  return Math.floor(Math.random() * Math.floor(max));
}

//get the random generic.

let url = document.getElementById("url");
let button = document.getElementById("commentButton");

function randomGenerate(){
  let genericNumber = getRandom(genericSayings.length);
  let genericSaying = genericSayings[genericNumber];
  console.log(genericSaying);
  url.innerHTML = genericSaying;
};
window.onload=randomGenerate();
