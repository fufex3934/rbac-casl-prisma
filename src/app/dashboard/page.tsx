// app/dashboard/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { defineAbilityFor } from "@/lib/abilities";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  // if (!user) {
  //   redirect("/login");
  // }

  // const ability = defineAbilityFor(user);

  // if (ability.cannot("manage", "all")) {
  //   redirect('/unauthorized')
  // }

  return <div>Welcome Admin: {user?.email}</div>;
};

export default Dashboard;
