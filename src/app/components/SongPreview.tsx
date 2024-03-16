import { ListPlus, ListX } from "lucide-react";
import Image from "next/image";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/app/components/ui/card";
import { Button } from "~/app/components/ui/button";
import { useToast } from "~/app/components/ui/use-toast";

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
  const { toast } = useToast()

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
        toast({
          title: "✔ Added to sharelist",
          description: "The song has been added to your sharelist",
          duration: 2000,
        })
      }}>
        <ListPlus size={32} className="text-gray-700" />
      </Button>
      }
      {onRemoveFromSharelist && <Button variant={"outline"} size="icon" className="mr-4 border-gray-400" onClick={() => {
        onRemoveFromSharelist()
        toast({
          title: "✔ Removed from sharelist",
          description: "The song has been removed from your sharelist",
          duration: 2000,
        })
      }}>
        <ListX size={32} className="text-gray-700" />
      </Button>
      }
    </Card>
  );
};

export default SongPreview;
