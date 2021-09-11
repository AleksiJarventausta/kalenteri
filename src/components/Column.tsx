import React, { useRef, useImperativeHandle } from "react";
import styles from "./WeeklyTable.module.css";
import { ColumnRef } from "../types";
import Cell from "./Cell";

interface Props {}

const Column = React.forwardRef<ColumnRef, Props>((props, ref) => {
  const columnRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => ({ current: columnRef.current }));
  return (
    <div ref={columnRef} className={styles.column}>
      <div className={styles.cellColumn}>
        <Cell startTime={5.5} endTime={8}></Cell>
      </div>
    </div>
  );
});

export default Column;
