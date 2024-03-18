import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:8080/query",
  ignoreNoDocuments: true,
  documents: ["src/graphql/**/*.graphql", "src/graphql/documents/**/*.ts"],
  generates: {
    "src/graphql/types.ts": {
      plugins: ["typescript", "typescript-operations"],
      config: {
        scalars: {
          Upload: {
            input: "File",
            output: "string",
          },
        },
      },
    },
  },
};

export default config;
