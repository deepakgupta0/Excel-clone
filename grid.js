let leftCol = document.querySelector(".left-col");
let topRow = document.querySelector(".top-row");
let rows = 100;
let column = 26;


for(let i = 0;i<rows;i++)
{
    let cell = document.createElement("div");
    cell.innerText = i+1;
    // cell.setAttribute();
    cell.classList.add("box");
    leftCol.appendChild(cell);
}
for(let i = 0;i<column;i++)
{
    let chr = String.fromCharCode(65 + i);
    let cell = document.createElement("div");
    cell.innerText = chr;
    cell.classList.add("boxCol");
    topRow.appendChild(cell);
}