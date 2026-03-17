'use strict';

Product.all = [];

function Product(name, src) {
  this.name = name;
  this.src = src;
  this.timesShown = 0;
  this.timesClicked = 0;
  Product.all.push(this);
}

// ── Phase 1: Instantiate all products ────────────────────────────
new Product('bag', 'img/bag.jpg');
new Product('banana', 'img/banana.jpg');
new Product('bathroom', 'img/bathroom.jpg');
new Product('boots', 'img/boots.jpg');
new Product('breakfast', 'img/breakfast.jpg');
new Product('bubblegum', 'img/bubblegum.jpg');
new Product('chair', 'img/chair.jpg');
new Product('cthulhu', 'img/cthulhu.jpg');
new Product('dog-duck', 'img/dog-duck.jpg');
new Product('dragon', 'img/dragon.jpg');
new Product('pen', 'img/pen.jpg');
new Product('pet-sweep', 'img/pet-sweep.jpg');
new Product('scissors', 'img/scissors.jpg');
new Product('shark', 'img/shark.jpg');
new Product('sweep', 'img/sweep.png');
new Product('tauntaun', 'img/tauntaun.jpg');
new Product('unicorn', 'img/unicorn.jpg');
new Product('usb', 'img/usb.jpg');
new Product('water-can', 'img/water-can.jpg');
new Product('wine-glass', 'img/wine-glass.jpg');

// ── Phase 2: State variables ──────────────────────────────────────
var lastShown = [];
var currentProducts = [];

// ── Phase 4: Round tracking ───────────────────────────────────────
var MAX_ROUNDS = 25;
var roundCount = 0;

// ── Phase 2: DOM references ───────────────────────────────────────
var imgLeft = document.getElementById('img-left');
var imgCenter = document.getElementById('img-center');
var imgRight = document.getElementById('img-right');
var imageSection = document.getElementById('images');
var resultsBtn = document.getElementById('view-results-btn');
var resetBtn = document.getElementById('reset-btn');
var resultsList = document.getElementById('results-list');

// ── Phase 2: showProducts() ───────────────────────────────────────
function getRandomProduct(excluded) {
  var randomIndex;
  var candidate;

  do {
    randomIndex = Math.floor(Math.random() * Product.all.length);
    candidate = Product.all[randomIndex];
  } while (excluded.includes(candidate));

  return candidate;
}

function showProducts() {
  var picked = [];

  var first = getRandomProduct(lastShown);
  picked.push(first);

  var second = getRandomProduct(lastShown.concat(picked));
  picked.push(second);

  var third = getRandomProduct(lastShown.concat(picked));
  picked.push(third);

  imgLeft.src = picked[0].src;
  imgLeft.alt = picked[0].name;

  imgCenter.src = picked[1].src;
  imgCenter.alt = picked[1].name;

  imgRight.src = picked[2].src;
  imgRight.alt = picked[2].name;

  picked[0].timesShown++;
  picked[1].timesShown++;
  picked[2].timesShown++;

  lastShown = picked;
  currentProducts = picked;
}

// ── Phase 3: handleClick() ────────────────────────────────────────
function handleClick(event) {
  if (event.target.tagName !== 'IMG') {
    return;
  }

  var clickedProduct = Product.all.find(function(product) {
    return product.name === event.target.alt;
  });

  if (clickedProduct) {
    clickedProduct.timesClicked++;
  }

  roundCount++;

  if (roundCount >= MAX_ROUNDS) {
    endVoting();
  } else {
    showProducts();
  }
}

// ── Phase 4: endVoting() ──────────────────────────────────────────
function endVoting() {
  imageSection.removeEventListener('click', handleClick);
  imageSection.style.opacity = '0.4';
  imageSection.style.pointerEvents = 'none';
  resultsBtn.removeAttribute('hidden');
  resetBtn.removeAttribute('hidden');
}

// ── Phase 5: renderResults() ──────────────────────────────────────
function renderResults() {
  resultsList.innerHTML = '';

  Product.all.forEach(function(product) {
    var percentage = product.timesShown > 0
      ? Math.round((product.timesClicked / product.timesShown) * 100)
      : 0;

    var li = document.createElement('li');
    li.textContent = product.name + ' — '
      + product.timesClicked + ' votes, seen '
      + product.timesShown + ' times (' + percentage + '%)';

    resultsList.appendChild(li);
  });

  // renderChart();
}

// ── Reset ─────────────────────────────────────────────────────────
function resetApp() {
  roundCount = 0;
  lastShown = [];
  currentProducts = [];

  Product.all.forEach(function(product) {
    product.timesShown = 0;
    product.timesClicked = 0;
  });

  resultsList.innerHTML = '';
  resultsBtn.setAttribute('hidden', true);
  resetBtn.setAttribute('hidden', true);
  imageSection.style.opacity = '1';
  imageSection.style.pointerEvents = 'auto';
  imageSection.addEventListener('click', handleClick);

  showProducts();
}

// ── Event listeners + startup ─────────────────────────────────────
imageSection.addEventListener('click', handleClick);
resultsBtn.addEventListener('click', renderResults);
resetBtn.addEventListener('click', resetApp);

showProducts();
