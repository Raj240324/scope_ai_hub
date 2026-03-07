import React from 'react';
import { Building2 } from 'lucide-react';

const companies = [
  { name: "Google", logo: "https://cdn.brandfetch.io/id6O2oGzv-/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1731911497387" },
  { name: "Amazon", logo: "https://cdn.brandfetch.io/idawOgYOsG/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1747149760488" },
  { name: "Microsoft", logo: "https://cdn.brandfetch.io/idchmboHEZ/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1727706672983" },
  { name: "IBM", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
  { name: "Accenture", logo: "https://cdn.brandfetch.io/id44tJQbVE/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1667564496635" },
  { name: "Infosys", logo: "https://cdn.brandfetch.io/id2jVuQy_9/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1676271043735" },
  { name: "TCS", logo: "https://cdn.brandfetch.io/idK2mWG2SJ/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1759053200614" },
  { name: "Wipro", logo: "https://cdn.brandfetch.io/id1uICo497/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1667569578092" },
  { name: "HCLTech", logo: "https://cdn.brandfetch.io/id8i2DmKRE/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1668078037967" },
  { name: "Cognizant", logo: "https://cdn.brandfetch.io/idzF9a2Y93/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1667652314787" }
];

const HiringPartners = () => (
  <section className="py-12 md:py-16 bg-[var(--bg-secondary)] border-b border-[var(--border-color)] overflow-hidden">
    <div className="container-custom">
      <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-caption font-bold uppercase tracking-wider mb-6 border border-primary/20">
          <Building2 className="h-3 w-3" />
          <span>Hiring Partners</span>
        </div>
        <h2 className="heading-lg font-bold text-[var(--text-heading)] mb-4 leading-tight">
          Our Graduates Work Across <span className="font-extrabold text-primary">Leading Companies</span>
        </h2>
        <p className="text-body md:text-lg text-body">
          Our graduates work across leading companies such as...
        </p>
      </div>
    </div>
    <div className="flex animate-marquee gap-6 sm:gap-8 md:gap-10 items-center w-max">
      {[...companies, ...companies, ...companies].map((company, i) => (
        <div key={i} className="flex-shrink-0 group">
          <div className="h-14 w-28 sm:h-16 sm:w-32 md:h-20 md:w-40 flex items-center justify-center px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl bg-white dark:bg-white border border-[var(--border-color)] shadow-sm hover:shadow-lg hover:border-primary/30 transition-all">
            <img
              src={company.logo}
              alt={company.name}
              width={160}
              height={40}
              loading="lazy"
              className={`object-contain transition-all duration-300 ${
  (company.name === 'TCS' || company.name === 'Wipro')
    ? 'max-h-8 sm:max-h-10 md:max-h-12 scale-125 md:scale-150'
    : 'max-h-6 sm:max-h-8 md:max-h-10'
} opacity-80 hover:opacity-100 hover:scale-105`}
            />
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default HiringPartners;
