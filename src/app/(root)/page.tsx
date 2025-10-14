import { useTranslations } from "next-intl";
import SearchExplorer from "./landing/SearchExplorer";

export default function Landing() {
  const t = useTranslations('HomePage');
  return (
    <div>
      <SearchExplorer />
    </div>
  );
}
