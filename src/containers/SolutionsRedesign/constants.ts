export enum StoryAuthor {
  PETE_MARTIN = 'peteMartin',
  THOMAS_ROBISCO = 'thomasRobisco',
  LOTTIE_ELWOOD = 'lottieElwood',
  JUSTIN_IEMMA = 'justinIemma',
  CHUA_SUN_FAT = 'chuaSunFat',
}

export const moreStoriesMap = {
  [StoryAuthor.PETE_MARTIN]: [
    StoryAuthor.THOMAS_ROBISCO,
    StoryAuthor.LOTTIE_ELWOOD,
  ],
  [StoryAuthor.THOMAS_ROBISCO]: [
    StoryAuthor.LOTTIE_ELWOOD,
    StoryAuthor.JUSTIN_IEMMA,
  ],
  [StoryAuthor.LOTTIE_ELWOOD]: [
    StoryAuthor.JUSTIN_IEMMA,
    StoryAuthor.CHUA_SUN_FAT,
  ],
  [StoryAuthor.JUSTIN_IEMMA]: [
    StoryAuthor.CHUA_SUN_FAT,
    StoryAuthor.PETE_MARTIN,
  ],
  [StoryAuthor.CHUA_SUN_FAT]: [
    StoryAuthor.PETE_MARTIN,
    StoryAuthor.THOMAS_ROBISCO,
  ],
};
