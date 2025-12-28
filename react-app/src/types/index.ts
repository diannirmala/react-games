export type Platform = "pc" | "playstation" | "xbox" | "nintendo" | "ios" | "android";

export type Genre = {
  id: number;
  name: string;
};

export type Game = {
  id: number;
  name: string;
  background_image: string;
  metacritic?: number;
  platforms: Platform[];
  genreIds: number[];
};
