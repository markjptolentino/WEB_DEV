const todoInput = document.getElementById('todoInput');
const addButton = document.getElementById('addButton');
const todoList = document.getElementById('todoList');
let todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function createTodoElement(todo, index) {
  const li = document.createElement('li');
  li.className = 'flex justify-between items-center p-2 bg-white bg-opacity-20 rounded mb-2 transition-all';
  li.innerHTML = `
    <span>${todo}</span>
    <button class="remove-button bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded" data-index="${index}">X</button>
  `;
  return li;
}

function show() {
  todoList.innerHTML = '';
  todos.forEach((todo, index) => {
    todoList.appendChild(createTodoElement(todo, index));
  });
  const removeButtons = document.querySelectorAll('.remove-button');
  removeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const index = e.target.dataset.index;
      const li = e.target.parentElement;
      li.style.opacity = '0';
      setTimeout(() => {
        todos.splice(index, 1);
        saveTodos();
        show();
      }, 300);
    });
  });
}

addButton.addEventListener('click', () => {
  const todo = todoInput.value.trim();
  if (todo) {
    todos.push(todo);
    saveTodos();
    show();
    todoInput.value = '';
    confetti({ particleCount: 100, spread: 70 });
    new Audio('https://cdn.pixabay.com/audio/2022/03/24/02-47-00-462_96k.mp3').play();
  }
});

todoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addButton.click();
});

show();