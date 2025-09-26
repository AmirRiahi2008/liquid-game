export default function Bottle({ colors, isSelected, onClick }) {


  return (
    <>
      <div
        className={`bottle ${isSelected ? "selected" : ""}`}
        onClick={onClick}
      >
        {colors.map((c, i) => {
          return (
            <span
              key={i}
              className="color"
              style={{ backgroundColor: c, bottom: `${i * 27.5}px` }}
            ></span>
          );
        })}
      </div>
    </>
  );
}
