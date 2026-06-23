# New Dad Tracker

A small, installable web app (PWA) for low-friction tracking around a new-dad routine: the evening ritual, weight, training sessions, and climbing. Everything is stored on your device only. No server, no account, no build step. Version 1.5.0.

## What it does

- **Evening ritual.** A daily kept / slipped / untouched state (tea or lemon water instead of sweets), with a current streak shown on Home. Slips are logged neutrally so you can spot patterns, not to keep score against yourself.
- **Weight.** One entry per day, plotted over time.
- **Trainings.** Strava-style entries: kind (Gym, Run, Swim, Row, Bike, Mobility, Other), minutes, intensity 1 to 5, an optional note, and a date. Each session has a load (minutes times intensity).
- **Climbing.** One aggregated session per day. You tap how many sends at each grade (5a to 8a), plus type (Bouldering, Ropes, Mixed), feeling, and strength. The session grade is the average of your top 10 sends; the progress trend uses a difficulty-weighted grade so more hard sends pull it up.
- **Weekly goals.** Set trainings-per-week and climb-sessions-per-week in Settings. Home shows progress, weekly training load, and how many sessions you have planned.
- **Planning.** Schedule a future training or climb, see upcoming sessions on Home, and tap to drop any one into Google Calendar so your phone handles the reminder.
- **Progress.** A combined chart (climb grade, training load, ritual dots) plus separate weight, load, and grade charts, all sharing one date window. Move through time with the older / newer buttons or by swiping.

Backdating is supported for trainings and climbs; anything added on a later day is flagged as backfilled.

## Files in this repo

- `index.html` the whole app (layout, styling, and logic are inline)
- `manifest.webmanifest` the install metadata (name, colors, icons, home-screen shortcuts)
- `sw.js` the service worker that caches the app so it runs offline
- `icon.svg`, `icon-192.png`, `icon-512.png` the app icons (PNGs already included, maskable-safe)

## Deploy on GitHub Pages

1. Create a repository on GitHub (public is simplest for Pages).
2. Upload all the files above to the repository root, plus this `README.md`.
3. Open **Settings**, then **Pages**.
4. Under **Build and deployment**, set **Source** to **Deploy from a branch**, choose the `main` branch and the `/ (root)` folder, then **Save**.
5. Wait a minute. GitHub gives you a URL like `https://YOURNAME.github.io/REPO/`.

GitHub Pages serves over HTTPS, which the install prompt needs. The app uses relative paths, so a subpath like `/REPO/` works fine.

## Install on Android Chrome

1. Open the Pages URL in Chrome and let it load once with a connection (this caches the app and the chart library for offline use).
2. Tap the three-dot menu, then **Install app** (may also show as **Add to Home screen**).
3. Confirm. It lands on the home screen and opens full screen.

Long-press the home-screen icon for the quick shortcuts: Log Evening Ritual, Log Weight, Log Climb.

## Optional: sideloadable APK

Paste your Pages URL into https://www.pwabuilder.com and follow its Android packaging steps. Nothing in the code needs to change.

## Updating the app

1. Change the file(s) and bump the `CACHE` name in `sw.js` (for example `newdad-v1.5.1`), so installed copies pull the new version.
2. Re-upload to GitHub and wait a minute for Pages to rebuild.
3. On the phone, fully close the app (swipe it away) and reopen it while online. It may take a second reopen for the new version to activate.
4. Check the version at the bottom of the Settings tab to confirm.

## Notes on your data

- All entries live in your browser via `localStorage` under one key (`newdad.v1`) and survive refresh, app close, and reboot. Updating the app, bumping the cache, even reinstalling from the same address all leave the data intact.
- **Settings, Clear all data** wipes everything after a confirm tap.
- `localStorage` is tied to the exact web address. If you move to a custom domain or rename the repo, the new address starts empty (the old data is parked under the old address, not lost). Decide on the final address before logging a lot.
- The calendar button opens Google Calendar, so it needs a connection at the moment you tap it. Everything else works offline.

## Icons

The PNG icons are already in the repo. If you edit `icon.svg` and want to regenerate them, export it at 192x192 as `icon-192.png` and 512x512 as `icon-512.png` (any SVG-to-PNG converter works) and replace the files. The artwork stays inside the safe center area so it crops cleanly as a maskable icon.
