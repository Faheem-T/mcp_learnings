# Configurable Transform MCP Server

This MCP server provides text transformation capabilities that are dynamically configured via a `config.json` file. The server reads the configuration to determine how the LLM should process input text.

The tool defined in the server is extremely simple. I just wanted to get an idea of how config driven MCP servers work.

## Configuration

You can control the transformation mode by updating the `config.json` file. The server supports different modes such as keyword extraction and summarization.

### Configuration Examples

**Keyword Extraction Mode**
Configure the server to extract a specific number of keywords:
```json
{
  "mode": "keyword",
  "count": 5
}
```

**Summarization Mode**
Configure the server to generate a summary of a specified length:
```json
{
  "mode": "summary",
  "length": "short"
}
```

The LLM will automatically adapt its transformation logic based on the current configuration in `config.json`.

## Usage

This server is designed to be used with an MCP client. It runs on `stdio` transport.

Add the following to `~/.config/Claude/claude_desktop_config.json`
(if using Claude Desktop as client):

```json
{
  "mcpServers": {
    "transform_server": {
      "command": "path/to/bun",
      "args": [
        "run",
        "path/to/index.ts"
      ]
    }
  }
}
```