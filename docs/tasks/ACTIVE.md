# ACTIVE Task

Status: READY

## Goal

2026年軽井沢旅行を既存旅行とは完全に別管理にし、現時点で確定・検討している実績、固定予定、候補をGitHub Pages上で確認し、候補を選びながら移動時間を確認して日程を組み立てられる最小の旅行Top pageを作る。

このtaskは **軽井沢旅行の独立したTop pageと初期データ＋候補選択UIを成立させる** 1 goalだけ。

## Required context

最初に次のfileだけを読むこと。

- `README.md`
- `AGENTS.md`
- `docs/tasks/ACTIVE.md`
- `docs/index.html`

必要な場合のみ、`docs/index.html` が実際に参照する既存assetを確認する。

既存 `docs/data/*.csv` は別旅行のdataなので読まない・変更しない。

## Scope

1. 軽井沢旅行専用directory `docs/trips/karuizawa/` を新設する。
2. `docs/trips/karuizawa/index.html` を軽井沢旅行専用Top pageとして作る。
3. `docs/trips/karuizawa/data/` に、この旅行だけの初期structured dataを置く。schemaは今回必要な情報だけを表現する最小構成とし、既存旅行CSVへ混在させない。
4. Top pageでは少なくとも次を区別して確認できるようにする。
   - 訪問済み・実績
   - 固定予定・制約
   - 検討中の候補
5. 候補は**施設ごとに独立したcandidate card/row**として表示し、同じ種類でも別施設なら別候補として扱う。
6. 各candidate card/rowには最低限、次を持たせる。
   - 候補名
   - category（例: カーリング / おもちゃ王国 / パターゴルフ / ボウリング）
   - 状態（検討中など）
   - notes
   - Google Mapsを開くためのlinkまたはquery情報
   - 日程へ入れる/選択するためのUI
7. 候補を選んだ時に、**Google Mapsで経路・現在の所要時間を確認できる導線**を用意する。
   - static GitHub PagesのためMaps API keyは追加しない。
   - 固定の所要時間をrepository dataへ書かない。
   - 渋滞等で変動するため、所要時間はGoogle Maps側で確認する設計にする。
   - 可能なら出発地点はページ上でユーザーが入力でき、READMEのprivacy方針に従って`localStorage`等の端末ローカルだけに保持する。固定の宿泊詳細住所をrepositoryへcommitしない。
   - 候補同士を順番に選び、次の候補への経路を開ける等、日程を組み立てる補助UIを最小限実装してよい。
8. 旅行期間は `2026-08-16` から `2026-08-23`。
9. 現時点の入力事実として以下を登録する。

### 訪問済み・実績

- 2026-08-16（日）午後に軽井沢へ車移動。
- 移動途中、東名・環八付近のローソンでおにぎり等を購入して昼食。
- 17:30頃、軽井沢・プリンスショッピングプラザ（アウトレット）到着。
- その後パン屋で軽食。店名は未確定として扱い、推測しない。
- 新軽井沢の花火大会を観覧。
- 武舎煙火の社長と話した。
- その後、軽井沢プリンスホテル ウエストのコテージへチェックイン。
- 2026-08-17（月）は朝食ブッフェを利用し、息子の疲れも考慮してプリンスウエスト・アウトレット周辺でゆっくり過ごす方針。遠出しない。

### 宿泊中の基本予定

- 滞在中は毎朝、宿泊プランに含まれる朝食ブッフェを利用予定。

### 固定予定・制約

- 2026-08-18（火）14時頃、父親にオンライン会議あり。安定した電波と、車内または会議可能な場所を確保する必要がある。それ以外の時間は融通可能。
- 2026-08-19（水）14時頃、息子から見て祖父が軽井沢駅に到着。迎えに行き、そのまま風越公園へ移動。
- 2026-08-19（水）15:00〜17:00、風越公園でテニス予定。
- 2026-08-20（木）は父親が終日会議のため遠方へ移動不可。家族は軽井沢プリンスホテル ウエスト内またはアウトレット周辺で過ごす予定。

### 検討中の候補

以下は**それぞれ別候補として表示すること**。

- 風越公園のカーリング90分体験：現実的な予約候補日は2026-08-21（金）。実施未確定。祖父は参加せず、見学または別行動予定。
- 軽井沢おもちゃ王国：雨の心配が少ない日に行きたい。車移動時間が長いため、同方面の候補と組み合わせることも考慮する。
- パターゴルフ候補A：ユーザー提供Google Maps link `https://maps.app.goo.gl/fgawGAnp3fVaMQkK6?g_st=ic`。本格的なゴルフではなく家族でパターゴルフをする候補として扱う。施設名は推測しない。
- パターゴルフ候補B：ユーザー提供Google Maps link `https://maps.app.goo.gl/2pNMf2iVYdTjtie18?g_st=ic`。本格的なゴルフではなく家族でパターゴルフをする候補として扱う。施設名は推測しない。
- ボウリング：息子の希望があり旅行中に行う予定。候補は浅間ハイランドパーク方面またはアウトレット周辺のボウリング施設。どちらに行くかは未確定。
- 上田・佐久方面は候補として話題に出たが、現時点では一旦保留。今回の初期Top pageで具体的な訪問予定として確定しない。

10. 未確定の施設名、営業時間、料金、予約可否、Google Maps短縮URLのリンク先名称を推測で補完しない。
11. 既存 `docs/index.html` と既存旅行のHTML / CSVは変更しない。

## Required behavior tests

- GitHub Pagesで `docs/trips/karuizawa/index.html` を単独で開ける。
- ページ上で「2026 軽井沢旅行」「2026-08-16〜2026-08-23」が確認できる。
- 訪問済み・固定予定/制約・候補が視覚的に区別される。
- 8/16の実績、8/18会議、8/19祖父迎え＋テニス、8/20終日会議、8/21カーリング候補が確認できる。
- カーリング、おもちゃ王国、パターゴルフ候補A、パターゴルフ候補Bが**4つの独立した候補**として表示される。
- パターゴルフA/BのMaps linkを別々に開ける。
- 候補を選択するUIがあり、選んだ候補についてGoogle Mapsで経路・所要時間を確認する導線がある。
- ページ内に固定の「○分で到着」値をhardcodeしていない。
- 出発地等を保存する場合、repositoryではなくbrowser localStorage等の端末ローカルのみである。
- カーリングは確定予定ではなく検討中として表示される。
- ボウリング施設は未確定の候補として扱われる。
- 上田・佐久は確定旅程として表示されない。
- 既存 `docs/data/*.csv` と既存旅行HTMLに変更がない。
- privateな住所、予約番号、メール、電話番号等が追加されていない。

## Tests

最低限、次を実行する。

- `git diff --check`
- `git diff --name-only`
- `grep -n "2026 軽井沢旅行\|2026-08-16\|2026-08-18\|2026-08-19\|2026-08-20\|2026-08-21" docs/trips/karuizawa/index.html`
- `grep -n "カーリング\|おもちゃ王国\|パターゴルフ候補A\|パターゴルフ候補B" docs/trips/karuizawa/index.html`
- 軽井沢用structured dataを追加した場合、そのCSV等の列数・構造が全rowで一貫していることを最小限確認する
- Maps link/query生成がcandidateごとに正しいdestinationを使うことを静的確認する
- relative link / asset pathを静的または目視確認する

repo-wide testや外部Web調査は行わない。

## Do not

- 既存 `docs/index.html` を旅行選択Top pageへ変更しない
- 既存旅行のHTML / CSVを移動・rename・変更しない
- Google Maps短縮URLをWeb検索して施設名を推測しない
- Google Maps API keyを追加しない
- 固定の移動所要時間を推測してdataへ入れない
- 上田・佐久方面を確定旅程へ入れない
- カーリングを予約済み・実施確定として扱わない
- ボウリング施設を勝手に1つへ決定しない
- おもちゃ王国の日付を勝手に決定しない
- 未確認の料金・営業時間・移動時間を追加しない
- React / Next.js等のframeworkを追加しない
- build system / backend / API / database / authenticationを追加しない
- dependency追加・upgradeをしない
- unrelated refactorをしない
- privacy情報をcommitしない
- 将来の他旅行namespaceを先回りして作らない

## PR metadata

### Title

軽井沢旅行の候補選択ページを追加 / Add Karuizawa candidate planning page

### Body requirements

# 日本語

- 概要
- 変更内容
- 設計上の判断
- 意図的に未実装
- Tests

設計上の判断には、既存旅行を変更せず `docs/trips/karuizawa/` に完全分離したこと、確定・実績・候補を区別したこと、変動する移動時間をhardcodeせずGoogle Mapsで確認する方式にしたことを書く。

意図的に未実装には、root旅行選択ページ、既存旅行namespace移行、未確定候補の日付決定、Maps APIによる自動所要時間取得、外部情報の再調査を含める。

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

- `docs/trips/karuizawa/index.html` が追加され、GitHub Pagesで利用できる
- 軽井沢専用structured dataが `docs/trips/karuizawa/data/` に存在する
- 現時点の実績・固定予定・制約・候補が事実どおり区別して表示される
- カーリング、おもちゃ王国、パターゴルフA、パターゴルフBが別candidateとして選べる
- 候補からGoogle Mapsの経路・変動所要時間を確認できる
- 未確定情報を推測していない
- 既存旅行のHTML / CSVが変更されていない
- Required behavior testsを満たす
- 指定Testsがpassしている
- PRが作成されている

Codex Cloudの最終報告は日本語のみで、次の4項目を簡潔に報告する。

1. 変更内容
2. Tests / 結果
3. 意図的に未実装 / blocker
4. Review readiness
