import type { FC } from "react";

export const ControlPanel: FC = () => {
  return (
    <div
      className="controlPanel"
      role="group"
      aria-label="Подсветка чисел в таблице"
    >
      <button type="button" className="btn">prime numbers</button>
      <button type="button" className="btn">divided by 5</button>
      <button type="button" className="btn">divided by 7</button>
      <button type="button" className="btn btn-reset">clear all</button>
    </div>
  );
};
