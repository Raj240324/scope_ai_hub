import { useEffect } from"react";
import { useLocation } from"react-router-dom";
import { useModal } from"../../context/ModalContext";

const VISIT_KEY ="ai_institute_last_modal_visit";
const MODAL_DELAY = 800; // Natural UX delay
const EXPIRY_DAYS = 30;

export default function NewUserModalTrigger({ isAppReady }) {
  const { openModal } = useModal();
  const location = useLocation();

  useEffect(() => {
    // Only run when app is fully ready
    if (!isAppReady) return;

    // Only trigger on homepage
    if (location.pathname !=="/") return;

    // Prevent SSR errors (if ever deployed with SSR)
    if (typeof window ==="undefined") return;

    const now = Date.now();
    const lastVisit = localStorage.getItem(VISIT_KEY);

    const expiryTime = EXPIRY_DAYS * 24 * 60 * 60 * 1000;

    const shouldOpen =
      !lastVisit || now - Number(lastVisit) > expiryTime;

    if (!shouldOpen) return;

    const timer = setTimeout(() => {
      openModal("General Inquiry");
      localStorage.setItem(VISIT_KEY, now.toString());
    }, MODAL_DELAY);

    return () => clearTimeout(timer);
  }, [isAppReady, location.pathname, openModal]);

  return null; // Invisible logical component
}
