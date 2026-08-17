# Completed Task

## Goal

軽井沢旅行の候補を、スマホで1日単位の予定としてパズルのように組み立てられる旅程Plannerを追加する。

## 実装概要

- `docs/trips/karuizawa/index.html` に日付別Plannerを追加。
- 2026-08-17〜2026-08-23の日付を選択可能。
- 候補ごとの想定滞在時間を表示。
- スマホ向けの `↑` / `↓` 操作で候補を並び替え可能。
- 8/18会議、8/19祖父迎え・テニスを固定時刻anchorとして扱う。
- 可変候補は固定anchorの前・間・後へ移動可能。
- 既知の移動時間と滞在時間から開始・終了時刻を計算。
- 未登録移動時間が入った後は、次の固定anchorまで正確な時刻を表示せず `時刻未確定` とする。
- 既知の時間だけで固定予定のdeadline超過が確定する場合は警告する。
- 日別の並びは軽井沢専用localStorageへ保存。
- `candidates.csv` に初期滞在時間、`travel_times.csv` に今回必要な最小限の地点間時間を追加。

## 重要な設計判断

- drag & dropではなく、スマホで誤操作しにくい上下ボタンを採用。
- 固定予定の時刻は変更せず、可変候補側がanchorをまたいで移動する構造とした。
- travel-timeが未登録の場合にゼロ分と推測しない。
- Planner操作内容はGitHubへ書き込まず、browser localStorageだけに保存する。

## Tests

- Codex実装時: `git diff --check`、対象file確認、CSV整合性確認、JS `node --check` がpass。
- Review fix後: JS構文を `node --check` で再確認。
- PR差分上で、固定anchor前後への移動、未登録移動後の時刻未確定、既知下限によるdeadline warningを確認。
- ブラウザ実機/375px手動操作は実行環境にbrowserがないため未実施。

## PR

- PR: #2
- Squash merge commit: `8ce6852bce2686566bd0e12c7dc83a539a63638d`

## intentionally deferred

- 自由な時刻直接編集
- 全地点間のtravel-time matrix
- realtime Google Maps API
- 自動最適化
- drag & drop

## 次taskへの引継ぎ

旅行中の実績・候補追加を継続し、必要に応じて候補の追加、滞在時間・地点間移動時間の補強、実際のスマホ操作から得られたUI改善をSmall Vertical Sliceとして切る。
