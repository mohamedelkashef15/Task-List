const taskInput = document.getElementById('task'),
      filterInput = document.getElementById('filter'),
      clearBtn = document.querySelector('.clear-tasks'),
      taskList = document.querySelector('.collection'),
      form = document.getElementById('task-form');

taskInput.style.borderRadius = '4px';
filterInput.style.borderRadius = '4px';
loadEventListeners();

function loadEventListeners(){      
  document.addEventListener('DOMContentLoaded', getTasks);
  form.addEventListener('submit', runEvent);
  taskList.addEventListener('click', removeTask);
  clearBtn.addEventListener('click', removeTasks);
  filterInput.addEventListener('keyup', filterEvent);
}

//Add Get tasks to l.s
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task){   
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.style.backgroundColor = '#dddddd';
    taskList.style.width = '97%';
    taskList.style.margin = ' 0 auto 15px auto';
  
    li.appendChild(document.createTextNode(task));
  
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    link.style.cursor = 'pointer';
    li.appendChild(link);
    taskList.appendChild(li);
  })
}

function runEvent(e){
  
  if (taskInput.value === ''){
    alert('Enter New Task');
        return;
  }
  
  const li = document.createElement('li');
  li.className = 'collection-item';
  li.style.backgroundColor = '#dddddd';
  taskList.style.width = '97%';
  taskList.style.margin = ' 0 auto 15px auto';

  li.appendChild(document.createTextNode(taskInput.value));

  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fa fa-remove"></i>';
  link.style.cursor = 'pointer';
  li.appendChild(link);

  taskList.appendChild(li);
  //store in l.s
  storeInLocalStorage(taskInput.value);

  taskInput.value = '';
  console.log(li);
  e.preventDefault();
}
// create L.S function
function storeInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


function removeTask(e){
   if (e.target.parentElement.classList.contains('delete-item')){
     e.target.parentElement.parentElement.remove();
       //Remove from LS
      removeFromLocalStorage(e.target.parentElement.parentElement);
      // console.log(taskItem);
    }
}
// Remove function
function removeFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(taskInput, index){
    if(taskItem.textContent === taskInput){
      tasks.splice(index,1);
    }
  });
  localStorage.setItem('tasks' ,JSON.stringify(tasks));
}

function removeTasks(){
  taskList.innerHTML ='';

  //clear task function
  clearTasksFromLocalStorage()
}

function clearTasksFromLocalStorage(){
  localStorage.clear()
}

function filterEvent(e){
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
     const item = task.firstChild.textContent;
     if(item.toLowerCase().indexOf(text) != -1){
       task.style.display = 'block';
     }else{
       task.style.display ='none';
     }
  })
}
























// function filterEvent(e){
//   const text = e.target.value.toLowerCase();
  
//   document.querySelectorAll('.collection-item').forEach(function(task){
//     const item = task.firstChild.textContent;
//     if(item.toLowerCase().indexOf(text) != -1){
//       task.style.display = 'block';
//     }else{
//       task.style.display = 'none';
//     }
//   })
// }
      
// loadEventListeners();

// function loadEventListeners(){      
// form.addEventListener('submit', addTask)
// }

// function addTask(e){
//    if (taskInput.value === ''){
//     alert('Add Task');
//    }
//     const li = document.createElement('li');
//     li.className = 'collection-item'; 
//     li.appendChild(document.createTextNode(taskInput.value));

//     const link = document.createElement('a');
//     link.innerHTML = '<i class="fa fa-remove"></i>';
//     link.className = 'delete-item secondary-content';
//     li.appendChild(link);

//     taskList.appendChild(li);
//     taskInput.value = '';

//     console.log(li);
//     e.preventDefault();
// }


