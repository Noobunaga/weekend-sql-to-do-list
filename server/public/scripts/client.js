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