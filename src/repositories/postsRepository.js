import connection from "../db.js";

async function create(post) {
  connection.query(
    `
        INSERT INTO posts
        (link, "textPost", "userId")
        VALUES ($1, $2, $3)
    `,
    [post.link, post.text, post.userId]
  );
}

async function getTimeline() {
  return connection.query(`
   SELECT 
      posts.*,
      users.name AS "userName",
      users.image AS "userImage"
   FROM posts
   JOIN users ON users.id = posts."userId"
    ORDER BY date DESC LIMIT 20`);
}

async function selectPost(id, userId){
    return connection.query(`
    SELECT * 
        FROM posts
        WHERE id=$1
        AND "userId"=$2
    `,[id,userId]);
}
async function deletePost(id){
    return connection.query(`
    DELETE 
        FROM posts
        WHERE id=$1
    `,[id]);
}

async function findPost(id){
  return connection.query(`
    SELECT * FROM posts
    WHERE id = $1
  `, [id]);
}

async function updatePost(id, text) {
  return connection.query(`
    UPDATE posts
    SET "textPost"=$1
    WHERE id = $2
  `, [text, id]);
}

async function getPostByHashtag(hashtag){
  
  return connection.query(`
  SELECT hashtags.*,
   posts.id AS "postId",posts.link,posts."textPost",posts."userId",posts.date
    FROM hashtags
      JOIN "postsHashtags"
        ON hashtags.id="postsHashtags"."hashtagId"
          JOIN posts
            ON posts.id="postsHashtags"."postId"
    WHERE hashtags."hashtagText"=$1
  `,[hashtag]);
}

export const postsRepository = {
  create,
  getTimeline,
  selectPost,
  deletePost,
  findPost,
  updatePost,
  getPostByHashtag
};

// SELECT * FROM posts ORDER BY date DESC LIMIT 20`
