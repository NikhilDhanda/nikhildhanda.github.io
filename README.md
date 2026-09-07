# Nikhil Dhanda — bilingual portfolio

A responsive portfolio built with HTML, CSS and JavaScript, deployed through Sites. English and Japanese content includes project summaries, navigation, timeline entries and accessible labels. Original reports and screenshots remain in their source language.

## Local development

Run `npm run dev` and open the printed local address. Run `npm run check` to check JavaScript syntax and `npm run build` to prepare the static output.

## Content

The main page is in `index.html`; English copy has matching Japanese `data-ja` attributes. Project detail content for both languages is in `script.js`. The language switch supports reduced motion and remembers the selection. A language can also be selected with `?lang=ja` or `?lang=en`.

The supplied resume is unchanged at `assets/Nikhil-Dhanda-Resume.pdf`. The Santa Stealer report is credited to Nikhil Dhanda and Keyu Patel, with individual contributions distinguished in the project detail. The original report is available as a DOCX download.

The shared visual theme and responsive layouts are in `style.css`. Static build output goes to `dist/`. The Sites identity is retained in `.openai/hosting.json`.
