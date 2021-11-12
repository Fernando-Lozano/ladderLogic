# About
This web app will provide a quick and easy way to draw and print small electricical ladder diagrams. I might add a landing page with a simple video demonstrating the funcionality.

## Functionality:
- select components and click the area they should go (should snap into place)
- if trash can is selected, clicking any components will delete them
- if pencil is selected lines will be snapped into place wherever there is no component
- lines can be removed with the eraser icon and use like the pencil
- text icon selected will allow for writing in text
- trash can selected should also allow for text to be deleted
- Attempt with no drag-and-drop first

## Technologies:
- Konva.js
- flash.js (for save, clear, and load)
- print.js
- bootstrap (possibly)
- font awesome (remove once no longer using) or localize icons

## Tasks:
- remove and add listeners in drawLInes file
-finish snapping lines
- add images:
    - seperate folder
    - snap and remove with double click
- add text:
    - seperate folder
    - removable with double click
- add temp print button
- learn Konva basics
- snap lines to grid
- show grid when pencil is selected

## Todo on main:
- snap lines to grid 
- components (temp for now)
- text
- save and load states

## Learn:
- implement these in seperate folders when done bring it all together
- add and remove images to grid and make sure this layer sits above grid lines and delete option
- add and make text moveable and delete option
- double clicks to delete(?)

## Ideas:
- to highlight squares get inspiration from: https://medium.com/@pierrebleroux/snap-to-grid-with-konvajs-c41eae97c13f

## Potential problems:
- grid lines when drawn fast make diagonal lines

## Log:
- boiler plate
- print canvas
- learnt to snap lines to grid and export as image (see gridLinesAndSave folder)
- fixed toolbar position
- added snapping lines to main
- printer button works
- added icons and basic functionality for button selection
- moved pencil and eraser listeners in drawLines file
- added functionality to clear button