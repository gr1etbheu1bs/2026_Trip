# ACTIVE Task

Status: HOLD

## Goal

現在、Codex Cloudで実行するtaskはありません。

## Codex instruction

このファイルのStatusがHOLDの間にユーザーから `ACTIVE` と指示された場合は、追加調査・実装・test・Web検索を行わず、

`NO_ACTIVE_TASK`

だけ返して終了すること。

## Workflow note

次のtaskは、現在のmainと完了済みtaskを確認したうえでChatGPT側がSmall Vertical Sliceとして設計し、READYへ更新する。

Codex Cloudでは毎回、最新の `main` からbrand-new taskを作成し、promptには原則 `ACTIVE` だけを渡す。
