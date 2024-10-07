import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";
import { ScrollArea } from "~/components/ui/scroll-area";

import SongPreview from "~/components/SongPreview";

import { Search } from "lucide-react";
import React, { useState } from "react";

import { getConcattedArtists } from "~/lib/sharelistUtils";
import { useAddSongToSharelist, useDeleteSongFromSharelist } from "~/services/mutations";
import { useSharelistSongs, useSpotifyTopTracks, useSpotifyTrackSearch } from "~/services/queries";

interface CreateSharelistProps {
  dialogOpen: boolean;
  updateDialogOpenState: (dialogOpen: boolean) => void;

}

const CreateSharelist: React.FC<CreateSharelistProps> = ({ dialogOpen, updateDialogOpenState }) => {
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
    <Dialog open={dialogOpen} onOpenChange={() => updateDialogOpenState(!dialogOpen)}>
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
        </>) : (<div className="flex flex-col h-[700px]">
          <p className="text-md">Current Sharelist:</p>
          <div>
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
          </div>
          <Separator className="my-2 bg-gray-200" />
          <p className="text-md">Recommendations:</p>
          <ScrollArea className="h-48 rounded-md border flex-1">
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
        </div>)}
      </DialogContent>
    </Dialog>
  );
};

export default CreateSharelist;