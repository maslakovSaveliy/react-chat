import { RefObject, useEffect, useRef } from "react";
export const useObserver = (
  setToTopBtn: CallableFunction,
  firstElement: RefObject<HTMLDivElement>
) => {
  const observer = useRef<IntersectionObserver>();
  useEffect(() => {
    if (observer.current) observer.current.disconnect();
    var cb = function (entries: IntersectionObserverEntry[]) {
      if (entries[0].isIntersecting) {
        setToTopBtn(false);
      } else {
        setToTopBtn(true);
      }
    };
    observer.current = new IntersectionObserver(cb);
    observer.current.observe(firstElement.current!);
  }, []);
};
