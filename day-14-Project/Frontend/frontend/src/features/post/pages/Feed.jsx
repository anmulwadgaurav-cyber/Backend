import React, { useEffect } from "react";
import "F:/OneDrive/Desktop/Sheryians Cohort 2/Backend/day-14-Project/Frontend/frontend/src/features/post/feed.scss";
import Post from "../components/Post";
import { usePost } from "../hook/usePost";
import Nav from "../../shared/components/Nav";
import "../../shared/button.scss";

const Feed = () => {
  const { feed, handleGetFeed, loading, handleLike, handleUnlike } = usePost();

  useEffect(() => {
    handleGetFeed();
  }, []);

  if (loading || !feed) {
    return (
      <main>
        <h1>Feed is loading...</h1>
      </main>
    );
  }

  console.log(feed);

  return (
    <main className="feed-page">
      <Nav />
      <div className="feed">
        <div className="posts">
          {feed.map((post) => {
            return (
              <Post
                user={post.user}
                post={post}
                loading={loading}
                handleLike={handleLike}
                handleUnlike={handleUnlike}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Feed;
