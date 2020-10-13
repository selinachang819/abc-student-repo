# Tetris Artist
![screenshot](https://selinachang819.github.io/abc-student-repo/projects/project-a/screenshot.gif)
## Description
**Be an artist while being a musician!**
This project is a mock-90s game app called "Tetris Artist.exe". The users are given with opportunities to play around with the game--_through playing the keyboard piano, the users simultaneously creates artwork on their own_. This project is inspired by _Composition with Red Blue and Yellow_ by **Piet Mondrian** and also the concept of **synesthesia**.
## Challenges
1. Color Selection: Initially I envisioned each pitch has its own manipulation and randomization of the user selected color. Unfortunately, it turned out that there was no significant diffenrence between pressing different button and also within the same block of tetris. The difference is just too subtle to observe if I just split the value("0-50""50-100"). Eventually, I chose to keep the dominant color of user selection and randomize the other two values.
2. Saving div to image: I spent a great bunch of time figuring out how to save the whole div which contains user's artwork to an image. There is a javascript library called **html2canvas** that serves only for this purpose.Basically it converted the div to a html canvas and save the created canvas. Nonetheless, it turned out that the canvas might(? still not sure if it is the case at this moment)be too large to be save. Eventually, thank to Leon, I added another JS library called **download.js** that makes downloading large files much quicker.
## Compromises
1. **Concept vs. visual:** At first I was trying to make specific color manipulation based on the user-selected color, since I was trying to link it to my inspiration of synesthesia (one of the symptom of this is that one see colors when they hear specific sound and vice versa), but the visual turned out not to be so satisfying. So I let go of this aspect and do random selection on color.
2. **Contradiction between concepts:** I also let go the idea of having real-tetris like blocks since it seems to be contradicted somehow with the artwork I drew from.I use pure square and rectangle block instead.
## Quick Access
[Tetris Artist.exe](https://selinachang819.github.io/abc-student-repo/projects/project-a/)
