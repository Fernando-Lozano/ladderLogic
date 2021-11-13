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
- group pencil and eraser
- clear text input and add focus
- size grid, components, linewidth, and text until satisfied

## Todo on main:
- save and load states
- style component highlighter properly
- add print js, validators, and confirms for main functions
- testing
- landing page with video
- deploy on github pages

## Learn:
- complete

## Ideas:
- keep all namespaces unique across all js files
- keep main functions on top and listeners in bottom

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