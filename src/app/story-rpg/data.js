import item1 from "./assets/item-1.png";
import item2 from "./assets/item-2.png";
import item3 from "./assets/item-3.png";
import item4 from "./assets/item-4.png";
import item5 from "./assets/item-5.png";
import item6 from "./assets/item-6.png";
import item7 from "./assets/item-7.png";
export const rooms = [
  {
    page: 5,
    name: "Skeleton Room",
    description:
      "A dimly lit chamber, its stone walls adorned with eerie torch sconces casting flickering shadows. Dust-covered relics line the edges, hinting at forgotten tales. In the center, a mysterious altar exudes an otherworldly aura. The air is thick with ancient magic, invoking both awe and trepidation in adventurers.",
    options: [
      { label: "You drink the Potion", page: 24 },
      { label: "Eat the shroom", page: 25 },
      { label: "You inspect the altar", page: 26 },
    ],
  },
  {
    page: 6,
    name: "Cavern of Echoes",
    description:
      "A vast, open cavern where every sound is amplified into haunting echoes. Bioluminescent fungi illuminate the path, revealing ancient carvings on the walls. A clear stream flows gently, leading to a darkened passage. The air vibrates with a subtle, yet powerful energy.",
    options: [
      { label: "Follow the stream", page: 27 },
      { label: "Investigate the carvings", page: 28 },
      { label: "Enter the darkened passage", page: 29 },
    ],
  },
  {
    page: 7,
    name: "The Forgotten Library",
    description:
      "Rows upon rows of ancient books and scrolls fill this vast room, their knowledge lost to time. A single, dust-covered window lets in a beam of light, illuminating the golden letters on the spines of the books. The silence is almost palpable, broken only by the sound of a distant drip of water.",
    options: [
      { label: "Read a random book", page: 30 },
      { label: "Search for a secret passage", page: 31 },
      { label: "Examine the window", page: 32 },
    ],
  },
  {
    page: 8,
    name: "The Crystal Lake",
    description:
      "A serene lake lies before you, its waters crystal clear and still. Surrounding the lake, ancient trees whisper tales of old in the gentle breeze. At the center of the lake, a small island with a solitary tree beckons. The beauty of the scene belies the danger lurking beneath the surface.",
    options: [
      { label: "Swim to the island", page: 33 },
      { label: "Walk around the lake", page: 34 },
      { label: "Dive into the waters", page: 35 },
    ],
  },
  {
    page: 9,
    name: "The Hall of Mirrors",
    description:
      "An endless corridor lined with mirrors, each reflecting a different aspect of reality. The reflections seem to move independently, suggesting alternate paths and outcomes. The air is filled with a sense of disorientation, making it hard to trust your senses. Will you find the way out, or become lost in what might have been?",
    options: [
      { label: "Follow a reflection that looks like you", page: 36 },
      { label: "Search for a mirror that does not reflect", page: 37 },
      { label: "Keep moving forward, ignoring the mirrors", page: 38 },
    ],
  },
];

export const items = [
  {
    img: item1,
    name: "Vault",
    effect: "Gain 1 Gold per page flipped",
    activations: [
      {
        room: 4,
        option: {
          label: "Give him the coin",
          page: 19,
        },
      },
    ],
  },
  {
    img: item2,
    name: "Torch",
    effect: "Unlocks Hidden Caves (Page 10).",
  },
  {
    img: item3,
    name: "Sac",
    effect: "Holds keys",
  },
  {
    img: item4,
    name: "Bag",
    effect: "+ 2 Inventory Slots",
  },
  {
    img: item5,
    name: "Documents",
    effect: "Contains secret key to unlock Door (Page 6).",
  },
  {
    img: item6,
    name: "Sword",
    effect: "Use: Deal 2 damage",
  },
  {
    img: item7,
    name: "Skull",
    effect: "Use: Scare away enemies.",
  },
];
