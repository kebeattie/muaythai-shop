CREATE TABLE "users" (
  "id" integer PRIMARY KEY,
  "password" varchar,
  "email" varchar,
  "firstname" varchar,
  "lastname" varchar,
  "created_at" timestamp,
  "modified_at" timestamp,
    "cart_id" integer REFERENCES cart(id)
);

CREATE TABLE "orders" (
  "id" integer PRIMARY KEY,
  "total" money,
  "status" varchar,
  "user_id" integer UNIQUE,
  "created_at" timestamp,
  "modified_at" timestamp
);

CREATE TABLE "order_item" (
  "id" integer PRIMARY KEY,
  "order_id" integer UNIQUE,
  "quantity" integer,
  "price" money,
  "product_id" integer UNIQUE
);

CREATE TABLE "products" (
  "id" integer PRIMARY KEY,
  "price" integer,
  "name" varchar,
  "description" varchar,
    "category" varchar
    
);

CREATE TABLE "cart_item" (
  "id" integer PRIMARY KEY,
  "product_id" integer UNIQUE,
  "quantity" integer,
  "cart_id" integer UNIQUE,
  "price" money
);

CREATE TABLE "cart" (
  "id" integer PRIMARY KEY
);

ALTER TABLE "orders" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "order_item" ADD FOREIGN KEY ("order_id") REFERENCES "orders" ("id");

ALTER TABLE "order_item" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

ALTER TABLE "cart_item" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

ALTER TABLE "cart_item" ADD FOREIGN KEY ("cart_id") REFERENCES "cart" ("id");
