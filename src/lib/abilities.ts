import { AbilityBuilder, PureAbility } from "@casl/ability";
import { PrismaQuery, Subjects, createPrismaAbility } from "@casl/prisma";
import { Post, User } from "../generated/prisma";

type AppSubjects =
  | Subjects<{
      Post: Post;
      User: User;
    }>
  | "all";

export type AppAbility = PureAbility<[string, AppSubjects], PrismaQuery>;

export function defineAbilityFor(user: User): AppAbility {
  const { can, cannot, build } = new AbilityBuilder<AppAbility>(
    createPrismaAbility
  );

  if (user.role === "ADMIN") {
    can("manage", "all");
  } else {
    can("read", "Post");
    can("create", "Post");
    can("update","Post",{authorId:user.id})

    cannot("delete", "Post");

    can("read", "User");
    cannot("delete", "User");
  }

  return build();
}
