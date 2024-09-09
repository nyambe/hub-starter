CREATE TABLE `menu_items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`label` text NOT NULL,
	`to` text NOT NULL,
	`parent_id` integer,
	`order` integer NOT NULL,
	`type` text NOT NULL
);
