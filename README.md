# Project1-Minesweeper
Minesweeper
By: Harriet

This is a classic game by Microsoft that requires some math skills ( mainly probability) and simple deduction to find all mines whose locations are already determined but hidden under a grid.

Set up
1. Initial state of the grid: a fixed number of mines are randomly generated in various location of the grid. 
2. Hidden under each Cell has either a cell number, neightboring c or a mine or blank
    1. a mine, if user click, all mines explode, game over
    2. blank if it is not a mine and the number of mines in the 8 neighboring cells = 0
    3. a cell number if the cell is not mine, not blank,  = number of mines in the 8 neighboring cells, the cell number can be 1, 2, 3, 4, 5, 6, 7, 8 

How to Play
1.	The goal is to find all mines in the grid as fast as possible
2.	User can right click to put a red flag on cell that they think has mine, the mine counter will +1
3.	User can right click again to remove the flag if they change their mind
7.	User can left click on an ANY, be it EMPTY/Flagged cell that they think does not have mine 
    a. If the cell was empty:
          if the cell does not have mine: the cell’s number/blank will appear. 
          if has mine, all mines in the grid will explodes, user loses
          
    b. If the cell already has a flag:
          if the cell does not have mine: the cell’s number/blank will appear. 
          if has mine, all mines in the grid will explodes, user loses

End Game
1. The game ends when
2.	User wins when all cell numbers in the grid are revealed without any mine exploded
