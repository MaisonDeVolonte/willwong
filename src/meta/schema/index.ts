/**
 * ========================================================================================
 * @file index.ts - barrel export for all structured data schemas
 * ========================================================================================
 * @description
 * - aggregates schema templates and builders for easier importing across the app
 * - prevents deep imports when hydrating seo metadata in page components
 * @see /src/meta/schema/Schema.tsx/
 */

export * from "./person";
export * from "./website";
export * from "./profile";
export * from "./article";
export * from "./breadcrumbs";
export * from "./Schema";
