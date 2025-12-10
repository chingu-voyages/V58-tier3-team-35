import { teamImages } from "@/utils/images";

export interface TeamMember {
  name: string;
  ghUsername: string;
  linkedin: string;
  image: string;
  role: string;
  quote: string;
}

export const team: TeamMember[] = [
  {
    name: "Ogechi Ogharandukun",
    ghUsername: "https://github.com/AdoarableOge",
    linkedin: "https://www.linkedin.com/in/Ogechi-Ogharandukun/",
    image: teamImages.Ogechi,
    role: "Scrum Master",
    quote: "Be Patient With Yourself.",
  },
  {
    name: "Chinedu Olekah",
    ghUsername: "https://github.com/kenako1",
    linkedin: "https://www.linkedin.com/in/chinedu-olekah-835465254/",
    image: teamImages.Chinedu,
    role: "Product Owner",
    quote: "The future is not something we enter. The future is something we create.” — Leonard I. Sweet",
  },

  {
    name: "Zuzu Ali",
    ghUsername: "https://github.com/zuweeali",
    linkedin: "https://www.linkedin.com/in/zuwaira-aliyu-mohammed/",
    image: teamImages.Zuzu,
    role: "Scrum Master",
    quote: "To be Safe is to be Saved.",
  },

  {
    name: "Afuwape Babatunde",
    ghUsername: "https://github.com/Afubasic",
    linkedin: "https://www.linkedin.com/in/afuwape-babatunde",
    image: teamImages.Babatunde,
    role: "Developer",
    quote: "Live, Learn, one day at a time.",
  },
  {
    name: "Lindsay Allen",
    ghUsername: "https://github.com/lkallen",
    linkedin: "https://www.linkedin.com/in/lindsay-allen-54b46937/",
    image: teamImages.Lindsay,
    role: "Voyage Guide",
    quote: "",
  },
  {
    name: "Onyekachi Nwakaihe (Kachi)",
    ghUsername: "https://github.com/donkachii",
    linkedin: "https://www.linkedin.com/in/onyekachi-nwakaihe/",
    image: teamImages.Kachi,
    role: "Developer",
    quote: "The Future is Now. Live it",
  },
  {
    name: "Alexander",
    ghUsername: "https://github.com/recklessbud",
    linkedin: "https://www.linkedin.com/in/nsowah",
    image: teamImages.Alexander,
    role: "Developer",
    quote: "Nothing is Promised.",
  },
];
