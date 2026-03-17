# Odd-Duck
Voting website

# Odd Duck Products

## Overview
Odd Duck Product Co. is collecting employee feedback to decide which new product to develop.  
This web app displays three products at a time and allows users to vote for their favorite.  
After 25 votes, results are shown both as a list and a chart.

---

## Features
- Displays **3 random, unique images** at a time
- Tracks:
  - Number of times each product is shown
  - Number of times each product is clicked
- Prevents immediate image repeats between rounds
- Limits voting to **25 selections**
- Displays results including:
  - Total votes
  - Times shown
  - Percentage clicked
- Visualizes results using **Chart.js**
- Reset button to restart voting

---

## Technologies Used
- HTML5
- CSS3 (Flexbox, custom styling)
- JavaScript (DOM manipulation, event handling)
- Chart.js (data visualization)

---

## Lighthouse Score

![Lighthouse Score](images/lighthouse-score.png)

---

## How to Use
1. Open the app in a browser (via Live Server recommended)
2. Click one of the three images to vote
3. Continue until 25 selections are made
4. Click **View Results** to see data and chart
5. Click **Reset** to start over

---

## Author
- AGiv 2026

---

## Notes
- All product names match their image filenames
- Images are stored locally in the `img/` folder
