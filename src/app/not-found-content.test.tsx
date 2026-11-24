import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { getClientResources, resources } from "@/i18n/resources";
import type { Locale } from "@/i18n/settings";

import { NotFoundContent } from "./not-found-content";

vi.mock("next/navigation", () => ({
  usePathname: () => "/_not-found/",
}));

function copy(locale: Locale) {
  const { errors, actions, common } = resources[locale];
  return {
    ...errors.notFound,
    backHome: actions.backHome,
    allProjects: actions.allProjects,
    name: common.site.name,
    resources: getClientResources(locale),
  };
}

const content = { en: copy("en"), fa: copy("fa") };

describe("shared static 404", () => {
  beforeEach(() => {
    window.history.replaceState({}, "", "/");
    document.documentElement.lang = "en";
    document.documentElement.dir = "ltr";
  });

  it.each(["en", "fa"] as const)(
    "shows only %s copy and localized links",
    (locale) => {
      window.history.replaceState({}, "", `/${locale}/missing/page/`);
      render(<NotFoundContent content={content} />);

      const other = locale === "en" ? "fa" : "en";
      expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        content[locale].title,
      );
      expect(screen.queryByText(content[other].title)).not.toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: content[locale].backHome }),
      ).toHaveAttribute("href", `/${locale}/`);
      expect(
        screen.getByRole("link", { name: content[locale].allProjects }),
      ).toHaveAttribute("href", `/${locale}/#work`);
      expect(
        screen.getByRole("link", {
          name: new RegExp(`^${resources[locale].common.locale.switchTo}`),
        }),
      ).toHaveAttribute("href", `/${other}/missing/page/`);
      expect(document.documentElement.lang).toBe(locale);
      expect(document.documentElement.dir).toBe(
        locale === "fa" ? "rtl" : "ltr",
      );
    },
  );

  it("uses English for an unprefixed URL and keeps that URL in the language switch", () => {
    window.history.replaceState({}, "", "/missing/page/");
    render(<NotFoundContent content={content} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      content.en.title,
    );
    expect(screen.getByRole("link", { name: /^فارسی/ })).toHaveAttribute(
      "href",
      "/fa/missing/page/",
    );
  });

  it("updates content and controls together after browser navigation", () => {
    render(<NotFoundContent content={content} />);
    act(() => {
      window.history.replaceState({}, "", "/fa/missing/");
      window.dispatchEvent(new PopStateEvent("popstate"));
    });
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      content.fa.title,
    );
    expect(
      screen.getByRole("button", { name: content.fa.pauseAnimation }),
    ).toBeInTheDocument();
    expect(screen.queryByText(content.en.title)).not.toBeInTheDocument();
  });

  it("lets the visitor pause and resume the illustration", async () => {
    const { container } = render(<NotFoundContent content={content} />);
    const button = screen.getByRole("button", {
      name: content.en.pauseAnimation,
    });
    await userEvent.click(button);
    expect(button).toHaveAttribute("aria-pressed", "true");
    expect(container.querySelector('[data-paused="true"]')).toBeInTheDocument();
    await userEvent.click(button);
    expect(button).toHaveAttribute("aria-pressed", "false");
  });
});
