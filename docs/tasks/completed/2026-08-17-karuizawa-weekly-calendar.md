# Completed Task: 軽井沢旅行に週間カレンダーを追加

## Goal

軽井沢旅行ページに、2026-08-16〜2026-08-23の全体予定をスマホで一目で把握できる旅行週間カレンダーを追加し、既存の日別Plannerへの入口にする。

## 実装概要

- 8/16〜8/23の8日間を縦型カードで表示。
- 実績・確定予定/制約・候補・未定を文字ラベルで区別。
- 毎朝の朝食ブッフェを共通予定として表示。
- 日付カードをタップすると既存Plannerへスクロールし、その日付を選択。
- Plannerの日付候補を8/16〜8/23へ拡張。

## 重要な設計判断

- スマホ優先の縦型表示とし、横長の月間カレンダーは採用しない。
- 状態は色だけに依存せず文字でも表示。
- カレンダー操作では既存localStorage Planner dataや固定anchorを初期化しない。
- 8/21カーリングは候補のまま保持し、自動追加・確定しない。

## Tests

- `git diff --check`
- `git diff --name-only`
- 日付・主要予定文字列のgrep確認
- 埋め込みJavaScript構文確認
- カレンダーからPlanner日付更新とrender呼び出しの静的確認
- localStorage clear/deleteがないことを静的確認
- 8/19・8/20 fixedSchedules維持の確認

## PR

- PR: #5
- Squash merge commit: `b77639818a554a5d9cb59a46ba23dca306313551`

## Intentionally deferred

- 8/22・8/23の予定推測
- 月間カレンダーlibrary
- drag & drop
- Planner再設計

## 次taskへの引継ぎ

旅行中の実績・確定予定・候補が増えた場合、カレンダー表示と既存Plannerの整合を保ちながらSmall Vertical Sliceで更新する。
