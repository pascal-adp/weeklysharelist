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
import SongPreview from "./SongPreview";
import { ScrollArea } from "./ui/scroll-area";
import { getConcattedArtists } from "~/app/lib/sharelistUtils";
import { useAddSongToSharelist } from "~/app/services/mutations";

import axios from "axios";

const CreateSharelist = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [songs, setSongs] = useState<SpotifyApi.TrackObjectFull[]>([]);

  const addSongToSharelist = useAddSongToSharelist();


  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get("http://localhost:8000/api/v1/spotify/top/tracks", { withCredentials: true });
      console.log(data)
      setSongs(data.data.items);
    }
    fetchData();
  }, []);

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
        <p className="text-md">Current Sharelist:</p>

        <Separator className="my-2 bg-gray-200" />
        <p className="text-md">Recommendations:</p>
        <ScrollArea className="w-[462px] h-48 rounded-md border">
        {songs && songs.map((song) => {
          const artistsNames = getConcattedArtists(song.artists);
          const image = song.album.images[1]?.url
          return (
            <SongPreview
              key={song.id}
              title={song.name}
              artists={artistsNames}
              image={image}
              onAddToSharelist={() => {
                addSongToSharelist.mutate({
                  name: song.name,
                  album: song.album.name,
                  artists: artistsNames,
                  cover: image!,
                  spotifyTrackId: song.id
                })
              }}
            />
          );
        })}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSharelist;