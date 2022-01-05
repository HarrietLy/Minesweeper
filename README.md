# Project1-Minesweeper
Minesweeper
By: Harriet

This is a classic game by Microsoft that requires some math skills ( mainly probability) and simple deduction to find all mines whose locations are already determined but hidden under a grid.

# Set up
1. Initial state of the grid: a fixed number of mines are randomly generated in various locations of the grid. 
2. Hidden under each Cell is either a cell number or a mine
    1. a mine, if user click, all mines explode, game over
    2. a cell number if the cell is not mine,  = number of mines in the 8 neighboring cells, the cell number can be 0, 1, 2, 3, 4, 5, 6, 7, 8 

# How to Play
1.	The goal is to find all mines in the grid as fast as possible
2.	User can right click on any cell 
            if user right click on EMPTY: a red flag will appear on cell, the mine to go counter will -1
            if user right click on opened cell ( obviously must be a number else game ends alreay): do nothing
            if user right click on flagged cell: remove the flag and revert the cell to unopened state
    
3.	User can left click on an ANY, be it EMPTY/Flagged cell that they think does not have mine 
    a. If the cell was empty:
          if the cell does not have mine: the cell’s number/blank will appear. 
          if has mine, all mines in the grid will explodes, user loses
          
    b. If the cell already has a flag:
          if the cell does not have mine: the cell’s number/blank will appear. 
          if has mine, all mines in the grid will explodes, user loses

# End Game
1. The game ends when 
either user wins when all cell numbers in the grid are revealed without any mine exploded 
or user loses when they left click on a mine
2. In either case we display all the mines

# Wireframe
1. MineToGo: 100
2. Timer: 
3. Reset button:
4. Level: Beginner (10x10), Intermediate (15x15), Expert (15x30)

Grid

