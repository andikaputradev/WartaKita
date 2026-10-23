import nextConfig from "eslint-config-next"

const eslintConfig = [
  ...nextConfig,
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "node_modules/**",
    ],
  },
  {
    files: [
      "components/**",
      "hooks/**",
      "**/*.client.tsx",
      "**/*.client.ts",
    ],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "@/lib/supabase/admin",
              message: "Modul klien dilarang mengimpor lib/supabase/admin (service-role key).",
            },
            {
              name: "./lib/supabase/admin",
              message: "Modul klien dilarang mengimpor lib/supabase/admin (service-role key).",
            },
            {
              name: "../lib/supabase/admin",
              message: "Modul klien dilarang mengimpor lib/supabase/admin (service-role key).",
            },
          ],
          patterns: [
            {
              group: ["**/supabase/admin"],
              message: "Modul klien dilarang mengimpor lib/supabase/admin (service-role key).",
            },
          ],
        },
      ],
    },
  },
]

export default eslintConfig
