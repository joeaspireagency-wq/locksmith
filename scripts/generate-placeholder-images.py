#!/usr/bin/env python3
"""
Generates the illustrated placeholder images in public/images/.

These are NOT photographs. They stand in until real project photos (or licensed
stock) are dropped in. To replace one, add the new file to public/images and update
the matching entry in src/data/images.ts (src, alt, width, height, focalPoint).

Run (optional, the generated files are already committed):  python3 scripts/generate-placeholder-images.py
"""
import math
import os
import random

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "public", "images")
W, H = 800, 600


def wrap(body: str, defs: str = "", label: bool = True, width: int = W, height: int = H) -> str:
    tag = (
        f'<text x="{width - 18}" y="{height - 16}" text-anchor="end" font-family="Inter, Arial, sans-serif" '
        f'font-size="14" fill="#14283F" fill-opacity="0.45">Illustrative placeholder</text>'
        if label
        else ""
    )
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="{width}" height="{height}">'
        f"<defs>{defs}</defs>{body}{tag}</svg>\n"
    )


COMMON_DEFS = """
<linearGradient id="door" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F7F9FA"/><stop offset="1" stop-color="#D9DFE4"/></linearGradient>
<linearGradient id="plate" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#E3E8EC"/><stop offset="0.5" stop-color="#F4F6F8"/><stop offset="1" stop-color="#CBD3D9"/></linearGradient>
<linearGradient id="steel" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F1F4F6"/><stop offset="1" stop-color="#8E9AA5"/></linearGradient>
<linearGradient id="brass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#E2C47A"/><stop offset="1" stop-color="#9A7A33"/></linearGradient>
<pattern id="brick" width="80" height="40" patternUnits="userSpaceOnUse">
<rect width="80" height="40" fill="#D9CDBE"/>
<rect x="2" y="2" width="36" height="16" fill="#B4705A"/><rect x="42" y="2" width="36" height="16" fill="#A9654F"/>
<rect x="22" y="22" width="36" height="16" fill="#AF6A53"/><rect x="62" y="22" width="36" height="16" fill="#B4705A"/><rect x="-18" y="22" width="36" height="16" fill="#A9654F"/>
</pattern>
"""


def jagged(cx, cy, r_min, r_max, points, seed):
    rnd = random.Random(seed)
    pts = []
    for i in range(points):
        angle = (2 * math.pi * i) / points
        r = rnd.uniform(r_min, r_max)
        pts.append(f"{cx + r * math.cos(angle):.1f},{cy + r * math.sin(angle):.1f}")
    return " ".join(pts)


def timber_door(repaired: bool) -> str:
    frame_fill = "#F1F3F4" if repaired else "#D8BD90"
    body = (
        '<rect width="800" height="600" fill="url(#brick)"/>'
        # frame
        f'<rect x="196" y="6" width="408" height="594" fill="{frame_fill}" stroke="#B8955F" stroke-width="{0 if repaired else 3}"/>'
        # door leaf
        '<rect x="232" y="44" width="336" height="556" fill="#1F3A57"/>'
        '<rect x="262" y="76" width="276" height="200" rx="6" fill="none" stroke="#2E4E70" stroke-width="6"/>'
        '<rect x="262" y="310" width="276" height="250" rx="6" fill="none" stroke="#2E4E70" stroke-width="6"/>'
    )
    if repaired:
        body += (
            '<rect x="522" y="330" width="34" height="120" rx="6" fill="url(#brass)" stroke="#7C5F22" stroke-width="2"/>'
            '<circle cx="539" cy="368" r="10" fill="#1B1E21"/>'
            '<circle cx="539" cy="412" r="6" fill="#7C5F22"/>'
            '<rect x="574" y="330" width="22" height="120" rx="4" fill="url(#brass)" stroke="#7C5F22" stroke-width="2"/>'
        )
    else:
        body += (
            # gap where the door has been forced
            '<rect x="560" y="44" width="14" height="556" fill="#0B141F"/>'
            # splintered frame
            f'<polygon points="{jagged(588, 380, 14, 58, 17, 5)}" fill="#E4CC9F" stroke="#9C7A45" stroke-width="2"/>'
            f'<polygon points="{jagged(592, 300, 8, 36, 13, 8)}" fill="#C9A672" stroke="#9C7A45" stroke-width="2"/>'
            f'<polygon points="{jagged(586, 460, 8, 40, 13, 14)}" fill="#D8BD90" stroke="#9C7A45" stroke-width="2"/>'
            '<path d="M574 350 L640 332 L650 352 L580 372 Z" fill="#E9D5AB" stroke="#9C7A45" stroke-width="2"/>'
            '<path d="M570 420 L626 440 L618 458 L566 440 Z" fill="#CFAE78" stroke="#9C7A45" stroke-width="2"/>'
            # torn lock plate and pry marks
            '<rect x="514" y="340" width="36" height="110" rx="6" fill="#B6BEC5" stroke="#8D98A1" stroke-width="2" transform="rotate(8 532 395)"/>'
            '<path d="M556 300 L520 330 M552 480 L516 454" stroke="#0B141F" stroke-width="5" stroke-linecap="round" opacity="0.7"/>'
        )
    return wrap(body, COMMON_DEFS)


FILES = {
    "breakin-before.svg": timber_door(False),
    "breakin-after.svg": timber_door(True),
}

if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    for name, content in FILES.items():
        with open(os.path.join(OUT, name), "w", encoding="utf-8") as handle:
            handle.write(content)
        print("wrote", name)
