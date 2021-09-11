import React from "react";
import styles from "./WeeklyTable.module.css";

interface Props {
  startTime: number;
  endTime: number;
}

const Cell = (props: Props) => {
  const top: number = (props.startTime / 24) * 100;
  const bottom: number = (props.endTime / 24) * 100;
  const height = bottom - top;

  return (
    <div
      className={styles.cell}
      style={{ top: top + "%", height: height + "%" }}
    >
      <p>content</p>
    </div>
  );
};

export default Cell;
