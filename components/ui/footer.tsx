"use client";

const links = [
  "Home",
  "Contact Us",
  "Cookie Notice",
  "Acceptable Use Policy",
  "Privacy Notice",
  "Trademark Policy",
];

export default function Footer() {
  return (
    <footer className="bg-white px-4 pb-12 pt-12 text-blue-700 md:px-8 md:pb-12 md:pt-16">
      <div className="mx-auto max-w-[1216px]">
        <div className="flex justify-start md:justify-center">
          <img src="/handoff-assets/footer-logo.svg" alt="Bright Horizons" />
        </div>
        <nav
          aria-label="Footer navigation"
          className="flex flex-col mt-8 items-start gap-3 md:flex-row md:flex-wrap md:justify-center md:gap-8"
        >
          {links.map((label, index) => (
            <a
              key={label}
              href={index === 0 ? "/" : "#"}
              className="inline-flex items-center gap-1 text-base leading-6 underline underline-offset-2"
            >
              {label}
              {index > 1 && (
                <img src="/handoff-assets/external-link.svg" alt="" />
              )}
            </a>
          ))}
        </nav>
        <p className="mt-12 border-t border-gray-200 pt-8 text-sm leading-6 text-gray-600 md:mt-16 md:text-center md:text-base">
          © 2023 Bright Horizons Family Solutions. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
