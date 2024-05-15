const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const currencySelect = document.getElementById('currency'); // New element

// Add a currency selection element to the form
const currencyOptions = {
  USD: '$',
  EUR: '€',
  INR: '₹', // Indian Rupee
  // Add more currencies with their symbols
};

const select = document.createElement('select');
select.id = 'currency';
select.name = 'currency';

Object.keys(currencyOptions).forEach(currency => {
  const option = document.createElement('option');
  option.value = currency;
  option.innerText = currency;
  select.appendChild(option);
});

form.insertBefore(select, amount.nextSibling); // Insert after amount input

let selectedCurrency = 'USD'; // Default currency

// Update currency symbol based on selection
currencySelect.addEventListener('change', (e) => {
  selectedCurrency = e.target.value;
});

// ... rest of your existing code ...

// Update the balance, income and expense with currency symbol
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `${currencyOptions[selectedCurrency]}${total}`;
  money_plus.innerText = `${currencyOptions[selectedCurrency]}${income}`;
  money_minus.innerText = `${currencyOptions[selectedCurrency]}${expense}`;
}
