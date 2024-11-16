import { auth } from "@/auth";
import ListItem from "./ListItem";

export default async function List() {
  const session = await auth();

  return (
    <div className="list-bg">
      <ListItem userId={session && session.user._id} />
    </div>
  );
}
