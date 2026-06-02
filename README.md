# shared-css

Depot des assets UI partages (CSS + JS) utilises par les pages pedagogiques.

## Structure

- `css/style.css`: systeme de styles generique commun
- `js/script.js`: interactions JS partagees (ouverture/fermeture overlay video)

## Composants CSS principaux

- Layout/containers: `container`, `split-grid`
- Blocs de contenu: `panel`, `panel--tips`, `panel--resources`, `panel--links`, `panel--theme`
- Cartes: `card`, `card-grid`, `cta-card`
- Navigation: `nav-sidebar`, `nav-card`, `nav-tree`, `nav-tree-label`
- Media: `media-grid`, `media-item`, `media-item__*`
- Boutons: `btn`, `btn-outline`, `btn-solid`, `quiz-button`
- Overlay: `overlay`, `overlay__content`, `overlay__header`, `overlay__close`, `overlay__frame`
- Utilitaires: `u-muted`, `u-list-basic`, `u-text-left`

## Utilisation

### Developpement local

```html
<link rel="stylesheet" href="../../shared/css/style.css">
<script src="../../shared/js/script.js"></script>
```

### Production (GitHub Pages)

```html
<link rel="stylesheet" href="https://jvprof.github.io/shared-css/css/style.css">
<script src="https://jvprof.github.io/shared-css/js/script.js"></script>
```

## Contraintes d'integration

- Privilegier les classes generiques existantes avant d'ajouter de nouvelles classes.
- Eviter la creation de styles inline sur les pages sous CSP stricte.
- Garder les selecteurs JS alignes avec les classes CSS (`media-item__thumb`, `btn-outline`, `btn-solid`, `overlay__close`).

## Palette

- Primaire: `#6366f1`
- Accent: `#f97316`
- Information: `#06b6d4`
- Violet secondaire: `#a78bfa`

## Licence

MIT
