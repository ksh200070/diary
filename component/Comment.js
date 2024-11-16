export default function Comment({ comment }) {
  const formatDate = (date) => {
    if (date) {
      const now = new Date();
      const target = new Date(date);
      const diffTime = now - target;
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));

      if (diffHours >= 24) {
        return target.toLocaleDateString("ko-KR");
      } else if (diffHours < 1) {
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        return `${diffMinutes}분 전`;
      } else {
        return `${diffHours}시간 전`;
      }
    }
  };

  return (
    <div className="comment">
      <span className="writer">{comment.author.name}</span>
      <span className="text">{comment.comment}</span>
      <span className="date-info">
        {formatDate(comment.createdDate)}
        {/* {new Date(comment.createdDate).toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })} */}
      </span>
    </div>
  );
}
