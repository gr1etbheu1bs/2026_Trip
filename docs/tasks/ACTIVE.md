# ACTIVE Task

Status: READY

## Goal

軽井沢旅行の候補を、スマホで1日単位の予定としてパズルのように組み立てられる最小の旅程Plannerを追加する。

このtaskのgoalは **日付ごとに予定カードを並べ、上下ボタンで順番を変更し、滞在時間と地点間の移動時間から1日の時刻を再計算できること** の1点だけ。

## Required context

最初に次のfileだけを読むこと。

- `README.md`
- `AGENTS.md`
- `docs/tasks/ACTIVE.md`
- `docs/trips/karuizawa/index.html`
- `docs/trips/karuizawa/data/candidates.csv`
- `docs/trips/karuizawa/data/travel_times.csv`
- `docs/trips/karuizawa/data/itinerary.csv`

既存設計の参考として必要な場合のみ、次のheader / 必要行だけ確認してよい。

- `docs/data/plan_items.csv`
- `docs/data/travel_segments.csv`

repo全体scan、既存旅行HTMLの全読み、Web調査は行わない。

## Scope

1. `docs/trips/karuizawa/index.html` に、スマホ向けの「1日の予定を組み立てる」sectionを追加する。
2. 日付を選択できるようにする。対象は `2026-08-17`〜`2026-08-23`。
3. 選択した日の予定を縦方向のカード一覧で表示する。
4. 各予定カードには最低限、次を表示する。
   - 予定/候補名
   - 固定予定か可変候補か
   - 想定滞在時間
   - 算出された開始時刻・終了時刻
   - 直前地点からの計画用移動時間
5. 可変候補カードは、スマホで押しやすい `↑` / `↓` ボタンで並び替えできるようにする。
6. drag & dropを主操作にしない。touch操作での誤操作を避ける。
7. 並び替え後は、その日の開始時刻から順に、`移動時間 + 滞在時間` を使って後続カードの開始/終了時刻を再計算する。
8. 固定予定は時刻anchorとして扱い、その時刻自体を上下操作で変更しない。
9. 固定予定と前後の可変候補が時間的に衝突する場合は、UI上で「この並びでは固定予定に間に合わない」等のwarningを表示する。
10. Plannerの変更内容はGitHubへ書き込まない。ブラウザの `localStorage` にだけ保存してよい。
11. 既存の候補選択/Google Maps導線は壊さない。
12. GitHub Pages上でstatic HTML/CSS/JavaScriptのみで動作させる。

## Initial planning data

今回のtaskでは、既存candidateに次の想定滞在時間を持たせる。

- 風越公園・カーリング90分体験: 90分
- 軽井沢おもちゃ王国: 300分
- 軽井沢ゴルフ練習場・パターコース: 60分
- 竹内ゴルフ練習場: 90分

これは旅程組み立て用の初期目安であり、実績ではないことをUIに明示する。

必要なら `candidates.csv` に `stay_minutes` 等の最小columnを追加してよい。

## Fixed schedule anchors

### 2026-08-18（火）

- 14:00頃: 父親のオンライン会議
- Plannerでは少なくとも13:30までに、安定した電波と会議可能な場所へ戻れる/到着できる前提でwarning判定できるようにする。
- 会議自体のdurationは今回確定情報がないため推測しない。14:00 anchorとして扱う。

### 2026-08-19（水）

- 14:00頃: 軽井沢駅で祖父を迎える
- 15:00〜17:00: 風越公園でテニス
- この2つは固定予定として動かさない。
- 軽井沢駅 → 風越公園の計画用移動時間が必要な場合、このtaskでは `約15分` を初期目安として使ってよい。

### 2026-08-20（木）

- 父親は終日会議で遠方移動不可。
- Plannerではこの日を「近場のみ」の制約日として表示する。
- このtaskで家族側の詳細自由行動を勝手に作らない。

## Planning travel-time behavior

1. 既存 `docs/trips/karuizawa/data/travel_times.csv` をSource of Truthとして使う。
2. Plannerで必要な地点間の組合せがdataにない場合、勝手に大量補完しない。
3. 既知の組合せがない場合は `移動時間未登録` と表示し、時刻計算を不確実扱いにする。
4. 今回、次の組合せのみ追加が必要なら追加してよい。
   - 軽井沢駅 → 軽井沢風越公園 / 軽井沢アイスパーク: 15分
   - 軽井沢おもちゃ王国 ↔ 竹内ゴルフ練習場: 10分
5. travel timeは通常時の計画目安であり、realtime保証値ではないことを維持する。
6. Google Mapsは出発直前の実時間確認用として既存導線を維持する。

## Day planner interaction

スマホ操作を優先する。

- 日付選択は大きめのselectまたは横スクロール可能な日付buttonでよい。
- 予定カードは1列。
- `↑` / `↓` は最低44px程度のtouch targetを確保する。
- 各カードから削除/追加できる場合も、今回のgoalを超えて複雑な編集UIにしない。
- 最小実装として、候補sectionから「この日の予定に追加」→ Plannerで上下並び替え、でもよい。
- localStorage keyは軽井沢旅行namespace専用にし、既存旅行のlocalStorageと衝突させない。

## Required behavior tests

- スマホ幅でも横スクロールを強制されず、1日のPlannerを操作できる。
- 8/19を選ぶと、14:00祖父迎えと15:00〜17:00テニスが固定anchorとして確認できる。
- 可変候補を2件以上入れた場合、`↑` / `↓` で順番を変更できる。
- 順番変更後、開始/終了時刻が再計算される。
- 各候補に想定滞在時間が表示される。
- 地点間のtravel-time dataがある場合は「移動 約○分」が表示される。
- travel-time dataがない組合せは勝手に推測せず `未登録` と分かる。
- 8/18では14:00会議anchorが表示され、その直前に間に合わない並びならwarningが出る。
- 8/20は遠方移動不可の日として分かる。
- localStorageへ保存した並びは再読込後も復元される。
- 既存の候補カード、5/15/40/50分表示、Google Mapsリンクが壊れていない。
- 既存旅行のHTML / CSVは変更されていない。

## Tests

最低限、次を実行する。

- `git diff --check`
- `git diff --name-only`
- `grep -n "↑\|↓\|localStorage\|2026-08-19\|15:00" docs/trips/karuizawa/index.html`
- candidate stay timeが90/300/60/90分としてstructured dataまたはJS dataに対応していることを確認
- `travel_times.csv` を変更した場合、CSV列数の一貫性を確認
- 8/19の固定anchorが14:00 / 15:00〜17:00として保持されることを静的確認
- localStorage keyが軽井沢専用namespaceであることを確認
- mobile CSSでPlanner card/actionが1列でtouch操作可能なサイズになっていることを静的確認

ブラウザが利用可能なら、375px前後のviewportで以下を手動確認する。

- 日付切替
- 候補追加
- ↑ / ↓ 並び替え
- 再計算
- reload後の復元

ブラウザがない場合は未実施として明記し、無理にdependencyを追加しない。

## Do not

- drag & drop libraryを追加しない
- frameworkを追加しない
- backend / API / databaseを追加しない
- Google Maps APIを追加しない
- repo-wide refactorをしない
- 既存旅行のplannerを変更しない
- 全候補間のtravel-time matrixを作らない
- 未確認の営業時間・予約状況・料金を追加しない
- 8/18会議の終了時刻を推測しない
- 8/20の家族行動を勝手に確定しない
- localStorageに住所、予約番号等の不要なprivate情報を保存しない
- dependency追加・upgradeをしない

## PR metadata

### Title

スマホ向け1日旅程Plannerを追加 / Add mobile daily itinerary planner

### Body requirements

# 日本語

- 概要
- 変更内容
- 設計上の判断
- 意図的に未実装
- Tests

設計上の判断には、drag & dropではなくスマホ向け上下ボタンを採用したこと、固定予定をanchorとして扱うこと、travel-time未登録を推測しないことを書く。

意図的に未実装には、自由な時刻編集、全地点間matrix、realtime Maps API、自動最適化を含める。

---

# English

- Summary
- Changes
- Design decisions
- Intentionally deferred
- Tests

日本語と英語を行ごとに混在させない。

## Completion

次をすべて満たしたら完了。

- 軽井沢Top pageに日付別Plannerが追加されている
- スマホで可変候補を↑/↓で並び替えできる
- 滞在時間と既登録travel-timeから開始/終了時刻が再計算される
- 固定予定anchorとの衝突warningがある
- localStorageで日別の並びを保持できる
- 未登録travel-timeを推測していない
- 既存候補UI / Maps導線を壊していない
- Required behavior testsを満たす
- 指定Testsがpassしている
- PRが作成されている

Codex Cloudの最終報告は日本語のみで、次の4項目を簡潔に報告する。

1. 変更内容
2. Tests / 結果
3. 意図的に未実装 / blocker
4. Review readiness
