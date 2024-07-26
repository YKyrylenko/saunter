import { Path } from "../PathList/types";

export type Props = {
  path: Path;
  selectedPathId: string;
  onSelectPath: (id: string) => () => void;
};
