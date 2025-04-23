export default function LeetcodeCard({ activity, expanded }) {
  return (
    <>
      <div className="activity-card">
        {/** Headers */}
        <div className="w-full h-10 bg-red-100 rounded-t-xl flex flex-row justify-center">
          <div className="flex flex-row w-7/10 justify-start pl-4 items-center gap-x-2">
            <div className="font-label text-md font-bold">Leetcode</div>
            <div className="font-label text-sm">{activity["event_type"]}</div>
          </div>
          <div className="flex flex-row w-3/10">bitch</div>
        </div>

        {/** Content */}
      </div>
    </>
  );
}
