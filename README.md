[Ladder Logic](https://fernando-lozano.github.io/ladderLogic/)

## About
This web app will provide a quick and easy way to draw and print small electrical ladder diagrams.

## Technologies:
- Konva.js

## Tasks:

## Future Plans:
- add save and load functionality
- future plans: flash.js (for save, clear, and load)
- add and destroy text lines for saving purposes (future)

## Potential problems:
- if performance becomes an issue stop listening on components just to change the cursor
- storing data from drawing and erasing many lines could become unmanagable. Need
    a way to destroy lines when erasing. One possible solution:
        check this out: https://konvajs.org/docs/events/Custom_Hit_Region.html
        when eraser is selected:
            listen on each line
            on hover turn red
            on click destroy line
- lines when drawn fast make diagonal lines

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
- added double pushbutton and hand-of-auto component
- added help page