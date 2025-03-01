import Image from "next/image";

const TestimonialCard = ({ name, lastName, quote, imageUrl }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center mb-4">
        <div className="relative w-16 h-16 mr-4">
          <Image
            src={imageUrl || "/placeholder-avatar.png"}
            alt={`${name} ${lastName}`}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-bold text-lg">
            {name} {lastName}
          </h3>
        </div>
      </div>
      <p className="text-gray-600 italic">&quot;{quote}&quot;</p>
    </div>
  );
};

export default TestimonialCard;
