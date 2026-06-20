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
