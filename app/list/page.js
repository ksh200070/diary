import { connectDB } from "/util/database";
import ListItem from "./ListItem";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";
// export const revalidate = 60;

export default async function List() {
  const result = await fetch("http:localhost:3000/api/content", {
    method: "GET",
  });
  const data = await result.json();
  const session = await auth();

  return (
    <div className="list-bg">
      {data.map((item, i) => (
        <ListItem item={item} key={i} session={session} />
      ))}
    </div>
  );
}
