"use client";

import { refractor } from "refractor/all";
import type { Element, Text, RootContent } from "hast";

type RefractorProps = {
  code: string;
  language: string;
};

let nodeKey = 0;

function renderNode(node: RootContent): React.ReactNode {
  if (node.type === "text") {
    return (node as Text).value;
  }
  if (node.type === "element") {
    const el = node as Element;
    const Tag = el.tagName as keyof React.JSX.IntrinsicElements;
    const className = Array.isArray(el.properties?.className)
      ? el.properties.className.join(" ")
      : undefined;
    return (
      <Tag key={nodeKey++} className={className}>
        {el.children.map(renderNode)}
      </Tag>
    );
  }
  return null;
}

function splitIntoLines(nodes: RootContent[]): React.ReactNode[][] {
  const lines: React.ReactNode[][] = [[]];

  for (const node of nodes) {
    if (node.type === "text") {
      const parts = (node as Text).value.split("\n");
      parts.forEach((part, i) => {
        if (i > 0) lines.push([]);
        if (part) lines[lines.length - 1].push(part);
      });
    } else {
      lines[lines.length - 1].push(renderNode(node));
    }
  }

  return lines;
}

export default function Refractor({ code, language }: RefractorProps) {
  nodeKey = 0;
  const tree = refractor.highlight(code, language);
  const lines = splitIntoLines(tree.children);

  return (
    <pre className={`language-${language}`}>
      <code className={`language-${language}`}>
        {lines.map((lineNodes, i) => (
          <span key={i} className="line">
            {lineNodes}
          </span>
        ))}
      </code>
    </pre>
  );
}
