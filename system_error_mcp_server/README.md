# System Error MCP Server

This MCP server provides tools to access system error logs.

## Tools

### `get_system_error_logs`

Retrieves system error logs using `journalctl` for a specified duration.

- **Input**:
  - `hours` (number): The number of hours to look back for error logs.
- **Output**:
  - `logs` (string): The raw text output of the `journalctl` command containing error logs.

## Usage

This server is designed to be used with an MCP client. It runs on `stdio` transport.

Add the following to `~/.config/Claude/claude_desktop_config.json`
(if using Claude Desktop as client):

```json
{
  "mcpServers": {
    "system_error_logs": {
      "command": "path/to/bun",
      "args": [
        "run",
        "path/to/index.ts"
      ]
    }
  }
}
```

## Development

To run the server locally:

```bash
bun run index.ts
```
