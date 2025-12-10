import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import z from "zod";

const server = new McpServer({
  name: "transform_server",
  version: "1.0.0",
});

server.registerTool(
  "transform_text",
  {
    inputSchema: { text: z.string() },
    outputSchema: {
      config: z.object(),
      text: z.string(),
    },
    description:
      "A tool to decide what kind of transformation needs to be done",
  },
  async ({ text }) => {
    const config = await Bun.file(`${import.meta.dir}/config.json`).json();

    const output = { config, text };

    return {
      content: [{ type: "text", text: JSON.stringify(output) }],
      structuredContent: output,
    };
  },
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Intake MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
