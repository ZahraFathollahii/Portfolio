import { FiArrowUp } from "react-icons/fi";

import { ButtonLink, Container } from "@/components/ui";
import { getT } from "@/i18n/getT";
import type { Locale } from "@/i18n/settings";
import { formatYear } from "@/lib/format";

export async function Footer({ locale }: { locale: Locale }) {
  const t = await getT(locale, "common");
  const tActions = await getT(locale, "actions");

  return (
    <footer className="border-t border-border py-7">
      <Container className="flex flex-wrap items-center justify-between gap-5 text-xs text-muted">
        <div className="space-y-1.5">
          <p>
            {t("footer.copyright", { year: formatYear(new Date(), locale) })}
          </p>
          <p>{t("footer.built")}</p>
        </div>
        <ButtonLink
          href={`/${locale}/#main`}
          variant="ghost"
          size="sm"
          icon={FiArrowUp}
          iconPosition="end"
        >
          {tActions("backTop")}
        </ButtonLink>
      </Container>
    </footer>
  );
}
