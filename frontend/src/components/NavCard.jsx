export default function NavCard({
  title,
  index,
  cardCount,
  active,
  onClick,
  description,
}) {
  return (
    <>
      <div
        className="w-full flex flex-col group text-white justify-between pt-2 relative cursor-pointer"
        style={{ height: `calc(calc(100%-60px)/${cardCount})` }}
        onClick={onClick}
      >
        {active && (
          <div className="absolute left-0 top-1/2 translate-x-85 -translate-y-1/2 w-0 h-0 border-y-[40px] border-y-transparent border-r-[50px] border-r-l-display"></div>
        )}
        <span className="font-label text-highlight font-bold text-left">
          0{index + 1}
        </span>
        <div className="font-landing tracking-widest text-[calc(100vh/32)] text-left">
          {title}
        </div>
        <span className="text-left overflow-auto font-label text-[calc(100vh/50)]">
          {description}
        </span>
        <hr className="border-l-display mt-3" />
      </div>
    </>
  );
}
