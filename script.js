let btnContainer = document.querySelector(".add-sheet_btn-container");
let sheetList = document.querySelector(".sheet-list");
let firstSheet = document.querySelector(".sheet");

// ADDING CLICK EVENT FOR DEFAULT SHEET
firstSheet.addEventListener("click",makeMeActive)


//ON CLICKING ADD BUTTON A NEW SHEET IS ADDED IN SHEET LIST
btnContainer.addEventListener("click", function (e) {

    //GETTING ALL SHEETS
    let currentSheetsList = document.querySelectorAll(".sheet");
    //GETTING LAST SHEET
    let lastSheet = currentSheetsList[currentSheetsList.length - 1];
    //GETTING LAST IDX ATTRIBUTE FOR LAST SHEET
    let lastSheetIdx = lastSheet.getAttribute("idx");
    //TYPECASTING IT TO NUMBER
    lastSheetIdx = Number(lastSheetIdx);
    //MAKING NEWSHEET
    let NewSheet = document.createElement("div");
    //ADDING CLASS
    NewSheet.setAttribute("class", "sheet");

    //LAST INDEX ATTRIBUTE FROM 0
    NewSheet.setAttribute("idx", lastSheetIdx + 1);

    //SHEET NUMBER FROM 1
    NewSheet.innerText = `Sheet ${lastSheetIdx + 2}`;

    sheetList.appendChild(NewSheet);

    //BEFORE ADDING ACTIVE CLASS REMOVE ACTIVE CLASS FROM ALL ELEMENTS SINCE IT IS NOT NECESSARY TO REMOVE PREVIOUS ACTIVE SINCE WE CAN CLICK IN ANY SEQUENCE
    for (let i = 0; i < currentSheetsList.length; i++) {
        currentSheetsList[i].classList.remove("active");
    }

    // ADDING ACTIVE CLASS ON IT
    NewSheet.classList.add("active");

    //WHENEVER NEW SHEET IS CREATED ADD CLICK LISTENER FOR TRANSITION
    NewSheet.addEventListener("click", makeMeActive);

})














// HELPER FUNCTION
function makeMeActive(e) {
    let sheet = e.currentTarget;
    let currentSheetsList = document.querySelectorAll(".sheet");
    for (let i = 0; i <currentSheetsList.length; i++) {
        currentSheetsList[i].classList.remove("active");   
    }
    sheet.classList.add("active");
}



