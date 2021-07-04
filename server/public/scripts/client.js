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