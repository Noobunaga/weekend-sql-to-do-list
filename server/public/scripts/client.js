$(document).ready(function(){
    console.log('TO-Do');

    setupClickListeners();
    // load existing tasks as soon as page loads
    
    
})

function setupClickListeners(){
    $('#addButton').on('click', function(){
        console.log('click button');
        if ($('#taskIn').val() === "" ||
            $('#notesIn').val() === "" 
            ){
                alert("Need to fill all!");
                return false;
            };
        let taskToDo = {
            task: $('#taskIn').val(),
            notes: $('#notesIn').val()
        };
        saveTask(taskToDo);
        $('#taskIn').val('');
        $('#notesIn').val('';)
    });
}

function getTasks(){
    console.log('getting tasks');
    $('#viewTasks').empty();
    $.ajax({
        type: 'GET',
        url: '/tasks',
    }).then(response => {
        console.log('Got data from server', response);
        for(let i of response){
            let completeButton = "";
            if (i.ready_to_complete === false){
                completeButton = `<button class="completed-button" data-id=${i.id}>Mark as Completed,/button>`;

            } else {
                completeButton = `<button class="completed-button" data-id=${i.id}>Mark as *NOT* Completed</button>`; 
            }
            $('#viewTasks').append(`
                <tr>
                    <td>${i.task}</td>
                    <td>${i.notes}</td>
                    <td>${completeButton}</td>
                    <td><button class="delete-button" data-id=${i.id}>Delete</button></td>
                </tr>
            `);
        }
    });
}

function saveTask(taskToDo){
    console.log('saving task', taskToDo);
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: taskToDo
    }).then(function(response){
        console.log('getting tasks back');
        // need to create getTasks for getTasks();
    })
}

function deleteTask(){
    let taskId = $(this).data('id');
    if(confirm("Are you sure you want to delete this task?")){
        $.ajax({
            method: 'DELETE',
            url: `/tasks/${taskId}`
        })
        .then((response) => {
            console.log('Tasks deleted');
            getTasks();
        })
        .catch((error) => {
            alert('Could not delete tasks', error);
        });
    }
}

function updateCompleteTask(){
    let taskId = $(this).data('id');
    $.ajax({
        method: 'PUT',
        url: `/tasks/${taskId}`
    })
    .then((response) => {
        console.log('ready to complete');
        getTasks();
    })
    .catch((error) => {
        console.log('Could not update task', error);
    });
}