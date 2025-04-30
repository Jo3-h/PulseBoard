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
        className={`w-full h-1/${cardCount} flex flex-col group text-white justify-between pt-2 relative cursor-pointer
         hover:text-l-display transition-all duration-300 ease-in-out
        `}
        onClick={onClick}
      >
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
