# ACTIVE Task

Status: READY

## Goal

軽井沢旅行を既存旅行とは完全に別の旅行として管理できる最小構成を追加する。

このtaskのgoalは **軽井沢旅行専用のnamespaceとTop pageを新設すること** の1点だけ。

## Required context

最初に次のfileだけを読むこと。

- `README.md`
- `AGENTS.md`
- `docs/tasks/ACTIVE.md`
- `docs/index.html`

必要になった場合のみ、既存Top pageの見た目・共通asset参照確認のため次を読むこと。

- `docs/assets/` 配下の、`docs/index.html` から実際に参照されているfileだけ

`docs/data/*.csv` はこのtaskでは変更しないため、原則として読まないこと。

## Scope

以下だけを実装する。

1. 軽井沢旅行専用directoryを `docs/trips/karuizawa/` として新設する。
2. `docs/trips/karuizawa/index.html` を新設し、既存旅行とは別のTop pageとして成立させる。
3. 軽井沢Top pageには最低限、以下を明示する。
   - `2026 軽井沢旅行`
   - 旅行期間 `2026-08-16〜2026-08-23`
   - 今後この旅行専用の候補地・訪問済み場所・旅程を管理するページであること
4. 今後の軽井沢専用dataを置くnamespaceとして `docs/trips/karuizawa/data/` を作る。Gitが空directoryを保持できないため、必要なら説明用の最小README等を置いてよい。
5. 軽井沢Top pageから参照するpathは `docs/trips/karuizawa/` 配下を基準に壊れないrelative pathにする。
6. 既存の `docs/index.html` と既存旅行データ・ページは壊さず、そのまま利用可能な状態を維持する。

## Required behavior tests

- `docs/trips/karuizawa/index.html` が単独の軽井沢旅行Top pageとして開ける。
- ページ上で `2026 軽井沢旅行` と `2026-08-16〜2026-08-23` が確認できる。
- 既存 `docs/index.html` はこのtask前と同じ入口として引き続き開ける。
- 既存 `docs/data/*.csv` に変更がない。
- 軽井沢用のfileが既存旅行のdata directoryへ混在していない。

## Tests

最低限、次を実行する。

- `git diff --check`
- `git diff --name-only` で変更fileがこのtask scope内であることを確認
- `grep -n "2026 軽井沢旅行\|2026-08-16" docs/trips/karuizawa/index.html`
- relative link / asset pathを目視または静的確認し、`docs/trips/karuizawa/index.html` から404になる明らかな参照を作っていないことを確認

repo-wide testやWeb調査は不要。

## Do not

- 既存 `docs/index.html` を旅行選択Top pageへ変更しない
- 既存旅行のHTMLを移動・renameしない
- `docs/data/*.csv` を移動・変更しない
- 軽井沢の候補地や訪問済み施設を推測して追加しない
- 新しいCSV schemaを設計しない
- React / Next.js等のframeworkを追加しない
- build system / backend / API / database / authenticationを追加しない
- dependencyを追加・upgradeしない
- unrelated refactorをしない
- privacy情報をcommitしない
- 将来の他旅行namespaceを先回りして作らない

## PR metadata

### Title

軽井沢旅行専用Top pageを追加 / Add dedicated Karuizawa trip top page

### Body requirements

必ず次の順序にする。

# 日本語

- 概要
- 変更内容
- 設計上の判断: 既存旅行を変更せず、まず軽井沢だけを `docs/trips/karuizawa/` に分離したこと
- 意図的に未実装: rootの旅行選択ページ化、既存旅行のnamespace移行、軽井沢の実データ登録
- Tests

---

# English

- Summary
- Changes
- Design decision: Karuizawa is isolated under `docs/trips/karuizawa/` without moving the existing trip yet
- Intentionally deferred: root trip selector, migration of the existing trip into its own namespace, actual Karuizawa travel data
- Tests

## Completion

次をすべて満たしたら完了。

- `docs/trips/karuizawa/index.html` が追加されている
- 軽井沢専用data namespaceが `docs/trips/karuizawa/data/` として用意されている
- 既存旅行のHTML / CSVが変更されていない
- Required behavior testsを満たす
- 指定Testsがpassしている
- PRが作成されている

Codex Cloudの最終報告は日本語のみで、次の4項目を簡潔に報告する。

1. 変更内容
2. Tests / 結果
3. 意図的に未実装 / blocker
4. Review readiness
