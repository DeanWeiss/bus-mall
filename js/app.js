'use strict';

let votingRounds = 25;
let BusMallArray = [];

let imgContainer = document.getElementById('container');
let imgOne = document.getElementById('image-one');
let imgTwo = document.getElementById('image-two');
let imgThree = document.getElementById('image-three');


let resultsList = document.getElementById('display-results');
let resultsBtn = document.getElementById('show-results-btn');

function BusMall(itemName, fileExtension = 'jpg'){
  this.itemName = itemName;
  this.img = `img/${itemName}.${fileExtension}`;
  this.clicks = 0;
  this.views = 0;

  BusMallArray.push(this);
}

new BusMall('sweep', 'png');
new BusMall('bag');
new BusMall('banana');
new BusMall('bathroom');
new BusMall('boots');
new BusMall('breakfast');
new BusMall('bubblegum');
new BusMall('chair');
new BusMall('cthulhu');
new BusMall('dog-duck');
new BusMall('dragon');
new BusMall('pen');
new BusMall('pet-sweep');
new BusMall('scissors');
new BusMall('shark');
new BusMall('tauntaun');
new BusMall('unicorn');
new BusMall('water-can');
new BusMall('wine-glass');

function getRandomIndex(){

  return Math.floor(Math.random()*BusMallArray.length);
}

function renderImg(){

  let busOneIndex = getRandomIndex();
  let busTwoIndex = getRandomIndex();
  let busThreeIndex = getRandomIndex();

  while(busOneIndex === busTwoIndex){
    TwoIndex = getRandomIndex();
  }
  while(busOneIndex === busThreeIndex){
    ThreeIndex = getRandomIndex();
  }
  while(busTwoIndex === busThreeIndex){
    ThreeIndex = getRandomIndex();
  }

  imgOne.src = BusMallArray[busOneIndex].img;
  imgOne.alt = BusMallArray[busOneIndex].itemName;
  BusMallArray[busOneIndex].views++;

  imgTwo.src = BusMallArray[busTwoIndex].img;
  imgTwo.alt = BusMallArray[busTwoIndex].itemName;
  BusMallArray[busTwoIndex].views++;

  imgThree.src = BusMallArray[busThreeIndex].img;
  imgThree.alt = BusMallArray[busThreeIndex].itemName;
  BusMallArray[busThreeIndex].views++;
}

renderImg();

function handleClick(event){
  let imgClicked = event.target.alt;

  for(let i = 0; i < BusMallArray.length; i++){
    if(imgClicked === BusMallArray[i].itemName){
      BusMallArray[i].clicks++;
    }
  }

  votingRounds--;

  if(votingRounds === 0){
    imgContainer.removeEventListener('click', handleClick);
  }

  renderImg();

}

function handleShowResults(){
  if(votingRounds === 0){
    for(let i = 0; i < BusMallArray.length; i++){
      let li = document.createElement('li');
      li.textContent = `${BusMallArray[i].itemName} was shown ${BusMallArray[i].views} times and clicked ${BusMallArray[i].clicks} times`;
      resultsList.appendChild(li);
    }

  }
}

imgContainer.addEventListener('click', handleClick);
resultsBtn.addEventListener('click', handleShowResults);