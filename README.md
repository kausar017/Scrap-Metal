# Scrap metal website

A React scrap metal business website built with JSX, Vite, Tailwind CSS, and DaisyUI. It opens in English and includes an Arabic language selector with right-to-left layout support. Page copy is translated at runtime with the free Google Translate engine through the `translate` package. Translation requires an internet connection and the free, unofficial service may be rate-limited or unavailable.

Pages live in `src/components/pages`, while reusable components such as the header and footer live in `src/components/shared`.

Page and component styling is written with Tailwind utility classes directly in JSX `className` attributes.

## Development

```sh
npm install
npm run dev
```

## Validation

```sh
npm run build
npm run lint
```
