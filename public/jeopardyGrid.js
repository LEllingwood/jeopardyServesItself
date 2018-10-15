 class JeopardyGrid extends Grid {
     constructor(options) {
         super(options)
         this.getData(options.categoryIDs)
         // this.createUserInputFields() // use this to create user input stuff on the DOM and attach an event listener to the button and do .bind(this) so that it always runs in the context of the JeopardyGrid instance. lse
     }

     async getData(categoryIDs) {
         const categoryPromises = categoryIDs.map(
             id => fetch('http://localhost:3000/api/category/' + id).then(res => res.json()));
         
         const categories = await Promise.all(categoryPromises)
         this.loopOverCells(categories)
     }

     loopOverCells(categories) {
         let clueIndex = 0;
         let answerIndex = 0;
         for (let rowIndex = 0; rowIndex < this.numberOfRows; rowIndex++) {
             for (let colIndex = 0; colIndex < this.numberOfColumns; colIndex++) {
                 const currentCategory = categories[colIndex]
                 let currentClue = currentCategory.clues[clueIndex++]
                 while (!this.validateClue(currentClue)) {
                     currentClue = currentCategory.clues[clueIndex++]
                 }
                 currentClue.value = 100 * (rowIndex + 1)
                 const currentCell = this.rows[rowIndex][colIndex]
                 currentCell.addClue(currentClue)
             }
         }
     }


     validateClue(clue) {
         if (!clue.question || !clue.answer) return false;
         if (clue.question.length <= 1 || clue.answer.length <= 1) return false;

         return true;
     }

     onClick(cell) {
         cell.element.innerHTML = ''

         const questionElement = document.createElement('div')
         questionElement.classList.add('question')
         questionElement.appendChild(document.createTextNode(cell.question))

         cell.element.appendChild(questionElement)
         let answer = cell.answer
         return answer
     }
 }

 class JeopardyCell extends Cell {

     constructor(options) {
         super(options)
     }

     addClue(clue) {
         this.question = clue.question || 'n/a'
         this.answer = clue.answer || 'n/a'
         this.pointValue = clue.value || 100

         const valueElement = document.createElement('div')
         valueElement.classList.add('point-value')
         valueElement.appendChild(document.createTextNode(this.pointValue))
         this.element.appendChild(valueElement)
     }
 }

 //  to validate answer:
 let finalAnswer = onClick(cell)

 document.getElementById("textBox").onclick = function () {
     console.log(finalAnswer)
     console.log('hey')
     destination.textContent = "";
     let typedText = document.getElementById("answerBox")
     // const destination = document.getElementById("answerBox")

     if (typedText === finalAnswer) {
         const newOutput = document.createTextNode("You're right")
     } else {
         const newOutput = document.createTextNode("You're wrong")
     }
 }