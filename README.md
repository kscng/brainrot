# Brainrot Lab

Offline emoji-combining game. Drag (or tap) two emojis into the boxes to make a brainrot character.

Run it:

```bash
python3 -m http.server 8123
```

Then open `http://<this-mac's-ip>:8123` on the iPad/phone. Add to Home Screen for fullscreen.

Add characters: edit `characters.json`. `pair` order doesn't matter, `art` is the emoji picture.
Check the file after editing: open `/?test` — it verifies pairs and duplicates.

A local server is needed because browsers block `fetch` of `characters.json` over `file://`.
