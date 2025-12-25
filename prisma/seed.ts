import { PrismaClient, Prisma } from "../generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
  adapter,
});

const userData: Prisma.UserCreateInput[] = [
  {
    name: "David Okoye",
    email: "david@okoye.com",
    posts: {
      create: [
        {
          title: "African Elephant",
          content: "A herd of elephants seen migrating across the Serengeti.",
        //   image: "/animal-images/african-elephant.png",
          published: true,
        },
      ],
    },
  },
  {
    name: "Emily Johnson",
    email: "emily@johnson.com",
    posts: {
      create: [
        {
          title: "Bald Eagle",
          content: "Bald eagle spotted soaring over the forests of Alaska.",
        //   image: "/animal-images/bald-eagle.png",
          published: true,
        },
      ],
    },
  },
  {
    name: "Li Wei",
    email: "li@wei.com",
    posts: {
      create: [
        {
          title: "Giant Panda",
          content: "Giant panda observed eating bamboo in Sichuan.",
        //   image: "/animal-images/giant-panda.png",
          published: true,
        },
      ],
    },
  },
  {
    name: "Sophie Brown",
    email: "sophie@brown.com",
    posts: {
      create: [
        {
          title: "Red Kangaroo",
          content: "Red kangaroo hopping across the outback.",
        //   image: "/animal-images/red-kangaroo.png",
          published: true,
        },
      ],
    },
  },
];

export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}

main();