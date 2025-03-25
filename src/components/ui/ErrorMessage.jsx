/* eslint-disable react/prop-types */
import React from "react";
import {
  CalendarX,
  Snail,
  AlertCircle,
  Ghost,
  CalendarOff,
  ClockAlert,
} from "lucide-react";

export default function ErrorMessage({ variant, children = null, ...props }) {
  const variants = {
    general: {
      h: "Что-то пошло не так",
      icon: <AlertCircle className="error-icon" />,
      text: "Невозможно загрузить результаты. Повторите запрос позже.",
    },
    noStation: {
      h: "Станция не найдена",
      icon: <Ghost className="error-icon" />,
      text: "Не найдена одна из станций в запросе. Выберите другую станцию и повторите запрос.",
    },
    noResults: {
      h: "Нет результатов",
      icon: <CalendarX className="error-icon" />,
      text: children,
    },
    noExpress: {
      h: "Тут только стандартные поезда",
      icon: <Snail className="error-icon" />,
      text: "По этому маршруту не найдено экспрессов.",
    },
    noFutureResults: {
      h: "Все уже уехали",
      icon: <ClockAlert className="error-icon" />,
      text: "На выбранную дату больше нет поездов.",
    },
    exceptionDay: {
      h: "Выберите другую дату",
      icon: <CalendarOff className="error-icon" />,
      text: (
        <>
          Нет движения по маршруту на выбранную дату.{" "}
          {props.days && (
            <>
              Расписание действительно {props.days}
              {props.exception && (
                <span className="text-accent">, кроме {props.exception}.</span>
              )}
            </>
          )}
        </>
      ),
    },
  };
  return (
    <div className="flex flex-col gap-3 items-center  mt-10 max-w-3xl mx-auto min-h-[25rem]">
      {variants[variant].icon}
      <h3 className="font-medium md:text-2xl text-lg">{variants[variant].h}</h3>
      <p className="md:text-base text-sm text-center">
        {variants[variant].text}
      </p>
    </div>
  );
}
