# ACTIVE Task

Status: READY

## Goal

GitHub Pagesのroot `docs/index.html` を、旅行が増えても常に各旅行ページへ辿れる「旅行ポータルTop page」に変更する。

このtaskは **旅行一覧Top pageを成立させる** 1 goalだけ。

## Required context

最初に次のfileだけを読むこと。

- `AGENTS.md`
- `docs/tasks/ACTIVE.md`
- `docs/index.html`
- `docs/trips/karuizawa/index.html`

既存神奈川旅行の詳細ページは、root `docs/index.html` から現在リンクされている既存ページ構造を確認するために必要な場合のみ読む。

repo全体scanや外部Web調査は不要。

## Scope

1. GitHub Pages root `docs/index.html` を旅行ポータルTop pageへ変更する。
2. Top pageでは旅行をカード/一覧として表示し、少なくとも次を一目で確認できるようにする。
   - 旅行名 / 場所
   - 旅行期間
   - 旅行ページへのリンク
3. 現在管理している旅行を別々の旅行として掲載する。
   - 神奈川方面の親子科学旅行
     - 期間: `2026-08-12`〜`2026-08-14`
     - 既存rootページ群がこの旅行の既存実装なので、旅行カードから既存の旅行内容へ辿れる導線を維持すること。
   - 軽井沢旅行
     - 場所: 軽井沢
     - 期間: `2026-08-16`〜`2026-08-23`
     - URL/path: `trips/karuizawa/`
4. rootをポータル化しても、神奈川旅行の既存ページ・データを削除しない。
5. 神奈川旅行について、旧root `docs/index.html` の内容が失われないようにする。必要ならその内容を神奈川旅行専用のentry page（例: `docs/trips/kanagawa/index.html`）へ最小限移し、既存asset/dataへのrelative pathを正しく調整する。
6. 各旅行ページからroot旅行ポータルへ戻れる明確な「旅行一覧 / Top」導線を用意する。
   - 軽井沢 `docs/trips/karuizawa/index.html`
   - 神奈川旅行のentry page
7. GitHub Pagesの公開URLとして、rootポータルからタップして各旅行へ到達できること。
8. スマホで旅行カードを押しやすいレイアウトにする。既存CSSを再利用できる場合は再利用し、不要なframework/dependencyを追加しない。

## Required behavior tests

- GitHub Pages root `/2026_Trip/` を開くと旅行一覧Top pageが表示される。
- Top pageに「神奈川方面の親子科学旅行」「2026-08-12〜2026-08-14」が表示される。
- Top pageに「軽井沢」「2026-08-16〜2026-08-23」が表示される。
- 軽井沢カードから `trips/karuizawa/` へ遷移できる。
- 神奈川旅行カードから既存の神奈川旅行内容へ遷移できる。
- 軽井沢ページからroot旅行一覧へ戻れる。
- 神奈川旅行entry pageからroot旅行一覧へ戻れる。
- 神奈川旅行の既存候補・ホテル・地図・根拠等への導線が壊れていない。
- 既存旅行データCSVを削除・混在させていない。
- スマホ幅で横スクロールを前提とせず旅行カードを操作できる。

## Tests

最低限、次を実行する。

- `git diff --check`
- `git diff --name-only`
- `grep -n "神奈川\|2026-08-12\|2026-08-14\|軽井沢\|2026-08-16\|2026-08-23" docs/index.html`
- `grep -n "trips/karuizawa" docs/index.html`
- rootポータル → 各旅行entry → rootポータルのrelative linkを静的確認
- 神奈川旅行entryから既存 `facilities.html` / `hotels.html` / `map.html` / `sources.html` 等へのlink/asset pathが有効であることを静的確認
- HTML内scriptを変更した場合のみ `node --check` 相当で構文確認

repo-wide test、外部Web調査は行わない。

## Do not

- 旅行同士のデータを1つのCSVへ混在させない
- 軽井沢旅行を神奈川旅行の一部として扱わない
- 神奈川旅行の既存ページ/データを削除しない
- 既存旅行の意味・実績・候補を勝手に変更しない
- 新しい旅行の情報を推測で追加しない
- framework / backend / database / APIを追加しない
- dependency追加・upgradeをしない
- unrelated refactorをしない
- GitHub Pagesの公開base path `/2026_Trip/` を壊さない
- privacy情報を追加しない

## PR metadata

### Title

旅行一覧トップページを追加 / Add trip portal top page

### Body requirements

# 日本語

- 概要
- 変更内容
- 設計上の判断
- 意図的に未実装
- Tests

設計上の判断には、rootを旅行一覧ポータルにし、旅行ごとのページ/データを独立管理することを書く。

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

- root `docs/index.html` が旅行一覧ポータルになっている
- 神奈川旅行と軽井沢旅行が別カード/別entryとして表示される
- 各カードに場所/旅行名、期間、旅行ページへのlinkがある
- 各旅行entryからrootポータルへ戻れる
- 神奈川旅行の既存内容への導線が維持される
- GitHub Pagesのrelative pathが壊れていない
- Required behavior testsを満たす
- 指定Testsがpassしている
- PRが作成されている

Codex Cloudの最終報告は日本語のみで、次の4項目を簡潔に報告する。

1. 変更内容
2. Tests / 結果
3. 意図的に未実装 / blocker
4. Review readiness
