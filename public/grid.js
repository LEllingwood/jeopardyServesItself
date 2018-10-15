class Grid {
    constructor(options) {
        this.cellConstructor = options.cellConstructor || Cell;
        this.numberOfRows = options.numberOfRows;
        this.numberOfColumns = options.numberOfColumns;
        this.targetElement = options.targetElement || document.body;
        this.cellClasses = options.cellClasses || [];
        this.gridElement = this.createGridElement();
        this.rows = [];
        this.createRows();
        this.gridElement.addEventListener("click", this.clickEvent.bind(this));
        console.log(this)
    }

    clickEvent(event) {
        if (!event.target.classList.contains("cell")) return;
        const cellElement = event.target;
        console.log("Row Index:", cellElement.dataset.rowIndex, "| Column Index:", cellElement.dataset.colIndex);
        const rowIndex = Number(cellElement.dataset.rowIndex);
        const colIndex = Number(cellElement.dataset.colIndex);
        const clickedCell = this.findCellByIndexes(rowIndex, colIndex);
        this.onClick(clickedCell)
    }

    onClick (cell) {
        // override me
    }

    createGridElement() {
        const element = document.createElement("div");
        element.classList.add("grid");
        this.targetElement.appendChild(element);
        return element;
    }
    createRowElement(rowIndex) {
        const element = document.createElement("div");
        element.classList.add("row");
        element.dataset.rowIndex = rowIndex;
        this.gridElement.appendChild(element);
        return element;
    }
    createRows() {
        const rows = [];
        for (let rowIndex = 0; rowIndex < this.numberOfRows; rowIndex++) {
            this.rows[rowIndex] = [];
            // i think i need to add something to populate the titles here. Or maybe  
            const rowElement = this.createRowElement(rowIndex);
            this.createCells(rowIndex, rowElement)
        }
        return rows;
    }
    createCells(rowIndex, rowElement) {
        for (let colIndex = 0; colIndex < this.numberOfColumns; colIndex++) {
            // console.log(colIndex)
            const cell = new this.cellConstructor({ rowIndex, colIndex, cellClasses: this.cellClasses });
            this.rows[rowIndex][colIndex] = cell;
            // the population language goes here?
            rowElement.appendChild(cell.element);
        }
    }
    findCellByIndexes(rowIndex, colIndex) {
        rowIndex = Number(rowIndex);
        colIndex = Number(colIndex);
        const row = this.rows[rowIndex];
        const cell = row ? row[colIndex] : null;
        return cell || null;
    }
}

class Cell {
    constructor({ rowIndex, colIndex, cellClasses }) {
        this.rowIndex = rowIndex;
        this.colIndex = colIndex;
        this.cellClasses = cellClasses || [];
        this.element = this.createElement();
    }

    createElement() {
        const element = document.createElement("div");
        element.classList.add("cell", ...this.cellClasses);
        element.cellInstance = this;
        element.dataset.rowIndex = this.rowIndex;
        element.dataset.colIndex = this.colIndex;
        return element;
    }
}
