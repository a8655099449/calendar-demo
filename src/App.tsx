import dayjs, { Dayjs } from "dayjs";
import { useEffect, useRef, useState } from "react";
import "./app.less";
function App() {
  const [count, setCount] = useState(0);
  const week = ["日", "一", "二", "三", "四", "五", "六"];

  // const currentMonth =
  const ref = useRef<{
    currentMonth: number;
    startDay: Dayjs;
  }>({
    currentMonth: 0,
    startDay: dayjs(),
  });

  // const
  const [dayList, setDayList] = useState<(string | number)[]>([]);
  const [title, setTitle] = useState("");

  const [dateRange, setDateRange] = useState<{
    start: any;
    end: any;
  }>({
    start: undefined,
    end: undefined,
  });

  const init = () => {
    const { currentMonth } = ref.current;

    const current = dayjs().add(currentMonth, "month").startOf("month");

    ref.current.startDay = current;
    // 获取为周几
    const month = current.day();
    // 获取这个月多少天
    const daysInMonth = current.daysInMonth();
    console.log("👴2022-07-27 18:01:00 App.tsx line:26", daysInMonth);

    const dayList = [];

    for (let i = 0; i < month; i++) {
      dayList.push("");
    }
    for (let i = 0; i < daysInMonth; i++) {
      dayList.push(i + 1);
    }
    setDayList(dayList);

    setTitle(current.format("YYYY年MM月"));

    // console.log("👴2022-07-27 17:43:48 App.tsx line:21", dayList);
  };
  useEffect(init, []);

  const handleClick = (value = 0) => {
    ref.current.currentMonth = ref.current.currentMonth + value;
    init();
  };

  const clickDay = (item: any) => {
    if (!item) {
      return;
    }
    const { startDay } = ref.current;
    const clickDayObj = startDay.add(item - 1, "day");
    // console.log("👴2022-07-27 18:12:00 App.tsx line:63", clickDayString);

    const day = {
      dayIndex: item,
      day: clickDayObj,
    };

    let { start, end } = dateRange;
    if (start && end) {
      start = undefined;
      end = undefined;
    }

    if (!start) {
      start = day;
    } else {
      end = day;
    }

    setDateRange({ start, end });
  };

  return (
    <div className="calendar">
      <div className="title-box">
        <button onClick={(e) => handleClick(-1)}>向上</button>
        <div>{title}</div>
        <button onClick={(e) => handleClick(1)}>向下</button>
      </div>
      <div className="header">
        {week.map((item) => (
          <div className="week" key={item}>
            {item}
          </div>
        ))}
      </div>
      <div className="day-wrap">
        {dayList.map((item, index) => {
          const { start, end } = dateRange;
          let className = " ";
          const isStart = start?.dayIndex === item;
          const isEnd = end?.dayIndex === item;
          const disabled = start && item < start?.dayIndex
          // if () {
          //   className += "rangeIn ";
          // }

          if (start && end) {
            if (item > start.dayIndex && item < end.dayIndex) {
              className += "rangeIn ";
            }
          }

          if (isStart || isEnd) {
            className += "active ";
          }
          if (disabled) {
            className += "disabled ";
            
          }

          return (
            <div
              className={`day-item${className}`}
              key={index}
              onClick={(e) => {
                if (disabled) {
                  return
                }
                clickDay(item);
              }}
            >
              <div>{item}</div>
              {isStart && <div>开始</div>}
              {isEnd && <div>结束</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
