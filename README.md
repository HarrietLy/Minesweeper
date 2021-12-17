# Project1-Minesweeper
Minesweeper
By: Harriet

User story

1.	The goal is to find all mines in the grid as fast as possible
2.	Initial state of the grid: a fixed number of mines are randomly generated in various location of the grid. Each Cell has a cell number or a mine
3.	The first click will open X number of cells that do not have flags
4.	User can right click to put a red flag on cell that they think has mine, the mine counter will +1
5.	User can right click again to remove the flag if they change their mind
6.	User can left click on cell that they think does not have mine If the cell does not have mine, if the cell is EMPTY, the cell’ number will appear. - if the cell is EMPTY or put flag but has mine, all mines in the grid will explodes, user loses
7.	Each cell’ number represents the number of mines in the 8 surrounding cells of that cell, therefore the number can be 1, 2, 3, 4, 5, 6, 7, 8 - each with different colour for user to easily differentiate
8.	User uses the cell’ number to deduce which cell has flags
9.	User wins when all cell numbers in the grid are revealed without any mine exploded
10.	( extra) double click a cell with number and already have all the surrounding flags matching its cell number, all remaining surrounding flags appear)
