import React from 'react';
import { Building2 } from 'lucide-react';

const companies = [
  { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
  { name: "IBM", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
  { name: "Accenture", logo: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg" },
  { name: "Infosys", logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg" },
  { name: "TCS", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg" },
  { name: "Wipro", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg" },
  { name: "HCLTech", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a3/HCL_Technologies_logo.svg" },
  { name: "Cognizant", logo: "https://upload.wikimedia.org/wikipedia/commons/1/12/Cognizant%27s_logo.svg" }
];

const HiringPartners = () => (
  <section className="py-12 md:py-16 bg-[var(--bg-body)] border-b border-[var(--border-color)] overflow-hidden">
    <div className="container-custom">
      <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6 border border-primary/20">
          <Building2 className="h-3 w-3" />
          <span>Hiring Partners</span>
        </div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-[var(--text-heading)] mb-4 leading-tight">
          Our Graduates Work Across <span className="text-primary">Leading Companies</span>
        </h2>
        <p className="text-base md:text-lg text-[var(--text-muted)] leading-relaxed">
          Our graduates work across leading companies such as...
        </p>
      </div>
    </div>
    <div className="flex animate-marquee gap-6 sm:gap-8 md:gap-10 items-center w-max">
      {[...companies, ...companies, ...companies].map((company, i) => (
        <div key={i} className="flex-shrink-0 group">
          <div className="h-14 w-28 sm:h-16 sm:w-32 md:h-20 md:w-40 flex items-center justify-center px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-sm hover:shadow-lg hover:border-primary/30 transition-all">
            <img
              src={company.logo}
              alt={company.name}
              width={160}
              height={40}
              loading="lazy"
              className="max-h-6 sm:max-h-8 md:max-h-10 object-contain opacity-50 group-hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default HiringPartners;
