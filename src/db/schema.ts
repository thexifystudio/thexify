import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

/*
 * Same schema as the D1 database `thexify-db` already created in the Thexify
 * Studio account (migrations/0000 and 0001). Change it here, then
 * `npm run db:generate` and apply the new migration.
 */

/** Single admin, seeded by scripts/seed-admin.mjs. No public sign-up. */
export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  name: text('name').notNull(),
  role: text('role').default('admin').notNull(),
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

/** Contact form submissions, read from /admin/mensajes. */
export const messages = sqliteTable('messages', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  business: text('business'),
  /** Service chosen in the form, as the visitor saw it. */
  projectType: text('project_type'),
  budget: text('budget'),
  message: text('message').notNull(),
  /** nuevo | leido | archivado */
  status: text('status').default('nuevo').notNull(),
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

/**
 * Portfolio cases. The table exists in D1 but the site still reads its cases
 * from src/data/projects.ts; it is here for the future projects CRUD.
 */
export const projects = sqliteTable('projects', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  client: text('client').notNull(),
  category: text('category').notNull(),
  summary: text('summary').notNull(),
  description: text('description'),
  challenge: text('challenge'),
  outcome: text('outcome'),
  titleEn: text('title_en'),
  summaryEn: text('summary_en'),
  descriptionEn: text('description_en'),
  challengeEn: text('challenge_en'),
  outcomeEn: text('outcome_en'),
  coverUrl: text('cover_url'),
  siteUrl: text('site_url'),
  year: integer('year'),
  /** JSON array of strings. */
  services: text('services'),
  /** JSON array of image URLs. */
  gallery: text('gallery'),
  featured: integer('featured').default(0).notNull(),
  published: integer('published').default(1).notNull(),
  sortOrder: integer('sort_order').default(0).notNull(),
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export type User = typeof users.$inferSelect;
export type Message = typeof messages.$inferSelect;
export type Project = typeof projects.$inferSelect;
