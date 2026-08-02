# 酒虎詩龍 Dionysus & Loong — 官方網站

天后清風街港式串燒．燒烤．小酒館嘅單頁網站。純靜態 HTML / CSS / JS，冇 build step，
放上任何靜態 host（GitHub Pages、Cloudflare Pages、Netlify）即刻用得。

> 「狂飲且共樓頭醉，酒虎詩龍各自豪。」——丘逢甲《東山酒樓次柳汀韻》

---

## 本機預覽

```bash
npx serve .          # 或 python3 -m http.server 8000
```

然後開 <http://localhost:3000>。冇 build、冇 dependency、冇 framework。

---

## 檔案結構

```
index.html            # 全部內容（單頁）
assets/css/style.css  # 全部樣式
assets/js/main.js     # sticky nav、手機選單、scroll reveal、active link
assets/img/           # 放真實相片嘅位（見下）
```

---

## 設計

### 色板 — 直接跟舖頭門面

| Token | 值 | 出處 |
|---|---|---|
| `--paper` | `#e9ede4` | 洗石米外牆（淺） |
| `--terrazzo` | `#cfd8cb` | 洗石米外牆 |
| `--door` | `#43684f` | 綠色摺門（主色） |
| `--door-dk` / `--door-dp` | `#2c4636` / `#1e3226` | 深色區塊底 |
| `--brass` / `--brass-lt` | `#a8853f` / `#c9a961` | 金色立體字招牌 |
| `--wood` | `#8b5e3c` | 門口木長凳 |
| `--seal` | `#a02c20` | logo 龍虎紅（只作點綴） |

洗石米質感係用 `--speckle`（一組 radial-gradient 斑點）鋪喺淺色同深色區塊上。

### 字體

`Noto Serif TC`（中文）＋ `Cormorant Garamond`（拉丁字母 / 價錢 / 編號），由 Google Fonts 載入，
有完整 system serif fallback，就算載唔到都唔會崩。

### 版面

暖色 editorial 排版：巨型標題、幼線分隔、編號索引式餐牌、深綠色區塊做節奏對比、
跑馬燈 band、六格資料 tile。深綠／淺綠交替，避免成頁一種調子。

門面插畫（洗石米牆、綠摺門、金字招牌、木凳、龍虎圓章）係純 CSS 砌，冇用圖片。

---

## 內容來源

資料整理自店方 Instagram [@dionysus_loong](https://www.instagram.com/dionysus_loong/)、
[OpenRice](https://www.openrice.com/zh/hongkong/r-%E9%85%92%E8%99%8E%E8%A9%A9%E9%BE%8D-%E5%A4%A9%E5%90%8E-%E5%A4%9A%E5%9C%8B%E8%8F%9C-%E9%85%92-r803395)
及公開報導：

- **地址**：香港天后清風街1-3號地下
- **時間**：星期一至日 18:00–00:00
- **訂座**：WhatsApp 6587 5174
- **開業**：2022（2025 年 7 月為三週年）
- **座位**：約 30
- **人均**：$201–400
- **交通**：港鐵天后站 A2 出口步行約 4 分鐘

菜式價格（麻辣西瓜 $48、串燒牛舌芯 $78、焦糖牛油燒粟米 $52、五香薰衣草乳鴿 $128）
來自食客分享，可能已經過時。**上線前建議搵店方核對一次價錢同菜單。**

---

## 加真實相片

而家全站零圖片（純 CSS 圖形），load 得好快。想換返真相片：

1. 相片放入 `assets/img/`（建議 WebP，寬度 1600px 以內）
2. 門面插畫：將 `index.html` 入面成個 `<div class="storefront">` 換成
   ```html
   <img src="assets/img/storefront.webp" alt="酒虎詩龍門面" loading="lazy">
   ```
3. 菜式相：喺 `.row` 加 `<img>`，或者改用 grid card 版面
4. 記得加 `<meta property="og:image">` 指向一張分享用嘅相（1200×630）

---

## 部署

### GitHub Pages

Repo Settings → Pages → Source 揀 **GitHub Actions**。
`.github/workflows/pages.yml` 已經設定好，push 上 `main` 就會自動部署。

### Cloudflare Pages / Netlify

Build command 留空，output directory 填 `/`（root）。

---

## 待辦

- [ ] 同店方核對菜單同價錢
- [ ] 換上真實門面 / 菜式相片
- [ ] 補 `og:image`
- [ ] 如要落廣告或分析，加 Plausible / GA
- [ ] 考慮加 English 版（而家係中文為主、英文做副標）

---

## 授權

網站程式碼可自由使用。「酒虎詩龍 / Dionysus & Loong」品牌、名稱同商標屬店方所有。
