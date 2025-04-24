export default function LeetcodeContent({ data, tidbit }) {
  const difficultyColor = {
    Easy: "text-[#16a800]",
    Medium: "text-[#ffe312]",
    Hard: "text-[#c2001a]",
  };

  const statusColor = {
    Accepted: "text-[#16a800]",
    Rejected: "text-[#c2001a]",
    Pending: "text-[#ffe312]",
  };

  // if the content returned is for the tidbit, then render the tidbit content
  if (tidbit) {
    return (
      <>
        <div className="bg-white w-[180px] h-10 border flex flex-row mb-3">
          <div className="flex flex-col justify-center items-center border-r w-1/3">
            <div className="text-[8px]">submissions</div>
            <div className="text-[10px] font-bold">
              {data.total_submissions}
            </div>
          </div>
          <div className="flex flex-col justify-center items-center border-r w-1/3">
            <div className="text-[8px]">accepted</div>
            <div className="text-[10px] font-bold">{data.total_accepted}</div>
          </div>
          <div className="flex flex-col justify-center items-center w-1/3">
            <div className="text-[8px]">ratio</div>
            <div className="text-[10px] font-bold">
              {data.total_accepted_ratio}
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="text-[12px] font-bold min-w-1/2">Problem Link: </div>
          <div className="text-[12px] flex overflow-hidden">
            {data.problem_url}
          </div>
        </div>
      </>
    );
  }

  // if the content returned is for the activity, then render the activity content
  return (
    <>
      <div className="w-full h-full flex flex-col justify-start mb-5">
        <div className="text-left font-bold text-sm md:text-md h-auto flex flex-row items-center">
          <span className="w-auto">{data.problem_name}</span>
        </div>
        <div className="flex flex-row mt-2 text-xs">
          <div className="truncate">{data.topics}</div>
          <div
            className={`${
              difficultyColor[data.difficulty]
            } bg-light_gray w-20 text-xs ml-3 rounded-xl items-center justify-center font-bold flex`}
          >
            {data.difficulty}
          </div>
        </div>

        <div
          className={`${
            statusColor[data.status]
          } font-bold justify-start flex text-xs mt-2`}
        >
          {data.event_type} {data.status}
        </div>
        <div
          className="flex flex-col mt-3 text-left h-auto w-full text-xs prose max-w-none"
          dangerouslySetInnerHTML={{ __html: data.problem_description }}
        />
      </div>
    </>
  );
}
