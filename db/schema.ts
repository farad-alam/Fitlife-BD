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

// Session Events (Admin created free sessions)
export const sessionEvents = pgTable('session_events', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  sessionDate: timestamp('session_date').notNull(),
  targetCategory: varchar('target_category', { length: 100 }),
  inviteLink: text('invite_link'),
  isActive: boolean('is_active').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Session Registrations
export const sessionRegistrations = pgTable('session_registrations', {
  id: uuid('id').defaultRandom().primaryKey(),
  sessionEventId: uuid('session_event_id').references(() => sessionEvents.id).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  whatsappNumber: varchar('whatsapp_number', { length: 50 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  age: integer('age').notNull(),
  gender: varchar('gender', { length: 20 }).notNull(),
  healthCategory: varchar('health_category', { length: 100 }).notNull(),
  otherCategory: text('other_category'),
  fitnessGoal: text('fitness_goal'),
  preferredBranch: varchar('preferred_branch', { length: 100 }),
  submittedAt: timestamp('submitted_at').defaultNow().notNull(),
  isInvited: boolean('is_invited').default(false),
});

// Paid Workshops
export const workshops = pgTable('workshops', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  instructor: varchar('instructor', { length: 255 }).notNull(),
  workshopDate: timestamp('workshop_date').notNull(),
  duration: varchar('duration', { length: 100 }),
  price: varchar('price', { length: 50 }).notNull(),
  totalSeats: integer('total_seats').notNull(),
  imageUrl: text('image_url'),
  isFree: boolean('is_free').default(false),
  isActive: boolean('is_active').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Global Payment Methods
export const globalPaymentMethods = pgTable('global_payment_methods', {
  id: uuid('id').defaultRandom().primaryKey(),
  operator: varchar('operator', { length: 50 }).notNull(),
  accountNumber: varchar('account_number', { length: 50 }).notNull(),
  accountType: varchar('account_type', { length: 50 }).notNull(),
});

// Workshop Registrations
export const workshopRegistrations = pgTable('workshop_registrations', {
  id: uuid('id').defaultRandom().primaryKey(),
  workshopId: uuid('workshop_id').references(() => workshops.id).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  whatsappNumber: varchar('whatsapp_number', { length: 50 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  senderPhoneNumber: varchar('sender_phone_number', { length: 50 }),
  paymentOperator: varchar('payment_operator', { length: 50 }),
  paymentToNumber: varchar('payment_to_number', { length: 50 }),
  transactionId: varchar('transaction_id', { length: 100 }),
  paymentStatus: varchar('payment_status', { length: 50 }).default('pending').notNull(),
  submittedAt: timestamp('submitted_at').defaultNow().notNull(),
  adminNotes: text('admin_notes'),
});
