/**
 * FAQSchema.tsx
 * Renders a visible FAQ accordion section AND injects FAQPage JSON-LD schema.
 * Both the visible UI and the schema are generated from the same `faqs` data array.
 *
 * Usage:
 *   import FAQSchema from '@/components/FAQSchema';
 *
 *   const myFaqs = [
 *     { question: 'Who is…?', answer: 'Hon. Uchenna…' },
 *   ];
 *
 *   <FAQSchema faqs={myFaqs} />
 */

'use client';

import { useState } from 'react';

export interface FAQ {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQ[];
  /** Optional heading above the accordion */
  heading?: string;
}

// Default FAQs used on every page unless overridden
export const DEFAULT_FAQS: FAQ[] = [
  {
    question: 'Who is the federal representative for Idemili North and South?',
    answer:
      "The current federal representative for Idemili North and South Federal Constituency is Hon. Uchenna 'Harris' Okonkwo of the Action Democratic Congress (ADC), serving in the 10th National Assembly of Nigeria.",
  },
  {
    question: 'Who is Uchenna Okonkwo?',
    answer:
      'Uchenna Okonkwo, also known as Harris Okonkwo, is a Nigerian politician and Federal House of Representatives member representing Idemili North and South Federal Constituency in Anambra State. He serves under the Action Democratic Congress (ADC) in the 10th National Assembly.',
  },
  {
    question: 'Who is Annie Okonkwo?',
    answer:
      "Annie Okonkwo is the wife of Hon. Uchenna 'Harris' Okonkwo, the Federal Representative for Idemili North and South Federal Constituency in Anambra State, Nigeria.",
  },
  {
    question: 'What party does Uchenna Okonkwo belong to?',
    answer:
      'Hon. Uchenna Okonkwo belongs to the Action Democratic Congress (ADC), under which he represents the Idemili North and South Federal Constituency in the Nigerian House of Representatives.',
  },
  {
    question: 'What towns are in Idemili North and Idemili South?',
    answer:
      'Idemili North LGA towns include: Ogidi, Nkpor, Obosi, Uke, Ideani, Ojoto, and Umuoji. Idemili South LGA towns include: Alor, Awka-Etiti, Nnobi, Nnewi, Akwa, Oraukwu, Oba, and Ojoto.',
  },
  {
    question: 'When is the 2027 general election in Idemili?',
    answer:
      "Nigeria's 2027 general elections are scheduled for February 2027. The election will determine the next Federal Representative for Idemili North and South Federal Constituency, Anambra State. Hon. Uchenna Okonkwo of ADC is contesting for re-election.",
  },
  {
    question: 'What is the ADC party in Nigeria?',
    answer:
      "The Action Democratic Congress (ADC) is a registered Nigerian political party. In Anambra State, ADC is represented in the Federal House of Representatives by Hon. Uchenna 'Harris' Okonkwo for the Idemili North and South constituency.",
  },
  {
    question: 'How do I contact the Idemili Federal Constituency office?',
    answer:
      'You can contact the constituency office of Hon. Uchenna Okonkwo through the official website at https://www.uchennaokonkwo.com/contact or by sending a message via the Town Hall form on the website.',
  },
];

function buildFAQSchema(faqs: FAQ[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export default function FAQSchema({ faqs, heading = 'Frequently Asked Questions' }: FAQSchemaProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 px-6 lg:px-12 bg-[var(--off-white)]" aria-label="Frequently Asked Questions">
      {/* JSON-LD schema injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFAQSchema(faqs)) }}
      />

      <div className="max-w-4xl mx-auto">
        {/* Section heading */}
        <p className="text-[var(--midnight-green)] font-bold tracking-[0.3em] uppercase text-[10px] mb-4 flex items-center gap-4">
          <span className="w-8 h-[1px] bg-[var(--sunlight-yellow)]" />
          FAQ
        </p>
        <h2 className="text-4xl lg:text-5xl font-bold tracking-tighter font-serif text-[var(--obsidian)] mb-12">
          {heading}
        </h2>

        {/* Accordion */}
        <div className="divide-y divide-gray-100" itemScope itemType="https://schema.org/FAQPage">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="group"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <button
                className="w-full text-left flex justify-between items-center py-6 gap-6 focus:outline-none"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span
                  className="font-semibold text-lg text-[var(--obsidian)] group-hover:text-[var(--midnight-green)] transition-colors"
                  itemProp="name"
                >
                  {faq.question}
                </span>
                <span className="text-[var(--midnight-green)] text-2xl font-light shrink-0">
                  {openIndex === i ? '−' : '+'}
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-96 pb-6' : 'max-h-0'}`}
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
              >
                <p className="text-gray-600 leading-relaxed text-base" itemProp="text">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
