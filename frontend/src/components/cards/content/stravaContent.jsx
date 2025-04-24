import StravaMap from "../../../utility/StravaMap";

function normaliseValue(value, type) {
  if (type === "distance") {
    if (value < 1000) {
      return `${value} m`;
    }
    return `${(value / 1000).toFixed(2)} km`;
  }

  if (type === "duration") {
    const hours = Math.floor(value / 3600);
    const minutes = Math.floor((value % 3600) / 60);
    const seconds = value % 60;

    let formattedDuration = "";
    if (hours > 0) {
      formattedDuration += `${hours}h `;
    }
    if (minutes > 0) {
      formattedDuration += `${minutes}m `;
    }
    formattedDuration += `${seconds}s`;

    return formattedDuration;
  }

  if (type === "pace") {
    const seconds_km = 1000 / value;
    const minutes = Math.floor(seconds_km / 60);
    const seconds = Math.floor(seconds_km % 60);
    let formattedPace = "";
    formattedPace += `${minutes}:`;
    formattedPace += `${seconds} /km`;
    return formattedPace;
  }
  return value;
}
function renderActivityIcon(activityType) {
  if (activityType === "Run") {
    return (
      <svg
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        className="w-6 h-6 text-current"
        data-testid="activity-icon"
      >
        <title>Run</title>
        <path d="M8.688 0C8.025 0 7.38.215 6.85.613l-3.32 2.49-2.845.948A1 1 0 000 5c0 1.579.197 2.772.567 3.734.376.978.907 1.654 1.476 2.223.305.305.6.567.886.82.785.697 1.5 1.33 2.159 2.634 1.032 2.57 2.37 4.748 4.446 6.27C11.629 22.218 14.356 23 18 23c2.128 0 3.587-.553 4.549-1.411a4.378 4.378 0 001.408-2.628c.152-.987-.389-1.787-.967-2.25l-3.892-3.114a1 1 0 01-.329-.477l-3.094-9.726A2 2 0 0013.769 2h-1.436a2 2 0 00-1.2.4l-.57.428-.516-1.803A1.413 1.413 0 008.688 0zM8.05 2.213c.069-.051.143-.094.221-.127l1.168 4.086L12.333 4h1.436l.954 3H12v2h3.36l.318 1H13v2h3.314l.55 1.726a3 3 0 00.984 1.433l3.106 2.485c-.77.19-1.778.356-2.954.356-1.97 0-3.178-.431-4.046-1.087-.895-.677-1.546-1.675-2.251-3.056-.224-.437-.45-.907-.688-1.403C9.875 10.08 8.444 7.1 5.531 4.102zM3.743 5.14c2.902 2.858 4.254 5.664 5.441 8.126.25.517.49 1.018.738 1.502.732 1.432 1.55 2.777 2.827 3.74C14.053 19.495 15.72 20 18 20c1.492 0 2.754-.23 3.684-.479a2.285 2.285 0 01-.467.575c-.5.446-1.435.904-3.217.904-3.356 0-5.629-.718-7.284-1.931-1.663-1.22-2.823-3.028-3.788-5.44a1.012 1.012 0 00-.034-.076c-.853-1.708-1.947-2.673-2.79-3.417a14.61 14.61 0 01-.647-.593c-.431-.431-.775-.88-1.024-1.527-.21-.545-.367-1.271-.417-2.3z" />
      </svg>
    );
  }

  if (activityType === "Walk") {
    return (
      <svg
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        className=""
        data-testid="activity-icon"
      >
        <title>Walk</title>
        <path d="M9.7 4a5 5 0 012.94.956l4.368 3.177 4.595 2.12A4.127 4.127 0 0124 14.002v.018c0 .314.002 1.416-.898 2.398-.922 1.005-2.567 1.656-5.333 1.584H2.414a2.414 2.414 0 01-1.707-4.122l.086-.086a.707.707 0 00.207-.5V6.547C1 5.693 1.693 5 2.547 5c.555 0 1.088.22 1.48.613L5.414 7h1.699L6.55 5.316A1 1 0 017.5 4zM2.393 15c-.058.072-.12.141-.187.207l-.086.086a.414.414 0 00.293.707H17.81c2.489.068 3.449-.531 3.819-.935.372-.406.372-.847.372-1.062v-.002c0-.35-.086-.687-.242-.985-.4.059-.638.278-1.05.691l-.027.026C20.17 14.243 19.415 15 18 15zm17.555-3.307l-3.092-1.426-1.08 1.62-1.664-1.11 1.022-1.533-.738-.537-1.12 1.68-1.664-1.11 1.165-1.747-1.314-.956A3 3 0 009.699 6h-.812l1 3H4.587L3 7.414V13h15c.56 0 .803-.218 1.293-.707l.026-.026c.175-.176.38-.38.63-.573z" />
      </svg>
    );
  }

  return null;
}

export default function StravaContent({ data, tidbit }) {
  // return component for tidbit
  if (tidbit) {
    return (
      <>
        <div className="bg-white w-[180px] h-auto border flex flex-col mb-3">
          <div className="flex flex-row justify-center items-center w-full h-auto mt-2">
            <div className="w-7/12 h-auto text-xs text-right mr-2">
              Max Pace:
            </div>
            <div className="w-5/12 h-auto text-xs font-bold text-left">
              {normaliseValue(data.max_speed, "pace")}
            </div>
          </div>
          <div className="flex flex-row justify-center items-center w-full h-auto mt-1">
            <div className="w-7/12 h-auto text-xs text-right mr-2">Kudos:</div>
            <div className="w-5/12 h-auto text-xs font-bold text-left">
              {data.kudos_count}
            </div>
          </div>
          <div className="flex flex-row justify-center items-center w-full h-auto mt-1">
            <div className="w-7/12 h-auto text-xs text-right mr-2">
              Elevation:
            </div>
            <div className="w-5/12 h-auto text-xs font-bold text-left">
              {normaliseValue(data.elevation_gain, "distance")}
            </div>
          </div>
          <div className="flex flex-row justify-center items-center w-full h-auto mt-1">
            <div className="w-7/12 h-auto text-xs text-right mr-2">
              Achievements:
            </div>
            <div className="w-5/12 h-auto text-xs font-bold text-left">
              {data.achievement_count}
            </div>
          </div>
          <div className="flex flex-row justify-center items-center w-full h-auto mt-1 mb-3">
            <div className="w-7/12 h-auto text-xs text-right mr-2">
              Comments:
            </div>
            <div className="w-5/12 h-auto text-xs font-bold text-left">
              {data.comment_count}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="relative overflow-hidden flex flex-col w-full h-auto mt-2">
        <div className="flex flex-row justify-start items-center mb-3">
          {renderActivityIcon(data.activity_type)}
          <div className="text-left ml-3 font-bold text-sm md:text-md">
            {data.name}
          </div>
        </div>
        <div className={`text-left text-sm ${data.description ? "mb-3" : ""}`}>
          {data.description}
        </div>
        <div className="flex flex-row justify-center items-center mb-3">
          <div className="w-1/3 h-10 border-r flex flex-col">
            <div className="text-xs">Distance</div>
            <div className="text-xs font-bold">
              {normaliseValue(data.distance_ms, "distance")}
            </div>
          </div>
          <div className="w-1/3 h-10 border-r">
            <div className="text-xs">Duration</div>
            <div className="text-xs font-bold">
              {normaliseValue(data.duration_sec, "duration")}
            </div>
          </div>
          <div className="w-1/3 h-10">
            <div className="text-xs">Pace</div>
            <div className="text-xs font-bold">
              {normaliseValue(data.average_pace, "pace")}
            </div>
          </div>
        </div>
        <div
          className="flex flex-row justify-center items-center mb-3 mr-3 rounded-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <StravaMap mapPolyline={data.map_polyline} />
        </div>
      </div>
    </>
  );
}
