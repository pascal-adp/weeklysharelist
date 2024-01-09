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
import SongPreview from "./SongPreview";
import { ScrollArea } from "./ui/scroll-area";

import { getConcattedArtists, getRecommendations, addSongToSharelist } from "~/app/lib/sharelistUtils";

const CreateSharelist = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [songs, setSongs] = useState<SpotifyApi.TrackObjectFull[]>([]);
  const { data } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      if (data?.accessToken && songs.length === 0) {
        const response = await getRecommendations(data.accessToken);
        console.log(response)
        if (response) {
          setSongs(response.data.items);
        }
      }
    };
    
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
        <p className="text-md">Current Sharelist:</p>

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
              onAddToSharelist={() => addSongToSharelist({id: song.id, 
                name: song.name,
                album: song.album.name,
                artists: artistsNames,
                image: image,
                sharelist: data?.user?.sharelist?.id
              })}
            />
          );
        })}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSharelist;