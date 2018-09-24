//Define variables
const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')

// Add task
const addTask = (e) => {
   if(taskInput.value === ''){
      alert('Add a task')
   }
   else {
      //create an li element
      const li = document.createElement('li')
      // add a class
      li.className = 'collection-item'
      // create text node and appened to li
      li.appendChild(document.createTextNode(taskInput.value))
      // create new link element
      const link = document.createElement('a')
      // add class
      link.className = 'delete-item secondary-content'
      // add icon html icon
      link.innerHTML = '<i class="fa fa-remove"></i>'
      // append link to li
      li.appendChild(link)

      // append li to ul
      taskList.appendChild(li)

      // clear input
      taskInput.value = ''

      e.preventDefault()
   }
}

const removeTask = e => {
   if(e.target.parentElement.classList.contains('delete-item')) {
      if(confirm('Are you sure?')) {
         e.target.parentElement.parentElement.remove()
      }
   }
}

const clearAll = () => {
   if(confirm('Clear all items?')) {
      while(taskList.firstChild) {
         taskList.removeChild(taskList.firstChild)
      }
   }
}

const filterTasks = (e) => {
   const text = e.target.value.toLowerCase()
   // querySelectorAll is used because it returns a node list and we can then use a forEach loop.  The goal here is to filter the content through the filter text box.  Here we select all items with the calls name 'collection-item' and run a forEach loop, giving them a new name of tasks.  Then we access the text content of the first child which is the text and assign it to another variable.
   document.querySelectorAll('.collection-item').forEach( task => {
      const item = task.firstChild.textContent
      // if there is no march then 
      if(item.toLowerCase().indexOf(text) != -1) {
         task.style.display = 'block'
      }
      else {
         task.style.display = 'none'
      }
   })
}

//load all event listeners
const loadEventListeners = () => {
   // add task event
   form.addEventListener('submit', addTask)
   // remove task event
   taskList.addEventListener('click', removeTask)
   // clear all tasks
   clearBtn.addEventListener('click', clearAll)
   // filter items
   filter.addEventListener('keyup', filterTasks)

}

// load all event listeners

loadEventListeners()