import React from "react";
import { Link } from "react-router";
import { ShadowBtn } from "./ui";
import YandexLogo from "@/assets/YandexLogo";

function Footer() {
  return (
    <footer className="mt-10 pb-5 pt-5 w-full">
      <div className="w-main flex items-center justify-center">
        <Link to={"http://rasp.yandex.ru/"}>
          <ShadowBtn>
            <YandexLogo />
            Данные предоставлены сервисом Яндекс Расписания
          </ShadowBtn>
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
