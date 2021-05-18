let allCells = document.querySelectorAll(".grid .cell");
// console.log(allCells);


//SAVING VALUE IN DB FOR LATER USE
for (let i = 0; i < allCells.length; i++) {
    //PEHLE BLUR EVENT CALL HOGA USKE BAADMAI CLICK
    allCells[i].addEventListener("blur", function () {
        let data = allCells[i].innerText;
        let address = addressBar.value;
        let { rid, cid } = convertToRidCid(address);
        sheetDb[rid][cid].value = data;
        // console.log(address);
        // sheetDb[][].value = data;       
    })
    // console.log(allCells[i]+"\n");
}


formulaBar.addEventListener("keydown", function (e) {
    if (e.key == "Enter" && formulaBar.value) {
        //FETCHING USER ENTERED FORMULA
        let formula = formulaBar.value;
        // EVALUATING THE FORMULA USER ENTERED
        let value = evaluateFormula(formula);
        //GIVEN FOR WHICH WE ARE SETTING THE FORMULA -> UI, DB UPDATE
        setValue(formula, value);

        let children = addressBar.value;
        //ADD CHILDREN( JO ADDRESS BAR KA VALUE HAI ) TO PARENT( FORMULA MAI JO LIKH RAHE HAI ) 
        setParentChildArray(formula, children);
    }
})

function evaluateFormula(formula) {

    // ( A1 + A2 )
    // [(,A1,+,A2,)]

    let formulaToken = formula.split(" ");

    for (let i = 0; i < formulaToken.length; i++) {
        let token = formulaToken[i];
        let ascii = token.charCodeAt(0);
        // IF TOKEN START IS A ALPHABET THAT MEANS IT IS CELL
        if (ascii >= 65 && ascii <= 90) {
            let { rid, cid } = convertToRidCid(formulaToken[i]);
            let value = sheetDb[rid][cid].value;
            formulaToken[i] = value;
        }
    }
    // [(,10,+,20,)]
    let stringExpression = formulaToken.join(" ");
    // console.log(stringExpression);
    return eval(stringExpression);

}

function setValue(formula, value) {
    //DB UPDATE
    let address = addressBar.value;
    let { rid, cid } = convertToRidCid(address);
    sheetDb[rid][cid].value = value;
    sheetDb[rid][cid].formula = formula;

    //UI UPDATE
    let cell = findUICell();
    cell.innerText = value;
}

function setParentChildArray(formula, children) {
    let formulaToken = formula.split(" ");

    for (let i = 0; i < formulaToken.length; i++) {
        let token = formulaToken[i];
        let ascii = token.charCodeAt(0);
        // IF TOKEN START IS A ALPHABET THAT MEANS IT IS CELL
        if (ascii >= 65 && ascii <= 90) {
            let { rid, cid } = convertToRidCid(formulaToken[i]);
            sheetDb[rid][cid].children.push(children);
        }
    }

}
