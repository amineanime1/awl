'use client';

import { motion } from "framer-motion";
import { useState } from "react";
import type { FaqItemData } from '@/lib/supabase/server'

interface FaqProps {
  items: FaqItemData[]
}

function ChevronIcon({ isOpen }: { isOpen: boolean }) {
    return (
        <motion.svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="transform origin-center"
        >
            <path d="M6 9l6 6 6-6" />
        </motion.svg>
    );
}

function AccordionItem({ item, isOpen, onToggle, isLast }: {
    item: FaqItemData;
    isOpen: boolean;
    onToggle: () => void;
    isLast: boolean;
}) {
    return (
        <>
            <motion.div
                className="cursor-pointer py-6 group rounded-lg hover:bg-gray-50 transition-colors duration-200"
                onClick={onToggle}
            >
                <div className="flex justify-between items-center px-4">
                    <h3 className="text-md md:text-lg font-semibold text-gray-800 pr-8">{item.question}</h3>
                    <div className="text-gray-800">
                        <ChevronIcon isOpen={isOpen} />
                    </div>
                </div>
                <motion.div
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden px-4"
                >
                    <p className="mt-4 text-gray-600 text-md">
                        {item.answer}
                    </p>
                </motion.div>
            </motion.div>
            {!isLast && <div className="h-px bg-gray-200" />}
        </>
    );
}

export default function Faq({ items }: FaqProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    // Si aucun item FAQ n'est disponible, afficher un message
    if (!items || items.length === 0) {
        return (
            <section className="bg-white mb-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-16 py-16 md:py-20 lg:py-24 flex flex-col items-center justify-center">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 py-2">
                            <img src="/svg/awl-wave-rouge.svg" alt="AWL Logo" className="w-10 h-10" />
                            <span className="text-md font-light italic font-gantari">Tout ce que vous devez savoir</span>
                        </div>
                        <h2 className="font-gasoek text-4xl text-center mb-5">
                            Foire aux questions
                        </h2>
                        <p className="font-gantari text-lg max-w-2xl mx-auto font-medium">
                            FAQ en cours de configuration...
                        </p>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="bg-white mb-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-16 py-16 md:py-20 lg:py-24 flex flex-col items-center justify-center">
                <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 py-2">
            <img src="/svg/awl-wave-rouge.svg" alt="AWL Logo" className="w-10 h-10" />
            <span className="text-md font-light italic font-gantari">Tout ce que vous devez savoir</span>
          </div>
          <h2 className="font-gasoek text-4xl text-center mb-5">
          Foire aux questions
          </h2>
          <p className="font-gantari text-lg max-w-2xl mx-auto font-medium">
          Une question sur nos services ou nos délais ? <br /> On a sûrement déjà la réponse juste ici.
          </p>
                  </div>
                                <div className="w-full max-w-3xl mx-auto mb-12">
                    {items.map((item, index) => (
                        <AccordionItem
                            key={item.id}
                            item={item}
                            isOpen={openIndex === index}
                            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                            isLast={index === items.length - 1}
                        />
                    ))}
                </div>

                <div className="text-center">
                    <h1 className="text-gray-800 mb-4 text-center text-2xl font-gantari font-bold">Une question ? On est là.</h1>
                    <p className="text-lg md:text-xl text-gray-800 text-center font-gantari font-medium mb-6">Contactez-nous à tout moment — on est presque aussi rapides que nos livraisons. </p>
                     <div className="flex justify-center mb-4">
                        <button className="primary-blue-bg text-white text-lg font-bold text-center px-20 py-4 rounded-full flex items-center gap-2 font-gantari ">
                            Pralons-en
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M16.15 13H5q-.425 0-.712-.288T4 12t.288-.712T5 11h11.15L13.3 8.15q-.3-.3-.288-.7t.288-.7q.3-.3.713-.312t.712.287L19.3 11.3q.15.15.213.325t.062.375t-.062.375t-.213.325l-4.575 4.575q-.3.3-.712.288t-.713-.313q-.275-.3-.288-.7t.288-.7z" /></svg>

                        </button>
                    </div>
                    <p className="text-sm md:text-sm text-gray-800 text-center font-gantari">Or email us at support@autowavelogistic.com</p>
                </div>
            </div>
        </section>
    );
} 