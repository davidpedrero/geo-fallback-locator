# 🌍 Geo Fallback Locator

A simple TypeScript utility to determine a user's geographic location using a two-step fallback strategy:

1. **Browser Geolocation API** (for more accurate latitude/longitude-based detection).
2. **IP-based lookup** using [ipwho.is](https://ipwho.is/) (as a fallback if the user denies permission or an error occurs).

---

## 🚀 Features

- Detects user's **state/region** and **country**
- Fallback logic ensures location is retrieved even if geolocation fails
- Clean, promise-based API
- Minimal dependencies — works out-of-the-box in browser environments

---

## 📦 Usage

### 1. Clone or download the repo

```bash
git clone https://github.com/your-username/geo-fallback-locator.git
cd geo-fallback-locator
```
