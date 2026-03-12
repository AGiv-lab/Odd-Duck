'use strict'

document.getElementById('img1').src = randomProduct.src;

Product.all = [];

function Product(name, src) {
  this.name = name;
  this.src = src;
  this.timesShown = 0;
  this.timesClicked = 0;
  Product.all.push(this);
}

// ── Phase 1: Instantiate all products ────────────────────────────

new Product('bag',            'img/bag.jpg');
new Product('banana',         'img/banana.jpg');
new Product('bathroom',       'img/bathroom.jpg');
new Product('boots',          'img/boots.jpg');
new Product('breakfast',      'img/breakfast.jpg');
new Product('bubblegum',      'img/bubblegum.jpg');
new Product('chair',          'img/chair.jpg');
new Product('cthulhu',        'img/cthulhu.jpg');
new Product('dog-duck',       'img/dog-duck.jpg');
new Product('dragon',         'img/dragon.jpg');
new Product('pen',            'img/pen.jpg');
new Product('pet-sweep',      'img/pet-sweep.jpg');
new Product('scissors',       'img/scissors.jpg');
new Product('shark',          'img/shark.jpg');
new Product('sweep',          'img/sweep.png');
new Product('tauntaun',       'img/tauntaun.jpg');
new Product('unicorn',        'img/unicorn.jpg');
new Product('usb',            'img/usb.jpg');
new Product('water-can',      'img/water-can.jpg');
new Product('wine-glass',     'img/wine-glass.jpg');
