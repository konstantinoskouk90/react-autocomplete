import {
  useState,
  useEffect,
  useRef,
  MutableRefObject,
  Dispatch,
  SetStateAction,
} from 'react';

type UseVisibleHook = {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  ref: MutableRefObject<null>;
};

export function useVisible(initialIsVisible: boolean): UseVisibleHook {
  const [isVisible, setIsVisible] = useState<boolean>(initialIsVisible);
  const ref = useRef<any>(null);

  const handleHideDropdown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsVisible(false);
    }
  };

  const handleClickOutside = (event: { target: EventTarget | null }) => {
    if (ref.current && !ref.current?.contains(event.target)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleHideDropdown, true);
    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('keydown', handleHideDropdown, true);
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return { ref, isVisible, setIsVisible };
}