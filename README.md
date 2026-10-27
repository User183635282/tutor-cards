# tutor-cards

Shared code for the question cards of a personal Claude Code learning skill (`tutor`).
A card is an inline widget that loads this file from jsDelivr and calls `TutorCard.render(el, spec)`:
multiple-choice, free-recall and predict questions with KaTeX maths, a confidence slider
(0 / 30 / 50 / 70 / 90 / 100) and a "what were you thinking?" box. The answer is sent back to the
chat as one line. `TutorCard.plan` draws a lesson plan tree; `TutorCard.panel` a teaching panel.

    https://cdn.jsdelivr.net/gh/User183635282/tutor-cards@v1.0.0/tutor-card.js

No dependencies except KaTeX 0.16.9, loaded from cdnjs.
