avascript'use strict';

// ── Constructor ───────────────────────────────────────────────────────────────
function Product(name, src) {
  this.name = name;
  this.src = src;
  this.clicks = 0;
  this.shown = 0;
}

// ── All products ──────────────────────────────────────────────────────────────
Product.all = [
  new Product('bag',        'img/bag.jpg'),
  new Product('banana',     'img/banana.jpg'),
  new Product('bathroom',   'img/bathroom.jpg'),
  new Product('boots',      'img/boots.jpg'),
  new Product('breakfast',  'img/breakfast.jpg'),
  new Product('bubblegum',  'img/bubblegum.jpg'),
  new Product('cthulhu',    'img/cthulhu.jpg'),
  new Product('chair',      'img/chair.jpg'),
  new Product('dog-duck',   'img/dog-duck.jpg'),
  new Product('dragon',     'img/dragon.jpg'),
  new Product('pen',        'img/pen.jpg'),
  new Product('pet-sweep',  'img/pet-sweep.jpg'),
  new Product('scissors',   'img/scissors.jpg'),
  new Product('shark',      'img/shark.jpg'),
  new Product('sweep',      'img/sweep.png'),
  new Product('tauntaun',   'img/tauntaun.jpg'),
  new Product('unicorn',    'img/unicorn.jpg'),
  new Product('water-can',  'img/water-can.jpg'),
  new Product('wine-glass', 'img/wine-glass.jpg'),
];

// ── State ─────────────────────────────────────────────────────────────────────
const MAX_ROUNDS = 25;
let roundsLeft = MAX_ROUNDS;
let lastThree = [];

// ── Grab DOM elements once ────────────────────────────────────────────────────
let imageSection   = document.getElementById('images');
let viewResultsBtn = document.getElementById('view-results-btn');
let resetBtn       = document.getElementById('reset-btn');
let resultsList    = document.getElementById('results-list');
let chartCanvas    = document.getElementById('myChart');
let chartInstance  = null;

// ── Helpers ───────────────────────────────────────────────────────────────────
function getRandomProduct() {
  return Product.all[Math.floor(Math.random() * Product.all.length)];
}

function pickThreeUnique() {
  let picks = [];
  while (picks.length < 3) {
    let p = getRandomProduct();
    if (!picks.includes(p) && !lastThree.includes(p)) {
      picks.push(p);
    }
  }
  lastThree = picks;
  return picks;
}

// ── Render images ─────────────────────────────────────────────────────────────
function renderImages() {
  let picks = pickThreeUnique();
  picks.forEach(p => p.shown++);

  document.getElementById('img-left').src   = picks[0].src;
  document.getElementById('img-left').alt   = picks[0].name;
  document.getElementById('img-center').src = picks[1].src;
  document.getElementById('img-center').alt = picks[1].name;
  document.getElementById('img-right').src  = picks[2].src;
  document.getElementById('img-right').alt  = picks[2].name;
}

// ── Vote handler ──────────────────────────────────────────────────────────────
function handleVote(event) {
  let clicked = event.target;
  if (clicked.tagName !== 'IMG') return;

  let voted = Product.all.find(p => p.src === clicked.src.replace(location.origin + '/', ''));
  if (!voted) voted = Product.all.find(p => p.name === clicked.alt);
  if (voted) voted.clicks++;

  roundsLeft--;

  if (roundsLeft > 0) {
    renderImages();
  } else {
    imageSection.removeEventListener('click', handleVote);
    viewResultsBtn.hidden = false;
  }
}

imageSection.addEventListener('click', handleVote);

// ── Show results ──────────────────────────────────────────────────────────────
function showResults() {
  resultsList.innerHTML = '';

  Product.all.forEach(p => {
    let li = document.createElement('li');
    li.textContent = `${p.name} had ${p.clicks} votes, and was seen ${p.shown} times.`;
    resultsList.appendChild(li);
  });

  chartCanvas.hidden = false;
  if (chartInstance) chartInstance.destroy();

  chartInstance = new Chart(chartCanvas, {
    type: 'bar',
    data: {
      labels: Product.all.map(p => p.name),
      datasets: [
        {
          label: 'Votes',
          data: Product.all.map(p => p.clicks),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
        {
          label: 'Times Seen',
          data: Product.all.map(p => p.shown),
          backgroundColor: 'rgba(153, 102, 255, 0.6)',
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { position: 'top' } },
      scales: { y: { beginAtZero: true } },
    },
  });

  viewResultsBtn.hidden = true;
  resetBtn.hidden = false;
}

// ── Reset ─────────────────────────────────────────────────────────────────────
function resetApp() {
  Product.all.forEach(p => { p.clicks = 0; p.shown = 0; });
  roundsLeft = MAX_ROUNDS;
  lastThree = [];

  resultsList.innerHTML = '';
  chartCanvas.hidden = true;
  resetBtn.hidden = true;
  viewResultsBtn.hidden = true;

  if (chartInstance) { chartInstance.destroy(); chartInstance = null; }

  imageSection.addEventListener('click', handleVote);
  renderImages();
}

// ── Wire up buttons ───────────────────────────────────────────────────────────
viewResultsBtn.addEventListener('click', showResults);
resetBtn.addEventListener('click', resetApp);

// ── Start ─────────────────────────────────────────────────────────────────────
renderImages();