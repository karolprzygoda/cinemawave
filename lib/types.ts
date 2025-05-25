import { TMDBImageType } from "@/lib/tmdb-types";
import { ReactNode } from "react";

export type Genre = {
  id: number | string;
  name: string;
};

export type MediaListItem = {
  id: string | number;
  title: string;
  backdrop_url: string;
  poster_url: string;
  genres: Genre[];
  description: string;
  provider: "tmdb" | "prisma";
  logo?: TMDBImageType;
  video_url?: string;
};

export type MediaSection = {
  provider: "tmdb" | "prisma";
  title: string;
  variant: "top-ten" | "list";
  media: MediaListItem[];
};

export type AnimationType = {
  keyframes: Keyframe[];
  options: KeyframeAnimationOptions;
};

// This is a utility type that makes complex types more readable by removing excess nesting.
// Example usage of Prettify:
// type ComplexType = {
//   a: {
//     b: {
//       c: {
//         d: string;
//       };
//     };
//   };
// } & Omit<{
//     a: {
//       b: {
//         c: {
//           d: string;
//         };
//       };
//     }  ;
// }& Record<"d", string[]>, "c">
//
// type SimpleType = Prettify<ComplexType>;
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type AsChildProps<DefaultElementProps> =
  | ({ asChild?: false } & DefaultElementProps)
  | { asChild: true; children: ReactNode };

export type AnyProps = Record<string, any>;
