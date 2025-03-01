import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const TestimonialCard = ({ name, lastName, quote, imageUrl }) => {
  const initials = `${name.charAt(0)}${lastName.charAt(0)}`;

  return (
    <Card className="h-full">
      <CardContent className="pt-6">
        <div className="flex items-center mb-4">
          <Avatar className="h-12 w-12 mr-4">
            <AvatarImage
              src={imageUrl || "/placeholder-avatar.png"}
              alt={`${name} ${lastName}`}
            />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium text-foreground">
              {name} {lastName}
            </h3>
          </div>
        </div>
        <p className="text-muted-foreground italic">&quot;{quote}&quot;</p>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
