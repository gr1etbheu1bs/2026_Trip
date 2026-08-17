# ACTIVE Task

Status: HOLD

## Goal

現在、Codex Cloudで実行するtaskはありません。

## Codex instruction

このファイルのStatusがHOLDの間にユーザーから `ACTIVE` と指示された場合は、追加調査・実装・testを行わず、

`NO_ACTIVE_TASK`

だけ返して終了すること。

## Workflow note

Codex Cloudでは毎回、最新の `main` からbrand-new taskを作成し、promptには `ACTIVE` だけを渡す。

StatusがREADYになった場合は、このファイルに記載されたRequired contextだけを読み、repo全体scan、不要なWeb調査、unrelated code調査、architectureの再設計、将来機能の先回りを行わないこと。
