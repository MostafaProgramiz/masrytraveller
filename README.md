# Masry Traveller — Portfolio Website

A lightweight static portfolio site for Mostafa / Masry Traveller. No build step or framework is required.

## Open the site

Double-click `index.html`, or serve the folder with any static web host. For local development, a simple server is recommended:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## The main file to edit: `site-data.js`

Most frequently changing information is centralised here:

- `media.heroImage`, `media.creatorImage`, `media.aboutImage` — image file paths
- `links.email` — professional email
- `links.tiktok` — TikTok profile URL
- `links.instagram` — Instagram profile URL
- `links.mediaKit` — media-kit download URL
- `proof` — hero proof points
- `videos` — card titles, labels, results and video URLs
- `results` — selected performance metrics
- `audience` — viewer and follower analytics (kept separate)
- `pricing` — packages and starting prices
- `upcoming` — destination banner; set `active: false` to remove it
- `analyticsAsOf` — analytics date label

## Replace the video thumbnails

Put your optimised image files in `assets/`, then set each video's `thumbnail` in `site-data.js`, for example:

```js
thumbnail: "assets/koh-samui-villa.webp"
```

Leave it empty to keep the labelled placeholder. Recommended thumbnail dimensions: **1080 × 1920 px** (9:16).

## Replace hero / creator images

Put the image files in `assets/`, then update these values in `site-data.js`:

```js
media: {
  heroImage: "assets/hero.webp",
  creatorImage: "assets/mostafa.webp",
  aboutImage: "assets/about-mostafa.webp"
}
```

Leave any value empty to retain its labelled placeholder.

Recommended:

- Hero travel image: at least 1600 px wide
- Creator portrait: portrait crop, at least 1000 × 1300 px
- About image: portrait or landscape crop, at least 1400 px on the long edge
- Export web images as AVIF or WebP where possible

## Add actual video links

In `site-data.js`, replace every:

```js
url: "#add-video-link"
```

with the relevant TikTok, Instagram, YouTube or hosted project URL. Placeholder links open a helpful dialog; real links open in a new tab.

## Update audience analytics

Viewer and follower data are intentionally separate. Replace each placeholder object inside:

```js
audience.viewerInsights
audience.followerInsights
```

Set `placeholder: false` after inserting verified values.

## Update prices

Edit the `pricing` array in `site-data.js`. Paid-ad licensing, extended usage, raw footage, Spark Ads/whitelisting, exclusivity, travel and accommodation remain scoped separately in the visible pricing note.

## Update upcoming travel

Edit:

```js
upcoming: {
  active: true,
  destination: "Budapest",
  message: "..."
}
```

Set `active: false` to hide the banner completely.

## SEO before launch

In `index.html`, replace both occurrences of:

`https://YOUR-DOMAIN-HERE.example/`

with your live domain. Replace `assets/og-placeholder.svg` with a real 1200 × 630 social sharing image if desired.

## Commercial accuracy built into the copy

- Spec and self-initiated portfolio work are labelled as such.
- Organic engagement from Skyscanner, loveholidays and Motel One is explicitly not presented as client work.
- Viewer and follower insights are separate.
- Historical analytics are date-labelled and do not promise future performance.
- UGC production is distinguished from creator posting.
- Usage / licensing is not granted perpetually by default.
- The Bangkok hotel project is described as atmosphere & facilities content, not a room review.

## Files

- `index.html` — semantic page structure and fixed copy
- `styles.css` — complete responsive design
- `site-data.js` — editable stats, links, videos, prices and destination
- `script.js` — rendering, navigation, interactions and modal behaviour
- `assets/favicon.svg` — placeholder favicon
- `assets/og-placeholder.svg` — placeholder Open Graph image

