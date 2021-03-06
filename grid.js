let leftCol = document.querySelector(".left-col");
let topRow = document.querySelector(".top-row");
let grid = document.querySelector(".grid");
let addressBar = document.querySelector(".address-input");
let boldBtn = document.querySelector(".bold");
let italicBtn = document.querySelector(".italic");
let underlineBtn = document.querySelector(".underline");
let sortBtn = document.querySelector(".sort-btn");
let alignContainer = document.querySelectorAll(".align-container > *");
let fontSize = document.querySelector(".font-size");
let fontFamily = document.querySelector(".font-family");
let leftBtn = document.querySelector(".left");
let centerBtn = document.querySelector(".center");
let rightBtn = document.querySelector(".right");
let formulaBar = document.querySelector(".formula-input");

// console.log(fontFamily);

let rows = 100;
let column = 26;

let previousLeftColElement = -1;
let previousTopRowElement = -1;

let lastClickedTopRow = -1;
let isTopRowSelected = false;
let lastClickedCell = -1;


//MAKING OBJECT FOR EVERY CELL IN OUR WORKSHEET
//THIS WILL HELP US WHEN WE WILL CHANGE WORKSHEET 1->2 ->3 AND SO ON
let sheetDb = [];

for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < column; j++) {
        let cellProps = {
            bold: "normal",
            italic: "normal",
            underline: "none",
            align: "center",
            fontFamily: "Verdana",
            fontSize: "16",
            color: "black",
            backgroundColor: "white",
            value: "",
            formula: "",
            children: []
        };
        row.push(cellProps);
    }
    sheetDb.push(row);
}





//On ESC Reset All
document.addEventListener("keydown", function () {
    if (lastClickedTopRow != -1)
        removeSelectionOnCol(lastClickedCell, lastClickedTopRow);
    isTopRowSelected = false;
});


// LEFT COLUMN 1,2,3.......100
for (let i = 0; i < rows; i++) {
    let cell = document.createElement("div");
    cell.innerText = i + 1;
    // cell.setAttribute();
    cell.classList.add("box");
    leftCol.appendChild(cell);
}

let arrayOfAllLeftColElements = document.querySelectorAll(".box");
// console.log(arrayOfAllLeftColElements);


//TOP ROW A,B,C.......Z
for (let i = 0; i < column; i++) {
    let chr = String.fromCharCode(65 + i);
    let cell = document.createElement("div");
    cell.innerText = chr;
    cell.classList.add("boxCol");
    topRow.appendChild(cell);

}

let arrayOfAllTopRowElements = document.querySelectorAll(".boxCol");
// console.log(arrayOfAllTopRowElements);




//GRID A1,A2,..........
for (let i = 0; i < rows; i++) {
    let row = document.createElement("div");
    // row.classList.add("");
    row.classList.add("row");
    // row.setAttribute("class", "row");
    for (let j = 0; j < column; j++) {
        let cell = document.createElement("div");
        // cell.innerText = `${String.fromCharCode(65 + j)} ${i + 1}`;
        cell.setAttribute("rid", i);
        cell.setAttribute("cid", j);
        cell.setAttribute("contenteditable", "true");
        cell.classList.add("cell");
        row.appendChild(cell);

        cell.addEventListener("click", function () {
            // cell.focus();
            let row = cell.getAttribute("rid");
            let col = cell.getAttribute("cid");
            // console.log(row);
            row = Number(row);
            col = Number(col);
            // console.log(typeof col);

            // console.log(sheetDb);
            let cellProp = sheetDb[row][col];
            console.log(cellProp);


            row = Number(row) + 1;
            col = String.fromCharCode(65 + j);


            // CHECKING THE STATE WHEN WE CLICK ON CELL
            // --> IS IT BOLD??? AND THEN CHANGING THE BUTTONS PRESSED ACCORDINGLY
            if (cellProp.bold == "normal") {
                boldBtn.classList.remove("active-btn");
            }
            else {
                boldBtn.classList.add("active-btn");
            }
            // --> IS IT ITALIC??? AND THEN CHANGING THE BUTTONS PRESSED ACCORDINGLY
            if (cellProp.italic == "normal") {
                italicBtn.classList.remove("active-btn");
            }
            else {
                italicBtn.classList.add("active-btn");
            }

            // --> IS IT UNDERLINE??? AND THEN CHANGING THE BUTTONS PRESSED ACCORDINGLY
            if (cellProp.underline == "none") {
                underlineBtn.classList.remove("active-btn");
            }
            else {
                underlineBtn.classList.add("active-btn");
            }


            // console.log(col + row);
            addressBar.value = `${col}${row}`;
            if (previousLeftColElement != -1 && previousTopRowElement != -1) {
                arrayOfAllLeftColElements[previousLeftColElement].classList.remove("focused-cell");
                arrayOfAllTopRowElements[previousTopRowElement].classList.remove("focused-cell");
            }
            let iForLeftColEffect = Number(row);
            let jForTopRowEffect = Number(j);
            previousLeftColElement = iForLeftColEffect;
            previousTopRowElement = jForTopRowEffect;
            arrayOfAllLeftColElements[iForLeftColEffect].classList.add("focused-cell");
            arrayOfAllTopRowElements[jForTopRowEffect].classList.add("focused-cell");
        });
    }
    grid.appendChild(row);
}

//LOOPING ON EVERY ROW AND GETTING EACH COLUMN NODE

let completeGrid = [];
let allRows = document.querySelectorAll(".row");
for (let i = 0; i < rows; i++) {
    let rowContent = []
    for (let j = 0; j < allRows[i].children.length; j++) {
        rowContent.push(allRows[i].children[j]);
    }
    completeGrid.push(rowContent);
}

completeGrid[0][0].click();
completeGrid[0][0].focus();

//ADDING CLICK LISTENER ON TOP ROW

for (let i = 0; i < column; i++) {
    let cell = arrayOfAllTopRowElements[i];
    //FOR EVERY NEW LISTENER  CURRENTCELL VARIABLE  WILL BE NEW VARIABLE AND WILL BE INDEPENDEDNT OF OTHER CALLBACK
    let currentCell = false;
    cell.addEventListener("click", function () {
        if (currentCell == false && isTopRowSelected == false) {
            addSelectionOnCol(cell, i);
            isTopRowSelected = true;
        }
        else if (currentCell == false && isTopRowSelected == true) {
            removeSelectionOnCol(lastClickedCell, lastClickedTopRow);
            addSelectionOnCol(cell, i);
            isTopRowSelected = true;
        }
        else if (currentCell == true && isTopRowSelected == true) {
            removeSelectionOnCol(lastClickedCell, lastClickedTopRow);
            // addSelectionOnCol(cell, i);
            isTopRowSelected = false;
        }
        else {
            addSelectionOnCol(cell, i);
            isTopRowSelected = true;
        }
        currentCell = !currentCell;

    });
}

let allElementInThatRow = [];

function addSelectionOnCol(cell, i) {
    allElementInThatRow = [];
    lastClickedTopRow = i;
    lastClickedCell = cell;
    cell.classList.add("onselect")
    for (let j = 0; j < rows; j++) {
        if (j == 0) {
            completeGrid[j][i].classList.add("selected-first");
            allElementInThatRow.push(completeGrid[j][i].innerText);
        }
        else if (j == 99) {
            completeGrid[j][i].classList.add("selected-last");
            allElementInThatRow.push(completeGrid[j][i].innerText);
        }
        else {
            completeGrid[j][i].classList.add("selected-between");
            allElementInThatRow.push(completeGrid[j][i].innerText);
        }
    }
    console.log(allElementInThatRow);
}

function removeSelectionOnCol(cell, i) {
    lastClickedTopRow = -1;
    lastClickedCell = -1;
    cell.classList.remove("onselect")
    for (let j = 0; j < rows; j++) {
        if (j == 0) {
            completeGrid[j][i].classList.remove("selected-first");
        }
        else if (j == 99) {
            completeGrid[j][i].classList.remove("selected-last");

        }
        else {
            completeGrid[j][i].classList.remove("selected-between");
        }
    }
}

//SORTING
// numArray.sort((a, b) => a - b);
sortBtn.addEventListener("click", function (e) {
    // allElementInThatRow converted to integer
    if (lastClickedTopRow == -1) {
        console.log("ERROR NO COLUMN SELECTED!!!!!!!!!!!!!!!!!!!!!!");
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: ' You Didn\'t Select Any Column ',
        })
    }
    else {
        let allNumbersInThatRow = [];
        for (let i = 0; i < rows; i++) {
            if (allElementInThatRow[i] == "") {
                break;
            }
            allNumbersInThatRow.push(Number(allElementInThatRow[i]));
        }
        allNumbersInThatRow.sort((a, b) => a - b);
        console.log("allNumbersInThatRow", allNumbersInThatRow);
        console.log("last clicked", lastClickedTopRow);
        for (let i = 0; i < allNumbersInThatRow.length; i++) {
            completeGrid[i][lastClickedTopRow].innerHTML = allNumbersInThatRow[i];
            // console.log(completeGrid[i][lastClickedTopRow]);
        }
    }

})





// BUI CONTAINER ACTIVATED

//BOLD ACTIVATED

boldBtn.addEventListener("click", function () {
    let cell = findUICell();
    let address = addressBar.value;
    let ridcid = convertToRidCid(address);

    let rid = ridcid.rid;
    let cid = ridcid.cid;

    let cellProp = sheetDb[rid][cid];

    if (cellProp.bold == "normal") {
        //BUTTON MAI CHANGE KARO
        boldBtn.classList.add("active-btn");
        //UI MAI CHANGES LAO
        cell.style.fontWeight = "bold";
        //BEHIND THE SCENE WALI CHIZ MAI CHANGES LAO
        cellProp.bold = "bold";
    }
    else {
        //BUTTON MAI CHANGE KARO
        boldBtn.classList.remove("active-btn");
        //UI MAI CHANGES LAO
        cell.style.fontWeight = "normal";
        //BEHIND THE SCENE WALI CHIZ MAI CHANGES LAO
        cellProp.bold = "normal";
    }
})

//ITALIC ACTIVATED

italicBtn.addEventListener("click", function () {
    let cell = findUICell();
    let address = addressBar.value;

    let ridcid = convertToRidCid(address);

    let rid = ridcid.rid;
    let cid = ridcid.cid;

    let cellProp = sheetDb[rid][cid];

    if (cellProp.italic == "normal") {
        italicBtn.classList.add("active-btn");
        cell.style.fontStyle = "italic";
        cellProp.italic = "italic";
    }
    else {
        italicBtn.classList.remove("active-btn");
        cell.style.fontStyle = "normal";
        cellProp.italic = "normal";
    }

})

//UNDERLINE ACTIVATED

underlineBtn.addEventListener("click", function () {
    let cell = findUICell();

    let address = addressBar.value;

    let ridcid = convertToRidCid(address);

    let rid = ridcid.rid;
    let cid = ridcid.cid;

    let cellProp = sheetDb[rid][cid];

    if (cellProp.underline == "none") {
        underlineBtn.classList.add("active-btn");
        cell.style.textDecoration = "underline";
        cellProp.underline = "italic";
    }
    else {
        underlineBtn.classList.remove("active-btn");
        cell.style.textDecoration = "none";
        cellProp.underline = "none";
    }
})


// ALIGN CONTAINER ACTIVATED

for (let i = 0; i < alignContainer.length; i++) {
    alignContainer[i].addEventListener("click", function () {

        let alignProperty = alignContainer[i].getAttribute("class");
        let element = findUICell();
        element.style.textAlign = alignProperty;
    })
}

//SIZE DROPDOWN ACTIVATED

fontSize.addEventListener("change", function () {
    let selectedValue = fontSize.value;
    let element = findUICell();
    element.style.fontSize = selectedValue + "px";
});


//FONT FAMILY ACTIVATED

fontFamily.addEventListener("change", function () {
    let selectedValue = fontFamily.value;
    let element = findUICell();
    element.style.fontFamily = selectedValue;

})


//HELPER FUNCTIONS

function convertToRidCid(address) {
    let cid = Number(address.charCodeAt(0)) - 65;
    let rid = Number(address.slice(1)) - 1;
    return { "rid": rid, "cid": cid };

}

//RETURNS THE CELL WHICH IS PRESENT IN ADDRESS BOX
function findUICell() {
    let address = addressBar.value;
    let ridcid = convertToRidCid(address);
    let cell = document.querySelector(`.cell[rid="${ridcid.rid}"][cid="${ridcid.cid}"]`);
    return cell;
}



// ################################### NOTES ##############################
// to select all cells we can also do document.querySelectorAll(".grid .cell")