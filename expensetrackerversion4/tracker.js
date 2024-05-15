// Get DOM elements
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const category = document.getElementById('category');
const currency = document.getElementById('currency');
const date = document.getElementById('date'); // Date input field
const list = document.getElementById('list');
const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');

// Initialize transactions array
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// Add new transaction
function addTransaction(e) {
    e.preventDefault();

    if (text.value.trim() === '' || amount.value.trim() === '' || date.value.trim() === '') {
        alert('Please add text, amount, and date');
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value,
            category: category.value,
            currency: currency.value,
            date: date.value // Include date in transaction object
        };

        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValues();
        updateLocalStorage();

        text.value = '';
        amount.value = '';
        date.value = '';
    }
}

// Generate a unique ID for each transaction
function generateID() {
    return Math.floor(Math.random() * 100000000);
}

// Add transaction to the DOM
function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');

    // Add class based on value
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    // Format date for display
    const formattedDate = new Date(transaction.date).toLocaleDateString();

    item.innerHTML = `
        ${transaction.text} [${formattedDate}] <span>${sign}${transaction.currency}${Math.abs(transaction.amount)}</span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;

    list.appendChild(item);
}

// Update the balance, income, and expense
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);

    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

    const expense = (
        amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1
    ).toFixed(2);

    balance.innerText = `${total}`;
    money_plus.innerText = `${income}`;
    money_minus.innerText = `${expense}`;
}

// Remove transaction by ID
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);

    updateLocalStorage();
    init();
}

// Update local storage transactions
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Init app
function init() {
    list.innerHTML = '';

    transactions.forEach(addTransactionDOM);
    updateValues();
}

// Initialize the app
init();

form.addEventListener('submit', addTransaction);
