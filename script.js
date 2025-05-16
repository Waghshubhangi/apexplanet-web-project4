// Section Switching Logic
function showSection(sectionId) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(sec => sec.classList.remove('active'));
  document.getElementById(sectionId).classList.add('active');
}

// Product Listing Logic
const products = [
  { name: "Smartphone", category: "electronics", price: 499, rating: 4.5 },
  { name: "Laptop", category: "electronics", price: 899, rating: 4.8 },
  { name: "JavaScript Book", category: "books", price: 29, rating: 4.2 },
  { name: "CSS Guide", category: "books", price: 19, rating: 4.0 },
];

const usdToInr = 80; // Exchange rate from USD to INR

function displayProducts(filteredProducts) {
  const container = document.getElementById('productList');
  container.innerHTML = '';
  
  filteredProducts.forEach(p => {
    const priceInINR = (p.price * usdToInr).toFixed(0); // Convert price to INR
    const div = document.createElement('div');
    div.className = 'product-card';
    div.innerHTML = `
      <h3>${p.name}</h3>
      <p>Category: ${p.category}</p>
      <p>Price: ₹${priceInINR}</p> <!-- Price in INR -->
      <p>Rating: ⭐ ${p.rating}</p>
    `;
    container.appendChild(div);
  });
}

function filterProducts() {
  const category = document.getElementById('categoryFilter').value;
  let filtered = category === 'all' ? [...products] : products.filter(p => p.category === category);
  sortProducts(filtered);
}

function sortProducts(inputList) {
  const sort = document.getElementById('sortOption').value;
  let sorted = inputList || [...products];

  switch (sort) {
    case 'priceLow':
      sorted.sort((a, b) => a.price - b.price);
      break;
    case 'priceHigh':
      sorted.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      sorted.sort((a, b) => b.rating - a.rating);
      break;
  }

  displayProducts(sorted);
}

filterProducts(); // initial display

// To-Do List Logic
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function addTask() {
  const taskInput = document.getElementById('taskInput').value;
  const dueDate = document.getElementById('dueDate').value;
  
  if (taskInput.trim()) {
    const task = { taskInput, dueDate, completed: false };
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  }
}

function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';
  
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${task.taskInput} - Due: ${task.dueDate}</span>
      <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleCompletion(${index})" />
    `;
    taskList.appendChild(li);
  });
}

function toggleCompletion(index) {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

renderTasks();



