export interface FloorPlanItem {
  id: string;
  title: string;
  image: string;
  imageGallery: string[];
}

export const floorPlansData: FloorPlanItem[] = [
  {
    id: "5bhk-penthouse",
    title: "MASTER LAYOUT PLAN",
    image:
      "https://www.panchshil.com/assets/images/residentials/tVc5kiNs91NTJpaQWPLFmFMUZVwY6L.png",
    imageGallery: [
      "https://www.panchshil.com/omnia/assets/images/configurations/3-bhk-862509201.webp",
      "https://www.panchshil.com/omnia/assets/images/configurations/4-5-bhk-307270490.webp",
    ],
  },
  {
    id: "4bhk",
    title: "TOWER A",
    image:
      "https://www.panchshil.com/assets/images/residentials/tVc5kiNs91NTJpaQWPLFmFMUZVwY6L.png",
    imageGallery: [
      "https://www.panchshil.com/omnia/assets/images/configurations/3-bhk-862509201.webp",
      "https://www.panchshil.com/omnia/assets/images/configurations/4-5-bhk-307270490.webp",
    ],
  },
  {
    id: "3bhk",
    title: "TOWER B",
    image:
      "https://www.panchshil.com/assets/images/residentials/tVc5kiNs91NTJpaQWPLFmFMUZVwY6L.png",
    imageGallery: [
      "https://www.panchshil.com/omnia/assets/images/configurations/3-bhk-862509201.webp",
      "https://www.panchshil.com/omnia/assets/images/configurations/4-5-bhk-307270490.webp",
    ],
  },
  // {
  //   id: "2bhk",
  //   title: "2BHK",
  //   image:
  //     "https://www.panchshil.com/assets/images/residentials/tVc5kiNs91NTJpaQWPLFmFMUZVwY6L.png",
  // },
];
