# ER Registry Dashboard

Design prototype for the Ministry of Public Health ER Registry — an emergency-room benchmarking dashboard for Thailand's hospitals. Built as a React/Vite/TypeScript static site, deployed to GitHub Pages.

**Live:** https://bms-uxui.github.io/er-registry/

## What's inside

- **Login page** — MOPH branding with Provider ID sign-in CTA.
- **Dashboard** — hero search banner, stats row, and a folder-tab view over:
  - *ภาพรวม* — four category cards (Stroke, Trauma, STEMI, Sepsis) with animated segmented dials and KPI sub-cards.
  - *รายชื่อสถานพยาบาล* — sortable, paginated hospital table with sticky first two columns, horizontal scroll hint, cursor-following tooltip, and search.
- **Drill-down detail** — clicking a hospital row (or searching from the banner) replaces the table with a per-hospital detail view that reuses the same `CategoryCard`, hydrated with that hospital's percentage data and case totals.
- **Logout** — confirmation dialog wired through the floating user profile.

## Project layout

The Vite project lives in [`react-starter/`](react-starter/). Key structure:

```
react-starter/
  src/
    pages/
      LoginPage.tsx
      ErRegistryDashboard.tsx      # thin page shell
    dashboard/
      tokens.ts                    # color + glass-surface tokens
      types.ts                     # KPI, Category, HospitalRowData
      data.ts                      # categories, hospitals, hydration helpers
      components/
        Banner.tsx
        StatsRow.tsx
        FolderTabs.tsx
        CategoryCard.tsx           # + KpiSubCard
        HospitalTable.tsx
        HospitalDetailPanel.tsx
        SegmentDial.tsx            # + GaugeGradientDefs
        TablePill.tsx
        FyiButton.tsx
        LatestUpdate.tsx
        UserProfile.tsx            # + logout dialog
        SiteFooter.tsx
    main.tsx                       # HashRouter + providers
    index.css                      # Tailwind v4, Google Sans, fade-up keyframe
```

## Stack

- React 19 + Vite 7 + TypeScript
- Tailwind CSS v4 (`@tailwindcss/vite`)
- MUI (Table, TablePagination, TableSortLabel) + Radix (Tabs, Tooltip, Dialog) + HeroUI
- `react-gauge-component` for the segmented semicircle dials
- `lucide-react` for icons
- `react-router` in HashRouter mode (so deep links work under the GitHub Pages subpath)

## Run locally

```bash
cd react-starter
npm install
npm run dev      # Vite dev server
npm run build    # type-check + production build to dist/
npm run lint
```

## Deployment

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds `react-starter/` and publishes `react-starter/dist` to GitHub Pages on every push to `main`. Pages is configured with `build_type=workflow`, and `vite.config.ts` sets `base: '/er-registry/'` to match the repo subpath.
