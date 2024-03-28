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
import { useState } from "react";
import SongPreview from "./SongPreview";
import { ScrollArea } from "./ui/scroll-area";
import { getConcattedArtists } from "~/app/lib/sharelistUtils";
import { useAddSongToSharelist, useDeleteSongFromSharelist } from "~/app/services/mutations";
import { useSharelistSongs, useSpotifyTopTracks, useSpotifyTrackSearch } from "~/app/services/queries";


const CreateSharelist = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const addSongToSharelist = useAddSongToSharelist();
  const spotifyTopTracks = useSpotifyTopTracks();
  const sharelistSongs = useSharelistSongs();
  const deleteSongFromSharelist = useDeleteSongFromSharelist();
  const spotifyTrackSearch = useSpotifyTrackSearch(searchTerm);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setSearchTerm(inputValue);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen(!dialogOpen)}>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent className="w-2/3">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold tracking-[-0.1em]">
            Update your weeklysharelist
          </DialogTitle>
          <DialogDescription className="text-md">
            Choose from your recently played songs, or search for something new
          </DialogDescription>
        </DialogHeader>
        <Input placeholder="Search" type="search" icon={<Search size={18} />} onChange={handleInputChange} />
        <Separator className="my-2 bg-gray-200" />
        {spotifyTrackSearch.data ? (<>
          {spotifyTrackSearch.isSuccess && spotifyTrackSearch.data.map((song) => {
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
            )
          })}
        </>) : (<>
          <p className="text-md">Current Sharelist:</p>
          {sharelistSongs.isSuccess && sharelistSongs.data.map((song) => {
            return (
              <SongPreview
                key={song.spotifyTrackId}
                title={song.name}
                artists={song.artists}
                image={song.cover}
                onRemoveFromSharelist={() => {
                  deleteSongFromSharelist.mutate(song.spotifyTrackId)
                }}
              />
            )
          })
          }
          <Separator className="my-2 bg-gray-200" />
          <p className="text-md">Recommendations:</p>
          <ScrollArea className="h-48 rounded-md border">
            {spotifyTopTracks.isSuccess && spotifyTopTracks.data.map((song) => {
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
        </>)}
      </DialogContent>
    </Dialog>
  );
};

export default CreateSharelist;