import { Hono } from "hono";

const app = new Hono();

app.get("/api/posts/:slug/comments", async (c) => {
  // Do something and return an HTTP response
  // Optionally, do something with `c.req.param("slug")`
  const { slug } = c.req.param();
  const result = await c.env.SHORTIT_DB.prepare(
    `
    select * from comments where post_slug = ?
	`,
  )
    .bind(slug)
    .all();

  return c.json(result);
});

app.post("/api/posts/:slug/comments", async (c) => {
  // Do something and return an HTTP response
  // Optionally, do something with `c.req.param("slug")`
  const { slug } = c.req.param();
  const { author, body } = await c.req.json();

  if (!author) return c.text("Missing author value for new comment", 400);
  if (!body) return c.text("Missing body value for new comment", 400);

  const { success } = await c.env.SHORTIT_DB.prepare(
    `
		insert into comments (author, body, slug) values (?, ?, ?)
		`,
  )
    .bind(author, body, slug)
    .run();

  if (success) return c.text("Comment created", 201);
  return c.text("Failed to create comment", 500);
});

export default app;
