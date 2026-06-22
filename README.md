# New Dad Tracker

A small, installable web app (PWA) for low-friction daily logging: evening ritual, cardio, weight, and climbing sessions. Everything is stored on your device only. No server, no account, no build step.

## Files in this repo

- `index.html` the whole app (layout, styling, and logic are inline)
- `manifest.webmanifest` the install metadata (name, colors, icons, home-screen shortcuts)
- `sw.js` the service worker that caches the app so it runs offline
- `icon.svg` the source icon
- `icon-192.png` and `icon-512.png` you generate these once (see below)

## Step 1: Generate the two PNG icons

Chrome needs PNG icons to show the install prompt, so convert `icon.svg` into two sizes.

1. Open an SVG-to-PNG converter, for example https://svgtopng.com or https://cloudconvert.com/svg-to-png
2. Upload `icon.svg`.
3. Export once at **192 x 192** and save it as `icon-192.png`.
4. Export again at **512 x 512** and save it as `icon-512.png`.
5. Put both PNG files in the same folder as `index.html`.

The icon already keeps its artwork inside the safe center area, so it works as a **maskable** icon (Android can crop it to a circle or rounded square without clipping the design).

## Step 2: Put the files in a GitHub repo

1. Create a new repository on GitHub (public is simplest for Pages).
2. Upload all files to the repository root: `index.html`, `manifest.webmanifest`, `sw.js`, `icon.svg`, `icon-192.png`, `icon-512.png`, and this `README.md`.

## Step 3: Turn on GitHub Pages

1. In the repo, open **Settings**, then **Pages** in the left menu.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Choose the `main` branch and the `/ (root)` folder, then **Save**.
4. Wait a minute. GitHub gives you a URL like `https://YOURNAME.github.io/REPO/`.

GitHub Pages serves over HTTPS, which the install prompt requires. The app uses relative paths, so a subpath like `/REPO/` works fine.

## Step 4: Install on your Pixel 10 Pro (Android Chrome)

1. Open the GitHub Pages URL in Chrome and let it load once with a connection (this caches the app and the chart library for offline use).
2. Tap the **three-dot menu** in the top right.
3. Tap **Install app** (it may also appear as **Add to Home screen**).
4. Confirm. The app lands on your home screen and opens full screen, no browser bar.

Long-press the home-screen icon to get the quick shortcuts: **Log Evening Ritual**, **Log Weight**, and **Log Climb**.

## Optional: build a sideloadable APK

If you later want an installable `.apk` instead of the home-screen web app, paste your GitHub Pages URL into https://www.pwabuilder.com and follow its Android packaging steps. Nothing in the code needs to change.

## Notes

- All data lives in your browser via `localStorage` under one key (`newdad.v1`) and survives refresh, app close, and reboot.
- **Settings, Clear all data** wipes everything after a confirm tap.
- To ship an update, change a file and bump the `CACHE` name in `sw.js` (for example `newdad-v1.0.1`) so devices pull the new version.
