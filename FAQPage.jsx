import React, { useState } from "react";

const faqData = [
  {
    section: "General",
    icon: "🏠",
    color: "from-blue-500 to-purple-600",
    questions: [
      {
        q: "What is Save Rush?",
        a: "Save Rush is a fashion delivery platform that brings trendy, high-quality streetwear and apparel from your favorite local brands to your doorstep all within 30 minutes.",
      },
      {
        q: "Where is Save Rush currently available?",
        a: "We are launching soon in selected zones of Mumbai, Sewri. We plan to expand city-by-city after our pilot launch.",
      },
      {
        q: "Who can use Save Rush?",
        a: "Everyone who wants to skip the mall and get trendy clothes fast whether you're at home, college, work, or even prepping for a last-minute outing.",
      },
    ],
  },
  {
    section: "Orders & Delivery",
    icon: "📦",
    color: "from-green-500 to-emerald-600",
    questions: [
      {
        q: "What kind of products can I order on Save Rush?",
        a: "We offer handpicked collections from streetwear brands — including T-shirts, hoodies, cargos, co-ords, and more. New drops weekly!",
      },
      {
        q: "How fast do you deliver?",
        a: "All orders are delivered within 30mins of placing the order (zone and stock availability dependent).",
      },
      {
        q: "Can I select the brand I want to order from?",
        a: "Yes! We showcase curated catalogs from each partner brand. You can browse by brand, style, or category.",
      },
      {
        q: "Do you deliver 24/7?",
        a: "Not at the moment. Initial delivery hours will be 10am-11pm, which will expand as we grow.",
      },
      {
        q: "What if my order is delayed or incomplete?",
        a: "We are here to help. You can reach out to our support team instantly via going into help section.",
      },
    ],
  },
  {
    section: "Delivery Experience",
    icon: "🛍️",
    color: "from-orange-500 to-red-600",
    questions: [
      {
        q: "Who delivers the fashion items?",
        a: "Our dedicated delivery team picks up the outfit directly from our inventory and delivers them to your door in 30 minutes.",
      },
      {
        q: "Can I track my order live?",
        a: "Currently not. You’ll get live tracking updates as we expand in few months.",
      },
      {
        q: "Can I reschedule or cancel my order?",
        a: "Yes, orders can be cancelled or rescheduled before they are dispatched. A simple button in the app/web will let you manage it.",
      },
      {
        q: "Do you deliver to chawls, hostels, or PGs?",
        a: "Yes. Whether you're in a high-rise or a hostel, Save Rush delivers everywhere within our active zones.",
      },
    ],
  },
  {
    section: "Returns, Refunds & Payments",
    icon: "🚚",
    color: "from-purple-500 to-indigo-600",
    questions: [
      {
        q: "How can I pay for my order?",
        a: "We accept UPI, Cards, Wallets, and Cash on Delivery (COD).",
      },
      {
        q: "What if I receive the wrong or damaged item?",
        a: "Raise a return request through the app within 24 hours, and we’ll handle the rest. Quick refunds or replacements will be provided.",
      },
      {
        q: "Do I get an invoice?",
        a: "Yes, digital invoices will be provided via email and accessible in your order history.",
      },
    ],
  },
];

export default function FAQPage() {
  const [openSection, setOpenSection] = useState(null);
  const [openQuestion, setOpenQuestion] = useState({});

  const handleSectionClick = (idx) => {
    setOpenSection(openSection === idx ? null : idx);
    setOpenQuestion({});
  };

  const handleQuestionClick = (sectionIdx, questionIdx) => {
    setOpenQuestion((prev) => ({
      ...prev,
      [sectionIdx]: prev[sectionIdx] === questionIdx ? null : questionIdx,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 py-12 px-4 sm:px-8 md:px-16 lg:px-32 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none select-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-blue-800 bg-clip-text text-transparent mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
            Everything you need to know about Save Rush. Can't find the answer
            you're looking for?
            <span className="text-[#9BF00B] font-semibold">
              {" "}
              Reach out to our team.
            </span>
          </p>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-6">
          {faqData.map((section, sIdx) => (
            <div
              key={section.section}
              className="group bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 transition-all duration-500 hover:shadow-2xl hover:scale-[1.01] overflow-hidden"
            >
              {/* Section Header */}
              <button
                className="w-full flex justify-between items-center px-8 py-6 text-left text-xl font-bold text-gray-900 rounded-3xl group relative overflow-hidden focus:outline-none"
                onClick={() => handleSectionClick(sIdx)}
                aria-expanded={openSection === sIdx}
              >
                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${section.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                ></div>
                <div className="flex items-center gap-4 relative z-10">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300`}
                  >
                    <span className="text-2xl">{section.icon}</span>
                  </div>
                  <div>
                    <span className="block text-xl font-bold">
                      {section.section}
                    </span>
                    <span className="block text-sm text-gray-500 font-normal">
                      {section.questions.length} questions
                    </span>
                  </div>
                </div>
                <span className="ml-4 text-2xl relative z-10">
                  {openSection === sIdx ? "−" : "+"}
                </span>
              </button>
              {/* Section Content */}
              <div
                className={`transition-all duration-500 ${
                  openSection === sIdx
                    ? "max-h-[2000px] opacity-100"
                    : "max-h-0 opacity-0 overflow-hidden"
                }`}
              >
                <div className="border-t border-gray-100/50 divide-y divide-gray-100/50">
                  {section.questions.map((item, qIdx) => (
                    <div
                      key={item.q}
                      className="transition-all duration-300 hover:bg-gray-50/50"
                    >
                      {/* Question */}
                      <button
                        className="w-full flex justify-between items-start px-10 py-5 text-left text-base font-semibold text-gray-800 focus:outline-none"
                        onClick={() => handleQuestionClick(sIdx, qIdx)}
                        aria-expanded={openQuestion[sIdx] === qIdx}
                      >
                        <div className="flex-1 pr-4">
                          <span className="block mb-2">{item.q}</span>
                        </div>
                        <span className="ml-4 text-xl">
                          {openQuestion[sIdx] === qIdx ? "−" : "+"}
                        </span>
                      </button>
                      {/* Answer */}
                      <div
                        className={`transition-all duration-500 ${
                          openQuestion[sIdx] === qIdx
                            ? "max-h-96 opacity-100 scale-100"
                            : "max-h-0 opacity-0 scale-95 overflow-hidden"
                        }`}
                      >
                        <div className="px-10 pb-6 pt-2">
                          <div className="bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-2xl p-6 border-l-4 border-[#9BF00B] shadow-sm">
                            <div className="text-gray-700 text-base leading-relaxed">
                              {item.a}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Our support team is here to help you 24/7
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                <span className="text-green-600">💬</span>
                <a
                  href="https://wa.me/your-whatsapp-number"
                  className="text-sm font-medium text-green-600 hover:text-green-800 transition-colors"
                >
                  WhatsApp Support
                </a>
              </div>
              <div className="flex items-center gap-2 p-2 bg-purple-50 rounded-lg">
                <span className="text-purple-600">✉️</span>
                <a
                  href="mailto:support@saverush.in"
                  className="text-sm font-medium text-purple-600 hover:text-purple-800 transition-colors"
                >
                  support@saverush.in
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
