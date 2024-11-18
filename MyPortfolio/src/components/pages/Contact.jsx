import React from "react";
import Header from "./Header"; // Adjust the path according to your project structure

const Contact = () => {
  return (
    <>
      <Header />
      <section id="contact" className="bg-[#2b2b2b] text-amber-100 py-20">
        <div className="container mx-auto px-4">
          <div className="crt-frame p-8 border-2 border-amber-600 bg-black/40 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 terminal-text">
              &gt; Contact_Me
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block mb-2 terminal-text">&gt; Name:</label>
                <input
                  type="text"
                  className="w-full p-2 bg-black/50 border-2 border-amber-600 text-amber-100 focus:border-amber-400 outline-none"
                />
              </div>
              <div>
                <label className="block mb-2 terminal-text">&gt; Email:</label>
                <input
                  type="email"
                  className="w-full p-2 bg-black/50 border-2 border-amber-600 text-amber-100 focus:border-amber-400 outline-none"
                />
              </div>
              <div>
                <label className="block mb-2 terminal-text">
                  &gt; Message:
                </label>
                <textarea className="w-full p-2 bg-black/50 border-2 border-amber-600 text-amber-100 focus:border-amber-400 outline-none h-32"></textarea>
              </div>
              <button className="px-6 py-2 bg-amber-800 hover:bg-amber-700 transition border-2 border-amber-600">
                SEND_MESSAGE.exe
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
