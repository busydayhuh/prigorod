import YandexLogo from "@/assets/YandexLogo";
import { Code2 } from "lucide-react";
import { ShadowBtn } from "./ui";

function Footer() {
  return (
    <footer className="relative mt-10 md:mt-15 py-10 w-full">
      <div className="flex flex-wrap justify-start md:justify-center items-center gap-2 md:gap-4 w-main">
        <a href="https://github.com/busydayhuh/prigorod" target="_blank">
          <ShadowBtn>
            <Code2 />
            Код на Github
          </ShadowBtn>
        </a>
        <a href="http://rasp.yandex.ru/" target="_blank">
          <ShadowBtn className="whitespace-normal">
            <YandexLogo />
            Данные предоставлены сервисом Яндекс Расписания
          </ShadowBtn>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
