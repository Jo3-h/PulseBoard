import StravaMap from "../../../utility/StravaMap";

export default function StravaContent({ data }) {
  return (
    <>
      <div className="relative overflow-hidden">
        <StravaMap mapPolyline={data.map_polyline} />
      </div>
    </>
  );
}
