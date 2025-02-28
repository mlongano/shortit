import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();
app.use("/api/*", cors());

app.get("/api/posts/:slug/comments", async (c) => {

  const env = c.env as Env;
  // Do something and return an HTTP response
  // Optionally, do something with `c.req.param("slug")`
  const { slug } = c.req.param();
  const result = await env.SHORTIT_DB.prepare(
    `
    select * from comments where post_slug = ?
	`,
  )
    .bind(slug)
    .all();

  return c.json(result);
});

app.post("/api/posts/:slug/comments", async (c) => {
  const env = c.env as Env;
  const { slug } = c.req.param();
  const { author, body } = await c.req.json();

  if (!author) return c.json({
    success: false,
    results: []
  }, 400);

  if (!body) return c.json({
    success: false,
    results: []
  }, 400);

  const result = await env.SHORTIT_DB.prepare(`
    insert into comments (author, body, post_slug) values (?, ?, ?)
    returning id, author, body, post_slug
  `)
    .bind(author, body, slug)
    .first();

  if (result) {
    return c.json({
      success: true,
      results: [{
        id: result.id,
        author: result.author,
        body: result.body,
        post_slug: result.post_slug
      }]
    }, 201);
  }

  return c.json({
    success: false,
    results: []
  }, 500);
});

export default app;
