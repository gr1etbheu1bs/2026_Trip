# ACTIVE Task

Status: READY

## Goal

現在公開中の旅行情報を最新状態にし、root旅行一覧では新しい旅行が上、軽井沢旅行では最新の確定予定が固定予定として反映される状態にする。

このtaskは **現在の旅行情報を正しい順序と確定状態で表示する** 1 goalだけ。

## Required context

最初に次のfileだけを読むこと。

- `AGENTS.md`
- `docs/tasks/ACTIVE.md`
- `docs/index.html`
- `docs/trips/karuizawa/index.html`

必要な場合のみ、軽井沢ページが参照する旅行専用data fileを確認する。

repo全体scanや外部Web調査は行わない。

## Scope

1. root `docs/index.html` の旅行カードを、`AGENTS.md` の Trip Portal Ordering に従い旅行開始日の新しい順へ並べる。
   - 軽井沢旅行 `2026-08-16`〜`2026-08-23` を上
   - 神奈川方面の親子科学旅行 `2026-08-12`〜`2026-08-14` を下
2. 軽井沢旅行の確定予定に、次を追加する。
   - 2026-08-20（木）19:30
   - `いろどりDINING 彩‐SAI‐`
   - 夕食予約
   - **確定予定**として扱う
3. 8/20（木）は父親が終日会議で遠方移動不可という既存制約を維持する。
4. 日別Plannerにも、8/20（木）19:30の夕食を**固定anchor**として追加する。
5. 固定anchorの名前は `いろどりDINING 彩‐SAI‐で夕食` 等、施設名と夕食であることが明確な表現にする。
6. 夕食の想定終了時刻・滞在時間はユーザーから指定されていないため推測しない。Plannerの既存構造上stay値が必須なら `0` または「未設定」として扱い、19:30 anchorだけを確定情報として保持する。
7. 店舗の住所、電話番号、コース、料金、予約番号、予約人数などを推測・追加しない。
8. 2026-08-17（月）の実績も、既にユーザーから確定している内容へ更新する。
   - 日中はコテージ内と周辺で過ごした
   - 18:45からピザーラで着席して夕食
   - これらは「予定」ではなく訪問済み・実績として表示する
9. 既存の軽井沢候補、移動時間、Plannerの並び替えロジックは今回の変更に必要な範囲以外で変更しない。

## Required behavior tests

- root Top pageでは軽井沢旅行カードが神奈川旅行カードより上に表示される。
- rootの2旅行の期間・linkは変更されていない。
- 軽井沢の固定予定欄に `8/20（木）19:30` と `いろどりDINING 彩‐SAI‐` が表示される。
- 8/20の終日会議・遠方移動不可制約が残っている。
- 8/20 Plannerに19:30夕食anchorが表示される。
- 夕食anchorの終了時刻を勝手に確定していない。
- 8/17実績が「コテージ内と周辺」「18:45」「ピザーラ」を含む。
- 既存候補4件、移動時間、Google Maps導線、localStorage Plannerが壊れていない。
- privateな予約番号等が追加されていない。

## Tests

最低限、次を実行する。

- `git diff --check`
- `git diff --name-only`
- root内の軽井沢カードが神奈川カードより先にあることを静的確認
- `grep -n "2026-08-16\|2026-08-12\|軽井沢\|神奈川" docs/index.html`
- `grep -n "8/20（木）19:30\|いろどりDINING 彩‐SAI‐\|18:45\|ピザーラ" docs/trips/karuizawa/index.html`
- HTML内scriptを変更するため、埋め込みJavaScriptを `node --check` 相当で構文確認
- 8/20 fixedSchedulesに19:30 anchorが存在することを静的確認

repo-wide test、外部Web調査は行わない。

## Do not

- 店舗情報をWeb検索しない
- 夕食の終了時刻や滞在時間を推測しない
- 予約番号、人数、電話番号等を追加しない
- 8/20の終日会議制約を消さない
- 軽井沢の候補や移動時間をついでに変更しない
- Plannerを再設計しない
- framework / dependencyを追加しない
- 神奈川旅行の内容を変更しない
- unrelated refactorをしない

## PR metadata

### Title

旅行一覧の順序と軽井沢の確定予定を更新 / Update trip ordering and confirmed Karuizawa schedule

### Body requirements

# 日本語

- 概要
- 変更内容
- 設計上の判断
- 意図的に未実装
- Tests

設計上の判断には、旅行一覧を開始日の新しい順にしたこと、8/20 19:30夕食を固定anchorとして追加し未指定の終了時刻は推測しなかったことを書く。

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

- root旅行一覧が開始日の新しい順になっている
- 8/20 19:30の `いろどりDINING 彩‐SAI‐` 夕食が固定予定として表示される
- Plannerにも同夕食anchorが存在する
- 8/17の実績がユーザー確定内容へ更新される
- 未指定情報を推測していない
- Required behavior testsを満たす
- 指定Testsがpassしている
- PRが作成されている

Codex Cloudの最終報告は日本語のみで、次の4項目を簡潔に報告する。

1. 変更内容
2. Tests / 結果
3. 意図的に未実装 / blocker
4. Review readiness
