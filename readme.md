# Zero Two Image Everywhere

A small Firefox extension that overlays Zero Two artwork on top of images found on web pages.

## What It Does

- Runs as a content script on matching pages.
- Finds `img` elements in the document.
- Places a randomly selected Zero Two image over each detected image.
- Watches for newly added images and processes them without reprocessing the same image repeatedly.

## Why It No Longer Freezes Firefox

The content script marks images it has already handled and ignores its own injected overlays. This prevents the mutation observer from recursively processing the images it creates, which was the main cause of the browser slowdown.

## Files

- `manifest.json`: Firefox extension manifest.
- `zerotwo.js`: Content script that scans the page and injects overlays.
- `content/`: Packaged Zero Two image assets used by the script.

## Install In Firefox

### Temporary install for development

1. Open Firefox.
2. Go to `about:debugging`.
3. Select `This Firefox`.
4. Click `Load Temporary Add-on...`.
5. Choose `manifest.json` from this folder.

## Behavior Notes

- The extension currently matches all pages with `*://*/*`.
- It runs at `document_end`.
- Overlay images are positioned absolutely inside the original image's parent element.
- Overlay images use `pointer-events: none` so they do not block clicks on the page.

## Development

If you change `manifest.json`, `zerotwo.js`, or the images in `content/`, reload the temporary add-on from `about:debugging` to test the latest version.

## Version

Current manifest version: `1.0`
