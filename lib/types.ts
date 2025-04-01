import { EmptyObject, UseFormSetError } from "react-hook-form";

export type OAuthButtonWrapperProps = {
  setError: UseFormSetError<EmptyObject>;
};

export type MovieData = {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
}