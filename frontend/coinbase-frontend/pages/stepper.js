import react, { useState } from "react";

const stepper = () => {
  const [arr, setArr] = useState([1, 2, 3]);
  const [active, setActive] = useState(0);

  return (
    <div>
      {arr.map((item, index) => (
        <div style={active === index ? { color: "red" } : null}>{item}</div>
      ))}
      {arr.length != active - 1 ? (
        <button
          onClick={() => {
            setActive(active + 1);
          }}
        >
          next
        </button>
      ) : null}
      <button
        onClick={() => {
          setActive(active - 1);
        }}
      >
        back
      </button>

      {active === 0 ? (
        <div>
          <input type="text" placeholder="1" />
        </div>
      ) : null}
      {active === 1 ? (
        <div>
          <input type="text" placeholder="2" />
        </div>
      ) : null}
      {active === 2 ? (
        <div>
          <input type="text" placeholder="3" />
        </div>
      ) : null}
    </div>
  );
};
export default stepper;
