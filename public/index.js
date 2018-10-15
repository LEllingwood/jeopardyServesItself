const categories = [67, 780, 227, 223, 184, 680]

// const categoryGrid = new JeopardyHeaderGrid({
//     const categoryGrid = new JeopardyGrid({
//     numberOfRows: 1,
//     numberOfColumns: 6,
//     targetElement: document.querySelector("main"),
//     cellClasses: ["topCell"],
//     categoryIDs: categories
//     // I want to add a function to allow this to populate the top grid with the categories rather than hard code them.  Mostly because I can't remember how to do that, and doing it this way give me more flexibility to change future versions of the game
// });

const questionGrid = new JeopardyGrid({
    numberOfRows: 5,
    numberOfColumns: categories.length,
    targetElement: document.querySelector("main"),
    cellClasses: ["bottomCell"],
    categoryIDs: categories,
    cellConstructor: JeopardyCell
});