import React from "react";
import { Link } from "react-router";
import { Button } from "./shadcn/button";
import YandexLogo from "@/assets/YandexLogo";

function Footer() {
  return (
    <div className="mt-20 pb-5 pt-5 w-full">
      <div className="w-main flex items-center justify-center">
        <Link to={"http://rasp.yandex.ru/"}>
          <div className="inline-flex items-center p-2 bg-primary-foreground hover:bg-accent shadow-(--row-shadow) rounded-[1rem] border-2 text-sm gap-2 border-foreground font-medium">
            <YandexLogo />
            Данные предоставлены сервисом Яндекс Расписания
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Footer;
