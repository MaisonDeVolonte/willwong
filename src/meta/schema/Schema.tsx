/**
 * ========================================================================================
 * @file Schema.tsx - react component that injects ld+json scripts into the dom
 * ========================================================================================
 * @description
 * - accepts structured data objects and serializes them into safe script tags
 * - escapes html brackets to prevent xss injection vulnerabilities
 * @see /src/meta/schema/index.ts/
 */

import React from "react";

export type SchemaData = Record<string, unknown> | Record<string, unknown>[];

export function Schema({ data }: { data: SchemaData }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
