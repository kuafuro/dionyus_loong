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
assets/img/           # logo、門面、場景、周邊相（見下）
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

門面本來係純 CSS 砌嘅插畫（洗石米牆、綠摺門、金字招牌、木凳、龍虎圓章），
而家已換上真相；相一旦缺失，插畫會自動頂上。

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

「新企劃」teaser 出自 2026-06-09 嘅 IG 帖
（[DZXlpymgneu](https://www.instagram.com/p/DZXlpymgneu/)，caption：`The new plan is in process.🔥👕🐉🐅`，
tag 咗 @gro_grocery / @59tattoo / @pakkhei / @studio8ight / @gudiii）。
帖文只係放風，冇公佈產品、價錢或日期——所以網站上亦都只寫到咁上下。
一有正式公佈，就更新 `.drop` 嗰段。

---

## Logo

品牌 logo 係傳統刺青風嘅圓形構圖——左邊金黃老虎配紅火焰，右邊綠龍配藍雲黃爪，
中間「酒」「詩」兩隻黑字。已經放喺 `assets/img/logo.jpg`，出現喺導航列、
門面玻璃貼紙同周邊格三個位。

每個位都寫成呢個樣，底下有 CSS 圓章做 fallback：

```html
<span class="logo logo--nav">
  <i>酒</i><i>詩</i>                                   <!-- fallback -->
  <img src="assets/img/logo.jpg" alt="" onerror="this.remove()">
</span>
```

檔案一旦缺失或壞咗，`onerror` 會將 `<img>` 移走，剩返米白底、朱紅圈、酒／詩直排嘅
CSS 圓章，唔會出現爛圖 icon。朱紅圈係 `.logo::after` 畫喺最面，所以有冇真 logo
都見到，同 IG 頭像個圈一致。

logo 隻色亦係成個網站色板嘅來源：`--seal` 朱紅（火焰）、`--tiger` 金黃（虎）、
`--door` 綠（龍身）、`--cloud` 天藍（祥雲，用喺 teaser 個圓框）。

---

## 加相片

**唔使改任何 code。**用返以下檔名放入 `assets/img/`，網站會自動用：

| 檔名 | 出現喺邊 | 而家用緊 |
|---|---|---|
| `logo.jpg` | 導航列、門面玻璃貼紙、周邊格 | 龍虎圓章 |
| `storefront.jpg` | 首頁門面（取代 CSS 插畫） | 門面正面，摺門打開 |
| `scene-1.jpg` | 跑馬燈背景（三張輪流交叉淡入） | 炭爐火焰燒乳鴿 |
| `scene-2.jpg` | 同上 | 夜晚門面，客人坐門口 |
| `scene-3.jpg` | 同上 | 煲仔飯爐上冒煙 |
| `merch-tee.jpg` | 周邊 · T 恤 | 背面龍虎 + 塗鴉牆 |
| `merch-collab.jpg` | 周邊 · GROCERY 聯乘 | 聯乘門面龍虎壁畫 |

想換相就用同一個檔名覆蓋，唔使改 code。

`assets/img/` 入面仲有 53 張未編排嘅 IG 相（原檔名），暫時冇喺網站出現。

未放之前（或者放錯名、檔案壞咗）：每張相嘅 `onerror` 會將自己移走，
JS 亦只會喺**真係載入成功**之後先加 `has-photo` / `has-scene` class，
所以空 `assets/img/` 完全唔會爛版，會維持返 CSS 圖形。

### 點樣放上去

**方法一：GitHub 網頁上載（最快，唔使裝嘢）**

1. 開 <https://github.com/kuafuro/dionyus_loong/tree/claude/jiu-hu-shi-long-website-8q8lxx/assets/img>
2. 撳 **Add file → Upload files**
3. 將相拖入去，**檔名要跟返上面個表**
4. 撳 **Commit changes**

因為 Pages 係由呢條 branch 直接發佈，commit 完等一兩分鐘就會自動上線。

**方法二：本機 git**

```bash
git clone https://github.com/kuafuro/dionyus_loong.git
cd dionyus_loong && git checkout claude/jiu-hu-shi-long-website-8q8lxx
cp ~/相/門面.jpg assets/img/storefront.jpg
git add assets/img && git commit -m "Add shop photos" && git push
```

> 相片喺對話入面貼畀 AI 係入唔到 repo 嘅——一定要經上面其中一個方法上載。

### 影相貼士

橫向、光線夠、唔好用 IG 加咗濾鏡嗰啲。`scene-*` 三張建議一張門面、
一張炭爐／師傅落貨、一張枱面菜色，睇落先有節奏。上載前壓到 300KB 以內
（[Squoosh](https://squoosh.app) 好用），唔係手機會 load 得慢。

### 仲想加

- **菜式相**：喺 `.row` 加 `<img>`，或者改用 grid card 版面（要改 code，我可以幫手）
- **分享預覽圖**：加 `<meta property="og:image" content="https://…/assets/img/og.jpg">`（1200×630）

---

## 部署

### GitHub Pages（現行）

網站已上線：<https://kuafuro.github.io/dionyus_loong/>

Settings → Pages 設定為 **Deploy from a branch**，branch `claude/jiu-hu-shi-long-website-8q8lxx`、
folder `/ (root)`。純靜態站冇 build step，所以唔需要 Actions workflow —— push 上嗰條 branch
GitHub 就會自動重新發佈。

`.nojekyll` 係必需嘅：branch 模式預設會行 Jekyll，而 Jekyll 會略過 `_` 開頭嘅檔案同目錄。
有咗佢就原檔照 copy，唔會有意外。

> **轉 default branch 要注意**：Pages 個 source branch 係獨立設定，唔會跟住 default branch 走。
> 如果將來將 default 轉做 `main`，記得同時去 Settings → Pages 將 branch 都改做 `main`，
> 否則網站會繼續由舊 branch 發佈。

### 自訂域名

域名**唔可以有底線**（ICANN 只准英文字母、數字、連字號），所以 `dionyus_loong.com`
一類寫法係無效嘅。買個合法域名（例如 `dionysus-loong.com`）之後：

1. Settings → Pages → Custom domain 填域名
2. DNS 加 A record 指向 `185.199.108.153`、`185.199.109.153`、`185.199.110.153`、`185.199.111.153`
   （或者 `www` 用 CNAME 指向 `kuafuro.github.io`）
3. 等 DNS check 綠燈，再剔 **Enforce HTTPS**

### Cloudflare Pages / Netlify

Build command 留空，output directory 填 `/`（root）。

---

## 待辦

- [ ] 同店方核對菜單同價錢
- [ ] 將 `assets/img/` 剩低嗰 53 張相編排落餐牌（要逐張認返係邊味菜）
- [ ] 補 `og:image`
- [ ] 如要落廣告或分析，加 Plausible / GA
- [ ] 考慮加 English 版（而家係中文為主、英文做副標）

---

## 授權

網站程式碼可自由使用。「酒虎詩龍 / Dionysus & Loong」品牌、名稱同商標屬店方所有。
