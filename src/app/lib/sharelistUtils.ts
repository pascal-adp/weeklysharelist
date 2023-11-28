import axios from "axios";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const getRecommendations = async (accessToken: string) => {
  const URL =
    "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10&offset=0";
  try {
    const response = await axios.get<SpotifyApi.UsersTopTracksResponse>(URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getConcattedArtists = (artists: SpotifyApi.ArtistObjectSimplified[]) => {
  const artistsNames: string[] = [];
  artists.forEach((artist) => {
    artistsNames.push(artist.name);
  });
  return artistsNames.join(", ");
};

interface addSongToSharelistProps {
  id: string;
  name: string;
  album: string;
  artists: string[];
  image: string;
  sharelist: string;
}

export const addSongToSharelist = async ({id, name, album, artists, image, sharelist}: addSongToSharelistProps) => {
  // await prisma.sharelistSong.create({
  //   data: {
  //     id: id,
  //     album: album,
  //     artists: artists,
  //     cover: image,
  //     name: name,
  //     belongsToSharelist: {
  //       connect: {
  //         id: sharelist
  //       }
  //     }
  //   },
  // });
};

// export const getUserSharelist = async () => {
    
// }

export const createSharelist = async (userId: string) => {
  await prisma.user.create({
    data: {
      sharelist: {
        create: {
          id: userId,
        }
      }
    }
  })
}