[Ladder Logic](https://fernando-lozano.github.io/ladderLogic/)

## About
This web app will provide a quick and easy way to draw and print small electrical ladder diagrams.

## Technologies:
- Konva.js

## Future Plans:
- add save and load functionality
- flash.js (for save, clear, and load)
- add and destroy text lines for saving purposes

## Issues:
- if performance becomes an issue stop listening on components just to change the cursor
- storing data from drawing and erasing many lines could become unmanagable. Need
    a way to destroy lines when erasing. One possible solution:
        check this out: https://konvajs.org/docs/events/Custom_Hit_Region.html
        when eraser is selected:
            listen on each line
            on hover turn red
            on click destroy line
- lines when drawn fast make diagonal lines
