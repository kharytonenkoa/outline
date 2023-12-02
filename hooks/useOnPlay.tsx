import { Publication } from "@/types";

import usePlayer from "./usePlayer";
import useAuthModal from "./useAuthModal";
import { useUser } from "./useUser";

const useOnPlay = (publications: Publication[]) => {
  const player = usePlayer();
  const authModal = useAuthModal();
  const { subscription, user } = useUser();

  const onPlay = (id: string) => {
    if (!user) {
      return authModal.onOpen();
    }

    player.setId(id);
    player.setIds(publications.map((publication) => publication.id));
  }

  return onPlay;
};

export default useOnPlay;