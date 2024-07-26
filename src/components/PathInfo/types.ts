import { Path } from "../../pages/Main/components/PathList/types";

export type Props = {
  pathInfo: Path;
  onFavorite: (id: string) => () => void;
  onDelete: (id: string) => () => void;
};
