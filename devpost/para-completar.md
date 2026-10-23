# Material para completar Devpost · 0.8.2

Borrador para revisar y adaptar, no guardado en Devpost. Los apartados sobre tu experiencia deben corresponder a lo que realmente hiciste y aprendiste.

## About the project — propuesta en inglés

### Inspiration

As a COAR student studying the IB, I wanted a place where I could choose a subject, understand a topic, practise it, and return to the questions I got wrong. I also wanted to explore topics beyond a fixed catalogue. That idea became IB Easy: an independent study companion built around understanding before answering.

### What it does

IB Easy brings together 13 academic and artistic subjects and three separately organised IB core components. The prototype contains 83 prepared topics and 289 multiple-choice questions. Students can study explanations at different reading depths, use subject-specific activities, review flashcards and revisit mistakes.

Every area has its own free-topic input. Local search checks prepared lessons and learner-supplied materials, tolerating accents, case and small spelling differences. When content is missing, the app explains the limitation and lets the learner save a topic or add notes with their source. It does not pretend an unrelated lesson answers the request.

Other tools include guided study routes, a reading-focus mode, personal cards, notes and a weekly planner. The app separates opened lessons, reviewed content and results on prepared questions. Self-assessment is labelled as self-assessment, not an official grade.

### How I built it

I used HTML, CSS and JavaScript, with AI coding assistance, a local content library, optional browser storage and validated JSON backups. The project builds into a portable HTML file and a Cloudflare Worker. Markdown is rendered with Marked and sanitised with DOMPurify. The current automated suite passes 78 tests.

Gemini was explored in an earlier prototype, but the model tutor is paused in this school-focused release. No model API is needed for the basic learning tools, and the interface does not send learner notes to an AI service.

### Challenges and what I learned

One challenge was keeping lessons, questions and personal topics tied to the correct subject. Another was making progress meaningful: opening a lesson should not imply understanding it. I also had to preserve older local data while improving tools and distinguish automatic answer checks from self-review.

This process taught me that a useful educational prototype needs clear feedback, honest limits, careful data handling and repeated testing, as well as a welcoming interface.

### Accomplishments and next steps

The prototype supports a complete study-and-review flow without a model API, including in the portable HTML. It has subject-specific free-topic fields rather than a single unrestricted chatbot.

Next steps include translating extended Spanish explanations into English, obtaining teacher feedback, reviewing accessibility more broadly and expanding content through checked sources. IB Easy is an independent student project, not an official IB, MINEDU or COAR product, and does not yet cover the full syllabus.

## Built with

Suggested factual tags: HTML, CSS, JavaScript, Node.js, Cloudflare Workers, Wrangler, Marked, DOMPurify, jsdom, GitHub.

Do not tag Gemini as an active feature. Explain the paused prototype in the story. Add the exact coding assistant you used only if confirmed. Do not claim use of the Devpost Learn Skill Pack merely because planning files exist.

## Try it out

- Code: https://github.com/andysarmientocruz2-sys/IB-Easy
- Hosted app: https://ib-easy.ibeasy-andy.workers.dev — add only after deploying and verifying **v0.8.2** in its footer. This work has not updated that address.
- Local testing: follow the repository README. After `npm ci` and `npm run build`, open `dist/IB-Easy-COAR.html`.

## Image gallery

Use the four real captures in `devpost/capturas/v082/en/`:

| File | English caption |
|---|---|
| home.jpg | Three ways to start: open a real lesson, search the library, or choose a subject. |
| biology.jpg | Reading tools, lesson structure, and a notice for extended explanations awaiting English translation. |
| free-topic.jpg | A missing topic produces an honest limitation and an option to supply source material. |
| progress.jpg | A deliberately incorrect demo answer appears in the mistakes notebook; no official grade is inferred. |

Six Spanish review screenshots include a 390 × 844 px responsive frame. These are real captures, not generated mockups. The progress screenshot contains only disposable demo activity.

## Video demo link

Pending: record your screen using `guion-demo.md`, upload the actual video and paste its public watch URL. No video was recorded or uploaded in this delivery.

## Additional information: check before submitting

The rules require the Devpost Learn Skill Pack and scope.md, prd.md and spec.md. Those documents exist in the repository, but this release does not establish historical use of that Skill Pack. Describe only verified work; review your development history or ask the organisers before asserting compliance.

The rules require participants to be of the age of majority where they live. Do not tick that declaration if it is untrue. Do not assume an adult submitting the same work automatically resolves eligibility. Ask the organisers first.

Ask the organisers privately about any eligibility uncertainty. No message was sent on your behalf. Do not put personal eligibility details, identifying documents or private contact details in this public repository.

## Final order

1. Resolve eligibility and verify Skill Pack use.
2. Test this version and update Cloudflare through your authenticated account, if wanted.
3. Review the story, factual tags and screenshots.
4. Record, review and publicly upload the video.
5. Paste actual links, save the draft and inspect its preview.
6. Only the eligible entrant should make the final declarations and submit.

Official source checked 23 October 2026 UTC: https://learn-ai-basics.devpost.com/rules
