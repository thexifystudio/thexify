PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_messages` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text,
	`business` text,
	`project_type` text,
	`budget` text,
	`message` text NOT NULL,
	`status` text DEFAULT 'nuevo' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_messages`("id", "name", "email", "phone", "business", "project_type", "budget", "message", "status", "created_at") SELECT "id", "name", "email", "phone", "business", "project_type", "budget", "message", "status", "created_at" FROM `messages`;--> statement-breakpoint
DROP TABLE `messages`;--> statement-breakpoint
ALTER TABLE `__new_messages` RENAME TO `messages`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_projects` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`client` text NOT NULL,
	`category` text NOT NULL,
	`summary` text NOT NULL,
	`description` text,
	`challenge` text,
	`outcome` text,
	`title_en` text,
	`summary_en` text,
	`description_en` text,
	`challenge_en` text,
	`outcome_en` text,
	`cover_url` text,
	`site_url` text,
	`year` integer,
	`services` text,
	`gallery` text,
	`featured` integer DEFAULT 0 NOT NULL,
	`published` integer DEFAULT 1 NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_projects`("id", "slug", "title", "client", "category", "summary", "description", "challenge", "outcome", "title_en", "summary_en", "description_en", "challenge_en", "outcome_en", "cover_url", "site_url", "year", "services", "gallery", "featured", "published", "sort_order", "created_at") SELECT "id", "slug", "title", "client", "category", "summary", "description", "challenge", "outcome", "title_en", "summary_en", "description_en", "challenge_en", "outcome_en", "cover_url", "site_url", "year", "services", "gallery", "featured", "published", "sort_order", "created_at" FROM `projects`;--> statement-breakpoint
DROP TABLE `projects`;--> statement-breakpoint
ALTER TABLE `__new_projects` RENAME TO `projects`;--> statement-breakpoint
CREATE UNIQUE INDEX `projects_slug_unique` ON `projects` (`slug`);--> statement-breakpoint
CREATE TABLE `__new_users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`password_hash` text NOT NULL,
	`name` text NOT NULL,
	`role` text DEFAULT 'admin' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_users`("id", "email", "password_hash", "name", "role", "created_at") SELECT "id", "email", "password_hash", "name", "role", "created_at" FROM `users`;--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
ALTER TABLE `__new_users` RENAME TO `users`;--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);