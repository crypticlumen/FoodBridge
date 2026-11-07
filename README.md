# FoodBridge

FoodBridge is a responsive, single-page food-rescue homepage prototype. It connects food donors with NGOs and volunteers, with front-end-only donation and interest flows.

## Run locally

```sh
npm install
npm run dev
```

Create a production build with `npm run build`.

## Prototype notes

- Donation, interest, and newsletter forms are demonstrations. They do not save or send personal data.
- FoodBridge platform impact figures and community stories are illustrative. Global food waste figures cite UNEP's 2024 Food Waste Index; the hunger estimate cites FAO's 2026 SOFI release.
- Contact details and legal links are placeholders.
- The hero uses the ThreeUI ThreeDPaper site-of-the-year source. The original registered bundle files are preserved under `src/vendor/threeui`; the themed menu is a separate copy that changes the drawn content and palette. Source bundle: `https://threeui.com/source-code/3d-paper.json`. Confirm the applicable ThreeUI licence tier before public release.
- A static menu poster appears for reduced-motion users and browsers without WebGL.
