import { useRef } from "react";

interface ScrollCard {
  image: string;
  title?: string;
  onClick: () => void;
  onPreviewStart: () => void;
  onPreviewEnd: () => void;
}

const HoverScrollCard = ({
  image,
  title = "Landing page",
  onClick,
  onPreviewStart,
  onPreviewEnd,
}: ScrollCard) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const holdTimer = useRef<number | null>(null);
  const isHolding = useRef(false);

  const startScroll = () => {
    const img = imgRef.current;
    if (!img || !img.complete) return;

    const container = img.parentElement!;
    const containerHeight = container.clientHeight;

    const scale = img.clientWidth / img.naturalWidth;
    const scaledHeight = img.naturalHeight * scale;

    const scrollAmount = scaledHeight - containerHeight;
    if (scrollAmount > 0) {
      img.style.transform = `translateY(-${scrollAmount}px)`;
    }
  };

  const resetScroll = () => {
    const img = imgRef.current;
    if (!img) return;
    img.style.transform = "translateY(0)";
  };

  const handleMouseEnter = () => {
    onPreviewStart();
    startScroll();
  };

  const handleMouseLeave = () => {
    resetScroll();
    onPreviewEnd();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    isHolding.current = false;

    holdTimer.current = window.setTimeout(() => {
      isHolding.current = true;
      onPreviewStart();
      startScroll();
    }, 250);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();

    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }

    if (isHolding.current) {
      resetScroll();
      onPreviewEnd();
      isHolding.current = false;
    } else {
      onClick();
    }
  };

  return (
    <div className="w-full min-w-70">
      <div
        className="
        relative
        rounded-xl
        overflow-hidden
      "
      >
        <div className="p-1">
          <div
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onContextMenu={(e) => e.preventDefault()}
            className="
            relative
            z-10
            h-90
            overflow-hidden
            rounded-md
            cursor-zoom-in
            select-none
            touch-none
            bg-white
          "
          >
            <img
              ref={imgRef}
              src={image}
              alt=""
              draggable={false}
              className="
              w-full
              object-cover
              transition-transform
              duration-4500
              ease-linear
              pointer-events-none
            "
            />
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-0 z-20 grayscale "
          style={{
            backgroundImage: "url('/mockup/galaxy.png')",
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>

      <p className="mt-3 text-center text-sm lg:text-xl font-medium text-zinc-700">
        {title}
      </p>
    </div>
  );
};

export default HoverScrollCard;
