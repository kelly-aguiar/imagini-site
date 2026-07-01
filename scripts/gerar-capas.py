#!/usr/bin/env python3
"""Gera cards de capa 1200×630 px com paleta Imagini para cada notícia."""
from PIL import Image, ImageDraw, ImageFont
import os

W, H   = 1200, 630
BG     = (26, 18, 20)          # #1a1214 — fundo escuro do site
CARMIM = (136, 23, 38)         # #881726
AMBAR  = (248, 185, 103)       # #f8b967
WHITE  = (255, 255, 255)
MOUNT  = (250, 247, 245)       # off-white para o card central

DIR = "/Users/kelly/imagini-site/public/images/noticias"
FONT_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
FONT_REG  = "/System/Library/Fonts/Supplemental/Arial.ttf"


# ── Helpers ──────────────────────────────────────────────────────────────────

def rounded_rect(draw, box, radius, fill):
    x0, y0, x1, y1 = box
    draw.rectangle([x0 + radius, y0, x1 - radius, y1], fill=fill)
    draw.rectangle([x0, y0 + radius, x1, y1 - radius], fill=fill)
    for cx, cy in [(x0+radius, y0+radius), (x1-radius, y0+radius),
                   (x0+radius, y1-radius), (x1-radius, y1-radius)]:
        draw.ellipse([cx-radius, cy-radius, cx+radius, cy+radius], fill=fill)


def make_base():
    """Cria o fundo escuro com gradiente sutil, barra carmim e faixa âmbar."""
    card = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(card)
    # gradiente vertical leve
    for y in range(H):
        t = y / H
        r = int(26  + (52  - 26)  * t)
        g = int(18  + (6   - 18)  * t)
        b = int(20  + (12  - 20)  * t)
        draw.line([(0, y), (W, y)], fill=(r, g, b))
    # barra carmim esquerda
    draw.rectangle([(0, 0), (6, H)], fill=CARMIM)
    # faixa âmbar inferior
    draw.rectangle([(0, H-10), (W, H)], fill=AMBAR)
    # pontos decorativos laterais
    for cy in [H//2]:
        for cx, r in [(30, 4), (W-30, 4)]:
            draw.ellipse([cx-r, cy-r, cx+r, cy+r], fill=AMBAR)
    return card


def place_logo(card, logo_img):
    """Cola a logo centralizada sobre o card branco montado."""
    draw = ImageDraw.Draw(card)
    # card branco central
    mx, my = 90, 50
    mw = W - 2*mx
    mh = H - 2*my - 10  # respeita a faixa âmbar
    rounded_rect(draw, (mx, my, mx+mw, my+mh), 24, MOUNT)

    # área disponível com padding interno
    pad = 60
    avail_w = mw - 2*pad
    avail_h = mh - 2*pad

    lw, lh = logo_img.size
    scale   = min(avail_w / lw, avail_h / lh)
    new_w   = int(lw * scale)
    new_h   = int(lh * scale)
    logo_r  = logo_img.resize((new_w, new_h), Image.LANCZOS)

    px = mx + pad + (avail_w - new_w) // 2
    py = my + pad + (avail_h - new_h) // 2

    if logo_r.mode == "RGBA":
        card.paste(logo_r, (px, py), logo_r)
    else:
        card.paste(logo_r, (px, py))
    return card


def crop_bio(img):
    """Extrai o círculo de perfil de um screenshot de bio do Instagram."""
    h  = img.height
    d  = h - 16                         # diâmetro do círculo
    xs = 12
    ys = (h - d) // 2
    cropped = img.crop((xs, ys, xs+d, ys+d)).convert("RGBA")
    # máscara circular
    mask = Image.new("L", (d, d), 0)
    ImageDraw.Draw(mask).ellipse([0, 0, d, d], fill=255)
    result = Image.new("RGBA", (d, d), (255, 255, 255, 0))
    result.paste(cropped, mask=mask)
    return result


# ── COFEN — card de texto ─────────────────────────────────────────────────────

def make_cofen_card(outpath):
    card = make_base()
    draw = ImageDraw.Draw(card)

    try:
        ft = ImageFont.truetype(FONT_BOLD, 46)
        fs = ImageFont.truetype(FONT_BOLD, 24)
        fx = ImageFont.truetype(FONT_REG,  18)
    except Exception:
        ft = fs = fx = ImageFont.load_default()

    # rótulo âmbar
    draw.text((W//2, 108), "13º Seminário Institucional do Cofen",
              fill=AMBAR, font=fs, anchor="mm")

    # linha divisória
    draw.rectangle([(160, 140), (W-160, 143)], fill=AMBAR)

    # título principal — 3 linhas
    linhas = [
        "Relacionamento Interpessoal:",
        "Aspectos essenciais para um",
        "ambiente profissional saudável",
    ]
    y = 220
    for linha in linhas:
        draw.text((W//2, y), linha, fill=WHITE, font=ft, anchor="mm")
        y += 68

    # rodapé
    draw.text((W//2, H-35),
              "Pirenópolis, GO  ·  02 out 2025  ·  Kelly Aguiar — Imagini",
              fill=(200, 188, 182), font=fx, anchor="mm")

    card.save(outpath, "PNG", optimize=True)
    print("✓ certificado-cofen-kelly.png (card de texto)")


# ── Processamento ─────────────────────────────────────────────────────────────

logos = [
    ("logo-clinica-almar.png",             False),
    ("logo-clinica-avisa.png",             True),   # screenshot de bio
    ("logo-clinica-unifetos.png",          False),
    ("logo-hospital-ivv.png",              False),
    ("logo-clinica-seraphis.png",          True),   # screenshot de bio
    ("logo-hotel-caminito.png",            False),
    ("logo-clinica-bem-fortaleza.png",     False),
    ("logo-recanto-verde-vida.png",        False),
    ("logo-residencial-girassol.png",      False),
    ("logo-residencial-flor-de-lotus.png", False),
    ("logo-blindex.png",                   False),
    ("bombacast-kelly-aguiar.png",         False),
]

for filename, is_bio in logos:
    path = os.path.join(DIR, filename)
    try:
        logo = Image.open(path).convert("RGBA")
        if is_bio:
            logo = crop_bio(logo)
        card = make_base()
        card = place_logo(card, logo)
        card.save(path, "PNG", optimize=True)
        print(f"✓ {filename}")
    except Exception as e:
        print(f"✗ {filename}: {e}")

make_cofen_card(os.path.join(DIR, "certificado-cofen-kelly.png"))
print("\nPronto!")
