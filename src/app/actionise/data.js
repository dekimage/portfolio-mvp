import artOfFinishImg from "./assets/cards/Minimalism/art of not finishing.png";
import automationImg from "./assets/cards/Minimalism/automation.png";
import minimal1 from "./assets/cards/Minimalism/batching.png";
import minimal2 from "./assets/cards/Minimalism/declutter lifestyle.png";
import minimal3 from "./assets/cards/Minimalism/digital declutter.png";
import minimal4 from "./assets/cards/Minimalism/essentialism.png";
import minimal5 from "./assets/cards/Minimalism/physical declutter.png";
import minimal6 from "./assets/cards/Minimalism/saying no.png";
import minimal7 from "./assets/cards/Minimalism/scope & limits.png";

import minimalismLogo from "./assets/realms/Minimalism.png";

export const ACTIONISE_CARDS = [
  {
    id: 1,
    name: "Art of not finishing",
    realm: "Minimalism",
    description: "Art of not finishing",
    img: artOfFinishImg,
    realmImg: minimalismLogo,
    spells: [
      {
        name: "Spell 1",
        description: "Description of Spell 1",
        spellImgUrl: "spell1.jpg",
        fullText: "Full text of Spell 1",
      },
      {
        name: "Spell 2",
        description: "Description of Spell 2",
        spellImgUrl: "spell2.jpg",
        fullText: "Full text of Spell 2",
      },
      {
        name: "Spell 3",
        description: "Description of Spell 3",
        spellImgUrl: "spell3.jpg",
        fullText: "Full text of Spell 3",
      },
    ],
  },
  {
    id: 2,
    name: "Automation",
    realm: "Minimalism",
    img: automationImg,
    description: "Automation",
    realmImg: minimalismLogo,
  },
  {
    id: 3,
    name: "Batching",
    realm: "Minimalism",
    img: minimal1,
    description: "Automation",
    realmImg: minimalismLogo,
  },
];
