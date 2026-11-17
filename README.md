# YouTube Player — Angular sample

Public playground for the YouTube Player Angular adapter. Standalone headless `<yt-video-player>`.

| | |
|--|--|
| Port | **4200** |
| Sample version | **1.0.0** |
| Repo | [ytplayer-sample-angular](https://github.com/codenannu/ytplayer-sample-angular) |
| SDK | `@codenkay/video-ytplayer-angular` · `core` (**^1.0.0**) |

## Runtime stack

| Layer | Version |
|-------|---------|
| Node.js | **>=20.9.0** |
| Angular | **19.2.25** LTS |
| TypeScript | ~5.8.3 |
| SDK | `@codenkay/video-ytplayer-angular@^1.0.0` · `core@^1.0.0` |

> This sample is **standalone**. It does **not** require cloning a private SDK monorepo. Prefer installing packages from **npm**.

## Changelog

See [CHANGELOG.md](./CHANGELOG.md).

## SDK packages

| Package | Role | Used here |
|---------|------|-----------|
| [`@codenkay/video-ytplayer-core`](https://www.npmjs.com/package/@codenkay/video-ytplayer-core) | YouTube IFrame API engine | Yes |
| [`@codenkay/video-ytplayer-angular`](https://www.npmjs.com/package/@codenkay/video-ytplayer-angular) | Standalone component | **Primary** |
| [`@codenkay/video-ytplayer-ui`](https://www.npmjs.com/package/@codenkay/video-ytplayer-ui) | React chrome | No — see [React sample](https://github.com/codenannu/ytplayer-sample-react) |

## Related samples

| Sample | Repository | Port | Purpose |
|--------|------------|------|---------|
| React | [ytplayer-sample-react](https://github.com/codenannu/ytplayer-sample-react) | **5173** | Full React chrome |
| Next.js | [ytplayer-sample-nextjs](https://github.com/codenannu/ytplayer-sample-nextjs) | **3001** | CSP / Referrer-Policy |
| **This repo** | [ytplayer-sample-angular](https://github.com/codenannu/ytplayer-sample-angular) | **4200** | Headless Angular |

## Quick start

```bash
git clone https://github.com/codenannu/ytplayer-sample-angular.git
cd ytplayer-sample-angular
cp .env.example .env.local   # optional: PORT / HOSTNAME
npm install
npm start
```

Requires Node.js **>=20.9.0**. Open http://localhost:4200

Listen bind: `NODE_ENV`, `PORT` (default **4200**), `HOSTNAME` via `scripts/serve-with-env.mjs`.

## Install peers (into your own app)

```bash
npm install @codenkay/video-ytplayer-angular@^1.0.0 @codenkay/video-ytplayer-core@^1.0.0
```

```html
<yt-video-player
  [videoId]="id"
  [privacyEnhanced]="true"
  (watchTime)="onWatch($event)"
  (error)="onError($event)"
/>
```

Host pages must send `Referrer-Policy: strict-origin-when-cross-origin`.

## Features demonstrated

- Standalone `<yt-video-player>`
- `getPlayer()` / `watchTime` / `ready` / `error`
- Privacy-enhanced embeds (`youtube-nocookie.com`)
