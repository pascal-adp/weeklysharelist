import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/app/components/ui/card";

const SongPreview = ({title, artists, image}: {title: string, artists: string, image: string | undefined}) => {
  return (
    <Card className="flex flex-row items-center">
      { image && <div className="relative ml-2">
          <Image src={image} alt="album_cover" width={64} height={64} className="rounded-md" />
        </div>}
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{artists}</CardDescription>
      </CardHeader>
      {/* <CardContent>
      </CardContent>
      <CardFooter>
      </CardFooter> */}
    </Card>
  );
};

export default SongPreview;
