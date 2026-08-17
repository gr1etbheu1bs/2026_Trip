# AGENTS.md

このrepositoryは、2026年の旅行候補・旅程・施設情報を整理し、`docs/` をGitHub Pagesとして公開するためのstatic siteです。

このfileは、ChatGPT / Codex Cloudがrepositoryを安全かつ小さなscopeで更新するための運用ルールです。

## Source of Truth

このrepositoryでは重いMASTER SPECは置かない。

優先順位と役割は次のとおり。

1. `README.md`
   - project目的
   - GitHub Pages公開方法
   - 個人情報の扱い
   - repository全体の運用ルール
2. `docs/data/*.csv`
   - 旅行候補、旅程、施設、ホテル、移動等のstructured planning data
   - structured factを変更するtaskでは、対応するCSVを優先して確認する
3. `docs/*.html`
   - GitHub Pagesで実際に表示するpresentation/output
   - dataとUIが分離されていない箇所では、task対象HTMLの現状も確認する
4. `docs/tasks/ACTIVE.md`
   - 現在Codex Cloudが実行してよいtaskのscopeと完了条件
   - project全体仕様ではなく、current taskの入口

矛盾がある場合は、privacy / repository運用は`README.md`を優先する。task scopeは`docs/tasks/ACTIVE.md`を優先する。旅行内容のstructured factは、taskで指定された`docs/data/*.csv`を優先して確認し、推測で上書きしない。

## ACTIVE Task Workflow

Codex Cloudでpromptが `ACTIVE` の場合、最初に必ず `docs/tasks/ACTIVE.md` だけを読む。

### Status: HOLD

`Status: HOLD` の場合は、追加調査、実装、test、Web検索を行わず、次だけ返して終了する。

`NO_ACTIVE_TASK`

### Status: READY

`Status: READY` の場合は、ACTIVEに書かれた次の項目だけに従う。

- Goal
- Required context
- Scope
- Required behavior tests
- Tests
- Do not
- Completion

Required contextにないfileをrepo-wideにscanしない。外部Web調査はACTIVEで明示的に必要とされた場合だけ行う。

1 task = 1 goalを原則とし、ついでの改善、architecture再設計、将来機能の先回りを行わない。

Codexは `docs/tasks/ACTIVE.md` 自体を変更しない。

## Codex Cloud task creation

毎回、最新の`main`からbrand-new Codex Cloud taskを作成し、promptは原則 `ACTIVE` だけとする。

古いtaskのContinue / Retry / Resumeで別ACTIVEを実装しない。

## Static Site Rule

現在は`docs/`をそのままGitHub Pagesで公開するstatic siteである。

ACTIVEで明示されない限り、次を追加しない。

- React / Next.js等のframework
- build system
- backend / API
- database
- authentication
- package manager dependency
- cloud service

既存のHTML / CSS / JavaScript / CSV構成で実現できる変更を優先する。

## Trip Portal Ordering

GitHub Pages rootの旅行一覧は、**旅行開始日の新しい順（降順）**を標準とする。

- 新しく追加する旅行ほど上に表示する。
- 既存旅行を追加・更新するtaskでは、root `docs/index.html` の並び順が開始日降順を維持していることを確認する。
- 同じ開始日の旅行が複数ある場合のみ、終了日が新しい方を先にし、それでも同じ場合は既存順を維持する。
- 旅行の表示順を手作業で意味なく並べ替えない。

## Privacy

`README.md`の個人情報ルールを必ず守る。

GitHubへ次のようなprivate情報を固定値としてcommitしない。

- 自宅の詳細住所
- 予約済みホテルの予約番号・予約メール内容
- 電話番号、メールアドレス等のpersonal identifier
- private account / credential / token

端末ローカルにだけ保持すべき値を、GitHub管理データへ移さない。

実データにprivate情報が含まれる場合、test/exampleにはsyntheticまたは匿名化した値を使う。

## Travel Information Freshness

料金、空室、営業時間、休館日、イベント日程、天候、交通規制、駐車場条件などは変動情報として扱う。

ACTIVEでWeb調査が必要なtaskでは、可能な限り公式sourceを優先し、取得時点を意識する。古い値を現在の確定情報として扱わない。

ただし、ACTIVEでWeb調査を要求していない実装taskで不要な再調査はしない。

## PR Metadata

CodexがPRを作成する場合:

- titleは `日本語 / English` のbilingual形式
- bodyは **日本語section全文 → English section全文** の順

PR bodyには最低限、以下を簡潔に含める。

- 概要 / Summary
- 変更内容 / Changes
- Tests
- 意図的に未実装 / Intentionally deferred

外部情報を更新したtaskでは、必要に応じてsource / freshnessも記録する。

## Tests

ACTIVEに書かれたtestだけを実行する。

不要なrepo-wide testや大規模なvalidationを勝手に追加しない。

static HTML / CSV taskでは、taskの性質に応じて最低限次を候補とする。

- 対象HTML / CSVのsyntax・構造確認
- relative link / asset path確認
- dataと表示の対応確認
- `git diff --check`

具体的なcommandはACTIVEを優先する。

## Final Report

Codex Cloudの最終報告は日本語のみで、次の4項目を簡潔に報告する。

1. 変更内容
2. Tests / 結果
3. 意図的に未実装 / blocker
4. Review readiness

## After PR

PRのreview / merge / completed taskの履歴化 / 次のACTIVE作成はChatGPT側で行う。

CodexはACTIVEのscopeを超えて次taskを開始しない。
