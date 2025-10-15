# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15.5.5 application using the App Router, React 19, TypeScript, and Tailwind CSS v4. The project is bootstrapped with `create-next-app` and uses Turbopack for fast development and builds.

## Development Commands

**Start development server:**
```bash
npm run dev
```
Opens at http://localhost:3000 with hot module replacement enabled.

**Build for production:**
```bash
npm run build
```

**Start production server:**
```bash
npm start
```

**Lint code:**
```bash
npm run lint
```
Uses ESLint with Next.js recommended configs for both core web vitals and TypeScript.

## Project Structure

- **`src/app/`**: Next.js App Router directory
  - `layout.tsx`: Root layout with Geist font configuration and global metadata
  - `page.tsx`: Home page component
  - `globals.css`: Global styles and Tailwind directives

- **`public/`**: Static assets (SVG icons for UI)

- **Path alias**: `@/*` maps to `./src/*` (configured in tsconfig.json)

## Technical Configuration

**Next.js:**
- Uses Turbopack bundler (via `--turbopack` flag)
- App Router architecture (not Pages Router)
- TypeScript configuration with strict mode enabled

**Styling:**
- Tailwind CSS v4 with PostCSS
- Geist and Geist Mono fonts loaded via `next/font/google`
- CSS variables for font families: `--font-geist-sans`, `--font-geist-mono`

**TypeScript:**
- Target: ES2017
- Module resolution: bundler
- Strict mode enabled
- Path mapping: `@/*` → `./src/*`

**Linting:**
- ESLint with Next.js core-web-vitals and TypeScript configs
- Ignores: `node_modules/`, `.next/`, `out/`, `build/`, `next-env.d.ts`

## Development Notes

- Use `Image` component from `next/image` for optimized image loading
- Font optimization is handled automatically by `next/font`
- The app uses the App Router, so create new routes by adding directories under `src/app/`
- React Server Components are the default; use `"use client"` directive for client components
- Turbopack is enabled by default for faster builds and development
