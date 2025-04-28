import { formatDateForParams } from "@/lib/utils";

const today = formatDateForParams(new Date());

export const moscowRoutes = [
  {
    title: "Москва — Подольск",
    from: "s2000001",
    to: "s9600731",
    fromLabel: "Москва (Курский вокзал)",
    toLabel: "Подольск",
    desc: "1 час в пути",
  },
  {
    title: "Москва — Серпухов",
    from: "s2000001",
    to: "s9600830",
    fromLabel: "Москва (Курский вокзал)",
    toLabel: "Серпухов",
    desc: "2 часа в пути",
  },
  {
    title: "Москва — Одинцово",
    from: "s2000006",
    to: "s9600721",
    fromLabel: "Москва (Белорусский вокзал)",
    toLabel: "Одинцово",
    desc: "40 минут в пути",
  },
  {
    title: "Москва — Отдых (Жуковский)",
    from: "s2000003",
    to: "s9602223",
    fromLabel: "Москва (Казанский вокзал)",
    toLabel: "Отдых",
    desc: "1.5 часа в пути",
  },
  {
    title: "Москва — Балашиха",
    from: "s2000001",
    to: "s9602120",
    fromLabel: "Москва (Курский вокзал)",
    toLabel: "Балашиха",
    desc: "50 минут в пути",
  },
];

export const allRoutes = [
  {
    title: "Санкт-Петербург — Выборг",
    from: "s9602497",
    to: "s9603175",
    fromLabel: "Санкт-Петербург (Финляндский вокзал)",
    toLabel: "Выборг",
    desc: "2 часа в пути",
  },
  {
    title: "Москва — Владимир",
    from: "s2000001",
    to: "s2060340",
    fromLabel: "Москва (Курский вокзал)",
    toLabel: "Владимир",
    desc: "2 часа в пути",
  },
  {
    title: "Екатеринбург — Нижний Тагил",
    from: "s9607404",
    to: "s9607483",
    fromLabel: "Екатеринбург-Пасс.",
    toLabel: "Нижний Тагил",
    desc: "3 часа в пути",
  },
  {
    title: "Краснодар — Новороссийск",
    from: "s9613602",
    to: "s9613022",
    fromLabel: "Краснодар-1",
    toLabel: "Новороссийск",
    desc: "3 часа в пути",
  },
  {
    title: "Новосибирск — Бердск",
    from: "s9610192",
    to: "s9610394",
    fromLabel: "Новосибирск-южный",
    toLabel: "Бердск",
    desc: "50 минут в пути",
  },
];
