const { expect } = require('chai');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

describe('TaskLister', function() {
  let window;
  let document;
  let taskForm;
  let taskInput;
  let taskList;

  beforeEach(function() {
    // Create a virtual DOM with basic structure
    window = new JSDOM(`<!DOCTYPE html><body><form id="create-task-form"><input id="new-task-description"><input type="submit" value="Create New Task"></form><ul id="task-list"></ul></body>`);
    document = window.document;

    // Access the form and input
    taskForm = document.getElementById('create-task-form');
    taskInput = document.getElementById('new-task-description');
    taskList = document.getElementById('task-list');

    // Simulate the script code by injecting it directly
    const script = document.createElement('script');
    script.textContent = `
      document.addEventListener('DOMContentLoaded', function() {
        const taskForm = document.getElementById('create-task-form');
        const taskInput = document.getElementById('new-task-description');
        const taskList = document.getElementById('task-list');
        
        taskForm.addEventListener('submit', function(event) {
          event.preventDefault(); // Prevent form submission behavior
          const taskDescription = taskInput.value.trim();
          if (taskDescription) {
            const taskItem = document.createElement('li');
            taskItem.textContent = taskDescription;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-btn');

            deleteButton.addEventListener('click', () => {
              taskItem.remove();
            });

            taskItem.appendChild(deleteButton);
            taskList.appendChild(taskItem);
            taskInput.value = ''; // Reset input field after adding task
          }
        });
      });
    `;
    document.body.appendChild(script);
  });

  it('should add an event to the form and add input to webpage', function(done) {
    // Simulate typing a task into the input field
    taskInput.value = 'New Task';

    // Dispatch the submit event to simulate form submission
    taskForm.dispatchEvent(new window.Event('submit'));

    // Wait for the DOM to be updated
    setTimeout(() => {
      const taskItems = taskList.getElementsByTagName('li');
      expect(taskItems.length).to.equal(1); // We should have exactly one task item
      expect(taskItems[0].textContent).to.include('New Task'); // The task text should contain "New Task"
      
      done(); // Notify Mocha that the test has completed
    }, 500); // Allow some time for the DOM to update after submitting the form
  });
});

