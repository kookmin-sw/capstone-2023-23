import { Link } from "react-router-dom";

export default function EmptyPage() {
  return (
    <>
      <h2>Wrong Path!</h2>
      <Link to="/">Back</Link>
    </>
  );
}
