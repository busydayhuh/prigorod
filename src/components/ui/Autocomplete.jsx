import { useStationSearch } from "@/hooks/useStationSearch";
import { useIsMobile } from "@/store/window-size/useIsMobile";
import { AutocompleteDesktop } from "./AutocompleteDesktop";
import { AutocompleteMobile } from "./AutocompleteMobile";

export function Autocomplete(props) {
  const isMobile = useIsMobile();
  const { field, setFormValue } = props;
  const search = useStationSearch(field.name);

  const onStationSelect = (code, title) => {
    setFormValue(field.name, code);
    setFormValue(`${field.name}Label`, title);
  };

  const clear = () => {
    setFormValue(field.name, "");
    setFormValue(`${field.name}Label`, "");
    search.setSearch("");
  };

  if (isMobile)
    return (
      <AutocompleteMobile
        {...props}
        searchState={search}
        onStationSelect={onStationSelect}
        clear={clear}
      />
    );

  return (
    <AutocompleteDesktop
      {...props}
      searchState={search}
      onStationSelect={onStationSelect}
      clear={clear}
    />
  );
}
