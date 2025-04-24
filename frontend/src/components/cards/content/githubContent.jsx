export default function GithubContent({ data, tidbit }) {
  // if the content returned is for the tidbit, then render the tidbit content
  if (tidbit) {
    return (
      <>
        <div className="w-[180px] h-auto border bg-white flex flex-row">
          <div className="w-1/2 border-r flex flex-col">
            <div className="text-[10px] mt-1">Owner</div>
            <div className="text-[10px] font-bold mb-1">{data.repo_owner}</div>
          </div>
          <div className="w-1/2 border-r flex flex-col">
            <div className="text-[10px] mt-1">Commit Count</div>
            <div className="text-[10px] font-bold mb-1">
              {data.commit_count}
            </div>
          </div>
        </div>
      </>
    );
  }

  if (data.is_private) {
    return (
      <>
        <div className="w-full h-full text-2xl font-bold flex justify-center items-center">
          Private Repo
        </div>
      </>
    );
  }

  return (
    <>
      <div className="w-auto h-auto flex flex-col mt-2">
        <div className="flex flex-row w-full h-auto items-center">
          <div className="text-sm font-bold">{data.repo_name}</div>
          <div className="bg-light_gray h-5 w-20 ml-3 flex items-center justify-center text-sm rounded-xl font-bold text-white">
            {data.event_type}
          </div>
        </div>
        <div className="text-left text-sm mt-3">{data.action}</div>
        <div className="flex flex-row items-center mt-3">
          <div className="text-sm font-bold">Repo Link:</div>
          <div className="text-sm ml-2 truncate">{data.repo_url}</div>
        </div>
      </div>
    </>
  );
}
