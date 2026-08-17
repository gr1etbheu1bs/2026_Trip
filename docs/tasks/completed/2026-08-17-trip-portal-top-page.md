# Completed Task: 旅行一覧トップページ / Trip portal top page

## Goal

GitHub Pages rootを旅行一覧ポータルにし、旅行ごとの独立ページへ常に辿れるようにする。

## 実装概要

- `docs/index.html` を旅行一覧Top pageへ変更。
- 神奈川方面の親子科学旅行を `docs/trips/kanagawa/index.html` へ分離。
- 軽井沢旅行 `docs/trips/karuizawa/index.html` に旅行一覧Topへの戻り導線を追加。
- 各旅行カードに場所/旅行名、期間、旅行ページへのリンクを表示。
- 既存神奈川旅行の候補・ホテル・地図・根拠等へのrelative linkを維持。

## 重要な設計判断

- rootは旅行一覧ポータルとし、各旅行は独立したentry/page/dataとして管理する。
- 既存static HTML/CSS/JavaScript構成を維持し、framework/dependencyを追加しない。
- 旅行同士のdataは混在させない。

## Tests

- `git diff --check`
- 変更file確認
- rootの旅行名/期間/linkの静的確認
- 神奈川旅行entryの既存ページ/asset relative link確認
- headless browser screenshotは実行環境にbrowserがないため未実施

## PR番号

- PR #3

## merge commit

- `820884cad2751d40ba58303077736528a76d3eed`

## intentionally deferred

- 新しい旅行の自動登録
- 共通data schemaへの統合
- framework/backend導入

## 次taskへの引継ぎ

- 新しい旅行を追加する際はroot `docs/index.html` の旅行一覧へカードを追加し、各旅行を独立namespaceで管理する。
- 軽井沢旅行の実績・候補更新は `docs/trips/karuizawa/` 内で継続する。
