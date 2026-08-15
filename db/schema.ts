import { pgTable, serial, text, integer, varchar, boolean, jsonb, timestamp, uuid } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

// Gym Stats (Members, Years, etc.)
export const gymStats = pgTable('gym_stats', {
  id: serial('id').primaryKey(),
  label: text('label').notNull(),
  number: integer('number').notNull(),
  suffix: varchar('suffix', { length: 10 }),
  sortOrder: integer('sort_order').default(0),
});

// Services / Features
export const services = pgTable('services', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  icon: varchar('icon', { length: 50 }).notNull(),
  sortOrder: integer('sort_order').default(0),
});

// Trainers
export const trainers = pgTable('trainers', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  specialization: varchar('specialization', { length: 255 }),
  experience: varchar('experience', { length: 100 }),
  imageUrl: text('image_url'),
  isVisible: boolean('is_visible').default(true),
  sortOrder: integer('sort_order').default(0),
});

// Pricing Plans
export const pricingPlans = pgTable('pricing_plans', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  duration: varchar('duration', { length: 100 }),
  bestFor: varchar('best_for', { length: 255 }),
  price: varchar('price', { length: 100 }).notNull(),
  features: jsonb('features').default('[]').notNull(), // Array of strings
  isHighlighted: boolean('is_highlighted').default(false),
  isActive: boolean('is_active').default(true),
  sortOrder: integer('sort_order').default(0),
});

// Transformations (Before/After)
export const transformations = pgTable('transformations', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  goal: varchar('goal', { length: 255 }),
  quote: text('quote'),
  imageBefore: text('image_before'),
  imageAfter: text('image_after'),
  isVisible: boolean('is_visible').default(true),
  sortOrder: integer('sort_order').default(0),
});

// Branches
export const branches = pgTable('branches', {
  id: uuid('id').defaultRandom().primaryKey(),
  city: varchar('city', { length: 100 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  address: text('address').notNull(),
  phone: varchar('phone', { length: 50 }),
  mapLink: text('map_link'),
  mapEmbed: text('map_embed'),
  isActive: boolean('is_active').default(true),
  sortOrder: integer('sort_order').default(0),
});

// FAQs
export const faqs = pgTable('faqs', {
  id: uuid('id').defaultRandom().primaryKey(),
  question: text('question').notNull(),
  answer: text('answer').notNull(),
  isVisible: boolean('is_visible').default(true),
  sortOrder: integer('sort_order').default(0),
});

// Contact Leads (Inbox)
export const contactLeads = pgTable('contact_leads', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }).notNull(),
  email: varchar('email', { length: 255 }),
  message: text('message'),
  submittedAt: timestamp('submitted_at').defaultNow().notNull(),
  isRead: boolean('is_read').default(false),
  notes: text('notes'),
});

// Gallery Images
export const galleryImages = pgTable('gallery_images', {
  id: uuid('id').defaultRandom().primaryKey(),
  imageUrl: text('image_url').notNull(),
  caption: text('caption'),
  category: varchar('category', { length: 100 }),
  isVisible: boolean('is_visible').default(true),
  sortOrder: integer('sort_order').default(0),
});

// Site Settings (Key-Value)
export const siteSettings = pgTable('site_settings', {
  key: varchar('key', { length: 100 }).primaryKey(),
  value: text('value'),
  label: varchar('label', { length: 255 }),
});
