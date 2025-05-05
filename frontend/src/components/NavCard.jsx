export default function NavCard({
  title,
  index,
  cardCount,
  active,
  description,
}) {
  return (
    <>
      <div
        className={`w-full relative aspect-10/3 max-h-180 mb-4 p-6 rounded-2xl bg-m-display group hover:bg-l-display transition-all duration-300 ease-in-out flex flex-col items-center
          ${active ? "text-d-display" : "hover:text-d-display text-white"}
          `}
      >
        <div className="w-full flex flex-row items-center mb-3">
          <div className="font-landing text-2xl items-center translate-y-0.5">
            {index + 1}
            {" - "}
            {title}
          </div>
        </div>
        <div className="flex px-3 w-full mb-3">
          <div
            className={`w-full h-[1px]
            ${active ? "bg-d-display" : "bg-white group-hover:bg-d-display"}
            transition-all duration-300
            `}
          ></div>
        </div>
        <div className="font-label text-left text-xs">{description}</div>
        <div
          className={`absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 ${
            active ? "bg-white" : "bg-l-display group-hover:bg-white"
          } rounded-full h-[30px] w-[30px]
        group-hover:translate-x-1/4 
        transition-all duration-300
        `}
        ></div>
      </div>
    </>
  );
}
