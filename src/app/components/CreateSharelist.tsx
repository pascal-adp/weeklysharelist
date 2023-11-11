import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/app/components/ui/dialog";
import { Search } from "lucide-react";
import { Input } from "~/app/components/ui/input";
import { Separator } from "~/app/components/ui/separator";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import SongPreview from "./SongPreview";
import { ScrollArea } from "./ui/scroll-area";

const getRecommendations = async (accessToken: string) => {
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

const getConcattedArtists = (artists: SpotifyApi.ArtistObjectSimplified[]) => {
  const artistsNames: string[] = [];
  artists.forEach((artist) => {
    artistsNames.push(artist.name);
  });
  return artistsNames.join(", ");
};

const CreateSharelist = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [songs, setSongs] = useState<SpotifyApi.TrackObjectFull[]>([]);
  const { data } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      if (data?.accessToken && songs.length === 0) {
        const response = await getRecommendations(data.accessToken);
        if (response) {
          setSongs(response.data.items);
        }
      }
    };
    console.log(songs)
    void fetchData();
  }, [dialogOpen, data, songs]);

  return (
    <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen(!dialogOpen)}>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold tracking-[-0.1em]">
            Update your weeklysharelist
          </DialogTitle>
          <DialogDescription className="text-md">
            Choose from your recently played songs, or search for something new
          </DialogDescription>
        </DialogHeader>
        <Input placeholder="Search" type="search" icon={<Search size={18} />} />
        <Separator className="my-2 bg-gray-200" />
        <p className="text-md">Recommendations:</p>
        <ScrollArea className="w-[462px] h-48 rounded-md border">
        {songs.map((song) => {
          const artistsNames = getConcattedArtists(song.artists);
          const image = song.album.images[1]?.url
          return (
            <SongPreview
              key={song.id}
              title={song.name}
              artists={artistsNames}
              image={image}
            />
          );
        })}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSharelist;
