import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";
import prismadb from "@/lib/prismadb";
import { without } from "lodash";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === "POST") {
      const { currentUser } = await serverAuth(req);

      const { movieId } = req.query as { movieId: string };

      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        },
      });

      if (!existingMovie) {
        throw new Error("Invalid ID");
      }

      const user = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          favoritesIds: {
            push: movieId,
          },
        },
      });

      return res.status(200).json(user);
    }

    if (req.method === "DELETE") {
      const { currentUser } = await serverAuth(req);

      const { movieId } = req.query as { movieId: string };

      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        },
      });

      if (!existingMovie) {
        throw new Error("Invalid ID");
      }

      const updateFavoriteIds = without(currentUser.favoritesIds, movieId);

      const updatedUser = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          favoritesIds: updateFavoriteIds,
        },
      });

      return res.status(200).json(updatedUser);
    }

    return res.status(405).end();
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
