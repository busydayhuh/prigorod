import githubLogo from "@/assets/github-alt-icon-original.svg";
import YandexLogo from "@/assets/YandexLogo";
import { ShadowBtn } from "./ui";

function Footer() {
  return (
    <footer className="md:mt-15 mt-10 py-10 w-full relative">
      <div className="w-main flex items-center md:gap-4 gap-2 md:justify-center justify-start flex-wrap">
        <a href="https://github.com/busydayhuh/prigorod" target="_blank">
          <ShadowBtn>
            <img src={githubLogo} className="w-4 h-4" alt="" />
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
