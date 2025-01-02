import baseConfig, { restrictEnvAccess } from "@threadsnap/eslint-config/base";
import nextjsConfig from "@threadsnap/eslint-config/nextjs";
import reactConfig from "@threadsnap/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
];
