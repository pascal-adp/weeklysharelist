import { ListPlus, ListX } from "lucide-react";
import Image from "next/image";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/app/components/ui/card";
import { Button } from "~/app/components/ui/button";

const SongPreview = ({
  title,
  artists,
  image,
  onAddToSharelist,
  onRemoveFromSharelist,
}: {
  title: string;
  artists: string;
  image: string | undefined;
  onAddToSharelist?: () => void;
  onRemoveFromSharelist?: () => void;
}) => {
  return (
    <Card className="flex flex-row items-center justify-between">
      <div className="flex flex-row items-center">
        {image && (
          <div className="relative ml-4">
            <Image
              src={image}
              alt="album_cover"
              width={64}
              height={64}
              className="rounded-md"
            />
          </div>
        )}
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{artists}</CardDescription>
        </CardHeader>
      </div>
      {onAddToSharelist && <Button variant={"outline"} size="icon" className="mr-4 border-gray-400" onClick={() => {
        onAddToSharelist()
      }}>
        <ListPlus size={32} className="text-gray-700" />
      </Button>
      }
      {onRemoveFromSharelist && <Button variant={"outline"} size="icon" className="mr-4 border-gray-400" onClick={() => {
        onRemoveFromSharelist()
      }}>
        <ListX size={32} className="text-gray-700" />
      </Button>
      }
    </Card>
  );
};

export default SongPreview;
