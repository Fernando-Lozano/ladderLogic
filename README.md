# About
This web app will provide a quick and easy way to draw and print small electrical ladder diagrams. I might add a landing page with a simple video demonstrating the functionality.

## Functionality:
- select pencil to draw lines
- select eraser to erase lines
- select text to add text. double click text to remove
- select component to add component. double click component to remove (won't work if text tool is active)
- select download for a PNG image
- select clear to clear workspace
- select save to save to local storage
- select load to load from local storage

## Technologies:
- Konva.js
- flash.js (for save, clear, and load)

## Tasks:
- add remainder of components
- save and load states
- add a little bit of responsiveness to preserve container
- add confirms

## Todo on main:
- testing
- combine js into one large file
- landing page with video
- compress js for performance

## Ideas:
- only draw if mouse enters another grid intersection (should boost perf as well)
- keep main functions on top and listeners in bottom
- group relevant code together

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
- finished snapping lines. add and remove eventlisteners accordingly
- fixed mouse off container issue
- added hover effect for adding components
- fixed bug
- finished adding components
- finished adding text
- added validator to text input
- download as image instead of print (safari has issues with printing after cancelling)
- worked on color and toolbar component layout

js order:
    add layer
    main code
    addlistener
or just reference drawLines