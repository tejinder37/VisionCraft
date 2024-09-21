import { useSubscriptionModal } from "../store/use-subscription-modal";

export const usePaywall = () => {
  const subscriptionModal = useSubscriptionModal();

  const shouldBlock = true; // TODO: fetch from the api

  return {
    isloading: false, // Todo: fetch from the react query
    shouldBlock,
    triggerPaywall: () => {
      subscriptionModal.onOpen();
    },
  };
};
