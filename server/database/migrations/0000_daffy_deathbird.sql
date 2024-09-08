CREATE TABLE `menu_items` (
	`id` integer PRIMARY KEY NOT NULL,
	`label` text NOT NULL,
	`to` text NOT NULL,
	`parent_id` integer,
	`order` integer NOT NULL,
	`type` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `parent_id_idx` ON `menu_items` (`parent_id`);