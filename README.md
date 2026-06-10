# shared-css

Depot des assets UI partages (CSS + JS) utilises par les pages pedagogiques.

## Structure

- `css/style.css`: systeme de styles generique commun
- `js/script.js`: interactions JS partagees (ouverture/fermeture overlay video)

## Architecture CSS et maintenance

Le fichier `css/style.css` est organise par blocs, dans cet ordre:

1. `TOKENS`: variables globales (`:root`) pour couleurs, rayons, ombres, transitions.
2. `BASE`: reset, typo, comportements globaux.
3. `PANELS`: composant socle `.panel`, puis variantes `.panel--*`, puis sections dediees `.page-section-*`.
4. `LISTES SPECIALISEES`: `definition-list`, `step-list`, etats importants.
5. `CARTES`, `MEDIA`, `BOUTONS`, `OVERLAY`, `NAV`, `PROMO`, `QUIZ`, `FOOTER`, `UTILITIES`, `ANIMATIONS`, `RESPONSIVE`.

Cette organisation est importante: elle limite les regressions de cascade et facilite la recherche des styles.

### Logique de design

- Design system base sur tokens:
	- primaire: couleur structurelle principale
	- accent: mise en avant/action
	- info: ressources/documentation
- Les `panel` portent la hierarchie visuelle des contenus pedagogiques.
- Les variantes `panel--*` changent l'intention visuelle sans casser la structure du composant de base.
- Les sections dediees (`page-section-target`, `page-section-instructions`) permettent d'appliquer un rendu de panel sur des sections de page semantiques.
- Les cartes media utilisent une sequence chromatique par index pour differencier les episodes.

### Conventions pour ajouter/modifier un style

1. Reutiliser un token existant avant d'ajouter une nouvelle couleur/ombre/rayon.
2. Privilegier les variantes (`panel--nouvelle-variante`) plutot que dupliquer un bloc complet.
3. Garder les sous-regles proches de leur bloc parent (ex: `.panel--links`, puis ses `h2`, `a`, `ul`, etc.).
4. Eviter les selecteurs trop specifiques; preferer des classes explicites.
5. Tester desktop + mobile apres chaque changement (breakpoints `900px` et `768px`).

### Logique responsive

- `max-width: 900px`: simplification des layouts multi-colonnes.
- `max-width: 768px`: ajustement mobile (espacements, tailles de titres, modale video).

Objectif: garder les composants stables et ne modifier que la densite/layout selon l'ecran.

### Interactions JS liees au CSS

Les interactions video reposent sur des classes/attributs cibles:

- classes: `media-item__thumb`, `btn-outline`, `btn-solid`, `overlay__close`
- attributs: `data-video-id` (source ladigitale) ou `data-video-url` (YouTube)

Si ces classes/attributs changent, mettre a jour `js/script.js` en meme temps.

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

Proprietaire
