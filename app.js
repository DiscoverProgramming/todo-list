document.getElementById('todo-form').addEventListener('submit', function (event) {
    // Prevent the form from submitting normally
    event.preventDefault();

    // Get the input field and the todo list
    var input = document.getElementById('todo-input');
    var list = document.getElementById('todo-list');

    // Create a new list item
    var newItem = document.createElement('li');

    // Create a new div and add it to the list item
    var div = document.createElement('div');
    div.classList.add('custom-checkbox');
    var icon = document.createElement('i');
    icon.classList.add('bx', 'bx-check');
    div.appendChild(icon);
    div.addEventListener('click', function () {
        this.classList.toggle('checked');
        newItem.classList.toggle('completed');
    });
    newItem.appendChild(div);

    // Create a new span, set its text to the input value, and add it to the list item
    var span = document.createElement('span');
    span.textContent = input.value;
    newItem.appendChild(span);

    // Create a new button, set its text to 'Delete', and add it to the list item
    var button = document.createElement('button');
    button.textContent = 'Delete';
    button.addEventListener('click', function () {
        // Get the height of the item being deleted
        var height = newItem.offsetHeight;

        // Add the deleting class to start the animation
        newItem.classList.add('deleting');

        // Temporarily set the margin-bottom of the remaining items to the height of the deleted item
        var items = list.querySelectorAll('li:not(.deleting)');
        items.forEach(function (item) {
            item.style.marginBottom = height + 'px';
        });

        // Wait for a frame to let the browser update the margin-bottom
        requestAnimationFrame(function () {
            // Then set the margin-bottom to 0 to start the animation
            items.forEach(function (item) {
                item.style.marginBottom = '0';
            });
        });

        // Wait for the animation to finish
        setTimeout(function () {
            // Remove the item from the DOM
            list.removeChild(newItem);

            // Reset the margin-bottom of the remaining items
            items.forEach(function (item) {
                item.style.marginBottom = '';
                item.classList.add('slide-up'); // Add the slide-up class
            });
        }, 300); // The duration of the animation in milliseconds
    });
    newItem.appendChild(button);

    // Add the new item to the top of the todo list
    list.prepend(newItem);

    // Clear the input field
    input.value = '';

    // Save the updated todo list to local storage
    localStorage.setItem('todoList', list.innerHTML);
});

// When the page loads, load the todo list from local storage
document.addEventListener('DOMContentLoaded', function () {
    var list = document.getElementById('todo-list');
    var savedList = localStorage.getItem('todoList');

    if (savedList) {
        list.innerHTML = savedList;

        // Re-attach event listeners
        var items = list.querySelectorAll('li');
        items.forEach(function (item) {
            var checkbox = item.querySelector('.custom-checkbox');
            var button = item.querySelector('button');

            checkbox.addEventListener('click', function () {
                this.classList.toggle('checked');
                item.classList.toggle('completed');
            });

            button.addEventListener('click', function () {
                // Get the height of the item being deleted
                var height = item.offsetHeight;

                // Add the deleting class to start the animation
                item.classList.add('deleting');

                // Temporarily set the margin-bottom of the remaining items to the height of the deleted item
                var remainingItems = list.querySelectorAll('li:not(.deleting)');
                remainingItems.forEach(function (remainingItem) {
                    remainingItem.style.marginBottom = height + 'px';
                });

                // Wait for a frame to let the browser update the margin-bottom
                requestAnimationFrame(function () {
                    // Then set the margin-bottom to 0 to start the animation
                    remainingItems.forEach(function (remainingItem) {
                        remainingItem.style.marginBottom = '0';
                    });
                });

                // Wait for the animation to finish
                setTimeout(function () {
                    // Remove the item from the DOM
                    list.removeChild(item);

                    // Reset the margin-bottom of the remaining items
                    remainingItems.forEach(function (remainingItem) {
                        remainingItem.style.marginBottom = '';
                        remainingItem.classList.add('slide-up'); // Add the slide-up class
                    });

                    // Save the updated todo list to local storage
                    localStorage.setItem('todoList', list.innerHTML);
                }, 300); // The duration of the animation in milliseconds
            });
        });
    }
});