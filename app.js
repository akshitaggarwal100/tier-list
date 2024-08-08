const languages = ["horror", "Adventure", "Sci-Fi", "Fiction", "Animation", "Biography", "horror", "Adventure", "Sci-Fi", "Fiction", "Animation", "Biography"]
let count = -1
const rows = document.querySelectorAll(".row")
const noOfRows = rows.length
let rowNo = 0
let isFloating = false

function random(num) {
    return Math.floor(Math.random() * (num + 1))
}

function generateBox(text) {
    if (count < languages.length) {
        const color = `rgb(${random(255)}, ${random(255)}, ${random(255)})`
        const box = document.createElement("div")
        box.setAttribute("class", "float")
        box.style.backgroundColor = color
        box.innerText = text
        document.body.appendChild(box)
    }
}

function moveToRow() {
    const currentLang = document.querySelector(".float")
    currentLang.setAttribute("class", "box")
    const currentRow = rows[rowNo]
    currentRow.appendChild(currentLang)
    isFloating = false
}

function switchRow(currentRowNo, newRowNo) {
    const prevRow = rows[currentRowNo]
    const newRow = rows[newRowNo]
    const langBox = prevRow.removeChild(prevRow.children[prevRow.children.length - 1])
    newRow.appendChild(langBox)
}

window.addEventListener("keydown", e => {
    if (e.key === " ") {
        if (!isFloating && ++count < languages.length) {
            generateBox(languages[count])
        }
        isFloating = true
    }
    else if (e.key === "ArrowUp") {
        if (isFloating) {
            moveToRow()
        }
        else {
            if (rows[rowNo].children.length > 1) {
                const currentRowNo = rowNo
                rowNo = --rowNo < 0 ? noOfRows - 1 : rowNo
                switchRow(currentRowNo, rowNo)
            }
        }
    }
    else if (e.key === "ArrowDown") {
        if (isFloating) {
            moveToRow()
        }
        else {
            if (rows[rowNo].children.length > 1) {
                const currentRowNo = rowNo
                rowNo = ++rowNo % noOfRows
                switchRow(currentRowNo, rowNo)
            }
        }
    }
})