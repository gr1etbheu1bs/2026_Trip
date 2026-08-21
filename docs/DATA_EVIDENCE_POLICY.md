# 公開データ証跡ポリシー / Public Data Evidence Policy

個人学習用MVPでは、公開Web情報を次の優先順位で扱う。

1. 一次情報・対象ページを直接確認できる場合は最優先する。
2. HTTP 401/403、bot制限、tool制約等で直接確認できない場合、公開検索結果、検索スニペット、公開キャッシュ、公開index情報を二次証跡として利用してよい。
3. 二次証跡は直接確認済みデータと区別し、元URL、観測日時、検索条件、確認値、`evidence_kind=search_snippet`等、notesに直接未確認であることを残す。
4. 複数sourceが一致すれば信頼度を上げてよい。矛盾時は差異を残す。
5. 合理的な計算・派生値は可。ただし元データと計算結果を区別し、推測を観測値として偽装しない。

禁止: 401/403/CAPTCHA/auth回避、不正ログイン、過剰な高頻度scraping、値の捏造、個人情報・非公開データ・secret/tokenのcommit。

将来、外部公開・商用化する場合は利用規約・ライセンス・保存/再配布権を再確認し、必要なら正式契約へ切り替える。

---
Direct sources are preferred. Public search snippets/caches/indexed metadata may be used as secondary evidence when direct access is unavailable, provided provenance and evidence type are recorded. Access-control bypass, fabricated values, private data, and secrets remain prohibited.
