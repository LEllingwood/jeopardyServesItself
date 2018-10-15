class JeopardyHeaderGrid extends Grid {
    constructor(options) {
        super(options)
        this.getData(options.categoryIDs)
    }

    async getData(categoryIDs) {
        const categoryPromises = categoryIDs.map(
            id => fetch("http://jservice.io/api/category?id=" + id).then(res => res.json())
        )
        const categories = await Promise.all(categoryPromises)
        this.loopOverCellsForTitle(categories)
    }

    // loopOverCells(categories) {
    //     let clueIndex = 0;
    //     for (let rowIndex = 0; rowIndex < this.numberOfRows; rowIndex++) {
    //         for (let colIndex = 0; colIndex < this.numberOfColumns; colIndex++) {
    //             const currentCategory = categories[colIndex]

    //             let currentClue = currentCategory.clues[clueIndex++]
    //             while (!this.validateClue(currentClue)) {
    //                 currentClue = currentCategory.clues[clueIndex++]
    //             }

    //             currentClue.value = 100 * (rowIndex + 1)
    //             const currentCell = this.rows[rowIndex][colIndex]
    //             currentCell.addClue(currentClue)
    //         }
    //     }
    // }

    loopOverCellsForTitle(title){
    let titleIndex = 0;
        for (let rowIndex = 0; rowIndex < this.numberOfRows; rowIndex++){
             const currentTitle = categories[rowIndex]

            let title = currentTitle.title[titleIndex++]
             while (!this.validateClue(title)) {
             }   
    }
    }

    validateClue(clue) {
        if (!clue.title) return false;
        if (clue.question.length <= 1 || clue.answer.length <= 1) return false;

        return true;
    }

    onClick(cell) {
        cell.element.innerHTML = ''

        const questionElement = document.createElement('div')
        questionElement.classList.add('question')
        questionElement.appendChild(document.createTextNode(cell.question))

        cell.element.appendChild(questionElement)
    }
}