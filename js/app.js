/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */
(function() {
    if (!localStorage.attendance) {
        console.log('Creating attendance records...');
        function getRandom() {
            return (Math.random() >= 0.5);
        }

        var nameColumns = $('tbody .name-col'),
            attendance = {};

        nameColumns.each(function() {
            var name = this.innerText;
            attendance[name] = [];

            for (var i = 0; i <= 11; i++) {
                attendance[name].push(getRandom());
            }
        });

        localStorage.attendance = JSON.stringify(attendance);
    }
}());


/* STUDENT APPLICATION */
$(function() {
    var attendance = JSON.parse(localStorage.attendance),
        $allMissed = $('tbody .missed-col'),
        $allCheckboxes = $('tbody input');

    // Count a student's missed days
    function countMissing() {
        $allMissed.each(function() {
            var studentRow = $(this).parent('tr'),
                dayChecks = $(studentRow).children('td').children('input'),
                numMissed = 0;

            dayChecks.each(function() {
                if (!$(this).prop('checked')) {
                    numMissed++;
                }
            });

            $(this).text(numMissed);
        });
    }
    
        // Check boxes, based on attendace records
        $.each(attendance, function(name, days) {
            var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
                dayChecks = $(studentRow).children('.attend-col').children('input');

            dayChecks.each(function(i) {
                $(this).prop('checked', days[i]);
            });
        });
        // Check boxes, based on attendace records
    function buildTable(){
        // my code to generate table
        var tblBody = document.createElement("tbody");
        $.each(attendance, function(name, days) {
            var tr = document.createElement('tr');
            tr.className ="student"
            var td = document.createElement('td');
            td.class  = "name-col";
            td.innerHTML = name;
            console.log(td);
            tr.appendChild(td);
            var dayscount = 0;
            for(i = 0; i < days.length; i++) {
                td = document.createElement('td');
                td.className = "attend-col";
    
                var input = document.createElement("input");
                input.type = "checkbox";
                input.checked = days[i];
                dayscount = dayscount + days[i];
               
                td.appendChild(input);
                tr.appendChild(td);
            }
            attendance[name].dayscount = dayscount;
            td = document.createElement('td');
            td.className = "missed-col";
            td.innerHTML = dayscount;
            tr.appendChild(td);
            
    
            tblBody.appendChild(tr);
            // my code to generate table
    
            var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
                dayChecks = $(studentRow).children('.attend-col').children('input');
    
            dayChecks.each(function(i) {
                $(this).prop('checked', days[i]);
            });
        });
        var table = document.getElementById("my-table");
        table.appendChild(tblBody);
    }
    
    // When a checkbox is clicked, update localStorage
    $allCheckboxes.on('click', function() {
        var studentRows = $('tbody .student'),
            newAttendance = {};

        studentRows.each(function() {
            var name = $(this).children('.name-col').text(),
                $allCheckboxes = $(this).children('td').children('input');

            newAttendance[name] = [];

            $allCheckboxes.each(function() {
                newAttendance[name].push($(this).prop('checked'));
            });
        });

        countMissing();
        localStorage.attendance = JSON.stringify(newAttendance);
    });

    countMissing();
    buildTable();
}());
