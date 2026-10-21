# TITAN guided presentation

The main presentation has **22 slides** and ends with the conclusions. **Q&A and 11 backup slides** are in the separate `TITAN-backup.md` deck; they do not extend the main slideshow. The original 15-topic structure is retained, with technical explanations, results, and examples split for readability.

Backup slides are optional reference material for audience questions: detailed tables, specifications, extra examples, and citations. For a 50-minute slot, a useful rehearsal target is 40?45 minutes for the main deck and 5?10 minutes for questions; there is no need to present the backup slides in order.

## Run

```powershell
npm.cmd run dev
```

Open http://localhost:3030. Press **Right arrow / Space** to advance through reveals and slides; **Left arrow** reverses them. Slidev's presenter view shows the retained scientific detail and unresolved source notes. The main deck stops after conclusions. Open the separate supplement with `npm.cmd run dev:backup` at http://localhost:3031 when needed; its Q&A slide links to its own backup material.

## Export

```powershell
npm.cmd run export
npm.cmd run export:backup
npm.cmd run export:steps
npm.cmd run build
```

- `output/TITAN-guided.pdf`: complete final state of the 22 main slides.
- `output/TITAN-backup.pdf`: separate Q&A and 11 backup slides.
- `export:steps`: optional PDF with a page for each reveal state.
- `dist/`: static web presentation.

Standard PDF export uses Slidev's native print mode, so every reveal is visible. Reveal-state export preserves the click sequence. Reduced-motion preferences disable reveal transitions.

## Files

- `TITAN.md`: main talk, 22 slides and presenter notes.
- `TITAN-backup.md`: separate Q&A and supporting material, 12 slides.
- `style.css`: shared typography, spacing, stable reveal layouts, and print styling.
- `components/Formula.vue`: KaTeX equations inside the custom HTML layouts.
- `public/figures/`: repaired panels rendered directly from the supplied PDF; original embedded images also retained.
- `backup/TITAN.original.md`: untouched original deck.
- `backup/TITAN.before-separation.md`: the 34-slide version before the main/supplement split.
- `scripts/check-deck.cjs`: browser check for every slide and click state. Run `npm.cmd run check` with the dev server running on port 3030. Captures and report go into `tmp/`.

## Scientific detail

Numerical scores, relative gains, significance qualifications, architecture settings, cohort sizes, and the original selected bibliography are retained in main slides, backup slides, and presenter notes. Relative gains are labeled separately from percentage-point differences. Selected qualitative successes and proposed clinical applications retain their limitations.

The supplied PDF does not establish tokenization limits, detailed decoder masking, full loss formulas/weights, or temperature sensitivity sweeps. These remain explicitly unresolved in notes. Referenced supplementary tables were not supplied. Citation-count assessment was removed from the live narrative.

The original source-topic detail is retained in presenter notes for reference; concise slide text is intended for delivery. Content was checked against the supplied paper, without adding unsupported supplementary values.


## GitHub Pages

The workflow `.github/workflows/deploy.yml` builds only the 22-slide `TITAN.md` main deck. Q&A and the backup deck are not part of the deployed slideshow.

1. Push this project, including `.github/workflows/deploy.yml`, to your GitHub repository's `main` or `master` default branch.
2. In the repository, select **Settings ? Pages ? Build and deployment ? Source ? GitHub Actions**.
3. Open **Actions ? Publish TITAN to GitHub Pages**. If the first run happened before Pages was enabled, rerun it, or use **Run workflow** on the default branch.
4. The deploy job reports the live URL. For a regular project repository it is `https://USERNAME.github.io/REPOSITORY/`.

Future pushes to the default branch publish updates. The workflow uses the Pages base path automatically, including repository subpaths and custom domains. Hash routing keeps direct slide links and refreshes compatible with static hosting (for example, `.../REPOSITORY/#/10`). No personal access token or custom secret is needed; the workflow uses GitHub's built-in token.
