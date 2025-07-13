const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const errorEl = document.getElementById('error');
const showCompletedCheck = document.getElementById('showCompleted');

taskForm.addEventListener('submit', function (e) {
  e.preventDefault();
  errorEl.textContent = '';

  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();
  const priority = document.querySelector('input[name="priority"]:checked');

  try {
    if (!title) throw new Error("Başlık boş bırakılamaz!");
    if (!priority) throw new Error("Lütfen bir öncelik seçin!");

    const task = {
      id: Date.now(),
      title,
      description,
      priority: priority.value,
      completed: false
    };

    addTaskToDOM(task);
    taskForm.reset();
  } catch (err) {
    errorEl.textContent = err.message;
  }
});

function addTaskToDOM(task) {
  const li = document.createElement('li');
  li.dataset.id = task.id;
  if (task.completed) li.classList.add('completed');

  li.innerHTML = `
    <strong>${task.title}</strong> <span class="task-meta">(${task.priority})</span>
    <div class="task-meta">${task.description}</div>
    <div class="actions">
      <button class="complete-btn" title="Tamamla">✅</button>
      <button class="delete-btn" title="Sil">🗑️</button>
    </div>
  `;

  taskList.appendChild(li);
}

taskList.addEventListener('click', function (e) {
  e.stopPropagation();
  const li = e.target.closest('li');
  if (!li) return;

  if (e.target.classList.contains('complete-btn')) {
    li.classList.toggle('completed');
  }

  if (e.target.classList.contains('delete-btn')) {
    li.remove();
  }
});

showCompletedCheck.addEventListener('change', function () {
  const showOnlyCompleted = this.checked;
  const allTasks = taskList.querySelectorAll('li');
  allTasks.forEach(li => {
    const isCompleted = li.classList.contains('completed');
    li.style.display = (showOnlyCompleted && !isCompleted) ? 'none' : 'block';
  });
});
