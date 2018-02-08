var model = {
    items:
        [
            {
                name: "Slappy the Frog",
                attendance: [],
                total: 0
            }, {
                name: "Lilly the Lizard",
                attendance: [],
                total: 0
            }, {
                name: "Paulrus the Walrus",
                attendance : [],
                total: 0
            }, {
                name: "Gregory the Goat",
                attendance: [],
                total: 0
            }, {
                name: "Adam the Anaconda",
                attendance: [],
                total: 0
            }
        ],
    init: function () {
        console.log('Creating Model...');
        function getRandom() {
            return (Math.random() >= 0.5);
        }

        for (i = 0; i < this.items.length; i++) {
            for (d = 0; d <= 11; d++) {
                var bool = getRandom();
                this.items[i].total += bool ? 1 : 0;
                this.items[i]["attendance"].push(bool);
            }
        };
    }
}

var octopus = {
    getItems: function () {
        return model.items;
    },
    setItemByName: function(searchedName, checked){
        for (j = 0; j < octopus.getItems().length; j++) {
            var item = octopus.getItems()[j];
            var name = item["name"];
            if(name == searchedName){
                item["total"] += checked ? 1 : -1;
            }
        }
        return null;
    },
    getItemByName: function(searchedName, checked){
        for (j = 0; j < octopus.getItems().length; j++) {
            var item = octopus.getItems()[j];
            var name = item["name"];
            if(name == searchedName){
                return item;
            }
        }
        return null;
    }
}

ViewTable = {
    init: function () {
        // my code to generate table
        var tblBody = document.createElement("tbody");
        for (j = 0; j < octopus.getItems().length; j++) {
            var item = octopus.getItems()[j];
            var name = item["name"];
            var days = item["attendance"];
            var total = item["total"];

            var tr = document.createElement('tr');
            tr.className = "student"
            var td = document.createElement('td');
            td.class = "name-col";
            td.innerHTML = name;
            
            tr.appendChild(td);
            for (i = 0; i < days.length; i++) {
                td = document.createElement('td');
                td.className = "attend-col";

                var input = document.createElement("input");
                input.type = "checkbox";
                input.checked = days[i];
                input.addEventListener('click', (function(searchTerm){
                    return function() {                        
                        octopus.setItemByName(searchTerm, this.checked);
                        console.log(this.parentNode.children[this.parentNode.children.length - 1]);
                        this.parentNode.children[this.parentNode.children.length - 1].innerHTML = octopus.getItemByName(searchTerm).total;  
                        ViewTable.render();              
                    };
                })(name)
             );

                td.appendChild(input);
                tr.appendChild(td);
            }
            
            td = document.createElement('td');
            td.className = "missed-col";
            td.innerHTML = total;
            tr.appendChild(td);


            tblBody.appendChild(tr);
        }
        var table = document.getElementById("my-table");
        table.appendChild(tblBody);
        this.render();
    },
    render: function(){
        var items = octopus.getItems();
        var table = document.getElementById("my-table");
        for (var i = 1, row; row = table.rows[i]; i++) {
            //iterate through rows
            //rows would be accessed using the "row" variable assigned in the for loop
            row.cells[row.cells.length-1].innerHTML = items[i-1]["total"];
            
         }
        
        
    }
}


model.init();
ViewTable.init();