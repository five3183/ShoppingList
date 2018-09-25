//Define variables
const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')

const storeInLocalStorage = task => {
   let tasks
   // check local storage for items. If there are none set local storage tasks to an empty array.  
   if(localStorage.getItem('tasks') === null) {
      tasks = []
   }
   // if there are items in local storage.  they are saved as a string and need to be paresed into an array.
   else {
      tasks = JSON.parse(localStorage.getItem('tasks'))
   }

   tasks.push(task)

   // parse the tasks array into a string so that it can be stored in local storage.  
   localStorage.setItem('tasks', JSON.stringify(tasks))

}

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

      //Store in local storage 
      storeInLocalStorage(taskInput.value)
      // clear input
      taskInput.value = ''

      e.preventDefault()
   }
}

const removeTaskFromLocalStorage = taskItem => {
   // get all tasks from local storage.  then run a for each loop to compare the taskItem to the array.  Then splice the array at the index of the taskItem. Then reset local storage. 
   let tasks = JSON.parse(localStorage.getItem('tasks'))
   let item = taskItem.textContent
   tasks.forEach((task, index) => {
      if(item === task) {
         tasks.splice(index, 1)
      }
   })

   localStorage.setItem('tasks', JSON.stringify(tasks))
}


const removeTask = e => {
   if(e.target.parentElement.classList.contains('delete-item')) {
      if(confirm('Are you sure?')) {
         e.target.parentElement.parentElement.remove()
         // remove from local storage
         removeTaskFromLocalStorage(e.target.parentElement.parentElement)
      }
   }
}

const clearAll = () => {
   if(confirm('Clear all items?')) {
      while(taskList.firstChild) {
         taskList.removeChild(taskList.firstChild)
      }
   }
   localStorage.clear()
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
// get items out of local storage
const getTasks = () => {
   let tasks
   if(localStorage.getItem('tasks') === null) {
      tasks = []
   }
   else {
      tasks = JSON.parse(localStorage.getItem('tasks'))
   }
   tasks.forEach(task => {
      //create an li element
      const li = document.createElement('li')
      // add a class
      li.className = 'collection-item'
      // create text node and appened to li
      li.appendChild(document.createTextNode(task))
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
   })
}
//load all event listeners
const loadEventListeners = () => {
   //DOM load event
   document.addEventListener('DOMContentLoaded', getTasks)
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