# Completed Task: 軽井沢旅行の候補と移動時間ページ

## Goal

2026年軽井沢旅行を既存旅行とは完全に別管理にし、実績・固定予定・候補をGitHub Pages上で確認し、軽井沢プリンスホテル ウエストを拠点とした計画用移動時間目安を見ながら候補を選べる最小の旅行Top pageを成立させる。

## 実装概要

- `docs/trips/karuizawa/index.html` を新設。
- 軽井沢旅行専用dataとして `candidates.csv`、`travel_times.csv`、`itinerary.csv` を追加。
- 訪問実績、固定予定/制約、検討中候補を区別して表示。
- 風越公園カーリング、軽井沢おもちゃ王国、軽井沢ゴルフ練習場・パターコース、竹内ゴルフ練習場を独立候補として表示。
- 軽井沢プリンスホテル ウエストから各候補への通常時の計画目安を約5/15/40/50分として保持・表示。
- 候補選択からGoogle Mapsの車経路確認へ進める静的リンクを追加。

## 重要な設計判断

- 既存旅行のHTML/CSVを変更せず、軽井沢旅行を `docs/trips/karuizawa/` に完全分離した。
- 移動時間はリアルタイム値ではなく旅程組み立て用の概算値として保持する。
- 当日の渋滞・交通規制はGoogle Maps側で確認する。
- Google Maps API key、backend、framework、追加dependencyは導入しない。

## Tests

- `git diff --cached --check`: pass
- `git diff --cached --name-only`: pass
- 指定文字列のgrep確認: pass
- CSV列数一貫性、5/15/40/50分の対応、Maps destination、relative pathの静的確認: pass
- ブラウザ実行/スクリーンショット: 実行環境にブラウザがなく未実施

## PR

- PR: #1
- Squash merge commit: `1943c1c6800f856e040702c4ca318c96b9871108`

## Intentionally deferred

- rootの旅行選択ページ化
- 既存旅行のnamespace移行
- 候補間すべての移動時間表
- Maps APIによるリアルタイム取得
- 未確定候補の日付確定
- ボウリング施設の確定

## 次taskへの引継ぎ

軽井沢旅行の専用ページと初期dataは成立した。次の変更は新しいSmall Vertical Sliceとして設計する。候補・実績・予定の追加はユーザーからの新しい旅行情報をSource of Truthとして扱い、推測で補完しない。
