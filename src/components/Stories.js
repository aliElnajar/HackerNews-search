import Context from "../Store/Context";
import { useContext } from "react";
const Stories = () => {
  const { isLoading, hits,removeStoryHandler } = useContext(Context);

  if (isLoading) return <div className="loading"></div>;
  return (
    <section className="stories">
      {hits.map((story) => {
        const {
          objectID: id,
          author,
          num_comments,
          title,
          url,
          points,
        } = story;
        return (
          <article key={id} className="story">
            <h4 className="title">{title}</h4>
            <p className="info">
              <strong>{points} </strong>points by <strong>{author}</strong> |{" "}
              {num_comments} comments
            </p>
            <a href={url} className="read-link" target="_blank" rel="link">
              read more
            </a>
            <button className="remove-btn" type="button" onClick={()=>removeStoryHandler(id)}>
              remove
            </button>
          </article>
        );
      })}
    </section>
  );
};

export default Stories;
