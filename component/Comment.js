export default function Comment({ comment }) {
  return (
    <div className="comment">
      <span className="writer">{comment.author.name}</span>
      <span className="text">{comment.comment}</span>
      <span className="date-info">
        {new Date(comment.createdDate).toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })}
      </span>
    </div>
  );
}
