'use strict';
// ******* Global Variables *******
let votingRounds = 25;
let BusMallArray = [];

// ****** DOM REFERENCES ******
let imgContainer = document.getElementById('container');
let imgOne = document.getElementById('image-one');
let imgTwo = document.getElementById('image-two');
let imgThree = document.getElementById('image-three');


// let resultsList = document.getElementById('display-results');
// let resultsBtn = document.getElementById('show-results-btn');

// ****** Canvas Ref ******
let ctx = document.getElementById('myChart');

// ****** Local Storage ******
let retrievedProducts = localStorage.getItem('itemName');
let parsedProducts = JSON.parse(retrievedProducts);
console.log(parsedProducts)

// ****** Constructor ******

function BusMall(itemName, fileExtension = 'jpg') {
  this.itemName = itemName;
  this.img = `img/${itemName}.${fileExtension}`;
  this.clicks = 0;
  this.views = 0;

  BusMallArray.push(this);
}


// ***** Retrieved Products *******

if (retrievedProducts) {

  for (let i = 0; i < parsedProducts.length; i++) {

    if (parsedProducts[i].itemName === 'sweep') {
      let reconstructedSweep = new BusMall(parsedProducts[i].itemName, 'png');
      reconstructedSweep.clicks = parsedProducts[i].clicks;
      reconstructedSweep.views = parsedProducts[i].views;
    } else {
      let reconstructedProduct = new BusMall(parsedProducts[i].itemName);
      reconstructedProduct.clicks = parsedProducts[i].clicks;
      reconstructedProduct.views = parsedProducts[i].views;
    }
  }
} else {
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

}

function getRandomIndex() {

  return Math.floor(Math.random() * BusMallArray.length);
}

let indexArray = [];

function renderImg() {

  // ***** Make sure each image is different ******
  while (indexArray.length < 6) {
    let randomNumber = getRandomIndex();
    if (!indexArray.includes(randomNumber)) {
      indexArray.push(randomNumber);
    }
  }

  console.log(indexArray);

  // ****** Get random index for each image ******
  let busOneIndex = indexArray.shift();
  let busTwoIndex = indexArray.shift();
  let busThreeIndex = indexArray.shift();


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

function handleClick(event) {
  let imgClicked = event.target.alt;

  for (let i = 0; i < BusMallArray.length; i++) {
    if (imgClicked === BusMallArray[i].itemName) {
      BusMallArray[i].clicks++;
    }
  }
  renderImg();

  votingRounds--;

  if (votingRounds === 0) {
    imgContainer.removeEventListener('click', handleClick);

    let stringifiedProducts = JSON.stringify(BusMallArray);

    localStorage.setItem('itemName', stringifiedProducts);
    // chart render
    renderMallChart();
  }

}

function renderMallChart() {
  let itemName = [];
  let itemClicks = [];
  let itemViews = [];

  for (let i = 0; i < BusMallArray.length; i++) {
    itemName.push(BusMallArray[i].itemName);
    itemClicks.push(BusMallArray[i].clicks);
    itemViews.push(BusMallArray[i].views);

  }


  // **** Canvas Ref ****
  console.log(itemName);
  let myChartObj = {
    type: 'bar',
    data: {
      labels: itemName, // items names
      datasets: [{
        label: '# of Votes', // # votes and # views
        data: itemClicks,
        backgroundColor: [
          'blue'
        ],
        borderColor: [
          'blue'
        ],
        borderWidth: 1
      },
      {
        label: '# of Views', // # votes and # views
        data: itemViews, // the actual view or votes
        backgroundColor: [
          'black'
        ],
        borderColor: [
          'black'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }

  };

  new Chart(ctx, myChartObj);

}


// function handleShowResults(){
//   if(votingRounds === 0){
//     for(let i = 0; i < BusMallArray.length; i++){
//       let li = document.createElement('li');
//       li.textContent = `${BusMallArray[i].itemName} was shown ${BusMallArray[i].views} times and clicked ${BusMallArray[i].clicks} times`;
//       resultsList.appendChild(li);
//     }

//   }
// }

imgContainer.addEventListener('click', handleClick);
// resultsBtn.addEventListener('click', handleShowResults);