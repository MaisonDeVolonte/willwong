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

function splitIntoLines(nodes: RootContent[]): RootContent[][] {
  const lines: RootContent[][] = [[]];

  for (const node of nodes) {
    if (node.type === "text") {
      const parts = (node as Text).value.split("\n");
      parts.forEach((part, i) => {
        if (i > 0) lines.push([]);
        if (part) {
          lines[lines.length - 1].push({
            type: "text",
            value: part,
          } as Text);
        }
      });
    } else if (node.type === "element") {
      const el = node as Element;
      const childLines = splitIntoLines(el.children);
      childLines.forEach((childLine, i) => {
        if (i > 0) lines.push([]);
        lines[lines.length - 1].push({
          ...el,
          children: childLine as Element["children"],
        });
      });
    } else {
      lines[lines.length - 1].push(node);
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
          <span key={i} className="code-line">
            {lineNodes.map(renderNode)}
          </span>
        ))}
      </code>
    </pre>
  );
}
