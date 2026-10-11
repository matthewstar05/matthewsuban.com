# Agent asset integrations

This Mac has user-wide creative MCP integrations installed at
`/Users/star/.local/share/agent-integrations`. They are separate from this site's
runtime dependencies and are available across projects after restarting agent
sessions.

| Request                          | Default provider                    |
| -------------------------------- | ----------------------------------- |
| Image or video                   | Google Flow through a local browser |
| Downloadable textured 3D mesh    | Meshy                               |
| Explicit Higgsfield request      | Higgsfield                          |
| Explicit Lovable project request | Lovable                             |

Codex, Claude Code, Cursor, Antigravity CLI/IDE, Kiro, and Claude Desktop have
the provider MCPs plus `creative-router`. The router chooses a workflow;
the agent then calls the provider tools. Ordinary website code edits stay local.

Run `assetgen status` for local prerequisites. First use requires Google Flow
sign-in, a locally entered Meshy API key (`assetgen auth meshy`), or provider OAuth
(`assetgen auth higgsfield` / `assetgen auth lovable`). ChatGPT's account plugins
are separate connections.

Lovable and Higgsfield's local OAuth connections are verified and reusable across
agent processes. Meshy was left unconnected at the user's request. Flow access and
credits are confirmed, but its separate MCP profile still needs personal sign-in. Use
`assetgen connect flow --reopen` if the dedicated sign-in window is missing.

Flow's adapter is unofficial and may need updates when Google's UI changes. It
uses the Flow account allowance rather than the separately billed Gemini API.
Serialize browser work across agents. Provider credits, access restrictions, and
required confirmations still apply. Setup does not authorize sample generations.

The local integration README contains the exact versions, configuration inventory,
private backup locations, authentication steps and checks. Credentials and browser
profiles must stay outside this repository.
