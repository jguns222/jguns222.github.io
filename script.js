const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const resumeFiles = {
  full: {
    path: 'resumes/Jessica_Gunsallus_PM_TPM_Resume.pdf?v=20260817-privacy',
    filename: 'Jessica_Gunsallus_PM_TPM_Resume.pdf',
    label: 'full Product Manager and Technical Product Manager resume'
  },
  'one-page': {
    path: 'resumes/Jessica_Gunsallus_One_Page_Resume.pdf?v=20260817-privacy',
    filename: 'Jessica_Gunsallus_One_Page_Resume.pdf',
    label: 'one-page Product Manager and Technical Product Manager resume'
  }
};

document.querySelectorAll('[data-resume-download]').forEach((link) => {
  const type = link.dataset.resumeDownload || 'full';
  const file = resumeFiles[type] || resumeFiles.full;

  link.href = file.path;
  link.setAttribute('download', file.filename);
  link.setAttribute('aria-label', `Download Jessica Gunsallus’s ${file.label} as a PDF`);
});

const navigationLinks = [...document.querySelectorAll('nav a[href^="#"]')];
const observedSections = navigationLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

if ('IntersectionObserver' in window && observedSections.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      navigationLinks.forEach((link) => {
        const isCurrent = link.getAttribute('href') === `#${visible.target.id}`;
        if (isCurrent) {
          link.setAttribute('aria-current', 'true');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    },
    { rootMargin: '-20% 0px -62% 0px', threshold: [0, 0.2, 0.5] }
  );

  observedSections.forEach((section) => sectionObserver.observe(section));
}
