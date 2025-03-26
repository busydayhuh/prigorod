import React from "react";

import { ShadowBtn } from "./ui";
import YandexLogo from "@/assets/YandexLogo";

function Footer() {
  return (
    <footer className="mt-10 pb-5 pt-5 w-full">
      <div className="w-main flex items-center justify-center">
        <a href="http://rasp.yandex.ru/" target="_blank">
          <ShadowBtn className="py-6">
            <YandexLogo />
            Данные предоставлены сервисом Яндекс Расписания
          </ShadowBtn>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
