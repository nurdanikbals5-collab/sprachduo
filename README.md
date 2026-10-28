# SprachDuo

**Two languages. Equal time.**

SprachDuo is a web app that matches students at Hochschule Furtwangen (HFU) for language tandems. A student says which language they speak and which one they want to practise, and the site finds partners with the opposite goal, a similar level and shared free time. Every match shows an equal 50/50 split between the two languages, and the site proposes the next meeting so the tandem keeps going.

This is our team project for the course *Web-Based Technologies* (winter semester 2026/27) at Hochschule Furtwangen.

## Features

- **Find a partner:** filter by language, level and meeting format (in person or online). Results are ranked by a fit score.
- **Profiles:** languages and CEFR level (A1–C2), goal, interests and a weekly availability grid (7 days × morning / midday / evening).
- **Requests:** send a tandem request with a short note; accept or decline without giving a reason.
- **Matches:** equal language split, a proposed public meeting place and demo messages.
- **Events:** join or leave language cafés and create your own event.
- **Safety:** block or report a profile.
- **Responsive:** works on desktop and phone; the navigation becomes a menu on small screens.

## Fit score

The ranking is one simple function. A partner is only shown if the language pair is reciprocal (each speaks what the other wants to learn).

| Part | Points |
| --- | --- |
| Reciprocal language pair | 40 |
| Shared weekly time slots (5 per slot) | up to 30 |
| Level proximity in the learning languages | up to 15 |
| Shared interests (5 per interest) | up to 15 |

If a profile has no availability yet, the score is marked as provisional.

## Run locally

You need [Node.js](https://nodejs.org/) 20 or newer. There are no packages to install.

```sh
npm start
```

Then open http://127.0.0.1:8000.

Run the tests:

```sh
npm test
```

## Project structure

| Path | Content |
| --- | --- |
| `*.html` | Eleven pages with semantic HTML5 structure and forms |
| `assets/css/styles.css` | Responsive layout, colours, typography and components |
| `assets/js/data.js` | Sample profiles and events |
| `assets/js/core.js` | Matching, request and event rules |
| `assets/js/app.js` | DOM interaction and saving in the browser |
| `tests/core.test.cjs` | Tests for the main rules |
| `scripts/serve.cjs` | Small local web server |

## Limits of this prototype

All people and events are sample data. Changes are saved only in the browser (`localStorage`), so they are not shared between devices. There is no backend, no real login, no e-mail and no live chat yet. **Reset demo** restores the sample data.

## Design

- [Figma prototype](https://www.figma.com/proto/iAaoGNxcgAoq9ZcUxuF16u?node-id=3-3&starting-point-node-id=3%3A3)
- Colours: forest green, coral and cream. The speech-bubble logo is an SVG.
- Font: Inter, bundled locally, under the SIL Open Font License (see `assets/fonts/OFL.txt`).

## Team

| Name | Role |
| --- | --- |
| Nurdan İkbal Söyler | Frontend |
| Avika Chauhan | Content and user research |
| Ömer Faruk Köken | Design |
| Kaan Çalışkan | Project management and documentation |

Maintained by [Nurdan İkbal Söyler](https://github.com/nurdanikbals5-collab).
