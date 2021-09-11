import React, {
  useEffect,
  useCallback,
  useState,
  useRef,
  createRef,
} from "react";
import styles from "./WeeklyTable.module.css";
import Column from "./Column";
import { ColumnRef } from "../types";

interface Props {}

const WeeklyTable = (props: Props) => {
  const [colRefs, setColRefs] = React.useState<React.RefObject<ColumnRef>[]>(
    []
  );
  const weeklyTable = useRef<HTMLDivElement>(null);

  let [mouseDown, setMouseDown] = useState(false);
  let [mouseX, setMouseX] = useState(0);
  let [mouseOnColumn, setMouseOnColumn] =
    useState<Number | undefined>(undefined);
  let [startingColumn, setStartingColumn] =
    useState<Number | undefined>(undefined);
  let [startingHour, setStartingHour] = useState<Number | undefined>(undefined);
  let [inTable, setInTable] = useState(false);

  const isInColumn = (event: MouseEvent | React.MouseEvent) => {
    for (let i = 0; i < colRefs.length; i++) {
      if (isInElement(event, colRefs[i].current)) {
        return i;
      }
    }
    return undefined;
  };
  const getQuarterHour = (
    event: MouseEvent | React.MouseEvent,
    element: ColumnRef | null
  ) => {
    if (!element || !element.current) {
      return undefined;
    }
    let rect = element.current.getBoundingClientRect();
    return Math.round(((event.clientY - rect.y) / (rect.height / 24)) * 4) / 4;
  };
  const isInElement = (
    event: MouseEvent | React.MouseEvent,
    element: ColumnRef | null
  ) => {
    if (!element || !element.current) {
      return false;
    }
    let rect = element.current.getBoundingClientRect();
    if (
      event.clientX > rect.left &&
      event.clientX < rect.right &&
      event.clientY > rect.top &&
      event.clientY < rect.bottom
    ) {
      return true;
    } else {
      return false;
    }
  };
  useEffect(() => {
    setColRefs((colRefs) => {
      let arr = Array(7)
        .fill(undefined)
        .map((_, i) => colRefs[i] || createRef());
      return arr;
    });
  }, []);
  const handleMouseDown = (e: React.MouseEvent) => {
    let column = isInColumn(e);
    console.log(column);
    if (column !== undefined) {
      setStartingColumn(column);
      setStartingHour(getQuarterHour(e, colRefs[column].current));
      setMouseDown(true);
    }
  };

  useEffect(() => {
    const handleMouseUp = (e: MouseEvent) => {
      setMouseDown(false);
      console.log("removing listener");
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.x);
      setMouseOnColumn(isInColumn(e));
    };
    if (mouseDown) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [mouseDown]);
  return (
    <div className={styles.main}>
      <div className={styles.temp}>
        <p>{mouseX}</p>
        <p>Mouse on column: {mouseOnColumn}</p>
        <p>start column: {startingColumn}</p>
        <p>start hour: {startingHour}</p>
      </div>
      <div className={styles.wrapperWrapper}>
        <div className={styles.tableWrapper}>
          <div
            onMouseDown={handleMouseDown}
            ref={weeklyTable}
            className={styles.table}
          >
            <div className={styles.lines}>
              <div className={styles.line} />
              <div className={styles.line} />
              <div className={styles.line} />
              <div className={styles.line} />
              <div className={styles.line} />
              <div className={styles.line} />
              <div className={styles.line} />
              <div className={styles.line} />
              <div className={styles.line} />
              <div className={styles.line} />
              <div className={styles.line} />
              <div className={styles.line} />
              <div className={styles.line} />
              <div className={styles.line} />
              <div className={styles.line} />
              <div className={styles.line} />
              <div className={styles.line} />
              <div className={styles.line} />
              <div className={styles.line} />
              <div className={styles.line} />
              <div className={styles.line} />
              <div className={styles.line} />
              <div className={styles.line} />
              <div className={styles.line} />
            </div>
            <Column ref={colRefs[0]} />
            <Column ref={colRefs[1]} />
            <Column ref={colRefs[2]} />
            <Column ref={colRefs[3]} />
            <Column ref={colRefs[4]} />
            <Column ref={colRefs[5]} />
            <Column ref={colRefs[6]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyTable;
