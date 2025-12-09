import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { $ } from "bun";
import z from "zod";

const server = new McpServer({
  name: "system_error_logs",
  version: "1.0.0",
});

server.registerTool(
  "get_system_error_logs",
  {
    outputSchema: { logs: z.string() },
    inputSchema: { hours: z.number().positive() },
    description:
      "Get systems error logs from journalctl for the past `hour` number of hours",
  },
  async ({ hours }) => {
    const logs = await $`journalctl --since="${hours} hours ago" -p err`.text();

    const output = { logs };

    console.error(logs);

    return {
      content: [{ type: "text", text: JSON.stringify(logs) }],
      structuredContent: output,
    };
  },
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Weather MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});

